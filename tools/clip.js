exports.name = 'clip';

exports.help = '';

exports.pipeWorker = function(feedIn, feedOut, joiner) {
	var clipboard = require("copy-paste");

	joiner || (joiner = '\t');
	
	feedIn.on('start', function (meta) {
		var lines = [];

		feedIn.start(meta);

		feedIn.on('line', function (line) {
			lines.push(line.join(joiner));
		});
		
		feedIn.on('end', function () {
			clipboard.copy(lines.join('\n'));
		});
	});
}