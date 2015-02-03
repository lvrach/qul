exports.name = 'split';

exports.help = '';

exports.pipeWorker = function (feedIn, feedOut, seperator) {
		
	feedIn.on('start', function (meta) {
		meta.fields = [];
		
		feedOut.start(meta);

		feedIn.on('line', function (line) {
			feedOut.write(line[0].split(seperator));
		});

		feedIn.on('end', function () {
			feedOut.end();
		});
	});
}