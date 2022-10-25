export default function JustChangeHeight(height) {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		let portThree = chrome.tabs.connect(tabs[0].id, {name: 'portThree'});
		portThree.postMessage({action: 'justChangeHeight', height: height});
	});
}
