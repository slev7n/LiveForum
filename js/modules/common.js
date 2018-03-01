function readFile(filename) {
	var url = chrome.runtime.getUrl(filename);
	let xhr = typeof content !== 'undefined' ? new content.XMLHttpRequest() : new XMLHttpRequest();
	xhr.open('GET', url, false);
	xhr.send(null);
	return xhr.responseText;
}

function require(name) {
	if (name in require.cache)
		return require.cache[name];

	var code = new Function("exports, module", readFile(name));
	var exports = {}, module = {exports: exports};
	code(exports, module);

	require.cache[name] = module.exports;
	return module.exports;
}
require.cache = Object.create(null);