var LiveForum = LiveForum || {};
	LiveForum.storage = LiveForum.storage || {};
	LiveForum.storage.initConfig = LiveForum.storage.initConfig || {
		"about": {
			"author": "Neo",
			"name": "LiveForum storage sync",
			"description": "Do not edit unless you know what you are doing"
		},
		"notifications_enabled": true,
		"blocked_users": []
	}

LiveForum.storage.init = function() {
	// let notepad = document.querySelector('form[name="notepad"] input[type="submit"]');
	// if(Object.prototype.toString.call(notepad) !== '[object Null]')
	// 	notepad.disabled = true;
	LiveForum.storage.get(null, function(data) {
		if(Object.prototype.toString.call(data) == '[object Error]')
			this.set(LiveForum.storage.initConfig, function(info) {
				console.log(info);
			});
	});
}


LiveForum.storage.get = function(arg, callback) {
	var self = this;
	let xhr = typeof content !== 'undefined' ? new content.XMLHttpRequest() : new XMLHttpRequest();
	xhr.open('GET', 'index.php?act=UserCP&CODE=00', true);
	xhr.send(null);
	xhr.onload = function() {
		if(xhr.status == 200) {
			let div = document.createElement('div');
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
					let result = arg.reduce((a, b) => {
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
	let xhr = typeof content !== 'undefined' ? new content.XMLHttpRequest() : new XMLHttpRequest();
	xhr.open('POST', 'index.php', true);
	xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
	xhr.send('act=UserCP&CODE=20&notes=' + JSON.stringify(obj));
	xhr.onload = () => {
		if(xhr.status == 200) {
			if(callback)
				callback.call(self, {message:"Storage saved", status: xhr.status});
		} else {
			if(callback)
				callback.call(self, {message: "Storage saving failed", status: xhr.status});
		}
	}
}

// LiveForum.storage.init();