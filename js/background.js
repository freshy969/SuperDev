chrome.action.onClicked.addListener((tab) => {
	if (!tab.url.includes('chrome://')) {
		chrome.scripting.executeScript({
			target: {tabId: tab.id},
			function: popup,
		});
	}
});

function popup() {
	if (document.getElementById('iframeOne') !== null) {
		document.getElementById('iframeOne').remove();
	} else {
		let iframe = document.createElement('iframe');
		iframe.src = chrome.runtime.getURL('../popups/index.html');
		iframe.id = 'iframeOne';
		document.body.appendChild(iframe);

		chrome.storage.sync.get(['indexDim', 'indexPos'], function (result) {
			iframe.style.cssText = `position: fixed; width: ${result.indexDim[0]}px; height: ${result.indexDim[1]}px; top: ${result.indexPos[0]}px; right: ${result.indexPos[0]}px; border: 0; border-radius: 8px; display: block; z-index: 99999999; transition: 1s; box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.09); transition-timing-function: ease-out; animation-duration: 0.5s; animation-timing-function: ease-in-out; animation-fill-mode: forwards;`;
		});
	}
}
