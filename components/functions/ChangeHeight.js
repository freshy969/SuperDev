export default function ChangeHeight(height) {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		let portTwo = chrome.tabs.connect(tabs[0].id, {name: 'portTwo'});
		portTwo.postMessage({action: 'changeHeight', height: height});
		portTwo.onMessage.addListener(function (response) {
			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Action', response.action);
		});
	});
}
