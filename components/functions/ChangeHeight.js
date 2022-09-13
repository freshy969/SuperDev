export default function ChangeHeight(height) {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: 'changeHeight', height: height}, function (response) {
			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Farewell', response.farewell);
		});
	});
}
