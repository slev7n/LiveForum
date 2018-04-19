var LiveForum = LiveForum || {};

LiveForum.browser = typeof browser !== 'undefined' ? browser : chrome;

LiveForum.textarea = 'textarea[name="Post"]';

LiveForum.parent = document.querySelector(LiveForum.textarea).parentNode;

LiveForum.addReply = document.querySelector('form[name="REPLIER"] input[type="submit"]');
LiveForum.previewReply = document.querySelector('form[name="REPLIER"] input[name="preview"]');

LiveForum.sibling = LiveForum.parent.previousElementSibling;

LiveForum.quotePopupEvents = function() {
	var self = this,
		quotePopup = document.createElement('div');
		quotePopup.setAttribute('id', 'lfQuotePopup');
		quotePopup.innerText = 'Quote';
		document.body.appendChild(quotePopup);
	var css = quotePopup.style;

	document.body.addEventListener('mousedown', function(e) {
		if(e.which == 1) {
			css.opacity = 0;
			css.display = 'none';
		}
	});

	var quoteAuthor = null;

	Array.prototype.slice.call(document.querySelectorAll('.postcolor')).forEach(function(el) {
		el.parentNode.addEventListener('mouseup', function(e) {
			if(window.getSelection().isCollapsed) {
				css.opacity = 0;
				css.dipslay = 'none';
				quoteAuthor = null;
			} else {
				css.top = e.pageY + 'px';
				css.left = e.pageX + 'px';
				css.display = 'inline';
				setTimeout(function() {
					css.opacity = 1;
				}, 0);
				quoteAuthor = el.parentElement.previousElementSibling.querySelector('.normalname a').innerText;
			}
		});
	});

	quotePopup.addEventListener('mousedown', function(e) {
		var rawSelection = window.getSelection().toString();
			this.style.opacity = 0;
			this.style.display = 'none';
			self.wrapper('quote', quoteAuthor, rawSelection, true, true);
			window.getSelection().removeAllRanges();
	});
}

LiveForum.geoObj = `
<div id="lfGeoContainer" data-tooltip="Keyboard (Ctrl+K)">
	<input id="lfGeo" type="checkbox" name="geo" checked>
	<label for="lfGeo" data-tooltip="Keyboard (Ctrl+K)"></label>
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
	<button id="lfUrl" class="lf-dropbtn" data-tooltip="HyperLink (Ctrl+H)">
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
	<button id="lfImg" class="lf-dropbtn" data-tooltip="Image (Ctrl+G)">
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
	});
	document.getElementById('lfImgUpload').addEventListener('click', function(e) {
		e.preventDefault();
	});
	document.getElementById('lfImgSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		var input = document.getElementById('lfImgInput');
		self.wrapper(this.dataset.bbcode, false, input.value, true);
		self.closeDropdown();
	});
	document.getElementById('lfImgInput').addEventListener('keypress', this.submitInputOnEnter.bind(this, null, 'img', true));
}

LiveForum.video = `
<div class="lf-dropdown">
	<button id="lfVideo" class="lf-dropbtn" data-tooltip="Media (Ctrl+M)">
		<svg style="width:24px;height:24px" viewBox="0 0 24 24">
			<path fill="#000000" d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z" />
		</svg>
	</button>
	<div class="lf-dropdown-content">
		<ul id="lfVideos">
			<li id="lfYoutube" data-show="YoutubeTab" class="underline">YouTube</li>
			<li id="lfFbv" data-show="FbvTab">Fb</li>
			<li id="lfVimeo" data-show="VimeoTab">Vimeo</li>
			<li id="lfMyvideo" data-show="MyvideoTab">MyVideo</li>
			<li id="lfCoub" data-show="CoubTab">Coub</li>
		</ul>
		<div id="lfYoutubeTab" style="z-index:1">
			<input id="lfYoutubeInput" type="text" placeholder="YouTube video id...">
			<button data-bbcode="youtube" id="lfYoutubeSubmit">Insert</button>
		</div>
		<div id="lfFbvTab">
			<input id="lfFbvInput" type="text" placeholder="FB video id...">
			<button data-bbcode="fbv" id="lfFbvSubmit">Insert</button>
		</div>
		<div id="lfVimeoTab">
			<input id="lfVimeoInput" type="text" placeholder="Vimeo id...">
			<button data-bbcode="vimeo" id="lfVimeoSubmit">Insert</button>
		</div>
		<div id="lfMyvideoTab">
			<input id="lfMyvideoInput" type="text" placeholder="MyVideo id...">
			<button data-bbcode="myvideo" id="lfMyvideoSubmit">Insert</button>
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
		var last = document.getElementById(self.lastVideoTitle + 'Input');
		if(last) {
			last.focus();
		}
	});
	Array.prototype.slice.call(document.querySelectorAll('#lfVideos li')).forEach(function(el) {
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

	document.getElementById('lfYoutubeSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		var input = document.getElementById('lfYoutubeInput');
		self.wrapper(this.dataset.bbcode, false, input.value, true);
		self.closeDropdown();
	});
	document.getElementById('lfFbvInput').addEventListener('keypress', this.submitInputOnEnter.bind(this, null, 'fbv'));

	document.getElementById('lfFbvSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		var input = document.getElementById('lfFbvInput');
		self.wrapper(this.dataset.bbcode, false, input.value, true);
		self.closeDropdown();
	});
	document.getElementById('lfYoutubeInput').addEventListener('keypress', this.submitInputOnEnter.bind(this, null, 'youtube'));

	document.getElementById('lfVimeoSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		var input = document.getElementById('lfVimeoInput');
		self.wrapper(this.dataset.bbcode, false, input.value, true);
		self.closeDropdown();
	});
	document.getElementById('lfMyvideoInput').addEventListener('keypress', this.submitInputOnEnter.bind(this, null, 'myvideo'));

	document.getElementById('lfMyvideoSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		var input = document.getElementById('lfMyvideoInput');
		self.wrapper(this.dataset.bbcode, false, input.value, true);
		self.closeDropdown();
	});
	document.getElementById('lfCoubInput').addEventListener('keypress', this.submitInputOnEnter.bind(this, null, 'coub'));

	document.getElementById('lfCoubSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		var input = document.getElementById('lfCoubInput');
		self.wrapper(this.dataset.bbcode, false, input.value, true);
		self.closeDropdown();
	});
	document.getElementById('lfVimeoInput').addEventListener('keypress', this.submitInputOnEnter.bind(this, null, 'vimeo'));
}

LiveForum.font = `
<div class="lf-dropdown">
	<button id="lfFont" class="lf-dropbtn" data-tooltip="Font (Ctrl+F)">
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
	});
	Array.prototype.slice.call(document.querySelectorAll('#lfFonts li')).forEach(function(el) {
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
	});
	document.getElementById('lfFontInput').addEventListener('keypress', function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			var input = document.getElementById('lfFontInput');
			self.wrapper('font', input.value);
			self.closeDropdown();
		}
	});
}

LiveForum.size = `
<div class="lf-dropdown">
	<button id="lfSize" class="lf-dropbtn" data-tooltip="Size (Ctrl+T)">
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
	});
	Array.prototype.slice.call(document.querySelectorAll('#lfSizes li')).forEach(function(el) {
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
	});
	document.getElementById('lfSizeInput').addEventListener('keypress', function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			var input = document.getElementById('lfSizeInput');
			self.wrapper('size', input.value);
			self.closeDropdown();
		}
	});
}

LiveForum.color = `
<div class="lf-dropdown">
	<button id="lfColor" class="lf-dropbtn" data-tooltip="Color (Ctrl+R)">
		<svg style="width:24px;height:24px" viewBox="0 0 24 24">
			<path fill="#000000" d="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z" />
		</svg>
	</button>
	<div class="lf-dropdown-content">
		<div id="lfColors" class="lf-color-palette">
			<span data-bbcode="color" data-tooltip="red" data-color="red" style="background:red"></span>
			<span data-bbcode="color" data-tooltip="orangered" data-color="orangered" style="background:orangered"></span>
			<span data-bbcode="color" data-tooltip="orange" data-color="orange" style="background:orange"></span>
			<span data-bbcode="color" data-tooltip="gold" data-color="gold" style="background:gold"></span>
			<span data-bbcode="color" data-tooltip="yellow" data-color="yellow" style="background:yellow"></span>
			<span data-bbcode="color" data-tooltip="goldenrod" data-color="goldenrod" style="background:goldenrod"></span>
			<span data-bbcode="color" data-tooltip="brown" data-color="brown" style="background:brown"></span>
			<span data-bbcode="color" data-tooltip="peru" data-color="peru" style="background:peru"></span>
			<span data-bbcode="color" data-tooltip="burlywood" data-color="burlywood" style="background:burlywood"></span>
			<span data-bbcode="color" data-tooltip="palegoldenrod" data-color="palegoldenrod" style="background:palegoldenrod"></span>
			<span data-bbcode="color" data-tooltip="green" data-color="green" style="background:green"></span>
			<span data-bbcode="color" data-tooltip="yellowgreen" data-color="yellowgreen" style="background:yellowgreen"></span>
			<span data-bbcode="color" data-tooltip="lawngreen" data-color="lawngreen" style="background:lawngreen"></span>
			<span data-bbcode="color" data-tooltip="greenyellow" data-color="greenyellow" style="background:greenyellow"></span>
			<span data-bbcode="color" data-tooltip="palegreen" data-color="palegreen" style="background:palegreen"></span>
			<span data-bbcode="color" data-tooltip="purple" data-color="purple" style="background:purple"></span>
			<span data-bbcode="color" data-tooltip="blue" data-color="blue" style="background:blue"></span>
			<span data-bbcode="color" data-tooltip="royalblue" data-color="royalblue" style="background:royalblue"></span>
			<span data-bbcode="color" data-tooltip="dodgerblue" data-color="dodgerblue" style="background:dodgerblue"></span>
			<span data-bbcode="color" data-tooltip="powderblue" data-color="powderblue" style="background:powderblue"></span>
			<span data-bbcode="color" data-tooltip="gray" data-color="gray" style="background:gray"></span>
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
	Array.prototype.slice.call(document.querySelectorAll('#lfColors span')).forEach(function(el) {
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
	});
	document.getElementById('lfColorInput').addEventListener('keypress', function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			var input = document.getElementById('lfColorInput');
			self.wrapper('color', input.value);
			self.closeDropdown();
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
	<button id="lfList" class="lf-dropbtn" data-tooltip="List (Ctrl+L)">
	<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		<path fill="#000000" d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z" />
	</svg>
	</button>
	<div class="lf-dropdown-content">
		<label id="lfListType">&#8226;<input type="radio" name="type" checked="true" data-type="ul">1<input type="radio" name="type" data-type="ol">a<input type="radio" name="type" data-type="ola">i<input type="radio" name="type" data-type="oli"></label>
		<ul id="lfListItems">
			<li>
				<input type="text" placeholder="List item...">
				<button data-tooltip="Add Field (Ctrl+Enter)">+</button>
			</li>
		</ul>
		<button id="lfListSubmit">Insert</button>
	</div>
</div>
`;

LiveForum.listEvents = function() {
	var self = this;

	function wrapWithStyle(listItems) {
		switch(document.querySelector('#lfListType input:checked').dataset.type) {
			case 'ol':
				self.wrapper('list', 1, '\n' + listItems.join('\n') + '\n');
				break;
			case 'ola':
				self.wrapper('list', 'a', '\n' + listItems.join('\n') + '\n');
				break;
			case 'oli':
				self.wrapper('list', 'i', '\n' + listItems.join('\n') + '\n');
				break;
			case 'ul':
				self.wrapper('list', false, '\n' + listItems.join('\n') + '\n');
				break;

		}
	}

	function removeAllFields() {
		var parent = document.getElementById('lfListItems');
		fields = parent.children;
		for(var i = 1; i < fields.length; i++) {
			parent.removeChild(fields[i]);
		}
	}

	function removeField() {
		this.parentNode.previousElementSibling.querySelector('input[type="text"]').focus();
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
			removeButton.setAttribute('data-tooltip', 'Remove Field');
			addButton.setAttribute('data-tooltip', 'Add Field (Ctrl+Enter');
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
					Array.prototype.slice.call(document.querySelectorAll('#lfListItems li input[type="text"]')).forEach(function(el) {
						listItems.push('[*]' + el.value);
					});
					wrapWithStyle(listItems);
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
			Array.prototype.slice.call(document.querySelectorAll('#lfListItems li input[type="text"]')).forEach(function(el) {
				listItems.push('[*]' + el.value);
			});
			wrapWithStyle(listItems);
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
			document.querySelector('#lfListItems li input').value = listItems[0];
		} else {
			document.querySelector('#lfListItems li input').value = listItems[0];
			for(var i = 1; i < listItems.length; i++) {
				addField.call(document.querySelector('#lfListItems li:last-child input'), listItems[i]);
			}
		}

		document.querySelector('#lfListItems li:last-child input').focus();
	});

	document.getElementById('lfListSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		var listItems = [];
		Array.prototype.slice.call(document.querySelectorAll('#lfListItems li input[type="text"]')).forEach(function(el) {
			listItems.push('[*]' + el.value);
		});
		wrapWithStyle(listItems);
		self.closeDropdown();
		removeAllFields();
		cleanInput();
	});
}

LiveForum.code = `
<button data-bbcode="code" data-tooltip="Code (Ctrl+P)" id="lfCode">
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

LiveForum.emoji = `
<div class="lf-dropdown">
	<button id="lfEmoji" class="lf-dropbtn" data-tooltip="Smilies">
		<svg style="width:24px;height:24px" viewBox="0 0 24 24">
			<path fill="#000000" d="M12,17.5C14.33,17.5 16.3,16.04 17.11,14H6.89C7.69,16.04 9.67,17.5 12,17.5M8.5,11A1.5,1.5 0 0,0 10,9.5A1.5,1.5 0 0,0 8.5,8A1.5,1.5 0 0,0 7,9.5A1.5,1.5 0 0,0 8.5,11M15.5,11A1.5,1.5 0 0,0 17,9.5A1.5,1.5 0 0,0 15.5,8A1.5,1.5 0 0,0 14,9.5A1.5,1.5 0 0,0 15.5,11M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
		</svg>
	</button>
	<div class="lf-dropdown-content">
		<input type="text" id="lfCustomEmojiInput" placeholder="Enter Emoji URL...">
		<button id="lfCustomEmojiSubmit">Add</button>
		<span id="lfCustomEmojiRemove">Remove</span>
		<div id="lfCustomEmojis">
		</div>
		<ul id="lfEmojiList">
			<li data-code=":bis:"><img src="html/emoticons/bis.gif"></li>
			<li data-code=":aba:"><img src="html/emoticons/aba.gif"></li>
			<li data-code=";)"><img src="html/emoticons/wink.gif"></li>
			<li data-code=":p"><img src="html/emoticons/tongue.gif"></li>
			<li data-code=":D"><img src="html/emoticons/biggrin.gif"></li>
			<li data-code=":lol:"><img src="html/emoticons/lol.gif"></li>
			<li data-code=":yes:"><img src="html/emoticons/yes.gif"></li>
			<li data-code=":rolleyes:"><img src="html/emoticons/rolleyes.gif"></li>
			<li data-code=":sleep:"><img src="html/emoticons/sleep.gif"></li>
			<li data-code=":baby:"><img src="html/emoticons/baby.gif"></li>
			<li data-code=":)"><img src="html/emoticons/smile.gif"></li>
			<li data-code=":2kiss:"><img src="html/emoticons/2kiss.gif"></li>
			<li data-code=":mad:"><img src="html/emoticons/mad.gif"></li>
			<li data-code=":("><img src="html/emoticons/sad.gif"></li>
			<li data-code=":no:"><img src="html/emoticons/no.gif"></li>
			<li data-code=":alk:"><img src="html/emoticons/alk.gif"></li>
			<li data-code=":maxati:"><img src="html/emoticons/maxati.gif"></li>
			<li data-code=":offtopic:"><img src="html/emoticons/offtopic.gif"></li>
			<li data-code=":boli:"><img src="html/emoticons/boli.gif"></li>
			<li data-code=":chups:"><img src="html/emoticons/chups.gif"></li>
			<li data-code=":cry:"><img src="html/emoticons/cry.gif"></li>
			<li data-code=":down1:"><img src="html/emoticons/down1.gif"></li>
			<li data-code=":drug:"><img src="html/emoticons/drug.gif"></li>
			<li data-code=":du:"><img src="html/emoticons/du.gif"></li>
			<li data-code=":eek:"><img src="html/emoticons/eek.gif"></li>
			<li data-code=":fig:"><img src="html/emoticons/fig.gif"></li>
			<li data-code=":fingal:"><img src="html/emoticons/fingal.gif"></li>
			<li data-code=":gigi:"><img src="html/emoticons/gigi.gif"></li>
			<li data-code=":help:"><img src="html/emoticons/help.gif"></li>
			<li data-code=":idea:"><img src="html/emoticons/idea.gif"></li>
			<li data-code=":jump:"><img src="html/emoticons/jump.gif"></li>
			<li data-code=":kar:"><img src="html/emoticons/kar.gif"></li>
			<li data-code=":kiss:"><img src="html/emoticons/kiss.gif"></li>
			<li data-code=":lam:"><img src="html/emoticons/lam.gif"></li>
			<li data-code=":love:"><img src="html/emoticons/love.gif"></li>
			<li data-code=":mo:"><img src="html/emoticons/mo.gif"></li>
			<li data-code=":pop:"><img src="html/emoticons/pop.gif"></li>
			<li data-code=":punch:"><img src="html/emoticons/punch.gif"></li>
			<li data-code=":sa:"><img src="html/emoticons/sa.gif"></li>
			<li data-code=":spy:"><img src="html/emoticons/spy.gif"></li>
			<li data-code=":tan:"><img src="html/emoticons/tan.gif"></li>
			<li data-code=":tom:"><img src="html/emoticons/tom.gif"></li>
			<li data-code=":tuk:"><img src="html/emoticons/tuk.gif"></li>
			<li data-code=":up:"><img src="html/emoticons/up.gif"></li>
			<li data-code=":ups:"><img src="html/emoticons/ups.gif"></li>
			<li data-code=":user:"><img src="html/emoticons/user.gif"></li>
			<li data-code=":vik:"><img src="html/emoticons/vik.gif"></li>
			<li data-code=":vis:"><img src="html/emoticons/vis.gif"></li>
			<li data-code=":war:"><img src="html/emoticons/war.gif"></li>
			<li data-code=":weep:"><img src="html/emoticons/weep.gif"></li>
			<li data-code=":wow:"><img src="html/emoticons/wow.gif"></li>
			<li data-code=":yawn:"><img src="html/emoticons/yawn.gif"></li>
			<li data-code=":chest:"><img src="html/emoticons/chest.gif"></li>
			<li data-code=":givi:"><img src="html/emoticons/givi.gif"></li>
			<li data-code=":facepalm:"><img src="html/emoticons/facepalm.gif"></li>
			<li data-code=":old:"><img src="html/emoticons/old.gif"></li>
			<li data-code=":popcorn:"><img src="html/emoticons/popcorn.gif"></li>
			<li data-code=":mus:"><img src="html/emoticons/mus.gif"></li>
		</ul>
	</div>
</div>
`;

LiveForum.emojiEvents = function() {
	var self = this;

	function add_emoji(url) {
		var div = document.createElement('div'),
			span = document.createElement('span'),
			img = document.createElement('img');

			span.setAttribute('class', 'delete-emoji');
			span.innerText = 'x';
			span.addEventListener('click', function() {
				var el = this.parentElement,
					index = Array.prototype.indexOf.call(document.getElementById('lfCustomEmojis'), el);
				self.storage.get(null, function(data) {
					data.custom_emojis.splice(index, 1);
					self.storage.set(data, function(info) {
						if(info.status == 200) {
							remove_emoji(el);
							console.log('Emoji Removed', info.message, info.status);
						}
					});
				});
			});

			img.setAttribute('src', url);
			img.addEventListener('click', function() {
				if(this.src.substr(0,21) == 'https://img.forum.ge/') {
					self.wrapper('img', false, this.src.substr(21).split('.')[0], true);
				} else {
					self.wrapper('img', false, this.src, true);
				}
			});
			div.appendChild(img);
			div.appendChild(span);
			document.getElementById('lfCustomEmojis').appendChild(div);
	}

	function remove_emoji(el) {
		document.getElementById('lfCustomEmojis').removeChild(el);
	}

	this.storage.get('custom_emojis', function(data) {
		data.forEach(function(el) {
			add_emoji(decodeURIComponent(el));
		});
	});

	document.getElementById('lfCustomEmojiSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		var emojiInput = document.getElementById('lfCustomEmojiInput');
		self.storage.get(null, function(data) {
			if(data.custom_emojis.indexOf(encodeURIComponent(emojiInput.value)) < 0) {
				data.custom_emojis.push(encodeURIComponent(emojiInput.value));
				self.storage.set(data, function(info) {
					add_emoji(emojiInput.value);
					emojiInput.value = '';
					console.log(info.message, info.status);
				});
			} else {
				console.log('Emoji already exists');
			}
		});
	});

	document.getElementById('lfCustomEmojiRemove').addEventListener('click', function() {
		Array.prototype.slice.call(document.querySelectorAll('.delete-emoji')).forEach(function(el) {
			el.classList.toggle('show');
		});
	});

	function paste_emo(emo) {
		var textarea = document.querySelector(self.textarea),
			dissected = self.dissect(document.querySelector(self.textarea));
			textarea.value = dissected.one + ' ' + emo + ' ' + dissected.three;
			textarea.selectionStart = dissected.selStart + emo.length + 2;
			textarea.selectionEnd = dissected.selStart + emo.length + 2;
			textarea.focus();
	}

	document.getElementById('lfEmoji').addEventListener('click', function(e) {
		e.preventDefault();
		self.toggle(self, this);
	});

	Array.prototype.slice.call(document.querySelectorAll('#lfEmojiList li')).forEach(function(el) {
		el.addEventListener('click', function() {
			paste_emo(this.dataset.code);
		});
	});
}

LiveForum.blockUsers = `
<div class="lf-dropdown">
	<button id="lfBlockUsers" class="lf-dropbtn" data-tooltip="Block Users">
	<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		<path fill="#000000" d="M23,16.06C23,16.29 23,16.5 22.96,16.7C22.78,14.14 20.64,12.11 18,12.11C17.63,12.11 17.27,12.16 16.92,12.23C16.96,12.5 17,12.73 17,13C17,15.35 15.31,17.32 13.07,17.81C13.42,20.05 15.31,21.79 17.65,21.96C17.43,22 17.22,22 17,22C14.92,22 13.07,20.94 12,19.34C10.93,20.94 9.09,22 7,22C6.78,22 6.57,22 6.35,21.96C8.69,21.79 10.57,20.06 10.93,17.81C8.68,17.32 7,15.35 7,13C7,12.73 7.04,12.5 7.07,12.23C6.73,12.16 6.37,12.11 6,12.11C3.36,12.11 1.22,14.14 1.03,16.7C1,16.5 1,16.29 1,16.06C1,12.85 3.59,10.24 6.81,10.14C6.3,9.27 6,8.25 6,7.17C6,4.94 7.23,3 9.06,2C7.81,2.9 7,4.34 7,6C7,7.35 7.56,8.59 8.47,9.5C9.38,8.59 10.62,8.04 12,8.04C13.37,8.04 14.62,8.59 15.5,9.5C16.43,8.59 17,7.35 17,6C17,4.34 16.18,2.9 14.94,2C16.77,3 18,4.94 18,7.17C18,8.25 17.7,9.27 17.19,10.14C20.42,10.24 23,12.85 23,16.06M9.27,10.11C10.05,10.62 11,10.92 12,10.92C13,10.92 13.95,10.62 14.73,10.11C14,9.45 13.06,9.03 12,9.03C10.94,9.03 10,9.45 9.27,10.11M12,14.47C12.82,14.47 13.5,13.8 13.5,13A1.5,1.5 0 0,0 12,11.5A1.5,1.5 0 0,0 10.5,13C10.5,13.8 11.17,14.47 12,14.47M10.97,16.79C10.87,14.9 9.71,13.29 8.05,12.55C8.03,12.7 8,12.84 8,13C8,14.82 9.27,16.34 10.97,16.79M15.96,12.55C14.29,13.29 13.12,14.9 13,16.79C14.73,16.34 16,14.82 16,13C16,12.84 15.97,12.7 15.96,12.55Z" />
	</svg>
	</button>
	<div class="lf-dropdown-content">
		<div id="lfBlockedUsers"></div>
		<input id="lfMemberSearch" type="text" placeholder="Enter Member Name">
		<ul id="lfMemberSuggestion"></ul>
		<button id="lfBlockUsersSubmit">Block</button>
	</div>
</div>
`;

LiveForum.blockUsersEvents = function() {
	var self = this;

	function render_blocked(user) {
		var el = document.createElement('span');
			el.setAttribute('class', 'lf-blocked-user');
			el.setAttribute('data-tooltip', 'Unblock');
			el.addEventListener('click', function() {
				var position = Array.prototype.indexOf.call(document.getElementById('lfBlockedUsers').children, el);
				self.storage.get(null, function(data) {
					data.blocked_users.splice(position, 1);
					self.storage.set(data, function(info) {
						remove_blocked(el);
					});
				});
			});
			el.innerText = user;
		document.getElementById('lfBlockedUsers').appendChild(el);
	}

	function remove_blocked(user) {
		document.getElementById('lfBlockedUsers').removeChild(user);
	}

	this.storage.get("blocked_users", function(data) {
		data.forEach(function(el) {
			render_blocked(el);
		});
	});

	document.getElementById('lfBlockUsers').addEventListener('click', function(e) {
		e.preventDefault();
		self.toggle(self, this);
	});

	this.memberSuggestionEvents();

	document.getElementById('lfBlockUsersSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		var input = document.getElementById('lfMemberSearch');
		if(input.value.length > 1) {
			self.storage.get(null, function(data) {
				if(data.blocked_users.indexOf(input.value) < 0) {
					data.blocked_users.push(input.value);
					self.storage.set(data, function(info) {
						console.log(info.message, info.status);
						render_blocked(input.value);
					});
				} else {
					console.log('User already blocked');
				}
			});
		}
	});
}

LiveForum.other = `
<div class="lf-dropdown">
	<button id="lfOthers" class="lf-dropbtn" data-tooltip="Other">
	<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		<path fill="#000000" d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
	</svg>
	</button>
	<div class="lf-dropdown-content">
		<ul id="lfOthersList">
			<li data-bbcode="spoiler">Spoiler</li>
			<li data-bbcode="html">HTML</li>
			<li data-bbcode="sql">SQL</li>
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

	Array.prototype.slice.call(document.querySelectorAll('#lfOthersList li')).forEach(function(el) {
		el.addEventListener('click', function() {
			self.wrapper(this.dataset.bbcode);
			self.closeDropdown();
		});
	});
}

LiveForum.userSettings = `
<div class="lf-dropdown">
<button data-tooltip="Settings" id="lfSettings">
	<svg style="width:24px;height:24px" viewBox="0 0 24 24">
		<path fill="#000000" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
	</svg>
</button>
<div class="lf-dropdown-content">
		<ul id="lfSettingsList">
			<li>Notifications <label><input type="checkbox" id="lfSettingsNotifications"><span></span></label></li>
			<li>Avoid 30 Chars <label><input type="checkbox" id="lfAvoid30chars"><span></span></label></li>
		</ul>
	</div>
</div>
`;

LiveForum.userSettingsEvents = function() {
	var self = this;
	document.getElementById('lfSettings').addEventListener('click', function(e) {
		e.preventDefault();
		self.toggle(self, document.getElementById('lfSettings'));
		// window.open(self.browser.runtime.getURL('html/options.html'));
	});

	var notifications = document.getElementById('lfSettingsNotifications'),
		avoid30chars = document.getElementById('lfAvoid30chars');

	this.storage.get(['notifications_enabled', 'avoid30chars'], function(data) {
		notifications.checked = data.notifications_enabled;
		avoid30chars.checked = data.avoid30chars;
	});

	notifications.addEventListener('change', function() {
		var checkbox = this;
		self.storage.get(null, function(data) {
			data.notifications_enabled = checkbox.checked;
			self.storage.set(data, function(info) {
				console.log('storage saved');
			});
		});
	});

	avoid30chars.addEventListener('change', function() {
		var checkbox = this;
		self.storage.get(null, function(data) {
			data.avoid30chars = checkbox.checked;
			self.storage.set(data, function(info) {
				if(checkbox.checked) {
					self.addReply.addEventListener('click', LiveForum.avoid30chars);
					self.previewReply.addEventListener('click', LiveForum.avoid30chars);
				} else {
					self.addReply.removeEventListener('click', LiveForum.avoid30chars);
					self.previewReply.removeEventListener('click', LiveForum.avoid30chars);
				}
				console.log('storage saved');
			});
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
					${this.emoji}
					${this.blockUsers}
				</div>
				<div class="lf-family4">
					${this.other}
					${this.userSettings}
				</div>
			</div>
			<textarea name="Post" onkeypress="changeVal()"></textarea>
			<div id="lfCustomToolbox">
				<div id="lfCBtnInterface">
					<span id="lfCBtnInterfaceClose">X</span>
					<ul id="lfCBtns">
						<li id="lfCBtnSimple"  data-show="CBtnSimpleTab" class="underline">Simple</li>
						<li id="lfCBtnDropdown"  data-show="CBtnDropdownTab">Dropdown</li>
						<li id="lfCBtnDropdown2"  data-show="CBtnDropdown2Tab">Dropdown2</li>
						<li id="lfCBtnPaste"  data-show="CBtnPasteTab">Paste</li>
					</ul>
					<div id="lfCBtnSimpleTab" style="z-index:1">
						<div class="lf-create-button">
							<input id="lfSimpleBBCode" type="text" placeholder="Enter BBCode">
							<input id="lfSimpleText" type="text" placeholder="Button Name">
							<span id="lfSimpleMessage" class="lf-message"></span>
							<button id="lfSimpleAddBtn">Add</button>
						</div>
						<div id="lfSimplePreview" class="lf-preview">
							<h3>Preview</h3>
							<textarea disabled="true">[]Text[/]</textarea>
							<div><a>+</a><span></span></div>
						</div>
					</div>
					<div id="lfCBtnDropdownTab">
						<div class="lf-create-button">
							<input id="lfDropdownBBCode" type="text" placeholder="Enter BBCode">
							<input id="lfDropdownText" type="text" placeholder="Button Name">
							<span id="lfDropdownMessage" class="lf-message"></span>
							<button id="lfDropdownAddBtn">Add</button>
						</div>
						<div id="lfDropdownPreview" class="lf-preview">
							<h3>Preview</h3>
							<textarea disabled="true">[]Input[/]</textarea>
							<div>
								<div class="dropdown">
									<input type="text" placeholder="Input" disabled>
									<input type="button" value="Insert" disabled>
								</div>
							</div>
							<div><a>+</a><span></span></div>
						</div>
					</div>
					<div id="lfCBtnDropdown2Tab">
						<div class="lf-create-button">
							<input id="lfDropdown2BBCode" type="text" placeholder="Enter BBCode">
							<input id="lfDropdown2Text" type="text" placeholder="Button Name">
							<span id="lfDropdown2Message" class="lf-message"></span>
							<button id="lfDropdown2AddBtn">Add</button>
						</div>
						<div id="lfDropdown2Preview" class="lf-preview">
							<h3>Preview</h3>
							<textarea disabled="true">[=Input2]Input1[/]</textarea>
							<div>
								<div class="dropdown">
									<input type="text" placeholder="Input1" disabled>
									<input type="text" placeholder="input2" disabled>
									<input type="button" value="Insert" disabled>
								</div>
							</div>
							<div><a>+</a><span></span></div>
						</div>
					</div>
					<div id="lfCBtnPasteTab">
						<div class="lf-create-button">
							<input id="lfPasteBBCode" type="text" placeholder="Enter Text">
							<input id="lfPasteText" type="text" placeholder="Button Name">
							<span id="lfPasteMessage" class="lf-message"></span>
							<button id="lfPasteAddBtn">Add</button>
						</div>
						<div id="lfPastePreview" class="lf-preview">
							<h3>Preview</h3>
							<textarea disabled="true"></textarea>
							<div><a>+</a><span></span></div>
						</div>
					</div>
				</div>
				<button data-tooltip="Add Custom Button" id="addCustomButton">+</button>
				<div class="lf-custom-family"></div>
				<button data-tooltip="Remove Custom Button" id="removeCustomButton">-</button>
			</div>
		</div>
	`;

	// this.sibling.innerHTML = `
	// 	<div id="quickOptions">
	// 		<div class="lf-quick-links">
	// 			<a href="javascript:Insert(selection)" onmousedown="get_selection()">
	// 				<svg style="width:24px;height:24px" viewBox="0 0 24 24">
	// 					<path fill="#000000" d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
	// 				</svg>
	// 			</a>
	// 			<!--
	// 			<div>
	// 				<input type=text id="lfMemberSearch" placeholder="Search Members">
	// 				<ul id="lfMemberSuggestion">
	// 				</ul>
	// 			</div>
	// 			-->
	// 			<a href="javascript:GeoLang()">A > ა</a>
	// 			<a href="javascript:bbc_pop()">bbc</a>
	// 			<a href="javascript:CheckLength()">length</a>
	// 		</div>
	// 	</div>
	// `;

	this.events();
}

LiveForum.memberSuggestionEvents = function() {
	function suggestMember(name) {
		var suggestionBox = document.getElementById('lfMemberSuggestion'),
			input = document.getElementById('lfMemberSearch');

		var xhr = typeof content !== 'undefined' ? new content.XMLHttpRequest() : new XMLHttpRequest();
		xhr.open('POST', 'index.php', true);
		xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
		xhr.send('act=Members&photoonly=0&name_box=begins&name=' + name + '&filter=ALL&sort_key=posts&sort_order=desc&max_results=10');
		xhr.onload = function() {
			if(this.status == 200) {
				var html = ``;
				var div = document.createElement('div');
					div.innerHTML = this.response;
					Array.prototype.slice.call(div.querySelectorAll('.row4 a')).forEach(function(el) {
						 html += `<li>${el.innerText}</li>`;
					});
					suggestionBox.innerHTML = html;
					Array.prototype.slice.call(suggestionBox.querySelectorAll('li')).forEach(function(el) {
						el.addEventListener('click', function(e) {
							input.value = this.innerText;
							suggestionBox.innerHTML = ``;
							e.stopPropagation();
						});
					});
			}
		}
	}

	document.getElementById('lfMemberSearch').addEventListener('keyup', function(e) {
		suggestMember(this.value);
	});
}

LiveForum.addCustomButtonEvents = function() {
	var self = this;

	function addButton(id, placeholder, paste) {
		var root = LiveForum,
			name = document.getElementById('lf' + id + 'Text'),
			code = document.getElementById('lf' + id + 'BBCode');
			if(paste) {
				var obj = {button_name: name.value, paste: code.value, dropdown: placeholder};
			} else {
				var obj = {button_name: name.value, bbcode: code.value, dropdown: placeholder};
			}
		if(name.value.length >= 1 && code.value.length >= 1) {
			root.storage.get(null, function(data) {
				data.custom_buttons.push(obj);
				root.storage.set(data, function(info) {
					if(info.status == 200)
						root.factory(obj);
						root.listener.emit('custom' + id + 'BtnAdd', {message: 'success', boxId: '#lf' + id + 'Message', color: '#00E676'});
				});
			});
		} else {
			root.listener.emit('emptyBtnAddField', {message: 'Empty Field', boxId: '#lf' + id + 'Message', color: '#E91E63'});
		}
	}

	document.getElementById('addCustomButton').addEventListener('click', function(e){
		e.preventDefault();
		document.getElementById('lfCBtnInterface').style.display = "block";
		document.querySelector(self.textarea).disabled = true;
	});	

	document.getElementById('removeCustomButton').addEventListener('click', function(e){
		e.preventDefault();
		Array.prototype.slice.call(document.querySelectorAll('.delete-button')).forEach(function(el) {
			el.classList.toggle('show');
		});
	});

	document.getElementById('lfCBtnInterfaceClose').addEventListener('click', function(e) {
		e.preventDefault();
		document.getElementById('lfCBtnInterface').style.display = "none";
		document.querySelector(self.textarea).disabled = false;
	});

	Array.prototype.slice.call(document.querySelectorAll('#lfCBtns li')).forEach(function(el) {
		el.addEventListener('click', function() {
			if(self.lastCustomBtnTitle) {
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

	document.getElementById('lfSimpleBBCode').addEventListener('keyup', function(e) {
		var textarea = document.querySelector('#lfSimplePreview textarea');
			textarea.value = '[' + this.value + ']Text[/' + this.value + ']';

	});

	document.getElementById('lfSimpleText').addEventListener('keyup', function(e) {
		document.querySelector('#lfSimplePreview span').innerText = this.value;
	});

	document.getElementById('lfSimpleAddBtn').addEventListener('click', function(e) {
		e.preventDefault();
		addButton.call(this, 'Simple', false);
	});

	document.getElementById('lfDropdownText').addEventListener('keyup', function(e) {
		document.querySelector('#lfDropdownPreview span').innerText = this.value;
	});

	document.getElementById('lfDropdownBBCode').addEventListener('keyup', function(e) {
		var textarea = document.querySelector('#lfDropdownPreview textarea');
			textarea.value = '[' + this.value + ']Input[/' + this.value + ']';

	});

	document.getElementById('lfDropdownAddBtn').addEventListener('click', function(e) {
		e.preventDefault();
		addButton.call(this, 'Dropdown', {inputs: [{placeholder: 'Input'}]});
	});

	document.getElementById('lfDropdown2Text').addEventListener('keyup', function(e) {
		document.querySelector('#lfDropdown2Preview span').innerText = this.value;
	});

	document.getElementById('lfDropdown2BBCode').addEventListener('keyup', function(e) {
		var textarea = document.querySelector('#lfDropdown2Preview textarea');
			textarea.value = '[' + this.value + '=Input2]Input1[/' + this.value + ']';

	});

	document.getElementById('lfDropdown2AddBtn').addEventListener('click', function(e) {
		e.preventDefault();
		addButton.call(this, 'Dropdown2', {inputs: [{placeholder: 'Input1'}, {placeholder: 'Input2'}]});
	});

	document.getElementById('lfPasteText').addEventListener('keyup', function(e) {
		document.querySelector('#lfPastePreview span').innerText = this.value;
	});

	document.getElementById('lfPasteBBCode').addEventListener('keyup', function(e) {
		var textarea = document.querySelector('#lfPastePreview textarea');
			textarea.value = this.value;

	});

	document.getElementById('lfPasteAddBtn').addEventListener('click', function(e) {
		e.preventDefault();
		addButton.call(this, 'Paste', false, true);
	});
}

LiveForum.factory = function(el) {
	var self = this;

	var deleteButton = document.createElement('div');
		deleteButton.setAttribute('class', 'delete-button');
		deleteButton.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			var parent = document.querySelector('#lfCustomToolbox .lf-custom-family');
			if(this.parentElement.dataset.popup == 'yes') {
				var index = Array.prototype.indexOf.call(parent.children, this.parentElement.parentElement);
					self.storage.get(null, function(data) {
						data.custom_buttons.splice(index, 1);
						self.storage.set(data, function(info) {
							parent.removeChild(parent.children[index]);
							if(parent.children.length == 0) {
								document.getElementById('removeCustomButton').style.display = 'none';
							}
						})
					});
			} else {
				var index = Array.prototype.indexOf.call(parent.children, this.parentElement);
					self.storage.get(null, function(data) {
						data.custom_buttons.splice(index, 1);
						self.storage.set(data, function(info) {
							parent.removeChild(parent.children[index]);
							if(parent.children.length == 0) {
								document.getElementById('removeCustomButton').style.display = 'none';
							}
						})
					});
			}
		});

	if(el.dropdown && el.bbcode) {
		var dropdown = document.createElement('div');
			dropdown.setAttribute('class', 'lf-dropdown');

		var dropdownContent = document.createElement('div');
			dropdownContent.setAttribute('class', 'lf-dropdown-content');

		var button = document.createElement('button');
			button.innerText = el.button_name;
			button.setAttribute('data-popup', 'yes');
			button.addEventListener('click', function(e) {
				e.preventDefault();
				self.toggle(self, button);
			});

			button.appendChild(deleteButton);

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

	} else if(el.bbcode && !el.dropdown) {
		var button = document.createElement('button');
			button.innerText = el.button_name;
			button.addEventListener('click', function(e) {
				e.preventDefault();
				self.wrapper(el.bbcode);
			});
			button.appendChild(deleteButton);
			document.querySelector('#lfCustomToolbox .lf-custom-family').appendChild(button);
	} else if(el.paste && !el.dropdown) {
		var button = document.createElement('button');
			button.innerText = el.button_name;
			button.addEventListener('click', function(e) {
				e.preventDefault();
				self.paste(el.paste);
			});
			button.appendChild(deleteButton);
			document.querySelector('#lfCustomToolbox .lf-custom-family').appendChild(button);
	}
}

LiveForum.storage.get("custom_buttons", function(data) {
	var root = LiveForum;
	if(data.length > 0) {
		data.forEach(function(el) {
			root.factory(el);
		});
		document.getElementById('removeCustomButton').style.display = 'block';
	}
});

LiveForum.closeDropdown = function() {
	var self = this;
	Array.prototype.slice.call(document.querySelectorAll('.lf-dropdown-content')).forEach(function(el) {
		if(el.classList.contains('show')) {
			el.classList.remove('show');
			self.listener.emit('dropDownClose', {button: el.previousElementSibling, dropdown: el});
		}
	});
}

LiveForum.toggle = function(self, el) {
	if(self.lastEl !== null && self.lastEl != el) {
		self.closeDropdown();
	}
	if(el.nextElementSibling.classList.toggle('show')) {
		this.listener.emit('dropDownOpen', {button: el, dropdown: el.nextElementSibling});
	} else {
		this.listener.emit('dropDownClose', {button: el, dropdown: el.nextElementSibling});
	}
	self.lastEl = el;
}

LiveForum.lastEl = null;

LiveForum.lastCustomBtnTab = null;

LiveForum.lastCustomBtnTitle = 'lfCBtnSimple';

LiveForum.lastVideoTab = null;

LiveForum.lastVideoTitle = 'lfYoutube';

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
				case 'CtrlK':
					if(self.ctrlKeyPressed && e.keyCode == 75) {
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
				case 'CtrlQ':
					if(self.ctrlKeyPressed && e.keyCode == 81) {
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
				case 'CtrlM':
					if(self.ctrlKeyPressed && e.keyCode == 77) {
						e.preventDefault();
						keyObj[key]();
						self.ctrlKeyPressed = false;
					}
					break;
				case 'CtrlL':
					if(self.ctrlKeyPressed && e.keyCode == 76) {
						e.preventDefault();
						keyObj[key]();
						self.ctrlKeyPressed = false;
					}
					break;
				case 'CtrlF':
					if(self.ctrlKeyPressed && e.keyCode == 70) {
						e.preventDefault();
						keyObj[key]();
						self.ctrlKeyPressed = false;
					}
					break;
				case 'CtrlT':
					if(self.ctrlKeyPressed && e.keyCode == 84) {
						e.preventDefault();
						keyObj[key]();
						self.ctrlKeyPressed = false;
					}
					break;
				case 'CtrlR':
					if(self.ctrlKeyPressed && e.keyCode == 82) {
						e.preventDefault();
						keyObj[key]();
						self.ctrlKeyPressed = false;
					}
					break;
				case 'CtrlP':
					if(self.ctrlKeyPressed && e.keyCode == 80) {
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

LiveForum.submitInputOnEnter = function(evt, tag, atEnd) {
	e = evt || window.event;
	if(e.keyCode == 13) {
		e.preventDefault();
		var link = document.getElementById('lf' + this.capitalize(tag) + 'Input');
		if(atEnd) {
			this.wrapper(tag, false, link.value, true);
		} else {
			this.wrapper(tag, false, link.value);
		}
		this.closeDropdown();
		link.value = '';
	}

}

LiveForum.hideBlockedUserContent = function() {
	this.storage.get('blocked_users', function(data) {
		Array.prototype.slice.call(document.querySelectorAll('.normalname a[href^="javascript:paste"]')).forEach(function(el) {
			if(data.indexOf(el.innerText) > -1) {
				var post = el.parentNode.parentNode.parentNode.parentNode.parentNode,
					div = document.createElement('div');
					div.setAttribute('class', 'lf-blocked');
					div.innerText = 'Blocked User: ' + el.innerText;
					div.addEventListener('click', function() {
						post.classList.toggle('hide');
					});

					post.classList.add('hide');
					post.parentElement.insertBefore(div, post);
			}
		});
	});
}

LiveForum.avoid30chars = function() {
	var content = document.querySelector(LiveForum.textarea); 
	if(content.value.length < 30) {
		content.value +='[b]                       [/b]';
	}
}

LiveForum.events = function() {
	var self = this;

	this.storage.get('avoid30chars', function(data) {
		if(data) {
			self.addReply.addEventListener('click', self.avoid30chars);
			self.previewReply.addEventListener('click', self.avoid30chars);
		}
	});

	this.quotePopupEvents();

	function clearInputs(data) {
		if(data.button.id == 'lfList') {
			var parent = document.getElementById('lfListItems'),
				firstChild = document.querySelector('#lfListItems li');

			while(firstChild.nextSibling) {
				parent.removeChild(firstChild.nextSibling);
			}
		}		

		if(data.button.id == 'lfBlockUsers') {
			document.getElementById('lfMemberSuggestion').innerHTML = ``;
		}

		if(data.button.id == 'lfEmoji') {
			Array.prototype.slice.call(document.querySelectorAll('.delete-emoji')).forEach(function(el) {
				el.classList.remove('show');
			})
		}

		Array.prototype.slice.call(data.dropdown.querySelectorAll('input')).forEach(function(el) {
			el.value = '';
		});
	}

	function focusInput(data) {
		var  input = data.dropdown.querySelector('input');

		if(input) input.focus();
	}

	this.listener.on('dropDownClose', clearInputs);

	this.listener.on('dropDownOpen', focusInput);

	function messenger(data) {
		var	message = document.querySelector(data.boxId);
			message.innerText = data.message;
			message.style.color = data.color;
			setTimeout(function() {
				message.style.color = 'transparent';
			}, 1500);
			document.getElementById('removeCustomButton').style.display = 'block';
	}

	this.listener.on('customSimpleBtnAdd', messenger);
	this.listener.on('customDropdownBtnAdd', messenger);
	this.listener.on('emptyBtnAddField', messenger);

	document.addEventListener('click', function(e) {
		if(!e.target.matches('.lf-dropdown *')) {
			self.closeDropdown();
		}
		if(!e.target.matches('.delete-button') && !e.target.matches('#removeCustomButton')) {
			Array.prototype.slice.call(document.querySelectorAll('.delete-button')).forEach(function(el) {
				if(el.classList.contains('show'))
					el.classList.remove('show');
			});
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
	this.emojiEvents();
	this.userSettingsEvents();
	this.blockUsersEvents();

	this.CtrlKeyCombo(document.querySelector(this.textarea), {
		CtrlK: function() {
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
		CtrlP: function() {
			self.wrapper('code');
		},
		CtrlQ: function() {
			self.wrapper('quote');
		},
		CtrlH: function() {
			document.getElementById('lfUrlText').value = self.dissect(document.querySelector(self.textarea)).two;
			self.toggle(self, document.getElementById('lfUrl'));
		},
		CtrlG: function() {
			self.toggle(self, document.getElementById('lfImg'));
		},
		CtrlM: function() {
			self.toggle(self, document.getElementById('lfVideo'));
		},
		CtrlL: function() {
			self.toggle(self, document.getElementById('lfList'));
		},
		CtrlF: function() {
			self.toggle(self, document.getElementById('lfFont'));
		},
		CtrlT: function() {
			self.toggle(self, document.getElementById('lfSize'));
		},
		CtrlR: function() {
			self.toggle(self, document.getElementById('lfColor'));
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

LiveForum.wrapper = function(tag, attr, input, atEnd, newLine) {
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
				textarea.selectionEnd   = selEnd;
				textarea.focus();
			}
			if(newLine) {
				textarea.value += '\n';
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

		if(atEnd) {
			var end = textarea.selectionEnd + 3 + tag.length;
			textarea.selectionStart = end;
			textarea.selectionEnd   = end;
		}
}

LiveForum.paste = function(selection) {
	var textarea  = document.querySelector(this.textarea),
		dissected = this.dissect(textarea);

		textarea.value = dissected.one + selection + dissected.three;
		textarea.selectionStart = dissected.selStart;
		textarea.selectionEnd = dissected.selStart  + selection.length;
		textarea.focus();
}

LiveForum.hideBlockedUserContent();

LiveForum.start();

// chrome.runtime.sendMessage({receiver: "Modified Settings"}, function(data) {
// 	console.log(data);
// });