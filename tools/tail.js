exports.name = 'tail';

exports.help = '';

exports.pipeWorker = function(feedIn, feedOut, number) {
	number || (number = 5);
		
	feedIn.on('start', function (meta) {
		var lastLines = [];

		feedOut.start(meta);

		feedIn.on('line', function (line) {
			lastLines.push(line);
			if ( lastLines.length > number ) {
				lastLines.shift();
			}
		});
		
		feedIn.on('end', function () {
			lastLines.forEach( function (line) {
				feedOut.write(line);
			});
			feedOut.end();
		});
	});
}