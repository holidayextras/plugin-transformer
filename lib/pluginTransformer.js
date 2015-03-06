/* jslint node: true */
'use strict';

var Q = require( 'q' );
var Transformer = require( 'transformer' );

/**
* Creates a rejected promise structure as per our plugin interface dictates
* @param {Object} error - A reason why the promise is being rejected.
* @param {Object} context - A structure containing the values passed by the caller.
*/
function buildReject( error, context ) {
	return {
		error: error,
		origin: 'pluginTransformer',
		data: context
	};
}

exports.register = function( server, options, next ) {

	var transformer = new Transformer();

	function get( options ) {

		var deferred = Q.defer();

		try {

			// check for everything thats required
			if( !options ) {
				throw new Error( 'invalid options' );
			}

			transformer.get( options )
			.then( function( result ) {
				deferred.resolve( result );
			}, function( error ) {
				deferred.reject( buildReject( error, options ) );
			} );

		} catch ( error ) {
			// any exceptions that have been thrown we need to send that back with a rejected deferred
			deferred.reject( buildReject( error, options ) );
		}

		return deferred.promise;
	}

	server.expose( 'get', get );

	next();
};

exports.register.attributes = {
	pkg: require( '../package.json' )
};
