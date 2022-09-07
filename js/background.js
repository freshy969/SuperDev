// On Extention Icon Click, Run Popup Function
chrome.action.onClicked.addListener((tab) => {
	if (!tab.url.includes('chrome://')) {
		chrome.scripting.executeScript({
			target: {tabId: tab.id},
			function: popup,
		});
	}
});

function popup() {
	// If Popup Exists, Remove Everything on Extension Icon Click
	if (document.getElementById('superDev') !== null) {
		document.getElementById('superDev').remove();
	}

	// Create Create a Popup
	else {
		// Creating Parent Div of Drag Button & Iframe
		let superDev = document.createElement('div');
		superDev.id = 'superDev';
		document.body.appendChild(superDev);

		// Parent Div Position from Top & Right
		let topScroll = window.scrollY;
		superDev.style.cssText = `
		position: fixed !important;
		top: ${topScroll + 32}px !important;
		right: 18px !important;
		z-index: 2147483646 !important;`;

		// Creating Drag Button
		let superDevHandler = document.createElement('div');
		superDevHandler.id = 'superDevHandler';
		document.getElementById('superDev').appendChild(superDevHandler);

		// Styling Drag Button
		superDevHandler.style.cssText = `
		position: relative !important;
		cursor: move !important;
		width: 18px !important;
		background: rgba(0,0,0,0) !important;
		height: 20px !important;
		margin-left:225px !important;
		margin-bottom: -30px !important;
		z-index: 2147483647 !important;`;

		// Adding Iframe to Website's DOM
		let superDevIframe = document.createElement('iframe');
		superDevIframe.src = chrome.runtime.getURL('index.html');
		superDevIframe.id = 'superDevIframe';
		document.getElementById('superDev').appendChild(superDevIframe);

		// Styling Iframe
		superDevIframe.style.cssText = `
		animation-duration: 0.5s !important;
		animation-timing-function: ease-in-out !important;
		animation-fill-mode: forwards !important;
		box-shadow: rgba(0, 0, 0, 0.09) 0px 0px 12px 0px !important;
		width: 340px !important;
		height: 537px !important;
		border: 0px !important;
		border-radius: 8px !important;
		transition: all 1s ease 0s !important;
		display: block !important;
		box-sizing: border-box;
		z-index: 2147483646 !important;`;

		// Draggable Using JQuery and JQuery UI
		$('#superDev').draggable({
			handle: '#superDevHandler',
			cursor: 'move',
			iframeFix: true,
		});
	}
}
