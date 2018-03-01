var LiveForum = LiveForum || {};

LiveForum.textarea = 'textarea[name="Post"]';

LiveForum.parent = document.querySelector(LiveForum.textarea).parentNode;

LiveForum.sibling = LiveForum.parent.previousElementSibling;

LiveForum.start = function() {
	this.parent.innerHTML = `
<div id="lfEditor" class="lf-box">
	<div id="lfStandardToolbox" class="lf-standardtoolbox">
		<div id="lfGeoContainer">
			<input id="lfGeo" type="checkbox" name="geo" checked>
			<label for="lfGeo"></label>
		</div>
		<div class="lf-text-tools">
			<button accesskey="b" data-bbcode="b" data-tooltip="Bold (Alt+B)" id="lfBold"  style="font-weight:bold">B</button>
			<button accesskey="i" data-bbcode="i" data-tooltip="Italic (Alt+I)" id="lfItalic" style="font-style:italic">I</button>
			<button accesskey="u" data-bbcode="u" data-tooltip="Underline (Alt+U)" id="lfUnderline" style="text-decoration:underline">U</button>
			<button accesskey="s" data-bbcode="s" data-tooltip="Strike" id="lfStrikethrough"  style="text-decoration:line-through">S</button>
		</div>
		<div class="lf-dropdown">
			<button id="lfFont" class="lf-dropbtn">A</button>
			<div class="lf-dropdown-content">
				<div style="font-family:Arial">Arial</div>
				<div style="font-family:Times">Times</div>
				<div style="font-family:Courier">Courier</div>
				<div style="font-family:Impact">Impact</div>
				<div style="font-family:Geneva">Geneva</div>
				<div style="font-family:Optima">Optima</div>
				<div class="lf-own-name">
					<input type="text" placeholder="Font Name">
					<button>Ok</button>
				</div>
			</div>
		</div>
		<div class="lf-dropdown">
			<button id="lfSize" class="lf-dropbtn">T</button>
			<div class="lf-dropdown-content">
				<div>1 S</div>
				<div>2</div>
				<div>3</div>
				<div>4 M</div>
				<div>5</div>
				<div>6</div>
				<div>7 L</div>
				<div>8</div>
				<div>9</div>
				<div>10</div>
				<div>11</div>
				<div>12</div>
				<div>13</div>
				<div>14 XL</div>
			</div>
		</div>
		<div class="lf-dropdown">
			<button id="lfColor" class="lf-dropbtn">C</button>
			<div class="lf-dropdown-content">
				<div style="color:blue">Blue</div>
				<div style="color:red">Red</div>
				<div style="color:purple">Purple</div>
				<div style="color:orange">Orange</div>
				<div style="color:yellow">Yellow</div>
				<div style="color:gray">Gray</div>
				<div style="color:green">Green</div>
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

LiveForum.events = function() {
	var self = this;

	document.addEventListener('click', function(e) {
		console.log(e.target.parentNode);
		// if(!e.target.matches('.lf-dropdown .lf-dropbtn')) {
		// 	document.querySelectorAll('.lf-dropdown-content').forEach(el => {
		// 		if(el.classList.contains('show'))
		// 			el.classList.remove('show');
		// 	});
		// }
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
	document.getElementById('lfFont').addEventListener('click', function(e) {
		e.preventDefault();
		this.nextElementSibling.classList.toggle('show');
	});
	document.getElementById('lfSize').addEventListener('click', function(e) {
		e.preventDefault();
		this.nextElementSibling.classList.toggle('show');
	});
	document.getElementById('lfColor').addEventListener('click', function(e) {
		e.preventDefault();
		this.nextElementSibling.classList.toggle('show');
	});
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