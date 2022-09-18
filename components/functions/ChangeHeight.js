export default function ChangeHeight(height) {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		let port = chrome.tabs.connect(tabs[0].id, {name: 'port'});
		port.postMessage({action: 'changeHeight', height: height});
		port.onMessage.addListener(function (response) {
			console.log('Got Response : ', response.action);
		});
	});
}
