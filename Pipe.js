var Pipe = function () {
	this.events = {
		'start': [],
		'line': [], 
		'end': [],
		'close': []
	};
}
Pipe.prototype.on = function (event, callback) {
	this.events[event].push(callback);
};
Pipe.prototype.start = function (meta) {
	this.events.start.forEach(function (callback) {
		callback(meta);
	});
};
Pipe.prototype.close = function () {
	this.events.close.forEach(function (callback) {
		callback();
	});
};
Pipe.prototype.write = function (line) {
	this.events.line.forEach(function (callback) {
		callback(line);
	});
};
Pipe.prototype.end = function () {
	this.events.end.forEach(function (callback) {
		callback();
	});
};
module.exports = Pipe;