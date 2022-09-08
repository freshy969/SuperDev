(() => {
	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		// Remove Popup on Message from NavbarJs
		if (request.message === 'removePopup') {
			console.log('Message Received From NavbarJs (removePopup) : ', request);
			console.log('These are the Sender Details :', sender);

			// Replying NavbarJs
			sendResponse({farewell: 'Popup Removed on Navbar XMark Icon Click'});

			// Remove Popup
			if (document.getElementById('superDev') !== null) {
				document.getElementById('superDev').remove();
			}
		}

		// Height Change
		if (request.message === 'changeHeight') {
			console.log(request.height);
			superDevIframe.style.cssText = `
			animation-duration: 0s !important;
			animation-timing-function: ease-in-out !important;
			aimation-fill-mode: forwards !important;
			box-shadow: rgba(0, 0, 0, 0.09) 0px 0px 12px 0px !important;
			width: 340px !important;
			height: ${request.height}px !important;
			border: 0px !important;
			border-radius: 8px !important;
			transition: all 0s ease 0s !important;
			display: block !important;
			box-sizing: border-box;
			background-color: rgba(0,0,0,0) !important;
			z-index: 2147483646 !important;
			`;
			sendResponse({farewell: 'Height Changed Successfully'});
		}

		// Create/Remove Popup on Message from BackgroundJs
		if (request.message === 'extClicked') {
			console.log('Message Received From BackgroundJs : ', request);
			console.log('These are the Sender Details :', sender);

			// If Popup Exists, Remove It on Extension Click
			if (document.getElementById('superDev') !== null) {
				document.getElementById('superDev').remove();
			}

			// Creating a Popup
			else {
				// Parent Div of Drag Button & Iframe
				let superDev = document.createElement('div');
				superDev.id = 'superDev';
				document.body.appendChild(superDev);

				// Parent Div Position from Top & Right
				superDev.style.cssText = `
				position: fixed !important;
				top: 32px !important;
				right: 18px !important;
				background-color: rgba(0,0,0,0) !important;
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
				background-color: rgba(0,0,0,0) !important;
				height: 20px !important;
				margin-left:194px !important;
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
				box-sizing: border-box;
				width: 340px !important;
				height: 538.5px !important;
				border: 0px !important;
				border-radius: 8px !important;
				transition: all 1s ease 0s !important;
				display: block !important;
				background-color: rgba(0,0,0,0) !important;
				z-index: 2147483646 !important;`;

				// Draggable Using JQuery and JQuery UI
				$('#superDev').draggable({
					handle: '#superDevHandler',
					cursor: 'move',
					iframeFix: true,
				});
			}

			// Replying BackgroundJs
			sendResponse({farewell: 'Popup Created/Removed on Extension Icon Click'});
		}
	});
})();
