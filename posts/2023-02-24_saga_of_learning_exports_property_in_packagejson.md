---
title: The saga of learning the exports property in package.json
createDate: "2023-02-24"
description: This is here to document the steps I went through to come to the conclusion that ESM exports syntax in package.json is not ready for use.
tag: TypeScript, ESModules, CommonJS, NextJS
author: You
published: true
---

This is here to document the steps I went through to come to the conclusion that ESM exports syntax in package.json is not ready for use.

## Use case

Our use case is for an internal component library that we want to supply to other projects. Ideally we want to export this as a TypeScript library so the project itself can do the bundling and make smart decisions.

We don’t need to support a lot of legacy projects so ideally I was trying to go all in on EcmaScript modules. Unfortunately, in our use case, we still can’t do that.

## Exports

The exports property in package.json is supposed to allow you to define aliases for your package.

[https://nodejs.org/api/packages.html#exports](https://nodejs.org/api/packages.html#exports)

### Module Resolution and TypeScript

The exports property in package.json is part of the esm specification. In order to make it work with TypeScript you need to specify `moduleResolution: node16` or `moduleResolution: nodenext` (didn't figure out the difference between the two yet...) in tsconfig. This has other repercussions that can affect how modules are processed.

### NextJS and the component library

When you set `moduleResolution: node16` in the tsconfig it allows you to import the component library when it is using the exports field. However, it throws an error that the component library is an es module and the Next environment is running in CommonJS.

If you set the NextJS project as an es module by specifying `type: module` in package.json it will allow the component library to be imported properly but then for some reason all of the NextJS native imports start failing.

It should be noted it is something to do with the combination of `type: module` and `moduleResolution:node16` as either one of those settings set by themselves works with a plain NextJS project. If you do set `type: module` you will need to rename `next.config.js` to `next.config.cjs` as it can only exist as a CommonJS module.

It seems as though NextJS is moving towards being built in ESM natively but that is most likely some time off. Hopefully that will clear up the issues and we will be able to go completely ESM. But that is not possible currently.

### How to Test

Don’t trust VS code for your errors when debugging. I found it to be misleading and often just plain wrong. The only effective way to know if your code is working while playing with module resolution is to use `npm run build` for NextJS projects.

### Transpile modules

For some reason when using the exports field of package.json for the component library, when trying to build with NextJS it acts like it can’t understand TypeScript. This normally would happen if you don’t have `transpilePackages: ["@kaena1/mm-ui-components"]` set in next.config.js, but even with transpilePackages set it still doesn’t seem to work.

The native transpileModules that was introduced in NextJS 13.1 doesn’t seem as fully featured as the previous module that was used to do this - [https://github.com/martpie/next-transpile-modules/tree/the-end](https://github.com/martpie/next-transpile-modules/tree/the-end) . I actually found the documentation here more helpful as well as the NextJS documentation is quite thin.

### Filename extensions

In the few combinations where I was able to get things kind of working I ran into a weird ESM issue where you need to specify file extensions with your imports. It wouldn’t be an issue if we weren’t using TypeScript but for some reason you can’t specify a file extension other than .js. It was kind of hacky because I could actually specify Component.js even though the actual file was Component.tsx and it would work. That was too weird for me and definitely too much tech debt to take on.

## Resources

I found a great resource on Github that describes exactly the issues with ESM and some possible workarounds. All I was after was being able to have subpath exports so I could logically divide up our library in a way that makes sense.

[https://github.com/andrewbranch/example-subpath-exports-ts-compat](https://github.com/andrewbranch/example-subpath-exports-ts-compat)

I ended up choosing the extensionless option for our use case. It muddies up the root of our component library repo slightly but the tradeoff is worth it in my opinion.

### Subpath exports with extensionless method

What I wanted to end up with is imports that follow the pattern:

```javascript
import { Button } from "@ourorg/componentlibrary/components";
import { icons, theme } from "@ourorg/componentlibrary/theme1";
```

We can accomplish this by creating ts files named with the subpath we’re looking for. In this case we would have two files in the root of our component library called `components.ts` and `theme1.ts`. Those files will just be barrel files with export statements that pull in the appropriate modules we need.

Make sure in the package.json of your component library that you either don’t specify the files property or set it to `"files": "[*]"` otherwise the source files you need will not be there.

## Conclusion

My conclusion was that the exports field of package.json is not ready for use with our NextJS projects. Maybe when NextJS goes totally in on ESM, but until then we’re stuck with old

## ChatGPT explains the history of the exports property

This was helpful to understand a little of the history behind the exports field. ChatGPT is definitely more optimistic than I am on using the exports field in real world projects. Looking forward to the day when CommonJS is just a memory.

### What is the history of the package.json exports property?

The **`exports`** property in the **`package.json`** file is a relatively recent addition to the Node.js ecosystem, and it was introduced as part of the ECMAScript Modules (ESM) specification, which was added to Node.js in version 12.

Prior to the introduction of ESM, Node.js relied on the CommonJS module system, which used the **`module.exports`** and **`require()`** functions to define and load modules, respectively. With the introduction of ESM, however, a new syntax and module system was introduced, which used **`import`** and **`export`** statements to define and load modules.

To maintain compatibility between the two module systems, the **`exports`** property was added to the **`package.json`** file. This property allows module authors to specify how their module should be loaded in both the CommonJS and ESM systems.

The **`exports`** property can be used to define a single entry point for the module, as well as alternate entry points for different module systems or environments. For example, a module author can specify that their module should be loaded using **`require()`** in a CommonJS environment, but using an **`import`** statement in an ESM environment.

The **`exports`** property was first proposed in 2018 as part of a larger effort to bring ESM support to Node.js. The proposal was eventually accepted, and the **`exports`** property was added to the **`package.json`** file in Node.js version 12.10.0. Since then, it has become a widely used feature of the Node.js ecosystem, allowing developers to write modules that work seamlessly across different module systems and environments.
