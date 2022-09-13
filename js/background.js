chrome.runtime.onConnect.addListener(function (port) {
	port.onMessage.addListener(function (request) {
		if (request.message === 'pageRuler') {
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				chrome.tabs.captureVisibleTab(tabs[0].id, {format: 'png'}, function (bodyScreenshot) {
					console.log(bodyScreenshot);
					port.postMessage({message: bodyScreenshot});
				});
			});
		}
	});
});

chrome.action.onClicked.addListener(() => {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: 'extClicked'}, function (response) {
			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Farewell', response.farewell);
		});
	});
});
