/* eslint valid-jsdoc:0 */
/* eslint no-use-before-define:0 */

'use strict'

var Q = require('q')
var Transformer = require('transformer')

/**
* Creates a rejected promise structure as per our plugin interface dictates
* @param {Object} error - A reason why the promise is being rejected.
* @param {Object} context - A structure containing the values passed by the caller.
*/
function buildReject (error, context) {
  return {
    error: error,
    origin: 'pluginTransformer',
    data: context
  }
}

exports.register = function (server, pluginOptions, next) {
  var startDate = new Date();
  var transformer = new Transformer()

  transformer.startReplication()
  .then(function () {
    // Replication always on, once it's finished successfully allow access to our get() function
    server.expose('getConfiguration', getConfiguration)
    console.log('transformer replication took ' + new Date() - startDate)
    next()
  })

  function getConfiguration (options) {
    var deferred = Q.defer()

    try {
      // check for everything thats required
      if (!options) {
        throw new Error('invalid options')
      }

      transformer.get(options)
      .then(function (result) {
        deferred.resolve(result)
      }, function (error) {
        deferred.reject(buildReject(error, options))
      })
    } catch (error) {
      // any exceptions that have been thrown we need to send that back with a rejected deferred
      deferred.reject(buildReject(error, options))
    }

    return deferred.promise
  }
}

exports.register.attributes = {
  pkg: require('../package.json')
}
