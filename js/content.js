chrome.runtime.onConnect.addListener(function (port) {
	port.onMessage.addListener(function (request) {
		switch (request.message) {
			case 'extClicked':
				extClicked(port, request);
				break;
			case 'removePopup':
				removePopup(port, request);
				break;
			case 'changeHeight':
				changeHeight(port, request);
				break;
			case 'textEditor':
				textEditor(port, request);
				break;
			case 'pageRuler':
				pageRuler(port, request);
				break;
		}
	});
});

const extClicked = (port, request) => {
	if (document.getElementById('superDev') !== null) {
		document.getElementById('superDev').remove();

		port.postMessage({message: 'Popup Removed'});
	} else {
		let superDev = document.createElement('section');
		superDev.id = 'superDev';
		superDev.style.cssText = `
			position: fixed !important;
			top: 32px !important;
			right: 18px !important;
			background-color: rgba(0,0,0,0) !important;
			z-index: 2147483646 !important;`;
		document.body.appendChild(superDev);

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

		let superDevIframe = document.createElement('iframe');
		superDevIframe.src = chrome.runtime.getURL('index.html');
		superDevIframe.id = 'superDevIframe';
		superDevIframe.scrolling = 'no';
		superDevIframe.style.cssText = `
			width: 345px !important;
			border: 0px !important;
			border-radius: 8px !important;
			display: block !important;
			background-color: rgba(0,0,0,0) !important;
			z-index: 2147483646 !important;
			overflow: hidden !important;
			visibility: hidden !important;`;
		document.getElementById('superDev').appendChild(superDevIframe);

		$('#superDev').draggable({
			handle: '#superDevHandler',
			cursor: 'move',
			iframeFix: true,
		});

		port.postMessage({message: 'Popup Created'});
	}
};

const removePopup = (port, request) => {
	if (document.getElementById('superDev') !== null) {
		// Why postMessage is called here before action.
		// Because the sender (NavbarJs, part of iFrame) cannot receive
		// the message after we remove the whole iFrame from the DOM.
		port.postMessage({message: 'Popup Removed'});
		document.getElementById('superDev').remove();
	}
};

const changeHeight = (port, request) => {
	document.getElementById('superDevIframe').style.height = `${request.height}px`;
	document.getElementById('superDevIframe').style.visibility = 'visible';
	port.postMessage({message: 'Height Changed'});
};

const textEditor = (port, request) => {
	if (request.action === 'deactivate') {
		document.querySelector('body').contentEditable = false;
		port.postMessage({message: 'Text Uneditable Now'});
	} else if (request.action === 'activate') {
		document.querySelector('body').contentEditable = true;
		document.querySelector('body').spellcheck = false;
		port.postMessage({message: 'Text Editable Now'});
	}
};

const pageRuler = (port, request) => {
	// //Draw Canvas (Not Appended to DOM Yet)
	// let bodyArea = document.querySelector('body');
	// let canvas = document.createElement('canvas');
	// let ctx = canvas.getContext('2d');

	let portThree = chrome.runtime.connect({name: 'portThree'});
	portThree.postMessage({message: 'bodyScreenshot'});
	portThree.onMessage.addListener(function (request) {
		port.postMessage({message: request.message});
	});

	// let image = document.getElementById('rulerImg');
	// ctx.drawImage(image, 0, 0, image.width, image.height);
	// let imgData = ctx.getImageData(0, 0, bodyArea.clientWidth, bodyArea.clientHeight).data;
};
