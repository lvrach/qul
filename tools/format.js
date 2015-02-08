exports.name = 'format';

exports.help = '';

exports.pipeWorker = function (feedIn, feedOut, format) {
	var regExp;
	if ( typeof format === 'string' ) {
		fieldNames = [];
		regExp = format
			.replace(/((@\{\S*\})|[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|])/g, '\\$&')
			.replace(/\\@{(\S*)}/g, function (match, name) {
				fieldNames.push(name);
				return '(.*?)'
			});
	}
	else {
		regExp = format;
	}

	feedIn.on('start', function (meta, streamIn) {
		meta.fields = fieldNames;
		
		var streamOut = feedOut.start(meta);

		streamIn.on('line', function (line) {
			var match = line[0].match(regExp);
			if (match && match.shift()) {
				streamOut.write(match);
			}
		});

		streamIn.on('end', function () {
			streamOut.end();
		});
	});
}