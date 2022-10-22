export default function ChangeHeight(height) {
	chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
		let portFour = chrome.tabs.connect(tabs[0].id, {name: 'portFour'});
		portFour.postMessage({action: 'changeHeight', height: height});
		portFour.onMessage.addListener((response) => {
			console.log('Got Response : ', response.action);
		});
	});
}
