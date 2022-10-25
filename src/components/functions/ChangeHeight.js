export default function ChangeHeight(height) {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		let portThree = chrome.tabs.connect(tabs[0].id, {name: 'portThree'});
		portThree.postMessage({action: 'changeHeight', height: height});
	});
}
