/**
*
*	MODULE: histc
*
*
*	DESCRIPTION:
*		- Bin an input vector according to a set of predefined edges. Return the bin counts.
*
*
*	NOTES:
*		[1] The bin index is zero-based and corresponds to the input edge vector as follows:

			edges: | e_0 | e_1 | e_2 |  ... |  e_n  |
			bins: 	  | b_0 | b_1 | ... | b_n-1 |

*		[2] To account for values residing outside the lower/upper bounds defined by the edge vector, two additional bins are included: 1) from the left-most bin edge to negative infinity and 2) from the right-most bin edge to positive infinity.
*
*	TODO:
*		[1] 
*
*
*	HISTORY:
*		- 2014/06/23: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] binsearch
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) Athan Reines. 2014.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014.
*
*/

(function() {
	'use strict';

	// MODULES //

	var // Module which implements binary search to find a bin index:
		getBin = require( 'binsearch' );


	// HISTC //

	/**
	* FUNCTION: histc( vector, edges )
	*	Computes a 1d histogram by binning an input vector according to a predefined set of edges.
	*
	* @param {Array} vector - 1d array containing numeric data to be binned
	* @param {Array} edges - 1d array defining the bin edges
	* @returns {Array} counts vector; length = edges.length + 1
	*/
	function histc( vector, edges ) {
		var numBins = edges.length + 1,
			counts, id;
		if ( arguments.length !== 2 ) {
			throw new Error( 'histc()::insufficient input arguments. Must provide both a data vector and an edge vector.' );
		}
		if ( !Array.isArray( vector ) ) {
			throw new Error( 'histc()::invalid input argument. First argument must be a 1d array.' );
		}
		if ( !Array.isArray( edges ) )  {
			throw new Error( 'histc()::invalid input argument. Second argument must be a 1d array.' );
		}

		// Initialize our counts vector (all zeros):
		counts = new Array( numBins );

		for ( var i = 0; i < numBins; i++ ) {
			counts[ i ] = 0;
		}

		// For each value in the vector, find where the value resides along the edge vector...
		for ( var j = 0; j < vector.length; j++ ) {
			// Perform a binary search to find the index where the value equals or exceeds the corresponding value in the edge vector:
			id = getBin( edges, vector[ j ] );

			// Update the counts:
			counts[ id+1 ] += 1;
		}

		// Return the counts:
		return counts;
	} // end FUNCTION histc()


	// EXPORTS //

	module.exports = histc;

})();