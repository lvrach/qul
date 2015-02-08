exports.name = 'group';

exports.help = '';

exports.pipeWorker = function(feedIn, feedOut, fields) {
	fields || (fields = 0);
	fields = [].concat(fields);
	field = fields[0];

	feedIn.on('start', function (meta, streamIn) {
		var groups = {};
		
		var newFields = [field, field + '_count'];

		if (typeof field === 'string') {
			field = meta.fields.indexOf(field);
		}

		meta.fields = newFields;

		var streamOut = feedOut.start(meta);

		streamIn.on('line', function (line) {
			if ( line[field] in groups ) {
				groups[line[field]]++;
			}
			else {
				groups[line[field]]=1;
			}
		});
		streamIn.on('end', function() {
			for ( var group in groups ) {
				streamOut.write([group, groups[group]]);
			}			
			streamOut.end();
		});

	});
		
};
