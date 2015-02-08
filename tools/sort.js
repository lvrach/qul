exports.name = 'sort';

exports.help = '';

exports.pipeWorker = function (feedIn, feedOut, field) {
	field || (field = 0 );
	
	feedIn.on('start', function (meta, streamIn) {

		if (typeof field === 'string') {
			field = meta.fields.indexOf(field);
		}

		var streamOut = feedOut.start(meta);

		var lines = [];
		streamIn.on('line', function (line) {
			lines.push(line);
		});

		streamIn.on('end', function () {
			lines.sort( function (a, b) {
				if ( typeof (b[field]) === 'number' &&
					 typeof (a[field]) === 'number' ) {
					return -(b[field] - a[field]);
				}
				return -(''+b[field]).localeCompare(''+a[field]);
			}).forEach( function (line) {
				streamOut.write(line);
			});
			streamOut.end();
		});

	});

}