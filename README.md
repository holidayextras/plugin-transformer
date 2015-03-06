# plugin-transformer

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## About

A simple HAPI plugin that wraps [Transformer](https://bitbucket.org/hxshortbreaks/transformer) exposing it's solitary `get()` function

## Getting Started

If you want to work on this repo you will need to install the dependencies
```
$ npm install git+ssh://git@bitbucket.org/hxshortbreaks/plugin-transformer.git
```

then in your file,

```
var pluginTransformer = require( 'plugin-transformer' );
```

### Registering with the server

This plugin conforms to our standard plugin/promise interface defined [here](https://bitbucket.org/hxshortbreaks/the-works/src/master/docs/PLUGINS.md) (see 'Promises')

#### EditorConfig

EditorConfig helps us define and maintain consistent coding styles between different editors and IDEs.  If you are using Sublime Editor you can install the `EditorConfig` using [Package Control](https://sublime.wbond.net).

For non Sublime development a bunch of other IDE plugins are available [here](http://editorconfig.org/#download)

```

## Notes on coding style

Code is linted by ".jshintrc" and checked against the coding style guide "shortbreaks.jscs.json" when you run the default grunt task:
```
$ grunt
```

## Tests

Tests will run using the default grunt task but can also be called stand-alone using:
```
$ grunt test

## License
Copyright (c) 2014 Shortbreaks
Licensed under the MIT license.
