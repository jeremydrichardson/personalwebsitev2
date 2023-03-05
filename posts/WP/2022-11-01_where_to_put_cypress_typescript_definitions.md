---
title: Where to put Cypress TypeScript definitions?
createDate: "2022-11-01"
description: Ran into this issue where the addition of mount to cy wasn’t working properly. "Property 'mount' does not exist on type 'cy & CyEventEmitter'.ts(2339)". Took me a while, but I finally figured it out.
tag: Cypress, JavaScript, TypeScript
author: You
published: true
---

Ran into this issue where the addition of mount to cy wasn’t working properly.

```jsx
Property 'mount' does not exist on type 'cy & CyEventEmitter'.ts(2339)
```

I couldn’t for the life of me figure out why! I followed the [TypeScript page](https://docs.cypress.io/guides/tooling/typescript-support) in the Cypress docs.

It first recommends putting the definition in the appropriate file in the `/cypress/support` folder. Since I was doing component testing I added it to the component.ts file.

```tsx
import "./commands";
import { mount } from "cypress/react18";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", mount);
```

Exactly how they described, but still didn’t work.

Later in that document they mention that you can put it in its own definition file. So let’s try that.

```tsx
//cypress.d.ts in the root

import { mount } from "cypress/react";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}
```

Still no dice.

But the next paragraph in the docs triggered my understanding of what was going on.

> You might need to include the \*_.d.ts_
>  in the include options in any *tsconfig.json*
>  files in your project for TypeScript to pick up the new types

Now it was beginning to make sense.

My tsconfig include section looked like:

```tsx
"include": ["src"]
```

I was only including the src folder—which is what I wanted—but the Cypress TypeScript definition was always outside of that include path. The Cypress support folder and the definition file in the root were never picked up by TypeScript and therefore never applied.

The simple fix was to explicitly include the external definitions file I had created in the root of the project. I ended up moving the definition file into a `types` folder to keep things organized and clean.

```tsx
"include": ["src", "./types/cypress.d.ts"]
```

Worked like a charm! Well almost…

Now I get an error in my `component.ts` file!

```tsx
Argument of type '"mount"' is not assignable to parameter of type 'keyof Chainable<any>'.ts(2345)
```

In the comments of that file it mentions something about using the triple-slash notation to reference types. I haven’t quite wrapped my brain around that one and my eslint yells at me if I do, telling me to use normal ES module import syntax.

That ended up being the solution.

```tsx
import "../../types/cypress.d";
```

Rule of thumb I learned:

> T*ype definitions must be reachable by the TypeScript compiler controlled by the include option in tsconfig.json. For files outside the include you must manually import the type definition.*
