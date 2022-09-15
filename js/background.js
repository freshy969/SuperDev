chrome.runtime.onConnect.addListener(function (port) {
	port.onMessage.addListener(function (request) {
		if (request.action === 'bodyScreenshot') {
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				chrome.tabs.captureVisibleTab({format: 'png'}, function (bodyScreenshot) {
					port.postMessage({action: 'bodyScreenshotDone', bodyScreenshot: bodyScreenshot});
				});
			});
		}
	});
});

chrome.action.onClicked.addListener(() => {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		let portOne = chrome.tabs.connect(tabs[0].id, {name: 'portOne'});
		portOne.postMessage({action: 'extClicked'});
		portOne.onMessage.addListener(function (response) {
			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Action', response.action);
		});
	});
});
