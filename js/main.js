var LiveForum = LiveForum || {};

LiveForum.textarea = 'textarea[name="Post"]';

LiveForum.parent = document.querySelector(LiveForum.textarea).parentNode;

LiveForum.sibling = LiveForum.parent.previousElementSibling;

LiveForum.start = function() {
	this.parent.innerHTML = `
	<div id="lfEditor" class="lf-box">
	<div id="lfStandardToolbox" class="lf-standardtoolbox">
		<input type="checkbox" name="geo" checked>
		<div class="lf-text-tools">
			<button accesskey="b" data-bbcode="b" data-tooltip="Bold (Alt+B)" id="lfBold"  style="font-weight:bold">B</button>
			<button accesskey="i" data-bbcode="i" data-tooltip="Italic (Alt+I)" id="lfItalic" style="font-style:italic">I</button>
			<button accesskey="u" data-bbcode="u" data-tooltip="Underline (Alt+U)" id="lfUnderline" style="text-decoration:underline">U</button>
			<button accesskey="s" data-bbcode="s" data-tooltip="Strike" id="lfStrikethrough"  style="text-decoration:line-through">S</button>
		</div>
		<!--
		<div class="lf-media-tools">
			<input type="button" accesskey="m" id="lfImg">
		</div>
		<div class="lf-dropdown">
			<input type="button" accesskey="h" value="Url" id="lfUrlBtn">
			<div class="dropdown-content" id="lfUrlDropdown">
				<input type="text">
				<input type="text">
				<input type="button" value="Ok">
			</div>
		</div>
		-->
		<div>
		<div id="lfFonts" class="lf-dropdown">
			<button id="lfFont">A</button>
			<div class="lf-dropdown-content">
				<div style="font-family:Arial">Arial</div>
				<div style="font-family:Times">Times</div>
				<div style="font-family:Courier">Courier</div>
				<div style="font-family:Impact">Impact</div>
				<div style="font-family:Geneva">Geneva</div>
				<div style="font-family:Optima">Optima</div>
			</div>
		</div>
		<!--
		<select id="lfSize" class="lf-type">
			<option disabled selected hidden>T</option>
			<option value="1">1 S</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4 M</option>
			<option value="5">5</option>
			<option value="6">6</option>
			<option value="7">7 L</option>
			<option value="8">8</option>
			<option value="9">9</option>
			<option value="10">10</option>
			<option value="11">11</option>
			<option value="12">12</option>
			<option value="13">13</option>
			<option value="14">14 XL</option>
		</select>
		<select id="lfColor" class="lf-type">
			<option disabled selected hidden>C</option>
			<option value="blue" style="color:blue">Blue</option>
			<option value="red" style="color:red">Red</option>
			<option value="purple" style="color:purple">Purple</option>
			<option value="orange" style="color:orange">Orange</option>
			<option value="yellow" style="color:yellow">Yellow</option>
			<option value="gray" style="color:gray">Gray</option>
			<option value="green" style="color:green">Green</option>
		</select>
		-->
		</div>
		</div>
		<textarea name="Post" onkeypress="changeVal()"></textarea>
		<div id="lfCustomToolbox">+</div>
	</div>
	`;
	this.sibling.innerHTML = `<div id="quickOptions"></div>`;

	this.events();
}

LiveForum.events = function() {
	var self = this;

	document.addEventListener('click', function(e) {
		// if(!e.target.matches('.dropdown')) {
		// 	console.log('hide');
		// }
	});

	document.getElementById('lfBold').addEventListener('click', function(e) {
		e.preventDefault();
		self.wrapper(this.dataset.bbcodes);
	});

	document.getElementById('lfItalic').addEventListener('click', function(e) {
		e.preventDefault();
		self.wrapper(this.dataset.bbcode);
	});
	document.getElementById('lfUnderline').addEventListener('click', function(e) {
		e.preventDefault();
		self.wrapper(this.dataset.bbcodes);
	});
	document.getElementById('lfStrikethrough').addEventListener('click', function(e) {
		e.preventDefault();
		self.wrapper(this.dataset.bbcodes);
	});	
	document.getElementById('lfFont').addEventListener('click', function(e) {
		e.preventDefault();
		this.nextElementSibling.classList.toggle('show');
	});
	// document.getElementById('lfSize').addEventListener('change', function() {
	// 	self.wrapper('size', this.value);
	// });
	// document.getElementById('lfColor').addEventListener('change', function() {
	// 	self.wrapper('color', this.value);
	// });
	// document.getElementById('lfUrlBtn').addEventListener('click', function() {
	// 	this.nextElementSibling.classList.toggle('show');
	// });
	// document.querySelector('#lfUrlDropdown input[type="button"]').addEventListener('click', function() {
	// 	self.wrapper('img', '', 'http.jpg')
	// })

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