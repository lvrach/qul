exports.name = 'chart';

exports.help = '';

exports.pipeWorker = function(feedIn, feedOut, field) {
	var Chart = require('cli-chart');
	
	feedIn.on('start', function (meta) {

		feedOut.start(meta);

		var chart = new Chart({
		    xlabel: 'count',
		    ylabel: 'group',
		    direction: 'x',
		    width: 80,
		    height: 20,
		    lmargin: 15,
		    step: 2
		});

		var max=0;
		var min;
		var data = [];
		feedIn.on('line', function (line) {
			max = Math.max(max, line[field]);
			min = Math.min(min, line[field]);
			data.push(line[field]);
			feedOut.write(line);
		});
		feedIn.on('end', function () {

			data.forEach( function (value) {
				chart.addBar(Math.max(1,80*(value/max)));
			});
			chart.draw();
			feedOut.end();
		});

	});
}