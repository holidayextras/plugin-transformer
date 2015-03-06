# plugin-transformer

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## About

A simple HAPI plugin that wraps [Transformer](https://bitbucket.org/hxshortbreaks/transformer) exposing it's solitary `get()` function

## Getting Started

If you want to work on this repo you will need to install the dependencies
```
$ npm install git+ssh://git@github.com/holidayextras/plugin-transformer.git
```

then in your file,

```
var pluginTransformer = require( 'plugin-transformer' );
```

### Registering with the server

This plugin conforms to our standard plugin/promise interface defined [here](https://bitbucket.org/hxshortbreaks/the-works/src/master/docs/PLUGINS.md) (see 'Promises')

```

## Contributing

Code is linted by ".jshintrc" and checked against the coding style guide "shortbreaks.jscs.json". We also use Mocha to test our code, to run all of this use ` $ grunt test `.

## License
Copyright (c) 2015 Shortbreaks
Licensed under the MIT license.
