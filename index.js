#!/usr/bin/env node
var Pipe = require('./Pipe');

var tools = {
	out: function(feedIn, feedOut) {
		
		feedIn.on('start', function (meta, streamIn) {

			console.log(meta.fields.join('\t'));
			
			streamIn.on('line', function (line) {
				console.log(line.join('\t'));
			});

			streamIn.on('end', function () {
				console.log('');
			});
		});

	}
};

var normalizedPath = require("path").join(__dirname, 'tools');
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  	var tool = require('./tools/' + file);
  	if (tool.alias) {
  		for ( name in tool.alias ) {
  			tools[name] = tool.alias[name].main;
  		}
  	}
  	if (tool.pipeWorker) {
  		tools[tool.name] = tool.pipeWorker;
	}
});

var api = function (name) {
	this.stack = [];
};
(Object.keys(tools)).forEach( function (name) {
	api.prototype[name] = function () {
		this.stack.unshift([name, Array.prototype.slice.apply(arguments)]);
		return this;
	}
});

$ = new api();
var c = process.argv[2];

var s = eval('$.'+c+'.out()').stack;

s.reduce(function(outPipe, command) {
	var inPipe = new Pipe();
	var args = [inPipe, outPipe].concat(command[1]);	
	tools[command[0]].apply(null, args);
	console.log(command);
	return inPipe;
}, new Pipe());