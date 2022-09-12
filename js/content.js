(() => {
	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		// Popup Removed on Navbar Click
		if (request.message === 'removePopup') {
			sendResponse({farewell: 'Popup Removed on Navbar Click'});
			if (document.getElementById('superDev') !== null) {
				document.getElementById('superDev').remove();
			}
		}

		// Height Change
		if (request.message === 'changeHeight') {
			setTimeout(iframeVisible, 0);
			function iframeVisible() {
				document.getElementById('superDevIframe').style.height = `${request.height}px`;
				document.getElementById('superDevIframe').style.visibility = 'visible';
			}
			sendResponse({farewell: 'Popup Height Changed'});
		}

		// Create/Remove Popup on Message from BackgroundJs
		if (request.message === 'extClicked') {
			// If Popup Exists, Remove It on Extension Click
			if (document.getElementById('superDev') !== null) {
				document.getElementById('superDev').remove();
				sendResponse({farewell: 'Existing Popup Removed'});
			}

			// Creating a Popup
			else {
				// Parent Div of Drag Button & Iframe
				let superDev = document.createElement('section');
				superDev.id = 'superDev';
				superDev.style.cssText = `
				position: fixed !important;
				top: 32px !important;
				right: 18px !important;
				background-color: rgba(0,0,0,0) !important;
				z-index: 2147483646 !important;`;
				document.body.appendChild(superDev);

				// Creating Drag Button
				let superDevHandler = document.createElement('div');
				superDevHandler.id = 'superDevHandler';
				superDevHandler.style.cssText = `
				position: relative !important;
				cursor: move !important;
				width: 18px !important;
				background-color: rgba(0,0,0,0) !important;
				height: 20px !important;
				margin-left:194px !important;
				margin-bottom: -30px !important;
				z-index: 2147483647 !important;`;
				document.getElementById('superDev').appendChild(superDevHandler);

				// Adding Iframe to Website's DOM
				let superDevIframe = document.createElement('iframe');
				superDevIframe.src = chrome.runtime.getURL('index.html');
				superDevIframe.id = 'superDevIframe';
				superDevIframe.scrolling = 'no';
				superDevIframe.style.cssText = `
				width: 345px !important;
				height: 539px !important;
				border: 0px !important;
				border-radius: 8px !important;
				display: block !important;
				background-color: rgba(0,0,0,0) !important;
				z-index: 2147483646 !important;
				overflow: hidden !important;
				visibility: hidden !important;`;
				document.getElementById('superDev').appendChild(superDevIframe);

				// Draggable Using JQuery and JQuery UI
				$('#superDev').draggable({
					handle: '#superDevHandler',
					cursor: 'move',
					iframeFix: true,
				});
			}
			sendResponse({farewell: 'Hidden Popup Created'});
		}

		// Text Editor
		if (request.message === 'textEditor') {
			// Deactivate Text Editor On Second Time Button Click
			if (request.action === 'deactivate') {
				document.querySelector('body').contentEditable = false;
				sendResponse({farewell: 'Text Uneditable Now'});
			}
			// Activate Text Editor On First Time Button Click
			else if (request.action === 'activate') {
				document.querySelector('body').contentEditable = true;
				document.querySelector('body').spellcheck = false;
				sendResponse({farewell: 'Text Editable Now'});
			}
		}
	});
})();
