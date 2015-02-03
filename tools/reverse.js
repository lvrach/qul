exports.name = 'reverse';

exports.help = '';

exports.pipeWorker = function(feedIn, feedOut) {
	
	feedIn.on('start', function (meta) {
		var lines = [];
		
		feedOut.start(meta);

		feedIn.on('line', function (line) {		
			lines.push(line);
		});
		feedIn.on('end', function () {
			lines.reverse().forEach( function (line) {
				feedOut.write(line);
			});
			feedOut.end();
		});
	});
}