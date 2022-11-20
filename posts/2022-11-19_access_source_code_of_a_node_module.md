---
title: Access source code of a Node module
createDate: "2022-11-19"
description: This may seem obvious to some, but as a senior developer with almost 20 years experience, I just figured this out. I thought I would document it for others who might be searching for how to do it since my searches didn’t pull up anything. Probably because it’s just too obvious.
tag: Node, Javascript, TypeScript
author: You
published: true
---

This may seem obvious to some, but as a senior developer with almost 20 years experience, I just figured this out. I thought I would document it for others who might be searching for how to do it since my searches didn’t pull up anything. Probably because it’s just too obvious.

## Problem - access src instead of compiled module

I’m in the process of building a component library in TypeScript and wanted the ability to give the consumers of this library both the compiled code and the source.

The primary reason being is that we’re using CSS modules and with Vite, the css is bundled into a separate file called `style.css`. It’s not ideal because then you need to include the css for the entire module even if you’re just using a single component. If we could use the source code then we could tree shake and use only the css code we need.

## The source is there, how do I access it

The simple answer is, when you import, just add the appropriate folder name after the module name. For instance:

```tsx
// This will import whatever if specified in the "main"
// (or "module") property of package.json
import { Button } from "componentLibrary";

// This will import a folder relative to the root of the module
import { Button } from "componentLibrary/src";
```

It seems so obvious, but for me it wasn’t.

## Don’t even attempt to use exports property of package.json with TypeScript

Before I figured out the above, I assumed I could take advantage of the idea of [subpath exports](https://nodejs.org/api/packages.html#subpath-exports) in package.json. It apparently is meant to replace the `main` and `module` properties of package.json.

You can specific additional entry points that will be appended to the end of the module name when importing.

```tsx
"exports": {
    ".": "./dist/mm-ui-components.es.js"
    "./source": "./src/index.ts"
}

// will import the bundled version
import { Button } from "componentLibrary"

// will import the src index file
import { Button } from "componentLibrary/source"
```

Works great in JavaScript. TypeScript chokes.

You might find some people suggesting you can change the `moduleResolution` property in `tsconfig.json` but that didn’t work for me.

You can find out some of the [history behind it](https://github.com/microsoft/TypeScript/issues/33079) if you enjoy painful Github threads
