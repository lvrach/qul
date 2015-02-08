exports.name = 'split';

exports.help = '';

exports.pipeWorker = function (feedIn, feedOut, seperator) {
		
	feedIn.on('start', function (meta, streamIn) {
		meta.fields = [];
		
		var streamOut = feedOut.start(meta);

		streamIn.on('line', function (line) {
			streamOut.write(line[0].split(seperator));
		});

		streamIn.on('end', function () {
			streamOut.end();
		});
	});
}