HISTC
=====

One-dimensional histogram calculation.

## Examples

``` javascript
var histc = require( 'histc' ),
	edges, minEdge, maxEdge, binWidth, numEdges,
	data = new Array( 1000 ),
	counts;

// Parameters:
minEdge = -0.025;
maxEdge = -1.025;
binWidth = 0.05;

numEdges = Math.floor( ( maxEdge-minEdge ) / binWidth ) + 1;

// Create a 1d edge array...
edges = new Array( numEdges );
for ( var i = 0; i < numEdges; i++ ) {
	edges[ i ] = minEdge + i*binWidth;
}

// Simulate some data:
for ( var j = 0; j < 1000; j++ ) {
	data[ j ] = Math.random();
}

// Compute the histogram:
counts = histc( data, edges );

```

## Tests

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions.

Assuming you have installed Mocha, execute the following command in the top-level application directory to run the tests:

``` bash
$ mocha
```

All new feature development should have corresponding unit tests to validate correct functionality.


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.

