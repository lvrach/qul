exports.name = 'grep';

exports.help = '';

exports.pipeWorker = function(feedIn, feedOut, text) {
	feedIn.on('start', function (meta) {

		feedOut.start(meta);

		feedIn.on('line', function (line) {
			if ( line.join(' ').indexOf(text) >= 0 ) {
				feedOut.write(line);
			}
		});
		feedIn.on('end', function () {
			feedOut.end();
		});
	
	});
}