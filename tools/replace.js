exports.alias = {
	'delete': {
		help: 'delete the matched string or pattern',
		main: function (feedIn, feedOut, pattern, string) {
			replace(feedIn, feedOut, pattern, '');
		}
	},
	'replace': {
		help: 'replace the matched string or pattern with another string',
		main: function (feedIn, feedOut, pattern, string) {
			replace(feedIn, feedOut, pattern, string);
		}
	},
	//TODO'trim':
	//TODO'ltrim':
	//TODO'rtrim':
}

function replace (feedIn, feedOut, pattern, string) {
	feedIn.on('start', function (meta, streamIn) {

		var streamOut = feedOut.start(meta);

		streamIn.on('line', function (line) {
			streamOut.write( 
				line.map(function (field) {
					return field.replace(pattern, string);
				})
			)
		});
		streamIn.on('end', function () {
			streamOut.end();
		});
	});
}