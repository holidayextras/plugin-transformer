# plugin-transformer

[![Build Status](https://api.shippable.com/projects/54ff09505ab6cc135296f99f/badge?branchName=master)](https://app.shippable.com/projects/54ff09505ab6cc135296f99f/builds/latest)

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
Copyright (c) 2015 Shortbreaks
Licensed under the MIT license.