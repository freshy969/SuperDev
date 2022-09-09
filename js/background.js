// On Extension Click, Send Message to ContentJs
// Taken from https://developer.chrome.com/docs/extensions/mv3/messaging/
chrome.action.onClicked.addListener(() => {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: 'extClicked'}, function (response) {
			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Received from ContentJS', response.farewell);
		});
	});
});
