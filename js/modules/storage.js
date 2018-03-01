
var initConfig = {
		"about": {
			"name": "LiveForum storage sync",
			"description": "Please do not edit",
			"author": "Neo"
		},
		"notifications_enabled": true,
		"blocked_users": []
	}

function init() {
	// let notepad = document.querySelector('form[name="notepad"] input[type="submit"]');
	// if(Object.prototype.toString.call(notepad) !== '[object Null]')
	// 	notepad.disabled = true;
	get(null, function(data) {
		if(Object.prototype.toString.call(data) == '[object Error]')
			set(initConfig, function(info) {
				console.log(info);
			});
	});
}


function get(arg, callback) {
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
				callback(e);
				return;
			}
			switch(Object.prototype.toString.call(arg)) {
				case '[object String]':
					if(arg in data)
						callback(data[arg]);
					else
						console.log('no such entry')
					break;
				case '[object Array]':
					let result = arg.reduce((a, b) => {
						a[b] = data[b];
						return a;
					}, {});
					callback(result);
					break;
				case '[object Null]':
					callback(data);
					break;
				default:
					console.log('You must enter a value');
			}
		}
	}
}

module.exports.get = get;

function set(obj, callback) {
	let xhr = typeof content !== 'undefined' ? new content.XMLHttpRequest() : new XMLHttpRequest();
	xhr.open('POST', 'index.php', true);
	xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
	xhr.send('act=UserCP&CODE=20&notes=' + JSON.stringify(obj));
	xhr.onload = () => {
		if(xhr.status == 200) {
			callback({message:"Storage saved", status: xhr.status});
		} else {
			callback({message: "Storage saving failed", status: xhr.status});
		}
	}
}

module.exports.set = set;

init();

return module.exports;