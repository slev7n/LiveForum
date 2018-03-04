var LiveForum = LiveForum || {};

LiveForum.textarea = 'textarea[name="Post"]';

LiveForum.parent = document.querySelector(LiveForum.textarea).parentNode;

LiveForum.sibling = LiveForum.parent.previousElementSibling;

LiveForum.start = function() {
	this.parent.innerHTML = `
		<div id="lfEditor" class="lf-box">
			<div id="lfStandardToolbox" class="lf-standard-toolbox">
				<div id="lfGeoContainer">
					<input id="lfGeo" type="checkbox" name="geo" checked>
					<label for="lfGeo"></label>
				</div>
				<div class="lf-text-tools">
					<button data-bbcode="b" data-tooltip="Bold (Ctrl+B)" id="lfBold">
						<svg style="width:24px;height:24px" viewBox="0 0 24 24">
							<path fill="#000000" d="M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z" />
						</svg>
					</button>
					<button data-bbcode="i" data-tooltip="Italic (Ctrl+I)" id="lfItalic">
						<svg style="width:24px;height:24px" viewBox="0 0 24 24">
							<path fill="#000000" d="M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z" />
						</svg>
					</button>
					<button data-bbcode="u" data-tooltip="Underline (Ctrl+U)" id="lfUnderline">
					<svg style="width:24px;height:24px" viewBox="0 0 24 24">
						<path fill="#000000" d="M5,21H19V19H5V21M12,17A6,6 0 0,0 18,11V3H15.5V11A3.5,3.5 0 0,1 12,14.5A3.5,3.5 0 0,1 8.5,11V3H6V11A6,6 0 0,0 12,17Z" />
					</svg>
					</button>
					<button data-bbcode="s" data-tooltip="Strike (Ctrl+S)" id="lfStrikethrough">
					<svg style="width:24px;height:24px" viewBox="0 0 24 24">
						<path fill="#000000" d="M23,12V14H18.61C19.61,16.14 19.56,22 12.38,22C4.05,22.05 4.37,15.5 4.37,15.5L8.34,15.55C8.37,18.92 11.5,18.92 12.12,18.88C12.76,18.83 15.15,18.84 15.34,16.5C15.42,15.41 14.32,14.58 13.12,14H1V12H23M19.41,7.89L15.43,7.86C15.43,7.86 15.6,5.09 12.15,5.08C8.7,5.06 9,7.28 9,7.56C9.04,7.84 9.34,9.22 12,9.88H5.71C5.71,9.88 2.22,3.15 10.74,2C19.45,0.8 19.43,7.91 19.41,7.89Z" />
					</svg>
					</button>
					<button data-bbcode="quote" data-tooltip="Quote (Ctrl+Q)" id="lfQuote">
						<svg style="width:24px;height:24px" viewBox="0 0 24 24">
							<path fill="#000000" d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
						</svg>
					</button>
				</div>
				<div class="lf-family2">
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
					<div class="lf-dropdown">
						<button id="lfImg" class="lf-dropbtn">
							<svg style="width:24px;height:24px" viewBox="0 0 24 24">
								<path fill="#000000" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
							</svg>
						</button>
						<div class="lf-dropdown-content">
							<input id="lfImgLink" type="text" placeholder="Image URL...">
							<button id="lfImgUpload" accesskey="g" onclick="fgModalRun()">Upload</button>
							<button data-bbcode="img" id="lfImgSubmit">Insert</button>
						</div>
					</div>
					<div class="lf-dropdown">
						<button id="lfVideo" class="lf-dropbtn">
							<svg style="width:24px;height:24px" viewBox="0 0 24 24">
								<path fill="#000000" d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z" />
							</svg>
						</button>
						<div class="lf-dropdown-content">
							
						</div>
					</div>
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
					<div class="lf-dropdown">
						<button id="lfSize" class="lf-dropbtn">
							<svg style="width:24px;height:24px" viewBox="0 0 24 24">
								<path fill="#000000" d="M3,12H6V19H9V12H12V9H3M9,4V7H14V19H17V7H22V4H9Z" />
							</svg>
						</button>
						<div class="lf-dropdown-content">
							<ul id="lfSizes">
								<li data-bbcode="size" data-size="1">1</li>
								<li data-bbcode="size" data-size="2">2</li>
								<li data-bbcode="size" data-size="3">3</li>
								<li data-bbcode="size" data-size="4" class="selected">4</li>
								<li data-bbcode="size" data-size="5">5</li>
								<li data-bbcode="size" data-size="6">6</li>
								<li data-bbcode="size" data-size="7">7</li>
								<li data-bbcode="size" data-size="8">8</li>
								<li data-bbcode="size" data-size="9">9</li>
								<li data-bbcode="size" data-size="10">10</li>
								<li data-bbcode="size" data-size="11">11</li>
								<li data-bbcode="size" data-size="12">12</li>
								<li data-bbcode="size" data-size="13">13</li>
								<li data-bbcode="size" data-size="14">14</li>
							</ul>
							<div class="lf-own-name">
								<input id="lfSizeInput" type="text" placeholder="Or Enter Size">
								<button data-bbcode="size" id="lfSizeSubmit">Insert</button>
							</div>
						</div>
					</div>
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
					<div class="lf-dropdown">
						<button id="lfList" class="lf-dropbtn">
						<svg style="width:24px;height:24px" viewBox="0 0 24 24">
							<path fill="#000000" d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z" />
						</svg>
						</button>
						<div class="lf-dropdown-content">
						</div>
					</div>
				</div>
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
		if(el.classList.contains('show'))
			el.classList.remove('show');
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

LiveForum.ctrlKeyPressed = false;

LiveForum.events = function() {
	var self = this;

	document.addEventListener('click', function(e) {
		if(!e.target.matches('.lf-dropdown *')) {
			self.closeDropdown();
		}
	});

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
	document.getElementById('lfQuote').addEventListener('click', function(e) {
		e.preventDefault();
		self.wrapper(this.dataset.bbcode);
	});
	// URL
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
	// IMG
	document.getElementById('lfImg').addEventListener('click', function(e) {
		e.preventDefault();
		self.toggle(self, this);
		document.getElementById('lfImgLink').focus();
	});
	document.getElementById('lfImgUpload').addEventListener('click', function(e) {
		e.preventDefault();
	});
	document.getElementById('lfImgSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		var input = document.getElementById('lfImgLink');
		self.wrapper(this.dataset.bbcode, false, input.value);
		self.closeDropdown();
		input.value = '';
	});
	document.getElementById('lfImgLink').addEventListener('keypress', function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			var link = document.getElementById('lfImgLink');
			self.wrapper('img', false, link.value);
			self.closeDropdown();
			link.value = '';
		}
	});
	// FONT
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
	// SIZE
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
	// COLOR
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
	// Ctrl + Key
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
					document.getElementById('lfImgLink').focus();
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

		if(tag && attr && input) {
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
		} else if(tag && attr) {
			textarea.value              = dissected.one + "[" + tag + "=" + attr + "]" + dissected.two + "[/" + tag + "]" + dissected.three;
			textarea.selectionStart     = dissected.selStart + 3 + tag.length + attr.length;
			textarea.selectionEnd       = dissected.selEnd + 3 + tag.length + attr.length;
			textarea.focus();
		} else if(tag && input) {
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
		} else {
			textarea.value              = dissected.one + "[" + tag + "]" + dissected.two + "[/" + tag + "]" + dissected.three;
			textarea.selectionStart     = dissected.selStart + 2 + tag.length;
			textarea.selectionEnd       = dissected.selEnd + 2 + tag.length;
			textarea.focus();
		}

}

LiveForum.start();