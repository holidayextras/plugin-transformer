/* eslint valid-jsdoc:0 */
/* eslint no-use-before-define:0 */

'use strict'

var Q = require('q')
var transformerSdk = require('transformer-sdk')

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

const register = async (server, options) => {
  const cacheConfig = {
    redis: {
      host: options.redis.host,
      port: options.redis.port,
      ttl: (10 * 60 * 1000) // 10 minutes
    },
    inMemory: {
      ttl: (2 * 60 * 1000) // 5 minutes
    }
  }
  console.log('plugin, cache configuration', cacheConfig)
  await transformerSdk.initialise(cacheConfig)
  server.expose('getConfiguration', getConfiguration)

  function getConfiguration (options) {
    var deferred = Q.defer()

    try {
      // check for everything thats required
      if (!options) {
        throw new Error('invalid options')
      }
      var sdkGetOptions = { id: options?.collection ?? '' }
      transformerSdk.get(sdkGetOptions)
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

const pkg = require('../package.json')
const {version, name} = pkg

exports.plugin = {
  register,
  name,
  version,
  pkg
}
