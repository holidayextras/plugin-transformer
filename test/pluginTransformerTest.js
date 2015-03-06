/* jslint node: true */
/* jshint -W030 */ /* Stop linter complaining about expression */
'use strict';

var chai = require( 'chai' );
var should;
should = chai.should();
var Hapi = require( 'hapi' );
var Q = require( 'q' );

var server;

describe( 'pluginTransformer', function() {

	before( function( done ) {
		// Need to start up a server
		server = new Hapi.Server();

		// and then register this plugin to that server
		server.pack.register( require( '../lib/pluginTransformer' ), function() {
			done();
		} );
	} );

	describe( '#register', function() {
		it( 'should allow us to access the plugin off the hapi server', function( done ) {
			server.plugins['plugin-transformer'].should.not.be.undefined;
			done();
		} );
	} );

	describe( '#get', function() {

		it( 'should expose get as a function', function( done ) {
			server.plugins['plugin-transformer'].get.should.be.a( 'function' );
			done();
		} );

		it( 'get should return a promise', function() {
			Q.isPromise( server.plugins['plugin-transformer'].get() ).should.be.ok;
		} );

		it( 'should fail when the options parameter is not passed', function() {
			return server.plugins['plugin-transformer'].get()
			.then( function() {
			}, function( error ) {
				error.should.have.property( 'error' ).that.is.an.instanceof( Error );
				error.error.message.should.equal( 'invalid options' );
				error.should.have.property( 'origin' ).that.is.equal( 'pluginTransformer' );
			} );
		} );

	} );

} );