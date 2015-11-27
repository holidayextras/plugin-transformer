# plugin-transformer

[![Circle CI](https://circleci.com/gh/holidayextras/plugin-transformer/tree/master.svg?style=svg&circle-token=26ea1e706a961aa3316251c4de5264a20876d50c)](https://circleci.com/gh/holidayextras/plugin-transformer)

## About

A [hapi](http://hapijs.com/) plugin that wraps [Transformer](https://bitbucket.org/hxshortbreaks/transformer) exposing it's solitary ` getConfiguration() ` function

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

## Contributing

Code is linted checked against the style guide with [make-up](https://github.com/holidayextras/make-up), running npm test will run all tests required.

## License
Copyright (c) 2015 Holiday Extras Ltd
Licensed under the MIT license.