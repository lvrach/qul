var fs = require('fs');

exports.name = 'file';

exports.help = '';

exports.pipeWorker = function(feedIn, feedOut, path) {

	fs.readFile(path, function (err, data) {
		if (err) throw err;
		feedOut.start({fields: []});

		data.toString().split('\n').forEach( function(line) {
			feedOut.write([line]);
		});
		feedOut.end();
	});
}