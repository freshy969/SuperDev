chrome.runtime.onConnect.addListener(function (port) {
	port.onMessage.addListener(function (request) {
		switch (request.action) {
			case 'showHideExtension':
				showHideExtension(port, request);
				break;
			case 'activateTextEditor':
				activateTextEditor(port, request);
				break;
			case 'deactivateTextEditor':
				deactivateTextEditor(port, request);
				break;
			case 'activatePageRuler':
				document.querySelector('#superDev').style.visibility = 'hidden';
				activatePageRuler(port, request);
				break;
			case 'deactivatePageRuler':
				deactivatePageRuler(port, request);
				break;
		}
	});
});

const showHideExtension = (port, request) => {
	chrome.storage.sync.set({isHidden: false});
	// If Popup Doesn't Exists
	if (document.querySelector('#superDev') === null) {
		let superDev = document.createElement('section');
		superDev.id = 'superDev';
		superDev.style.cssText = `
			position: fixed !important;
			top: 32px !important;
			right: 18px !important;
			width: 335px !important;
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
			margin-left:141px !important;
			margin-bottom: -31px !important;
			z-index: 2147483647 !important;`;
		document.querySelector('#superDev').appendChild(superDevHandler);

		let superDevBody = document.createElement('div');
		superDevBody.id = 'superDevBody';
		superDevBody.style.cssText = `
			width: 335px !important;
			border: 0px !important;
			border-radius: 8px !important;
			display: block !important;
			background-color: rgba(0,0,0,0) !important;
			z-index: 2147483646 !important;
			overflow: hidden !important;`;
		document.querySelector('#superDev').appendChild(superDevBody);

		$('#superDev').draggable({
			handle: '#superDevHandler',
			cursor: 'move',
			iframeFix: true,
		});
		port.postMessage({action: 'Popup Created'});
	}
	// If Popup Visible
	else if (document.querySelector('#superDev').style.visibility !== 'hidden') {
		chrome.storage.sync.set({isHidden: true});
		document.querySelector('#superDev').style.visibility = 'hidden';
		port.postMessage({action: 'Popup Hidden'});
	}
	// If Popup Hidden
	else {
		chrome.storage.sync.set({isHidden: false});
		// Take Popup back to its Orignal Position on Reopen
		document.querySelector('#superDev').style.top = '32px';
		document.querySelector('#superDev').style.right = '18px';
		document.querySelector('#superDev').style.left = '';
		//
		document.querySelector('#superDev').style.visibility = 'visible';

		port.postMessage({action: 'Popup Visible'});
	}
};

const activateTextEditor = (port, request) => {
	document.querySelector('body').contentEditable = true;
	document.querySelector('body').spellcheck = false;
	port.postMessage({action: 'Text Editable Now'});
};

const deactivateTextEditor = (port, request) => {
	document.querySelector('body').contentEditable = false;
	port.postMessage({action: 'Text Uneditable Now'});
};

const activatePageRuler = (port, request) => {
	// Was Added
	let image = new Image();
	let canvas = document.createElement('canvas');
	let ctx = canvas.getContext('2d', {willReadFrequently: true});
	// Was Added
	let body = document.querySelector('body');
	let portThree = chrome.runtime.connect({name: 'portThree'});
	let changeDelay = 300;
	let changeTimeout;
	let paused = true;
	let inputX, inputY;
	let connectionClosed = false;
	let overlay = document.createElement('div');
	overlay.className = 'sd-cursorCrosshair';

	portThree.onMessage.addListener(function (request) {
		if (connectionClosed) return;

		switch (request.action) {
			// Was Added
			case 'parseScreenshot':
				parseScreenshot(request.dataUrl);
				break;
			// Was Added
			case 'distances':
				showDimensions(request.data);
				break;
			case 'screenshotProcessed':
				resume();
				break;
		}
	});

	onResizeWindow(), initiate();
	port.postMessage({action: 'Page Ruler Activated'});

	function initiate() {
		window.addEventListener('mousemove', onInputMove);
		window.addEventListener('touchmove', onInputMove);
		window.addEventListener('scroll', onVisibleAreaChange);
		window.addEventListener('resize', onVisibleAreaChange);
		window.addEventListener('keydown', detectEscape);

		disableCursor();
		requestNewScreenshot();
	}

	// Was Added
	function parseScreenshot(dataUrl) {
		// Show Minimised Popup After Screenshot is Done
		document.querySelector('#superDev').style.top = '32px';
		document.querySelector('#superDev').style.right = '18px';
		document.querySelector('#superDev').style.left = '';
		document.querySelector('#superDevBody').style.height = '42px';
		document.querySelector('#superDev').style.visibility = 'visible';

		image.src = dataUrl;
		image.onload = function () {
			loadImage();
		};
	}

	function loadImage() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
		let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

		portThree.postMessage({
			action: 'imageData',
			imageData: Array.from(imageData),
			width: canvas.width,
			height: canvas.height,
		});
	}
	// Was Added

	function onResizeWindow() {
		overlay.width = window.innerWidth;
		overlay.height = window.innerHeight;
		onVisibleAreaChange();
	}

	function destroyPageRuler() {
		connectionClosed = true;
		window.removeEventListener('mousemove', onInputMove);
		window.removeEventListener('touchmove', onInputMove);
		window.removeEventListener('scroll', onVisibleAreaChange);
		window.removeEventListener('resize', onVisibleAreaChange);
		window.removeEventListener('keypress', detectEscape);

		removeDimensions();
		enableCursor();
	}

	function removeDimensions() {
		let dimensions = body.querySelector('.sd-rulerDimensions');
		if (dimensions) body.removeChild(dimensions);
	}

	function onVisibleAreaChange() {
		if (!paused) pause();
		else return;

		if (changeTimeout) clearTimeout(changeTimeout);

		changeTimeout = setTimeout(requestNewScreenshot, changeDelay);
	}

	function requestNewScreenshot() {
		portThree.postMessage({action: 'takeScreenshot'});
	}

	function pause() {
		paused = true;
		removeDimensions();
		enableCursor();
	}

	function resume() {
		paused = false;
		disableCursor();
	}

	function disableCursor() {
		body.appendChild(overlay);
	}

	function enableCursor() {
		body.removeChild(overlay);
	}

	function onInputMove(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevBody' && event.target.id !== 'superDev') {
			if (event.touches) {
				inputX = event.touches[0].clientX;
				inputY = event.touches[0].clientY;
			} else {
				inputX = event.clientX;
				inputY = event.clientY;
			}
			sendToWorker(event);
		} else {
			removeDimensions();
		}
	}

	function detectEscape(event) {
		console.log(event);
		if (event.key === 'Escape') {
			destroyPageRuler();
		}
	}

	function sendToWorker(event) {
		if (paused) return;

		portThree.postMessage({
			action: 'position',
			data: {x: inputX, y: inputY},
		});
	}

	function showDimensions(dimensions) {
		if (paused) return;

		removeDimensions();
		if (!dimensions) return;

		let newDimensions = document.createElement('div');
		newDimensions.className = 'sd-rulerDimensions';
		newDimensions.style.left = dimensions.x + 'px';
		newDimensions.style.top = dimensions.y + 'px';

		let measureWidth = dimensions.left + dimensions.right;
		let measureHeight = dimensions.top + dimensions.bottom;

		let xAxis = document.createElement('div');
		xAxis.className = 'x sd-rulerAxis';
		xAxis.style.left = -dimensions.left + 'px';
		xAxis.style.width = measureWidth + 'px';

		let yAxis = document.createElement('div');
		yAxis.className = 'y sd-rulerAxis';
		yAxis.style.top = -dimensions.top + 'px';
		yAxis.style.height = measureHeight + 'px';

		let tooltip = document.createElement('div');
		tooltip.className = 'sd-rulerTooltip';

		tooltip.textContent = measureWidth + 1 + ' x ' + (measureHeight + 1) + ' px';

		if (dimensions.y < 40) tooltip.classList.add('bottom');

		if (dimensions.x > window.innerWidth - 120) tooltip.classList.add('left');

		newDimensions.appendChild(xAxis);
		newDimensions.appendChild(yAxis);
		newDimensions.appendChild(tooltip);

		body.appendChild(newDimensions);
	}
};

const deactivatePageRuler = (port, request) => {
	window.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
	port.postMessage({action: 'Page Ruler Deactivated'});
};
