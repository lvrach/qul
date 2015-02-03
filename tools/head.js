exports.name = 'head';

exports.help = '';

exports.pipeWorker = function(feedIn, feedOut, number) {
	number || (number = 5);
	
	feedIn.on('start', function (meta) {
		var count = 0;
		
		feedOut.start(meta);
		
		feedIn.on('line', function (line) {
			count++;
			if ( count > number ) {
				return;
			}
			feedOut.write(line);
		});
		
		feedIn.on('end', function () {
			feedOut.end();
		});
	});
}