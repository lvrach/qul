exports.name = 'reverse';

exports.help = '';

exports.pipeWorker = function(feedIn, feedOut) {
	
	feedIn.on('start', function (meta, streamIn) {
		var lines = [];
		
		var streamOut = feedOut.start(meta);

		streamIn.on('line', function (line) {		
			lines.push(line);
		});
		streamIn.on('end', function () {
			lines.reverse().forEach( function (line) {
				streamOut.write(line);
			});
			streamOut.end();
		});
	});
}