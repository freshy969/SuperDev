export default function JustChangeHeight(height) {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		let portFour = chrome.tabs.connect(tabs[0].id, {name: 'portFour'});
		portFour.postMessage({action: 'justChangeHeight', height: height});
		portFour.onMessage.addListener(function (response) {
			console.log('Got Response : ', response.action);
		});
	});
}
