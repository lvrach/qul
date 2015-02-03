exports.name = 'stdin';

exports.help = '';

exports.pipeWorker = function(feedIn, feedOut) {		
	var buffer = '';

	feedOut.start({fields: []});

	process.stdin.on('data', function(chunk) {
	    var lines = chunk.toString().split('\n');

	    lines[0] = buffer + lines[0];
	    buffer = lines.pop();

	    lines.forEach(function (line) {
	    	feedOut.write([line]);
	    });
	});

	process.stdin.on('end', function() {
	    if (buffer) {
	    	feedOut.write([buffer]);
	    }
	    feedOut.end();
	});
}