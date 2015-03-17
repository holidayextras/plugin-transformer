/* jslint node: true */
/* jshint -W030 */ /* Stop linter complaining about expression */
'use strict';

var chai = require( 'chai' );
var should;
should = chai.should();
var Hapi = require( 'hapi' );
var Q = require( 'q' );
var rewire = require( 'rewire' );
var PluginTransformer = rewire( '../lib/pluginTransformer' );

var server;

describe( 'pluginTransformer', function() {

	before( function( done ) {
		// Need to start up a server
		server = new Hapi.Server();
		// and then register this plugin to that server
		server.pack.register( PluginTransformer, function() {
			// Stub out the startReplication call
			PluginTransformer.__set__( 'Transformer', function() {
				return {
					startReplication: function() {
						// Don't really do anything, just simulate the call completing
						return Q.resolve();
					}
				};
			} );
			done();
		} );
	} );

	describe( '#register', function() {
		it( 'should allow us to access the plugin off the hapi server', function( done ) {
			server.plugins['plugin-transformer'].should.not.be.undefined;
			done();
		} );
	} );

	describe( '#getConfiguration', function() {

		it( 'should expose get as a function', function( done ) {
			server.plugins['plugin-transformer'].getConfiguration.should.be.a( 'function' );
			done();
		} );

		it( 'get should return a promise', function() {
			Q.isPromise( server.plugins['plugin-transformer'].getConfiguration() ).should.be.ok;
		} );

		it( 'should fail when the options parameter is not passed', function() {
			return server.plugins['plugin-transformer'].getConfiguration()
			.then( function() {
			}, function( error ) {
				error.should.have.property( 'error' ).that.is.an.instanceof( Error );
				error.error.message.should.equal( 'invalid options' );
				error.should.have.property( 'origin' ).that.is.equal( 'pluginTransformer' );
			} );
		} );

	} );

} );