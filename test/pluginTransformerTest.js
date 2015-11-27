/* eslint no-unused-expressions:0 */
'use strict';

var chai = require( 'chai' );
chai.use( require( 'chai-as-promised' ) );
var expect = chai.expect;
var Hapi = require( 'hapi' );
var Q = require( 'q' );
var rewire = require( 'rewire' );
var PluginTransformer = rewire( '../lib/pluginTransformer' );

var server;

describe( 'pluginTransformer', function() {

  before( function( done ) {
    // Need to start up a server
    server = new Hapi.Server();

    // Stub out the startReplication and get calls
    PluginTransformer.__set__( 'Transformer', function() {
      return {
        startReplication: function() {
          // Don't really do anything, just simulate the call completing
          return Q.resolve();
        },
        get: function() {
          return Q.resolve( {
            big: 'oleTest'
          } );
        }
      };
    } );

    // and then register this plugin to that server
    server.pack.register( PluginTransformer, function() {
      done();
    } );
  } );

  describe( '#register', function() {
    it( 'should allow us to access the plugin off the hapi server', function( done ) {
      expect( server.plugins['plugin-transformer'] ).to.not.be.undefined;
      done();
    } );
  } );

  describe( '#getConfiguration', function() {

    it( 'should expose get as a function', function( done ) {
      expect( server.plugins['plugin-transformer'].getConfiguration ).to.be.a( 'function' );
      done();
    } );

    it( 'get should return a promise', function() {
      expect( Q.isPromise( server.plugins['plugin-transformer'].getConfiguration() ) ).to.be.ok;
    } );

    it( 'should fail when the options parameter is not passed', function() {
      return server.plugins['plugin-transformer'].getConfiguration()
      .then( function() {
      }, function( error ) {
        expect( error ).to.have.property( 'error' ).that.is.an.instanceof( Error );
        expect( error.error.message ).to.equal( 'invalid options' );
        expect( error ).to.have.property( 'origin' ).that.is.equal( 'pluginTransformer' );
      } );
    } );

    it( 'should return a result when options are valid', function() {
      return expect( server.plugins['plugin-transformer'].getConfiguration( {} ) ).to.eventually.deep.equal( {
        big: 'oleTest'
      } );
    } );

  } );

} );
