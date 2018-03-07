var LiveForum = LiveForum || {};

LiveForum.textarea = 'textarea[name="Post"]';

LiveForum.parent = document.querySelector(LiveForum.textarea).parentNode;

LiveForum.sibling = LiveForum.parent.previousElementSibling;

LiveForum.geoObj = `
<div id="lfGeoContainer">
	<input id="lfGeo" type="checkbox" name="geo" checked>
	<label for="lfGeo"></label>
</div>
`;

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
			YouTube
		</div>
		<div id="lfFbTab">
			Fb
		</div>
		<div id="lfVimeoTab">
			Vimeo
		</div>
		<div id="lfMyVideoTab">
			MyVideo
		</div>
		<div id="lfCoubTab">
			Coub
		</div>
	</div>
</div>
`;

LiveForum.videoEvents = function() {
	var self = this;

	document.getElementById('lfVideo').addEventListener('click', function(e) {
		e.preventDefault();
		self.toggle(self, this);
	});
	document.querySelectorAll('#lfVideos li').forEach(function(el) {
		el.addEventListener('click', function() {
			if(self.lastTitle) {
				document.getElementById(self.lastTitle).classList.remove("underline");
				this.classList.add("underline");
				self.lastTitle = this.id;
			} else {
				this.classList.add('underline');
				self.lastTitle = this.id;
			}

			if(self.lastTab) {
				document.getElementById('lf' + self.lastTab).style.zIndex = 0;
				document.getElementById('lf' + this.dataset.show).style.zIndex = 1;
				self.lastTab = this.dataset.show;
			} else {
				document.getElementById('lf' + this.dataset.show).style.zIndex = 1;
				self.lastTab = this.dataset.show;
			}
		});
	});
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
				<input type="text">
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
		this.parentNode.parentNode.removeChild(this.parentNode);
	}

	function addField(value) {
		var newField = document.createElement('li'),
			fieldInput = document.createElement('input'),
			removeButton = document.createElement('button'),
			addButton = document.createElement('button');

			fieldInput.setAttribute('type', 'text');
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

	document.querySelector('#lfListItems input').addEventListener('keyup', function(e) {
		if(e.ctrlKey) self.ctrlKeyPressed = false;
	});	

	document.querySelector('#lfListItems input').addEventListener('keydown', function(e) {
		if(e.ctrlKey) self.ctrlKeyPressed = true;
		if(self.ctrlKeyPressed && e.keyCode == 13) {
			e.preventDefault();
			addField.call(this);
			self.ctrlKeyPressed = false;
		} else if(!self.ctrlKeyPressed && e.keyCode == 13) {
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

LiveForum.other = `
<div class="lf-dropdown">
	<button id="lfOthers" class="lf-dropbtn">
	<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		<path fill="#000000" d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
	</svg>
	</button>
	<div class="lf-dropdown-content">
	</div>
</div>
`;

LiveForum.otherEvents = function() {
	var self = this;

	document.getElementById('lfOthers').addEventListener('click', function(e) {
		e.preventDefault();
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
				</div>
					${this.other}
			</div>
			<textarea name="Post" onkeypress="changeVal()"></textarea>
			<div id="lfCustomToolbox">+</div>
		</div>
	`;

	this.sibling.innerHTML = `<div id="quickOptions"></div>`;

	this.events();
}

LiveForum.closeDropdown = function() {
	document.querySelectorAll('.lf-dropdown-content').forEach(el => {
		if(el.classList.contains('show')) {
			el.classList.remove('show');
		}
	});
}

LiveForum.toggle = function(self, el) {
	if(self.lastId !== null && self.lastId !== el.id) {
		self.closeDropdown();
	}
	el.nextElementSibling.classList.toggle('show');
	self.lastId = el.id;
}

LiveForum.lastId = null;

LiveForum.lastTab = null;

LiveForum.lastTitle = 'lfYouTube';

LiveForum.ctrlKeyPressed = false;

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

	document.addEventListener('click', function(e) {
		if(!e.target.matches('.lf-dropdown *')) {
			self.closeDropdown();
		}
	});

	this.biusEvents();
	this.urlEvents();
	this.imgEvents();
	this.videoEvents();
	this.quoteEvents();
	this.listEvents();
	this.fontEvents();
	this.sizeEvents();
	this.colorEvents();
	this.otherEvents();

	document.querySelector(this.textarea).addEventListener('keyup', function(e) {
		if(e.ctrlKey) self.ctrlKeyPressed = false;
	});
	document.querySelector(this.textarea).addEventListener('keydown', function(e) {
		if(e.ctrlKey) self.ctrlKeyPressed = true;
		if(self.ctrlKeyPressed) {
			switch(e.keyCode) {
				case 76:
					e.preventDefault();
					var checkbox = document.getElementById('lfGeo');
					checkbox.checked ? checkbox.checked = false : checkbox.checked = true;
					break;
				case 66:
					e.preventDefault();
					self.wrapper('b');
					self.ctrlKeyPressed = false;
					break;
				case 73:
					e.preventDefault();
					self.wrapper('i');
					self.ctrlKeyPressed = false;
					break;
				case 85:
					e.preventDefault();
					self.wrapper('u');
					self.ctrlKeyPressed = false;
					break;
				case 83:
					e.preventDefault();
					self.wrapper('s');
					self.ctrlKeyPressed = false;
					break;
				case 72: // URL
					e.preventDefault();
					document.getElementById('lfUrlText').value = self.dissect(document.querySelector(self.textarea)).two;
					self.toggle(self, document.getElementById('lfUrl'));
					document.getElementById('lfUrlLink').focus();
					self.ctrlKeyPressed = false;
					break;
				case 71: // IMG
					e.preventDefault();
					self.toggle(self, document.getElementById('lfImg'));
					document.getElementById('lfImgInput').focus();
					self.ctrlKeyPressed = false;
					break;
			}
		}
	});

	document.querySelector(self.textarea).focus();
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