exports.name = 'redis';

exports.help = '';

exports.pipeWorker =  function(feedIn, feedOut, key) {
    var redis = require('redis').createClient();

    var streamOut = feedOut.start({fields: []});

    redis.lrange(key, 0, -1, function (err, list) {
    	if (err) {
	    	feedOut.end();
    		throw err;
    	}
    	if (!list) {
	    	feedOut.end();
	    	return;
    	}
    	list.forEach(function (item) {
    		streamOut.write([item]);
    	});
    	streamOut.end();
    });
}