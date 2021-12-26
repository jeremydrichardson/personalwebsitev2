---
title: Coding Font
date: 2021/03/15
description: I enjoy coding with a good font that includes ligatures and italics. Everyone is always talking about Operator Mono, but at $200, you won't find it in my toolset.
tag: VS Code
author: You
---

# Coding Font

Tags: VS Code

I enjoy coding with a good font that includes ligatures and italics. Everyone is always talking about Operator Mono, but at $200, you won't find it in my toolset.

Instead I landed on Victor Mono:

[https://rubjo.github.io/victor-mono/](https://rubjo.github.io/victor-mono/)

To get it working properly with VS Code, follow the following steps:

```json
"editor.fontFamily": "'Victor Mono', Menlo, Monaco, 'Courier New', monospace",
  "editor.fontLigatures": true,
  "editor.tokenColorCustomizations": {
    "textMateRules": [
      {
        "scope": [
          //following will be in italic (=FlottFlott)
          "comment",
          "entity.name.type.class", //class names
          "keyword", //import, export, return…
          "constant", //String, Number, Boolean…, this, super
          "storage.modifier", //static keyword
          "storage.type.class.js" //class keyword
        ],
        "settings": {
          "fontStyle": "italic"
        }
      },
      {
        "scope": [
          //following will be excluded from italics (VSCode has some defaults for italics)
          "invalid",
          "keyword.operator",
          "constant.numeric.css",
          "keyword.other.unit.px.css",
          "constant.numeric.decimal.js",
          "constant.numeric.json"
        ],
        "settings": {
          "fontStyle": ""
        }
      }
    ]
  }
```
