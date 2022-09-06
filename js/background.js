chrome.action.onClicked.addListener((tab) => {
	if (!tab.url.includes('chrome://')) {
		chrome.scripting.executeScript({
			target: {tabId: tab.id},
			function: popup,
		});
	}
});

function popup() {
	if (document.getElementById('superDevIframe') !== null) {
		document.getElementById('superDevIframe').remove();
		document.getElementById('superDevHandler').remove();
	} else {
		let superDev = document.createElement('div');
		superDev.id = 'superDev';
		document.body.appendChild(superDev);

		let topScroll = window.scrollY;

		superDev.style.cssText = `
		position: fixed !important;
		top: ${topScroll + 32}px !important;
		right: 18px !important;
		z-index: 2147483646 !important;`;

		let superDevHandler = document.createElement('div');
		superDevHandler.id = 'superDevHandler';
		document.getElementById('superDev').appendChild(superDevHandler);

		superDevHandler.style.cssText = `
		position: relative !important;
		cursor: move !important;
		width: 18px !important;
		background: rgba(0,0,0,0) !important;
		height: 20px !important;
		margin-left:322px !important;
		margin-bottom: -33px !important;
		z-index: 2147483647 !important;`;

		let superDevIframe = document.createElement('iframe');
		superDevIframe.src = chrome.runtime.getURL('../popups/index.html');
		superDevIframe.id = 'superDevIframe';
		document.getElementById('superDev').appendChild(superDevIframe);

		superDevIframe.style.cssText = `
		animation-duration: 0.5s !important;
		animation-timing-function: ease-in-out !important;
		animation-fill-mode: forwards !important;
		box-shadow: rgba(0, 0, 0, 0.09) 0px 0px 12px 0px !important;
		width: 412px !important;
		height: 625px !important;
		border: 0px !important;
		border-radius: 8px !important;
		transition: all 1s ease 0s !important;
		display: block !important;
		z-index: 2147483646 !important;`;

		$('#superDev').draggable({
			handle: '#superDevHandler',
			cursor: 'move',
			iframeFix: true,
		});
	}
}
