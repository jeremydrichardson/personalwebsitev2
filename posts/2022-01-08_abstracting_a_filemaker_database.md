---
title: Abstracting a FileMaker database
createDate: 2022-01-08
description: Been working on a project that requires the transformation of data from a FileMaker database into an api. Here are some of the methods we're using to do this without rewriting everything from the ground up.
tag: FileMaker, REST, Javascript
author: You
published: true
---

Lately I have been working on a method for abstracting a FileMaker database into another custom API. I was brought on board to help move a legacy FileMaker application into a more web based platform. It would be too much of a risk to try to rebuild the database from scratch in another technology, as well as the fact that FileMaker gives relatively good access to the data through the FileMaker data API.

## Tables

FileMaker has its own flavor of database methodology that cannot be translated 1:1 into a new environment. The first issue was deciding how to present the data through the API since FileMaker does not give you direct access to the tables.

We decided to keep things as simple as possible we would represent the FileMaker tables in table layouts that adhered closely to the underlying table structure.

That means we ended up with REST\__tablename_ layouts that were exposed through the API that we could consume with our service.

## Models

We then built a model system that represented these FileMaker tables using a standardized CRUD methodology. Our backed is a node express app.

I based some of the basic methodology on the [Sequalize](https://sequelize.org/) project, but far simplified.

```jsx
// Parent class for all other services to extend
class Model {
  constructor() {
    this.data = {};
  }

  static client;

  static build(data) {
    //...builds the model
  }

  static async get(id) {
    //...gets a single record
  }

  static async getByRecordId(recordId) {
    //...certain FileMaker functionality only returns a recordId
  }

  static async find(query = {}) {
    //...find record(s) based on a query
  }

  static async create(data) {
    //...creates a new record
  }

  static async update(id, data) {
    //...updates a record
  }
  static async delete(id) {
    //...deletes a record
  }
}
```

Now we can extend this model for any of the FileMaker table/layouts that we have created. Under the hood for each of those methods we’re using the [fms-api-client](https://github.com/Luidog/fms-api-client) project by [Luidog](https://github.com/Luidog)

## Record Id

The FileMaker uses the concept of a recordId which is kind of like a primary key. The odd thing is I believe it’s completely hidden within FileMaker itself and only exposed to the API. That means we already had primary keys for each table.

We standardized by using our primary key for all id fields. If there are specific FileMaker functions (like update or delete) that require a record id, we abstract that away in the method. Therefore you only need to worry about our own id and not the record id.

```jsx
const updatedProject = ProjectModel.update(primaryKey, data);
```

The update method actually has to get the record based on the primary key so that it has the record id in order to make the update.

## Transformations

The FileMaker application I was abstracting was close to 20 years old meaning there had been various field naming conventions that had come and gone leaving field names almost meaningless.

In creating a new api we had the opportunity to correct the issue and rename all fields with a single standard format that makes sense now.

### Record Classes

I decided to create a class that would represent a single record. I have one class that represents a FileMaker record and one that represents an API record. It includes the schema for that record based on the model type so that we know what transformations to make.

```jsx
const data = new RecordFm(this.schema, dataFromFileMakerApi).toApi();
```

### Field Classes

Did a similar thing that represents either a FileMaker field or an API field. This includes the schema for the field so we know what transformations to make.

```jsx
const fmFieldValue = new FieldApi(schema.id, id).toFm();
```

### Transformation Methods

Then we would have a _toFm_ method and _toApi_ method that would convert the appropriate direction. Within each class are private methods that make the various transformations necessary (field types, field formats, value transformations)

These were based loosely on the OpenAPI schema definition that we had built for the API. I intend to replace that later with our own JSON Schema for each class but at this point it is serving its purpose.

```jsx
class FieldFm {
  constructor(fieldSchema, value) {
    this.value = value;
    this.newValue = value;
    Object.assign(this, fieldSchema);
  }

  static #returnSeparated = "\r";
  static #commaSeparated = ",";

  toApi() {
    this.#transformTypeToApi();
    this.#transformFormatToApi();
    this.#transformContentToApi();
    return this.newValue;
  }

  #transformTypeToApi() {
    //...transform to Javascript type since FileMaker mostly returns strings
  }

  #transformFormatToApi() {
    //...mostly based on the idea of OpenAPI formats, most times used to specify more details beyond a string.
  }

  #transformContentToApi() {
    //...some content needs to be transformed, like some FileMaker ids have spaces which doesn't work in our frontend
  }

  #typeToApi = {
    integer: (value) => parseInt(value) || 0,
    boolean: (value) => (value ? true : false),
    object: (value) => value,
    string: (value) => value,
    array: (value) => this.#arrayTypeToApi[this["x-array-type"]](value),
  };

  #arrayTypeToApi = {
    returnSeparated: (value) => {
      if (!value) return [];

      return value.split(this.constructor.#returnSeparated).map((value) => {
        return new SchemaFieldFm(this.items, value).toApi();
      });
    },
    commaSeparated: (value) => {
      if (!value) return [];

      return value.split(this.constructor.#commaSeparated).map((value) => {
        return new SchemaFieldFm(this.items, value).toApi();
      });
    },
    repetitionArray: (value) => {
      return value.map((value) => {
        return new SchemaFieldFm(this.items, value).toApi();
      });
    },
  };

  #formatToApi = {
    date: (value) =>
      value ? dateFormat(new Date(`${value} 00:00`), "yyyy-MM-dd") : null,
    "date-time": (value) => (value ? apiDatetimeFormat(value) : null),
    time: (value) => value || null,
    "partial-time": (value) => value || null,
    int32: (value) => value,
  };

  #contentToApi = {
    dashesForSpaces: (value) => value.replace(/ /g, "-"),
  };
}
```
