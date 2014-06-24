
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	histc = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'histc', function tests() {
	'use strict';

	it( 'should export a function', function test() {
		expect( histc ).to.be.a( 'function' );
	});

	it( 'should require two input arguments: data vector and edge vector', function test() {
		expect( histc ).to.throw( Error );
		expect( function() { binsearch([]); } ).to.throw( Error );
	});

	it( 'should take a 1d data array as its first argument', function test() {
		expect( badValue( '5' ) ).to.throw( Error );
		expect( badValue( 99 ) ).to.throw( Error );
		expect( badValue( {} ) ).to.throw( Error );
		expect( badValue( null ) ).to.throw( Error );
		expect( badValue( undefined ) ).to.throw( Error );
		expect( badValue( NaN ) ).to.throw( Error );

		function badValue( arr ) {
			return function() {
				binsearch( arr, 0 );
			};
		}
	});

	it( 'should take a 1d data array as its second argument', function test() {
		expect( badValue( '5' ) ).to.throw( Error );
		expect( badValue( 99 ) ).to.throw( Error );
		expect( badValue( {} ) ).to.throw( Error );
		expect( badValue( null ) ).to.throw( Error );
		expect( badValue( undefined ) ).to.throw( Error );
		expect( badValue( NaN ) ).to.throw( Error );

		function badValue( arr ) {
			return function() {
				binsearch( arr, 0 );
			};
		}
	});

	it( 'should compute the histogram for input data', function test( done ) {
		var data, expected, rStream,
			edges = [ -0.5, 0.5, 1.5, 2.5, 3.5, 4.5, 5.5 ];

		// Simulate some data...
		data = [ 1, 1, 1, 2, 3, 3, 3, 3, 4 ];

		// Expected counts (histc also returns negative and positive infinity bins which include data which does not fall into any bin defined by the edge vector):
		expected = [
			[ Number.NEGATIVE_INFINITY, 0, -0.5 ], // -infinity
			[ -0.5, 0, 0.5 ],
			[ 0.5, 3, 1.5 ],
			[ 1.5, 1, 2.5 ],
			[ 2.5, 4, 3.5 ],
			[ 3.5, 1, 4.5 ],
			[ 4.5, 0, 5.5 ],
			[ 5.5, 0, Number.POSITIVE_INFINITY ] // +infinity
		];

		// Test:
		assert.deepEqual( histc( data, edges ), expected );

	});

	it( 'should, when computing the histogram counts, assign out-of-bounds data to appropriate bins', function test( done ) {
		var data, expected, rStream,
			edges = [ -0.5, 0.5, 1.5, 2.5, 3.5, 4.5, 5.5 ];

		// Simulate some data...
		data = [ -1, -100, Number.NEGATIVE_INFINITY, 6, 100, Number.POSITIVE_INFINITY ];

		// Expected counts (histc also returns negative and positive infinity bins which include data which does not fall into any bin defined by the edge vector):
		expected = [
			[ Number.NEGATIVE_INFINITY, 3, -0.5 ], // -infinity
			[ -0.5, 0, 0.5 ],
			[ 0.5, 0, 1.5 ],
			[ 1.5, 0, 2.5 ],
			[ 2.5, 0, 3.5 ],
			[ 3.5, 0, 4.5 ],
			[ 4.5, 0, 5.5 ],
			[ 5.5, 3, Number.POSITIVE_INFINITY ] // +infinity
		];

		// Test:
		assert.deepEqual( histc( data, edges ), expected );
	});

});