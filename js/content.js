(() => {
	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		// Popup Removed on Navbar Click
		if (request.message === 'removePopup') {
			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Received From NavbarJs', request.message);
			sendResponse({farewell: 'Popup Removed on Navbar Click'});
			if (document.getElementById('superDev') !== null) {
				document.getElementById('superDev').remove();
			}
		}

		// Height Change
		if (request.message === 'changeHeight') {
			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Received Height From Body/Navbar', request.height);
			setTimeout(iframeVisible, 0);
			function iframeVisible() {
				document.getElementById('superDevIframe').style.height = `${request.height}px`;
				document.getElementById('superDevIframe').style.visibility = 'visible';
				console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Popup Visible + Height Change After 100ms', request.message);
			}
			sendResponse({farewell: 'Height Changed'});
		}

		// Create/Remove Popup on Message from BackgroundJs
		if (request.message === 'extClicked') {
			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Received From BackgroundJs', request.message);

			// If Popup Exists, Remove It on Extension Click
			if (document.getElementById('superDev') !== null) {
				document.getElementById('superDev').remove();
				console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Popup Already Exists, Removing', request.message);
			}

			// Creating a Popup
			else {
				// Parent Div of Drag Button & Iframe
				let superDev = document.createElement('div');
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
				height: 538.5px !important;
				border: 0px !important;
				border-radius: 8px !important;
				display: block !important;
				background-color: rgba(0,0,0,0) !important;
				z-index: 2147483646 !important;
				overflow: hidden !important;
				visibility: hidden !important;`;
				document.getElementById('superDev').appendChild(superDevIframe);

				console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Popup Non Existent, Adding Hidden One', request.message);

				// Draggable Using JQuery and JQuery UI
				$('#superDev').draggable({
					handle: '#superDevHandler',
					cursor: 'move',
					iframeFix: true,
				});
			}

			// Replying BackgroundJs
			sendResponse({farewell: 'Popup Created/Removed'});
		}
	});
})();
