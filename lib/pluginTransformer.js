/* eslint valid-jsdoc:0 */
/* eslint no-use-before-define:0 */

'use strict'

const Q = require('q')
const Transformer = require('transformer')

/**
* Creates a rejected promise structure as per our plugin interface dictates
* @param {Object} error - A reason why the promise is being rejected.
* @param {Object} context - A structure containing the values passed by the caller.
*/
function buildReject (error, context) {
  return {
    error,
    origin: 'pluginTransformer',
    data: context
  }
}

const register = async (server) => {
  const transformer = new Transformer()

  await transformer.startReplication()
    .then(function () {
    // Replication always on, once it's finished successfully allow access to our get() function
      server.expose('getConfiguration', getConfiguration)
    })

  function getConfiguration (options) {
    const deferred = Q.defer()

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

const pkg = require('../package.json')
const { version, name } = pkg

exports.plugin = {
  register,
  name,
  version,
  pkg
}
