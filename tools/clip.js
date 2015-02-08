exports.name = 'clip';

exports.help = '';

exports.pipeWorker = function(feedIn, feedOut, joiner) {
	var clipboard = require("copy-paste");

	joiner || (joiner = '\t');
	
	feedIn.on('start', function (meta, streamIn) {
		var lines = [];

		streamIn.on('line', function (line) {
			lines.push(line.join(joiner));
		});
		
		streamIn.on('end', function () {
			clipboard.copy(lines.join('\n'));
			console.log('copy to clipboard');
		});
	});
}