exports.name = 'delete';

exports.help = '';

exports.pipeWorker =  function(feedIn, feedOut, text) {
	feedIn.on('start', function (meta) {

		feedOut.start(meta);

		feedIn.on('line', function (line) {
			feedOut.write( 
				line.map(function (field) {
					return field.replace(text, '');
				})
			)
		});
		feedIn.on('end', function () {
			feedOut.end();
		});
	});
}