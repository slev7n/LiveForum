var LiveForum = LiveForum || {};

LiveForum.listener = LiveForum.listener || {};

LiveForum.listener.events = LiveForum.listener.events || {};

LiveForum.listener.on = function(eventName, fn) {
	this.events[eventName] = this.events[eventName] || [];
	this.events[eventName].push(fn);
}

LiveForum.listener.off = function(eventName, fn) {
	if(this.events[eventName]) {
		for(var i = 0; i < this.events[eventName].length; i++) {
			if(this.events[eventName][i] === fn) {
				this.events[eventName].splice(i, 1);
				break;
			}
		}
	}
}

LiveForum.listener.emit = function(eventName, data) {
	if(this.events[eventName]) {
		this.events[eventName].forEach(function(fn) {
			fn(data);
		});
	}
}