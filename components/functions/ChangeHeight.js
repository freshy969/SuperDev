export default function ChangeHeight() {
	let allFeatures = JSON.parse(localStorage.getItem('allFeatures'));
	let [count, height] = [0, 0];
	allFeatures.map((value) => (value.isEnabled === true ? (count = count + 1) : (count = count)));
	height = count % 2 === 0 ? 41 + 18 + (count / 2) * 48 : 41 + 18 + ((count + 1) / 2) * 48;

	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: 'changeHeight', height: height}, function (response) {
			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Received Regarding Change Height', response.farewell);
		});
	});
}
