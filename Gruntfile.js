/* jslint node: true */
'use strict';

var makeup = require( 'make-up' );

module.exports = function( grunt ) {

	// project configuration
	grunt.initConfig( {
		jshint: {
			options: {
				jshintrc: makeup( 'jshintrc.json' )
			},
			core: {
				src: ['*.js']
			},
			test: {
				src: ['test/**/*.js']
			}
		},
		jscs: {
			options: {
				config: makeup( 'jscsrc.json' ),
				force: 'true'
			},
			src: ['<%= jshint.core.src %>', '<%= jshint.test.src %>']
		}
	} );

	// load tasks from the specified grunt plugins...
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-jscs' );

};