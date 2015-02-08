exports.name = 'grep';

exports.help = '';

exports.pipeWorker = function(feedIn, feedOut, text) {
	feedIn.on('start', function (meta, streamIn) {

		var streamOut = feedOut.start(meta);

		streamIn.on('line', function (line) {
			if ( line.join(' ').indexOf(text) >= 0 ) {
				streamOut.write(line);
			}
		});
		streamIn.on('end', function () {
			streamOut.end();
		});
	
	});
}