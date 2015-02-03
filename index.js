#!/usr/bin/env node
var Pipe = require('./Pipe');

var tools = {
	out: function(feedIn, feedOut) {
		
		feedIn.on('start', function (meta) {

			console.log(meta.fields.join('\t'));
			
			feedIn.on('line', function (line) {
				console.log(line.join('\t'));
			});

			feedIn.on('end', function () {

			});
		});

	}
};

var normalizedPath = require("path").join(__dirname, 'tools');
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  	var tool = require('./tools/' + file);
  	tools[tool.name] = tool.pipeWorker;
});

var api = function (name) {
	this.stack = [];
};
(Object.keys(tools)).forEach( function (name) {
	api.prototype[name] = function () {
		this.stack.push([name, Array.prototype.slice.apply(arguments)]);
		return this;
	}
});

$ = new api();
var c = process.argv[2];

var s = eval('$.'+c+'.out()').stack;

s.reduce(function(inPipe, command) {
	var outPipe = new Pipe();
	var args = [inPipe, outPipe].concat(command[1]);	
	tools[command[0]].apply(null, args);

	return outPipe;
}, new Pipe());