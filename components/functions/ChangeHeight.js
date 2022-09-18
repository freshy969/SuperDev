export default function ChangeHeight(height) {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		let portFour = chrome.tabs.connect(tabs[0].id, {name: 'portFour'});
		portFour.postMessage({action: 'changeHeight', height: height});
		portFour.onMessage.addListener(function (response) {
			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Action', response.action);
		});
	});
}
