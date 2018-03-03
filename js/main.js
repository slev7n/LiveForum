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
						<button id="lfUrl" class="lf-dropbtn"></button>
						<div class="lf-dropdown-content">
							<input id="lfUrlText" type="text" placeholder="Enter Text...">
							<input id="lfUrlLink" type="text" placeholder="Enter URL...">
							<button id="lfUrlSubmit">Ok</button>
						</div>
					</div>
					<div class="lf-dropdown">
						<button id="lfImg" class="lf-dropbtn"></button>
						<div class="lf-dropdown-content">
							<input id="lfImgLink" type="text" placeholder="Image URL...">
							<button id="lfImgUpload" accesskey="g">Upload</button>
							<button id="lfImgSubmit">Ok</button>
						</div>
					</div>
					<div class="lf-dropdown">
						<button id="lfFont" class="lf-dropbtn">A</button>
						<div class="lf-dropdown-content">
							<ul>
								<li style="font-family:Arial">Arial</li>
								<li style="font-family:Times">Times</li>
								<li style="font-family:Courier">Courier</li>
								<li style="font-family:Impact">Impact</li>
								<li style="font-family:Geneva">Geneva</li>
								<li style="font-family:Optima">Optima</li>
							</ul>
							<div class="lf-own-name">
								<input type="text" placeholder="Or Enter Font Name">
								<button>Ok</button>
							</div>
						</div>
					</div>
					<div class="lf-dropdown">
						<button id="lfSize" class="lf-dropbtn">T</button>
						<div class="lf-dropdown-content">
							<ul>
								<li>1 S</li>
								<li>2</li>
								<li>3</li>
								<li>4 M</li>
								<li>5</li>
								<li>6</li>
								<li>7 L</li>
								<li>8</li>
								<li>9</li>
								<li>10</li>
								<li>11</li>
								<li>12</li>
								<li>13</li>
								<li>14 XL</li>
							</ul>
						</div>
					</div>
					<div class="lf-dropdown">
						<button id="lfColor" class="lf-dropbtn">C</button>
						<div class="lf-dropdown-content">
							<div class="lf-color-palette">
								<span data-color="blue" style="background:blue"></span>
								<span data-color="red" style="background:red"></span>
								<span data-color="purple" style="background:purple"></span>
								<span data-color="orange" style="background:orange"></span>
								<span data-color="yellow" style="background:yellow"></span>
								<span data-color="gray" style="background:gray"></span>
								<span data-color="green" style="background:green"></span>
							</div>
							<div class="lf-own-name">
								<input type="text" placeholder="Or Enter Color Name">
								<button>Ok</button>
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
		var link = document.getElementById('lfUrlLink');
			link.value = '';
			self.toggle(self, this);
			link.focus();
	});	
	document.getElementById('lfUrlLink').addEventListener('keypress', function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			self.wrapper('url', document.getElementById('lfUrlLink').value, document.getElementById('lfUrlText').value);
			self.closeDropdown();
		}
	});
	document.getElementById('lfUrlText').addEventListener('keypress', function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			self.wrapper('url', document.getElementById('lfUrlLink').value, document.getElementById('lfUrlText').value);
			self.closeDropdown();
		}
	});
	document.getElementById('lfUrlSubmit').addEventListener('click', function(e) {
		e.preventDefault();
		self.wrapper('url', document.getElementById('lfUrlLink').value, document.getElementById('lfUrlText').value);
		self.closeDropdown();
	});
	// IMG
	document.getElementById('lfImg').addEventListener('click', function(e) {
		e.preventDefault();
		self.toggle(self, this);
	});	
	document.getElementById('lfFont').addEventListener('click', function(e) {
		e.preventDefault();
		self.toggle(self, this);
	});
	document.getElementById('lfSize').addEventListener('click', function(e) {
		e.preventDefault();
		self.toggle(self, this);
	});
	document.getElementById('lfColor').addEventListener('click', function(e) {
		e.preventDefault();
		self.toggle(self, this);
	});
	document.querySelector(this.textarea).addEventListener('keyup', function(e) {
		if(e.ctrlKey) self.ctrlKeyPressed = false;
	});
	document.querySelector(this.textarea).addEventListener('keydown', function(e) {
		if(e.ctrlKey) self.ctrlKeyPressed = true;
		if(self.ctrlKeyPressed) {
			switch(e.keyCode) {
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
				case 72:
					e.preventDefault();
					document.getElementById('lfUrlText').value = self.dissect(document.querySelector(self.textarea)).two;
					var link = document.getElementById('lfUrlLink');
					link.value = '';
					self.toggle(self, document.getElementById('lfUrl'));
					link.focus();
					self.ctrlKeyPressed = false;
					break;
			}
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