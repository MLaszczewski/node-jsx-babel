[![Build Status](https://travis-ci.org/Meettya/node-jsx-babel.svg?branch=master)](https://travis-ci.org/Meettya/node-jsx-babel)

# node-jsx-babel

Transparently `require()` jsx from node with [babel](https://babeljs.io/)

## Breaking changes

This version change default extension from `.js` to `.jsx`, due to `.js` extension overwrite base node parser and will case an exception.

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

## Acknowledgment

[Pete Hunt](https://github.com/petehunt/) for base version of [node-jsx](https://github.com/petehunt/node-jsx)
