var fs = require('fs');
var zlib = require('zlib');

exports.alias = {
	watch: {
		help: 'read file, watch for changes read again',
		main: function (feedIn, feedOut, name) {
			readFile(feedOut, name);
			fs.watchFile(name, function (event) {
				readFile(feedOut, name);
			});
		}
	},
	stdin: {
		help: 'read from stdin',
		main: function (feedIn, feedOut) {
			readFile(feedOut);
		}
	},
	file: {
		help: 'read contents of a file',
		main: function (feedIn, feedOut, name) {
			readFile(feedOut, name);
		}
	}
}

function readFile(feedOut, name) {
	var buffer = '';
	var gunzip = zlib.createGunzip();

	var streamOut = feedOut.start({fields: []});

	var file ;
	if ( name == '') {
		file = process.stdin;
	}
	else {
		file = fs.createReadStream(name);
	}

	if ( name.match(/\.gz$/) ) {
		file = file.pipe(gunzip);
	}
	else {
		file = file;
	}

	file.on('data', function(chunk) {
	    var lines = chunk.toString().split('\n');

	    lines[0] = buffer + lines[0];
	    buffer = lines.pop();

	    lines.forEach(function (line) {
	    	streamOut.write([line]);
	    });
	});

	file.on('end', function() {
	    if (buffer) {
	    	streamOut.write([buffer]);
	    }
	    streamOut.end();
  	    streamOut.close();
	});
}