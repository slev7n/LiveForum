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
					<button accesskey="b" data-bbcode="b" data-tooltip="Bold (Ctrl+B)" id="lfBold"  style="font-weight:bold">B</button>
					<button accesskey="i" data-bbcode="i" data-tooltip="Italic (Ctrl+I)" id="lfItalic" style="font-style:italic">I</button>
					<button accesskey="u" data-bbcode="u" data-tooltip="Underline (Ctrl+U)" id="lfUnderline" style="text-decoration:underline">U</button>
					<button accesskey="s" data-bbcode="s" data-tooltip="Strike (Ctrl+S)" id="lfStrikethrough"  style="text-decoration:line-through">S</button>
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
						<button id="lfFont" class="lf-dropbtn">A</button>
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
						<button id="lfSize" class="lf-dropbtn">T</button>
						<div class="lf-dropdown-content">
							<ul id="lfSizes">
								<li data-bbcode="size" data-size="1">1 S</li>
								<li data-bbcode="size" data-size="2">2</li>
								<li data-bbcode="size" data-size="3">3</li>
								<li data-bbcode="size" data-size="4">4 M</li>
								<li data-bbcode="size" data-size="5">5</li>
								<li data-bbcode="size" data-size="6">6</li>
								<li data-bbcode="size" data-size="7">7 L</li>
								<li data-bbcode="size" data-size="8">8</li>
								<li data-bbcode="size" data-size="9">9</li>
								<li data-bbcode="size" data-size="10">10</li>
								<li data-bbcode="size" data-size="11">11</li>
								<li data-bbcode="size" data-size="12">12</li>
								<li data-bbcode="size" data-size="13">13</li>
								<li data-bbcode="size" data-size="14">14 XL</li>
							</ul>
						</div>
					</div>
					<div class="lf-dropdown">
						<button id="lfColor" class="lf-dropbtn">C</button>
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
								<input type="text" placeholder="Or Enter Color Name">
								<button>Insert</button>
							</div>
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
	});
	document.querySelectorAll('#lfSizes li').forEach(function(el) {
		el.addEventListener('click', function() {
			self.wrapper(el.dataset.bbcode, el.dataset.size);
			self.closeDropdown();
		})
	});
	// COLOR
	document.getElementById('lfColor').addEventListener('click', function(e) {
		e.preventDefault();
		self.toggle(self, this);
	});
	document.querySelectorAll('#lfColors span').forEach(function(el) {
		el.addEventListener('click', function() {
			self.wrapper(el.dataset.bbcode, el.dataset.color);
			self.closeDropdown();
		})
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