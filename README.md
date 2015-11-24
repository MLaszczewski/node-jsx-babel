# node-jsx-babel

Transparently `require()` jsx from node with [babel](https://babeljs.io/)

## Usage

`require('node-jsx-babel').install()`

If you want to use a different extension than `.jsx`, do:

`require('node-jsx-babel').install({extension: '.foo'})`

If you want to couple with an additional transform (such as CoffeeScript), do:

```
var coffee = require('coffee-script');
require('node-jsx-babel').install({
  extension: '.coffee',
  additionalTransform: function(src) {
    return coffee.compile(src, {
      'bare': true
    });
  }
});
```
## About target React version

This version was build for React v0.14 branch, with babel transformer.

## Acknowledgement

[Pete Hunt](https://github.com/petehunt/) for base verson of [node-jsx](https://github.com/petehunt/node-jsx)
