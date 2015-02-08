exports.name = 'head';

exports.help = '';

exports.pipeWorker = function(feedIn, feedOut, number) {
	number || (number = 5);
	
	feedIn.on('start', function (meta, streamIn) {
		var count = 0;
		
		var streamOut = feedOut.start(meta);

		streamIn.on('line', function (line) {
			count++;
			if ( count > number ) {
				return;
			}
			streamOut.write(line);
		});
		
		streamIn.on('end', function () {
			console.log(streamOut == streamIn);

			streamOut.end();
		});
	});
}