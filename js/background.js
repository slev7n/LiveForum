chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.sender == 'LiveForum Settings') {
		localStorage['Options'] = JSON.stringify(request.settings);
	}
	if(request.receiver == 'Modified Settings') {
		try {
			sendResponse(JSON.parse(localStorage['Options']));
		} catch(e) {
			sendResponse(false);
		}
	}
});