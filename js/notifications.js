var LiveForum = LiveForum || {};
	LiveForum.notifications = LiveForum.notifications || {};
	LiveForum.notifications.xhr = typeof content !== 'undefined' ? content.XMLHttpRequest : XMLHttpRequest;

LiveForum.notifications.start = function() {
	var notifBox = document.createElement('div');
		notifBox.setAttribute('id', 'lfNotifications');
		notifBox.innerHTML = `
			<svg id="lfBell" style="width:24px;height:24px" viewBox="0 0 24 24">
				<path fill="#000000" d="M16,17H7V10.5C7,8 9,6 11.5,6C14,6 16,8 16,10.5M18,16V10.5C18,7.43 15.86,4.86 13,4.18V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V4.18C7.13,4.86 5,7.43 5,10.5V16L3,18V19H20V18M11.5,22A2,2 0 0,0 13.5,20H9.5A2,2 0 0,0 11.5,22Z" />
			</svg>
			<div id="lfNotifCount"></div>
			<div id="lfNotifContent"></div>
		`;
		document.body.appendChild(notifBox);

	var root = LiveForum,
		self = this,
		name = 'Neo',
		xhr = new this.xhr();
		xhr.open('GET', 'index.php?act=Search&CODE=01&keywords=' + name + '&exactname=1&joinname=1&cat_forum=forum&forums=all&searchsubs=1&search_in=posts&result_type=posts&prune=30&prune_type=newer&sort_key=last_post&sort_order=desc', true);
		xhr.send(null);
		xhr.onload = function() {
			if(this.status == 200) {
				var standBy = document.createElement('div');
					standBy.innerHTML = this.response;
					var searchLink = standBy.querySelector('a').href;
					var searchResult = new self.xhr();
						searchResult.open('GET', searchLink, true);
						searchResult.send(null);
						searchResult.onload = function() {
							if(this.status == 200) {
								var div = document.createElement('div');
									div.innerHTML = this.response;
								var contentBox = document.getElementById('lfNotifContent');
								div.querySelectorAll('.tableborder').forEach(function(el) {
									contentBox.appendChild(el);
								});

								root.storage.get('last_checked', function(data) {
									var count = 0;
									contentBox.querySelectorAll('.tablebasic tr td:nth-child(2) strong').forEach(function(el) {
										if(new Date(el.innerText.slice(11)).getTime() > data) {
											count++;
										}
									});
									var notifCount = document.getElementById('lfNotifCount');
										if(count > 0) {
											notifCount.innerText = count;
											notifCount.style.display = 'block';
									}
								});
							}
						}
			}
		}

		function seen(obj) {
			var root = LiveForum;
			root.storage.get(null, function(data) {
				data.last_checked = Date.now();
				root.storage.set(data, function(info) {
					console.log(info);
				})
			});
		}

		function removeNotif() {
			var notifCount = document.getElementById('lfNotifCount');
				notifCount.style.display = 'none';
		}


		root.listener.on('notifOpen', seen);
		root.listener.on('notifClose', removeNotif);

		document.addEventListener('click', function(e) {
			if(!e.target.matches('#lfNotifications *')) {
				var notif = document.getElementById('lfNotifContent')
				if(notif.classList.contains('show'))  {
					notif.classList.remove('show');
					root.listener.emit('notifClose', {});
				}
			}
		});

		document.getElementById('lfBell').addEventListener('click', function() {
			if(document.getElementById('lfNotifContent').classList.toggle('show')) {
				root.listener.emit('notifOpen', {});
			} else {
				root.listener.emit('notifClose', {});
			}
		});
}

LiveForum.notifications.start();