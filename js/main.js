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

LiveForum.textarea = 'textarea[name="Post"]';

LiveForum.parent = document.querySelector(LiveForum.textarea).parentNode;

LiveForum.sibling = LiveForum.parent.previousElementSibling;

LiveForum.geoObj = `
<div id="lfGeoContainer">
	<input id="lfGeo" type="checkbox" name="geo" checked>
	<label for="lfGeo"></label>
</div>
`;

LiveForum.geoObjEvents = function() {
	var self = this;
	document.getElementById('lfGeoContainer').addEventListener('click', function() {
		document.querySelector(self.textarea).focus();
	});
}

LiveForum.bius = `
<button data-bbcode="b" data-tooltip="Bold (Ctrl+B)" id="lfBold">B</button>
<button data-bbcode="i" data-tooltip="Italic (Ctrl+I)" id="lfItalic">I</button>
<button data-bbcode="u" data-tooltip="Underline (Ctrl+U)" id="lfUnderline">U</button>
<button data-bbcode="s" data-tooltip="Strike (Ctrl+S)" id="lfStrikethrough">S</button>
`;

LiveForum.biusEvents = function() {
	var self = this;
	document.getElementById('lfBold').addEventListener('click', function(e) {
		e.preventDefault();
		self.wrapper(this.dataset.bbcode);
	});

	document.getElementById('lfItalic').addEventListener('click', function(e) {
		e.preventDefault();
		self.wrapper(this.dataset.bbcode);
	});
	document.getElementById('lfUnderline').addEventListener('click', function(e) {
		e.preventDefault();
		self.wrapper(this.dataset.bbcode);
	});
	document.getElementById('lfStrikethrough').addEventListener('click', function(e) {
		e.preventDefault();
		self.wrapper(this.dataset.bbcode);
	});
}

LiveForum.url = `
<div class="lf-dropdown">
	<button id="lfUrl" class="lf-dropbtn">
		<svg style="width:24px;height:24px;" viewBox="0 0 24 24">
			<path fill="#000000" d="M16,6H13V7.9H16C18.26,7.9 20.1,9.73 20.1,12A4.1,4.1 0 0,1 16,16.1H13V18H16A6,6 0 0,0 22,12C22,8.68 19.31,6 16,6M3.9,12C3.9,9.73 5.74,7.9 8,7.9H11V6H8A6,6 0 0,0 2,12A6,6 0 0,0 8,18H11V16.1H8C5.74,16.1 3.9,14.26 3.9,12M8,13H16V11H8V13Z" />
		</svg>
	</button>
	<div class="lf-dropdown-content">
		<input id="lfUrlText" type="text" placeholder="Enter Text...">
		<input id="lfUrlLink" type="text" placeholder="Enter URL...">
		<button data-bbcode="url" id="lfUrlSubmit">Insert</button>
	</div>
</div>
`;

LiveForum.urlEvents = function() {
	var self = this;

	document.getElementById('lfUrl').addEventListener('click', function(e) {
		e.preventDefault();
		document.getElementById('lfUrlText').value = self.dissect(document.querySelector(self.textarea)).two;
			self.toggle(self, this);
			document.getElementById('lfUrlLink').focus();
	});	
	document.getElementById('lfUrlLink').addEventListener('keypress', function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			var link = document.getElementById('lfUrlLink');
			self.wrapper('url', link.value, document.getElementById('lfUrlText').value);
			self.closeDropdown();
			link.value = '';
		}
	});
	document.getElementById('lfUrlText').addEventListener('keypress', function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			var link = document.getElementById('lfUrlLink');
			self.wrapper('url', link.value, document.getElementById('lfUrlText').value);
			self.closeDropdown();
			link.value = '';
		}
	});
	document.getElementById('lfUrlSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		var link = document.getElementById('lfUrlLink');
		self.wrapper(this.dataset.bbcode, link.value, document.getElementById('lfUrlText').value);
		self.closeDropdown();
		link.value = '';
	});
}

LiveForum.img = `
<div class="lf-dropdown">
	<button id="lfImg" class="lf-dropbtn">
		<svg style="width:24px;height:24px" viewBox="0 0 24 24">
			<path fill="#000000" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
		</svg>
	</button>
	<div class="lf-dropdown-content">
		<input id="lfImgInput" type="text" placeholder="Image URL...">
		<button id="lfImgUpload" accesskey="g" onclick="fgModalRun()">Upload</button>
		<button data-bbcode="img" id="lfImgSubmit">Insert</button>
	</div>
</div>
`;

LiveForum.imgEvents = function() {
	var self = this;

	document.getElementById('lfImg').addEventListener('click', function(e) {
		e.preventDefault();
		self.toggle(self, this);
		document.getElementById('lfImgInput').focus();
	});
	document.getElementById('lfImgUpload').addEventListener('click', function(e) {
		e.preventDefault();
	});
	document.getElementById('lfImgSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		var input = document.getElementById('lfImgInput');
		self.wrapper(this.dataset.bbcode, false, input.value);
		self.closeDropdown();
		input.value = '';
	});
	document.getElementById('lfImgInput').addEventListener('keypress', this.submitInputOnEnter.bind(this, null, 'img'));
}

LiveForum.video = `
<div class="lf-dropdown">
	<button id="lfVideo" class="lf-dropbtn">
		<svg style="width:24px;height:24px" viewBox="0 0 24 24">
			<path fill="#000000" d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z" />
		</svg>
	</button>
	<div class="lf-dropdown-content">
		<ul id="lfVideos">
			<li id="lfYouTube" data-show="YouTubeTab" class="underline">Youtube</li>
			<li id="lfFb" data-show="FbTab">Fb</li>
			<li id="lfVimeo" data-show="VimeoTab">Vimeo</li>
			<li id="lfMyVideo" data-show="MyVideoTab">MyVideo</li>
			<li id="lfCoub" data-show="CoubTab">Coub</li>
		</ul>
		<div id="lfYouTubeTab" style="z-index:1">
			<input id="lfYouTubeInput" type="text" placeholder="YouTube video id...">
			<button data-bbcode="youtube" id="lfYouTubeSubmit">Insert</button>
		</div>
		<div id="lfFbTab">
			<input id="lfFbInput" type="text" placeholder="FB video id...">
			<button data-bbcode="fb" id="lfFbSubmit">Insert</button>
		</div>
		<div id="lfVimeoTab">
			<input id="lfVimeoInput" type="text" placeholder="Vimeo id...">
			<button data-bbcode="vimeo" id="lfVimeoSubmit">Insert</button>
		</div>
		<div id="lfMyVideoTab">
			<input id="lfMyVideoInput" type="text" placeholder="MyVideo id...">
			<button data-bbcode="myvideo" id="lfMyVideoSubmit">Insert</button>
		</div>
		<div id="lfCoubTab">
			<input id="lfCoubInput" type="text" placeholder="Coub video id...">
			<button data-bbcode="coub" id="lfCoubSubmit">Insert</button>
		</div>
	</div>
</div>
`;

LiveForum.videoEvents = function() {
	var self = this;

	document.getElementById('lfVideo').addEventListener('click', function(e) {
		e.preventDefault();
		self.toggle(self, this);
		document.getElementById(self.lastVideoTitle + 'Input').focus();
	});
	document.querySelectorAll('#lfVideos li').forEach(function(el) {
		el.addEventListener('click', function() {
			if(self.lastVideoTitle) {
				document.getElementById(self.lastVideoTitle).classList.remove("underline");
				this.classList.add("underline");
				self.lastVideoTitle = this.id;
			} else {
				this.classList.add('underline');
				self.lastVideoTitle = this.id;
			}

			if(self.lastVideoTab) {
				document.getElementById('lf' + self.lastVideoTab).style.zIndex = 0;
				document.getElementById('lf' + this.dataset.show).style.zIndex = 1;
				self.lastVideoTab = this.dataset.show;
			} else {
				document.getElementById('lf' + this.dataset.show).style.zIndex = 1;
				self.lastVideoTab = this.dataset.show;
			}
			document.getElementById(this.id + 'Input').focus();
		});
	});

	document.getElementById('lfYouTubeSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		var input = document.getElementById('lfYouTubeInput');
		self.wrapper(this.dataset.bbcode, false, input.value);
		self.closeDropdown();
		input.value = '';
	});
	document.getElementById('lfFbInput').addEventListener('keypress', this.submitInputOnEnter.bind(this, null, 'youtube'));

	document.getElementById('lfFbSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		var input = document.getElementById('lfFbInput');
		self.wrapper(this.dataset.bbcode, false, input.value);
		self.closeDropdown();
		input.value = '';
	});
	document.getElementById('lfYouTubeInput').addEventListener('keypress', this.submitInputOnEnter.bind(this, null, 'fb'));

	document.getElementById('lfVimeoSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		var input = document.getElementById('lfVimeoInput');
		self.wrapper(this.dataset.bbcode, false, input.value);
		self.closeDropdown();
		input.value = '';
	});
	document.getElementById('lfMyVideoInput').addEventListener('keypress', this.submitInputOnEnter.bind(this, null, 'vimeo'));

	document.getElementById('lfMyVideoSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		var input = document.getElementById('lfMyVideoInput');
		self.wrapper(this.dataset.bbcode, false, input.value);
		self.closeDropdown();
		input.value = '';
	});
	document.getElementById('lfCoubInput').addEventListener('keypress', this.submitInputOnEnter.bind(this, null, 'myvideo'));

	document.getElementById('lfCoubSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		var input = document.getElementById('lfCoubInput');
		self.wrapper(this.dataset.bbcode, false, input.value);
		self.closeDropdown();
		input.value = '';
	});
	document.getElementById('lfVimeoInput').addEventListener('keypress', this.submitInputOnEnter.bind(this, null, 'coub'));
}

LiveForum.font = `
<div class="lf-dropdown">
	<button id="lfFont" class="lf-dropbtn">
	<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		<path fill="#000000" d="M9.62,12L12,5.67L14.37,12M11,3L5.5,17H7.75L8.87,14H15.12L16.25,17H18.5L13,3H11Z" />
	</svg>
	</button>
	<div class="lf-dropdown-content">
		<ul id="lfFonts">
			<li data-bbcode="font" data-font="Arial" style="font-family:Arial">Arial</li>
			<li data-bbcode="font" data-font="Times" style="font-family:Times">Times</li>
			<li data-bbcode="font" data-font="Courier" style="font-family:Courier">Courier</li>
			<li data-bbcode="font" data-font="Impact" style="font-family:Impact">Impact</li>
			<li data-bbcode="font" data-font="Geneva" style="font-family:Geneva">Geneva</li>
			<li data-bbcode="font" data-font="Optima" style="font-family:Optima">Optima</li>
		</ul>
		<div class="lf-own-name">
			<input id="lfFontInput" type="text" placeholder="Or Enter Font Name">
			<button data-bbcode="font" id="lfFontSubmit">Insert</button>
		</div>
	</div>
</div>
`;

LiveForum.fontEvents = function() {
	var self = this;

	document.getElementById('lfFont').addEventListener('click', function(e) {
		e.preventDefault();
		self.toggle(self, this);
		document.getElementById('lfFontInput').focus();
	});
	document.querySelectorAll('#lfFonts li').forEach(function(el) {
		el.addEventListener('click', function() {
			self.wrapper(el.dataset.bbcode, el.dataset.font);
			self.closeDropdown();
		})
	});
	document.getElementById('lfFontSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		var input = document.getElementById('lfFontInput');
		self.wrapper(this.dataset.bbcode, input.value);
		self.closeDropdown();
		input.value = '';
	});
	document.getElementById('lfFontInput').addEventListener('keypress', function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			var input = document.getElementById('lfFontInput');
			self.wrapper('font', input.value);
			self.closeDropdown();
			input.value = '';
		}
	});
}

LiveForum.size = `
<div class="lf-dropdown">
	<button id="lfSize" class="lf-dropbtn">
		<svg style="width:24px;height:24px" viewBox="0 0 24 24">
			<path fill="#000000" d="M3,12H6V19H9V12H12V9H3M9,4V7H14V19H17V7H22V4H9Z" />
		</svg>
	</button>
	<div class="lf-dropdown-content">
		<ul id="lfSizes">
			<li data-bbcode="size" data-size="1">1S</li>
			<li data-bbcode="size" data-size="2">2</li>
			<li data-bbcode="size" data-size="3">3</li>
			<li data-bbcode="size" data-size="4">4M</li>
			<li data-bbcode="size" data-size="5">5</li>
			<li data-bbcode="size" data-size="6">6</li>
			<li data-bbcode="size" data-size="7">7L</li>
			<li data-bbcode="size" data-size="8">8</li>
			<li data-bbcode="size" data-size="9">9</li>
			<li data-bbcode="size" data-size="10">10</li>
			<li data-bbcode="size" data-size="11">11</li>
			<li data-bbcode="size" data-size="12">12</li>
			<li data-bbcode="size" data-size="13">13</li>
			<li data-bbcode="size" data-size="14">14XXL</li>
		</ul>
		<div class="lf-own-name">
			<input id="lfSizeInput" type="text" placeholder="Or Enter Size">
			<button data-bbcode="size" id="lfSizeSubmit">Insert</button>
		</div>
	</div>
</div>
`;

LiveForum.sizeEvents = function() {
	var self = this;

	document.getElementById('lfSize').addEventListener('click', function(e) {
		e.preventDefault();
		self.toggle(self, this);
		document.getElementById('lfSizeInput').focus();
	});
	document.querySelectorAll('#lfSizes li').forEach(function(el) {
		el.addEventListener('click', function() {
			self.wrapper(el.dataset.bbcode, el.dataset.size);
			self.closeDropdown();
		})
	});
	document.getElementById('lfSizeSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		var input = document.getElementById('lfSizeInput');
		self.wrapper(this.dataset.bbcode, input.value);
		self.closeDropdown();
		input.value = '';
	});
	document.getElementById('lfSizeInput').addEventListener('keypress', function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			var input = document.getElementById('lfSizeInput');
			self.wrapper('size', input.value);
			self.closeDropdown();
			input.value = '';
		}
	});
}

LiveForum.color = `
<div class="lf-dropdown">
	<button id="lfColor" class="lf-dropbtn">
		<svg style="width:24px;height:24px" viewBox="0 0 24 24">
			<path fill="#000000" d="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z" />
		</svg>
	</button>
	<div class="lf-dropdown-content">
		<div id="lfColors" class="lf-color-palette">
			<span data-bbcode="color" data-color="blue" style="background:blue"></span>
			<span data-bbcode="color" data-color="red" style="background:red"></span>
			<span data-bbcode="color" data-color="purple" style="background:purple"></span>
			<span data-bbcode="color" data-color="orange" style="background:orange"></span>
			<span data-bbcode="color" data-color="yellow" style="background:yellow"></span>
			<span data-bbcode="color" data-color="gray" style="background:gray"></span>
			<span data-bbcode="color" data-color="green" style="background:green"></span>
		</div>
		<div class="lf-own-name">
			<input id="lfColorInput" type="text" placeholder="Or Enter Color Name">
			<button data-bbcode="color" id="lfColorSubmit">Insert</button>
		</div>
	</div>
</div>
`;

LiveForum.colorEvents = function() {
	var self = this;

	document.getElementById('lfColor').addEventListener('click', function(e) {
		e.preventDefault();
		self.toggle(self, this);
		document.getElementById('lfColorInput').focus();
	});
	document.querySelectorAll('#lfColors span').forEach(function(el) {
		el.addEventListener('click', function() {
			self.wrapper(el.dataset.bbcode, el.dataset.color);
			self.closeDropdown();
		})
	});
	document.getElementById('lfColorSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		var input = document.getElementById('lfColorInput');
		self.wrapper(this.dataset.bbcode, input.value);
		self.closeDropdown();
		input.value = '';
	});
	document.getElementById('lfColorInput').addEventListener('keypress', function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			var input = document.getElementById('lfColorInput');
			self.wrapper('color', input.value);
			self.closeDropdown();
			input.value = '';
		}
	});
}

LiveForum.quote = `
<button data-bbcode="quote" data-tooltip="Quote (Ctrl+Q)" id="lfQuote">
	<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		<path fill="#000000" d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
	</svg>
</button>
`;

LiveForum.quoteEvents = function() {
	var self = this;

	document.getElementById('lfQuote').addEventListener('click', function(e) {
		e.preventDefault();
		self.wrapper(this.dataset.bbcode);
	});
}

LiveForum.list = `
<div class="lf-dropdown">
	<button id="lfList" class="lf-dropbtn">
	<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		<path fill="#000000" d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z" />
	</svg>
	</button>
	<div class="lf-dropdown-content">
		<ul id="lfListItems">
			<li>
				<input type="text" placeholder="List item...">
				<button>+</button>
			</li>
		</ul>
		<button id="lfListSubmit">Insert</button>
	</div>
</div>
`;

LiveForum.listEvents = function() {
	var self = this;

	function removeAllFields() {
		var parent = document.getElementById('lfListItems');
		fields = parent.children;
		for(var i = 1; i < fields.length; i++) {
			parent.removeChild(fields[i]);
		}
	}

	function removeField() {
		this.parentNode.nextElementSibling.children[1].focus();
		this.parentNode.parentNode.removeChild(this.parentNode);
	}

	function addField(value) {
		var self = LiveForum;
		var newField = document.createElement('li'),
			fieldInput = document.createElement('input'),
			removeButton = document.createElement('button'),
			addButton = document.createElement('button');

			fieldInput.setAttribute('type', 'text');
			fieldInput.setAttribute('placeholder', 'List item...');
			if(value) fieldInput.value = value;
			removeButton.innerText = '-';
			addButton.innerText = '+';

			addButton.addEventListener('click', function(e) {
				e.preventDefault();
				addField.call(this);
			});

			removeButton.addEventListener('click', function(e) {
				e.preventDefault();
				removeField.call(this);
				e.stopPropagation();
			});

			fieldInput.addEventListener('keypress', function(e) {
				if(e.keyCode == 13) {
					e.preventDefault();
					var listItems = [];
					document.querySelectorAll('#lfListItems li input[type="text"]').forEach(function(el) {
						listItems.push('[*]' + el.value);
					});
					self.wrapper('list', false, '\n' + listItems.join('\n') + '\n');
					self.closeDropdown();
					removeAllFields();
					cleanInput();
				}
			});

			self.CtrlKeyCombo(fieldInput, {
				CtrlEnter: function() {
					addField.call(fieldInput);
				}
			});

			newField.appendChild(removeButton);
			newField.appendChild(fieldInput);
			newField.appendChild(addButton);

		this.parentNode.parentNode.insertBefore(newField, this.parentNode.nextSibling);
		fieldInput.focus();
	}

	function cleanInput() {
		document.querySelector('#lfListItems li:first-child input').value = '';
	}

	document.querySelector('#lfListItems button').addEventListener('click', function(e) {
		e.preventDefault();
		addField.call(this);
	});

	this.CtrlKeyCombo(document.querySelector('#lfListItems input'), {
		CtrlEnter: function() {
			addField.call(this);
		}
	});

	document.querySelector('#lfListItems input').addEventListener('keypress', function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			var listItems = [];
			document.querySelectorAll('#lfListItems li input[type="text"]').forEach(function(el) {
				listItems.push('[*]' + el.value);
			});
			self.wrapper('list', false, '\n' + listItems.join('\n') + '\n');
			self.closeDropdown();
			removeAllFields();
			cleanInput();
		}
	});

	document.getElementById('lfList').addEventListener('click', function(e) {
		e.preventDefault();
		removeAllFields();
		var listItems = self.dissect(document.querySelector(self.textarea)).two.split('\n');
		self.toggle(self, this);

		if(listItems.length == 1) {
			document.querySelector('#lfListItems li:first-child input').value = listItems[0];
		} else {
			document.querySelector('#lfListItems li:first-child input').value = listItems[0];
			for(var i = 1; i < listItems.length; i++) {
				addField.call(document.querySelector('#lfListItems li:last-child input'), listItems[i]);
			}
		}

		document.querySelector('#lfListItems li:last-child input').focus();
	});

	document.getElementById('lfListSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		var listItems = [];
		document.querySelectorAll('#lfListItems li input[type="text"]').forEach(function(el) {
			listItems.push('[*]' + el.value);
		});
		self.wrapper('list', false, '\n' + listItems.join('\n') + '\n');
		self.closeDropdown();
		removeAllFields();
		cleanInput();
	});
}

LiveForum.code = `
<button data-bbcode="code" data-tooltip="Code" id="lfCode">
	<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		<path fill="#000000" d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z" />
	</svg>
</button>
`;

LiveForum.codeEvents = function() {
	var self = this;
	document.getElementById('lfCode').addEventListener('click', function(e) {
		e.preventDefault();
		self.wrapper(this.dataset.bbcode);
	});
}

LiveForum.other = `
<div class="lf-dropdown">
	<button id="lfOthers" class="lf-dropbtn">
	<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		<path fill="#000000" d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
	</svg>
	</button>
	<div class="lf-dropdown-content">
		<ul id="lfOthersList">
			<li data-bbcode="spoiler">Spoiler</li>
			<li data-bbcode="offtopic">Off Topic</li>
			<li data-bbcode="w">Warn</li>
		</ul>
	</div>
</div>
`;

LiveForum.otherEvents = function() {
	var self = this;

	document.getElementById('lfOthers').addEventListener('click', function(e) {
		e.preventDefault();
		self.toggle(self, this);
	});

	document.querySelectorAll('#lfOthersList li').forEach(function(el) {
		el.addEventListener('click', function() {
			self.wrapper(this.dataset.bbcode);
			self.closeDropdown();
		});
	});
}

LiveForum.start = function() {
	this.parent.innerHTML = `
		<div id="lfEditor" class="lf-box">
			<div id="lfStandardToolbox" class="lf-standard-toolbox">
				${this.geoObj}
				<div class="lf-family1">
					${this.bius}
				</div>
				<div class="lf-family2">
					${this.url}
					${this.img}
					${this.video}
					${this.quote}
					${this.list}
				</div>
				<div class="lf-family3">
					${this.font}
					${this.size}
					${this.color}
					${this.code}
				</div>
					${this.other}
			</div>
			<textarea name="Post" onkeypress="changeVal()"></textarea>
			<div id="lfCustomToolbox">
				<div id="lfCBtnInterface">
					<span id="lfCBtnInterfaceClose">X</span>
					<ul id="lfCBtns">
						<li id="lfCBtnSimple"  data-show="CBtnSimpleTab">Simple</li>
						<li id="lfCBtnDropdown"  data-show="CBtnDropdownTab">Dropdown</li>
						<li id="lfCBtnDropdown2"  data-show="CBtnDropdown2Tab">Dropdown2</li>
					</ul>
					<div id="lfCBtnSimpleTab">Simple</div>
					<div id="lfCBtnDropdownTab">Dropdown</div>
					<div id="lfCBtnDropdown2Tab">Dropdown2</div>
				</div>
				<button data-tooltip="Add Button" id="addCustomButton">+</button>
				<div class="lf-custom-family"></div>
			</div>
		</div>
	`;

	this.sibling.innerHTML = `<div id="quickOptions"></div>`;

	this.events();
}

LiveForum.addCustomButtonEvents = function() {
	var self = this;
	document.getElementById('addCustomButton').addEventListener('click', function(e){
		e.preventDefault();
		document.getElementById('lfCBtnInterface').style.display = "block";
		document.querySelector(self.textarea).disabled = true;
	});

	document.getElementById('lfCBtnInterfaceClose').addEventListener('click', function(e) {
		e.preventDefault();
		document.getElementById('lfCBtnInterface').style.display = "none";
		document.querySelector(self.textarea).disabled = false;
	});

	document.querySelectorAll('#lfCBtns li').forEach(function(el) {
		el.addEventListener('click', function() {
			if(self.lastCustomBtnTitle) {
				console.log(self.lastCustomBtnTitle);
				document.getElementById(self.lastCustomBtnTitle).classList.remove("underline");
				this.classList.add("underline");
				self.lastCustomBtnTitle = this.id;
			} else {
				this.classList.add('underline');
				self.lastCustomBtnTitle = this.id;
			}

			if(self.lastCustomBtnTab) {
				document.getElementById('lf' + self.lastCustomBtnTab).style.zIndex = 0;
				document.getElementById('lf' + this.dataset.show).style.zIndex = 1;
				self.lastCustomBtnTab = this.dataset.show;
			} else {
				document.getElementById('lf' + this.dataset.show).style.zIndex = 1;
				self.lastCustomBtnTab = this.dataset.show;
			}
		});
	});
}

LiveForum.factory = function(el) {
	var self = this;
	if(el.dropdown) {
		var dropdown = document.createElement('div');
			dropdown.setAttribute('class', 'lf-dropdown');

		var dropdownContent = document.createElement('div');
			dropdownContent.setAttribute('class', 'lf-dropdown-content');

		var button = document.createElement('button');
			button.innerText = el.button_name;
			button.addEventListener('click', function(e) {
				e.preventDefault();
				self.toggle(self, button);
			});

		var insert = document.createElement('button');
			insert.innerText = 'Insert';

			if(el.dropdown.inputs.length == 1) {
				var input = document.createElement('input');
					input.setAttribute('type', 'text');
					input.setAttribute('placeholder', el.dropdown.inputs[0].placeholder);

					dropdownContent.appendChild(input);

					insert.addEventListener('click', function(e) {
						e.preventDefault();
						self.wrapper(el.bbcode, false, input.value);
					});
			} else if(el.dropdown.inputs.length == 2) {
				var input1 = document.createElement('input');
					input1.setAttribute('type', 'text');
					input1.setAttribute('placeholder', el.dropdown.inputs[0].placeholder);

				var input2 = document.createElement('input');
					input2.setAttribute('type', 'text');
					input2.setAttribute('placeholder', el.dropdown.inputs[1].placeholder);

					dropdownContent.appendChild(input1);
					dropdownContent.appendChild(input2);

					insert.addEventListener('click', function(e) {
						e.preventDefault();
						self.wrapper(el.bbcode, input2.value, input1.value);
					});
			}

			dropdown.appendChild(button);
			dropdown.appendChild(dropdownContent);
			dropdownContent.appendChild(insert);
			document.querySelector('#lfCustomToolbox .lf-custom-family').appendChild(dropdown);

	} else {
		var button = document.createElement('button');
			button.innerText = el.button_name;
			button.addEventListener('click', function(e) {
				e.preventDefault();
				self.wrapper(el.bbcode);
			});
			document.querySelector('#lfCustomToolbox .lf-custom-family').appendChild(button);
	}
}

LiveForum.storage.get("custom_buttons", function(data) {
	var root = LiveForum;
	data.forEach(function(el) {
		root.factory(el);
	});
});

LiveForum.closeDropdown = function() {
	var self = this;
	document.querySelectorAll('.lf-dropdown-content').forEach(function(el) {
		if(el.classList.contains('show')) {
			el.classList.remove('show');
			self.listener.emit('dropDownClose', el.previousElementSibling.id);
		}
	});
}

LiveForum.toggle = function(self, el) {
	if(self.lastEl !== null && self.lastEl != el) {
		self.closeDropdown();
	}
	if(el.nextElementSibling.classList.toggle('show')) {
		this.listener.emit('dropDownOpen', el.id);
	} else {
		this.listener.emit('dropDownClose', el.id);
	}
	self.lastEl = el;
}

LiveForum.lastEl = null;

LiveForum.lastCustomBtnTab = null;

LiveForum.lastCustomBtnTitle = 'lfCBtnSimple';

LiveForum.lastVideoTab = null;

LiveForum.lastVideoTitle = 'lfYouTube';

LiveForum.ctrlKeyPressed = false;

LiveForum.CtrlKeyCombo = function(el, keyObj) {
	var self = this;
	el.addEventListener('keyup', function(e) {
		if(e.ctrlKey) {
			self.ctrlKeyPressed = false;
		}
	});
	el.addEventListener('keydown', function(e) {
		if(e.ctrlKey) self.ctrlKeyPressed = true;
		for(var key in keyObj) {
			switch(key) {
				case 'CtrlL':
					if(self.ctrlKeyPressed && e.keyCode == 76) {
						e.preventDefault();
						keyObj[key]();
						self.ctrlKeyPressed = false;
					}
					break;
				case 'CtrlB':
					if(self.ctrlKeyPressed && e.keyCode == 66) {
						e.preventDefault();
						keyObj[key]();
						self.ctrlKeyPressed = false;
					}
					break;
				case 'CtrlI':
					if(self.ctrlKeyPressed && e.keyCode == 73) {
						e.preventDefault();
						keyObj[key]();
						self.ctrlKeyPressed = false;
					}
					break;
				case 'CtrlU':
					if(self.ctrlKeyPressed && e.keyCode == 85) {
						e.preventDefault();
						keyObj[key]();
						self.ctrlKeyPressed = false;
					}
					break;
				case 'CtrlS':
					if(self.ctrlKeyPressed && e.keyCode == 83) {
						e.preventDefault();
						keyObj[key]();
						self.ctrlKeyPressed = false;
					}
					break;
				case 'CtrlH':
					if(self.ctrlKeyPressed && e.keyCode == 72) {
						e.preventDefault();
						keyObj[key]();
						self.ctrlKeyPressed = false;
					}
					break;
				case 'CtrlG':
					if(self.ctrlKeyPressed && e.keyCode == 71) {
						e.preventDefault();
						keyObj[key]();
						self.ctrlKeyPressed = false;
					}
					break;
				case 'CtrlEnter':
					if(self.ctrlKeyPressed && e.keyCode == 13) {
						e.preventDefault();
						keyObj[key].call(this);
						self.ctrlKeyPressed = false;
					}
					break;
			}
		}
	});


}

LiveForum.capitalize = function(str) {
	return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

LiveForum.submitInputOnEnter = function(evt, tag) {
	e = evt || window.event;
	if(e.keyCode == 13) {
		e.preventDefault();
		var link = document.getElementById('lf' + this.capitalize(tag) + 'Input');
		this.wrapper(tag, false, link.value);
		this.closeDropdown();
		link.value = '';
	}

}

LiveForum.events = function() {
	var self = this;

	this.listener.on('dropDownClose', function(data) {
		console.log(data, 'Closed');
	});

	this.listener.on('dropDownOpen', function(data) {
		console.log(data, 'Opened');
	});

	document.addEventListener('click', function(e) {
		if(!e.target.matches('.lf-dropdown *')) {
			self.closeDropdown();
		}
	});

	this.geoObjEvents();
	this.biusEvents();
	this.urlEvents();
	this.imgEvents();
	this.videoEvents();
	this.quoteEvents();
	this.listEvents();
	this.fontEvents();
	this.sizeEvents();
	this.colorEvents();
	this.codeEvents();
	this.otherEvents();
	this.addCustomButtonEvents();

	this.CtrlKeyCombo(document.querySelector(this.textarea), {
		CtrlL: function() {
			var checkbox = document.getElementById('lfGeo');
			checkbox.checked ? checkbox.checked = false : checkbox.checked = true;
		},
		CtrlB: function() {
			self.wrapper('b');
		},
		CtrlI: function() {
			self.wrapper('i');
		},
		CtrlU: function() {
			self.wrapper('u');
		},
		CtrlS: function() {
			self.wrapper('s');
		},
		CtrlH: function() {
			document.getElementById('lfUrlText').value = self.dissect(document.querySelector(self.textarea)).two;
			self.toggle(self, document.getElementById('lfUrl'));
			document.getElementById('lfUrlLink').focus();
		},
		CtrlG: function() {
			self.toggle(self, document.getElementById('lfImg'));
			document.getElementById('lfImgInput').focus();
		}
	});

}

LiveForum.dissect = function(textarea) {
	var textarea  = textarea,
		content   = textarea.value,
		selStart  = textarea.selectionStart,
		selEnd    = textarea.selectionEnd,
		one       = content.slice(0, selStart),
		two       = content.slice(selStart, selEnd),
		three     = content.slice(selEnd, content.length);

		return {
			self: textarea,
			content: content,
			selStart: selStart,
			selEnd: selEnd,
			one: one,
			two: two,
			three: three
		}
}

LiveForum.wrapper = function(tag, attr, input) {
	var textarea  = document.querySelector(this.textarea),
		dissected = this.dissect(textarea);

		if(tag && attr && input) { // UrlType
			textarea.value              = dissected.one + "[" + tag + "=" + attr + "]" + input + "[/" + tag + "]" + dissected.three;

			var selStart                = dissected.selStart + 3 + tag.length + attr.length,
				selEnd                  = dissected.selEnd + 3 + tag.length + attr.length,
				selection               = selEnd - selStart;

			if(input.length > selection) {
				textarea.selectionStart = selStart;
				textarea.selectionEnd   = selEnd + input.length - selection;
				textarea.focus();
			} else if(input.length < selection) {
				textarea.selectionStart = selStart;
				textarea.selectionEnd   = selEnd - selection + input.length;
				textarea.focus();
			} else {
				textarea.selectionStart = selStart;
				textarea.selectionEnd   = selEnd
				textarea.focus();
			}
		} else if(tag && attr) { // FontSizeColorType
			textarea.value              = dissected.one + "[" + tag + "=" + attr + "]" + dissected.two + "[/" + tag + "]" + dissected.three;
			textarea.selectionStart     = dissected.selStart + 3 + tag.length + attr.length;
			textarea.selectionEnd       = dissected.selEnd + 3 + tag.length + attr.length;
			textarea.focus();
		} else if(tag && input) { // ImgType
			textarea.value              = dissected.one + "[" + tag + "]" + input + "[/" + tag + "]" + dissected.three;

			var selStart                = dissected.selStart + 2 + tag.length,
				selEnd                  = dissected.selEnd + 2 + tag.length,
				selection               = selEnd - selStart;

			if(input.length > selection) {
				textarea.selectionStart = selStart;
				textarea.selectionEnd   = selEnd + input.length - selection;
				textarea.focus();
			} else if(input.length < selection) {
				textarea.selectionStart = selStart;
				textarea.selectionEnd   = selEnd - selection + input.length;
				textarea.focus();
			} else {
				textarea.selectionStart = selStart;
				textarea.selectionEnd   = selEnd
				textarea.focus();
			}
		} else { // BIUSType
			textarea.value              = dissected.one + "[" + tag + "]" + dissected.two + "[/" + tag + "]" + dissected.three;
			textarea.selectionStart     = dissected.selStart + 2 + tag.length;
			textarea.selectionEnd       = dissected.selEnd + 2 + tag.length;
			textarea.focus();
		}

}

LiveForum.start();