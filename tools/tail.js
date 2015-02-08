exports.name = 'tail';

exports.help = '';

exports.pipeWorker = function(feedIn, feedOut, number) {
	number || (number = 5);
	
	console.log(feedIn, feedOut);

	feedIn.on('start', function (meta, streamIn) {
		var lastLines = [];

		var streamOut = feedOut.start(meta);

		streamIn.on('line', function (line) {
			lastLines.push(line);
			if ( lastLines.length > number ) {
				lastLines.shift();
			}
		});
		
		streamIn.on('end', function () {
			lastLines.forEach( function (line) {
				streamOut.write(line);
			});
			streamOut.end();
		});
	});
}