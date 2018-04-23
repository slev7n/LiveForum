var LiveForum = LiveForum || {};
	LiveForum.storage = LiveForum.storage || {};
	LiveForum.storage.initConfig = LiveForum.storage.initConfig || {
		"about": {
			"author": "Neo",
			"name": "LiveForum storage sync",
			"description": "Do not edit unless you know what you are doing"
		},
		"notifications_enabled": true,
		"last_checked": Date.now(),
		"blocked_users": [],
		"custom_buttons": [],
		"custom_emojis": [],
		"quote_author": true,
		"avoid30chars": true,
		"avoidFlood": false
	}

LiveForum.storage.xhr = typeof content !== 'undefined' ? content.XMLHttpRequest : XMLHttpRequest;

LiveForum.storage.init = function() {
	LiveForum.storage.get(null, function(data) {
		if(Object.prototype.toString.call(data) == '[object Error]')
			this.set(LiveForum.storage.initConfig, function(info) {
				console.log(info);
			});
	});
}


LiveForum.storage.get = function(arg, callback) {
	var self = this;
	var xhr = new this.xhr();
	xhr.open('GET', 'index.php?act=UserCP&CODE=00', true);
	xhr.send(null);
	xhr.onload = function() {
		if(this.status == 200) {
			var div = document.createElement('div');
			div.innerHTML = this.responseText;
			try {
				var data =  JSON.parse(div.querySelector('textarea').value);
			} catch(e) {
				callback.call(self, e);
				return;
			}
			switch(Object.prototype.toString.call(arg)) {
				case '[object String]':
					if(arg in data)
						callback.call(self, data[arg]);
					else
						console.log('no such entry')
					break;
				case '[object Array]':
					var result = arg.reduce((a, b) => {
						a[b] = data[b];
						return a;
					}, {});
					callback.call(self, result);
					break;
				case '[object Null]':
					callback.call(self, data);
					break;
				default:
					console.log('You must enter a value');
			}
		}
	}
}

LiveForum.storage.set = function(obj, callback) {
	var self = this;
	var xhr = new this.xhr();
	xhr.open('POST', 'index.php', true);
	xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
	xhr.send('act=UserCP&CODE=20&notes=' + JSON.stringify(obj));
	xhr.onload = function() {
		if(this.status == 200) {
			if(callback)
				callback.call(self, {message:"Storage saved", status: this.status});
		} else {
			if(callback)
				callback.call(self, {message: "Storage saving failed", status: this.status});
		}
	}
}

LiveForum.storage.init();