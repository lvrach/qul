
var Stream = function (headers) {
	this.events = {
		'line': [], 
		'end': [],
		'close': []
	};
};
Stream.prototype.on = function (event, callback) {
	this.events[event].push(callback);
};
Stream.prototype.close = function () {
	this.events.close.forEach(function (callback) {
		callback();
	});
	delete this.events;
};
Stream.prototype.write = function (line) {
	this.events.line.forEach(function (callback) {
		callback(line);
	});
};
Stream.prototype.end = function () {
	this.events.end.forEach(function (callback) {
		callback();
	});
};

var Pipe = function () {
	this.events = {
		'start': []
	};
	this.streams = [];
}
Pipe.prototype.on = function (event, callback) {
	this.events[event].push(callback);
};
Pipe.prototype.start = function (meta) {
	var stream = new Stream(meta);
	this.events.start.forEach(function (callback) {
		callback(meta, stream);
	});
	return stream;
};
module.exports = Pipe;