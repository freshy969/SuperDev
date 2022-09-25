chrome.runtime.onConnect.addListener(function (port) {
	port.onMessage.addListener(function (request) {
		switch (request.action) {
			case 'showHideExtension':
				showHideExtension(port, request);
				break;
			case 'changeHeight':
				changeHeight(port, request);
				break;
			case 'justChangeHeight':
				justChangeHeight(port, request);
				break;
			case 'activateTextEditor':
				activateTextEditor(port, request);
				break;
			case 'deactivateTextEditor':
				deactivateTextEditor(port, request);
				break;
			case 'activatePageRuler':
				activatePageRuler(port, request);
				break;
			case 'deactivatePageRuler':
				deactivatePageRuler(port, request);
				break;
			case 'activatePageGuidelines':
				activatePageGuidelines(port, request);
				break;
			case 'deactivatePageGuidelines':
				deactivatePageGuidelines(port, request);
				break;
			case 'activateMoveElement':
				activateMoveElement(port, request);
				break;
			case 'deactivateMoveElement':
				deactivateMoveElement(port, request);
				break;
		}
	});
});

const showHideExtension = (port, request) => {
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
			z-index: 2147483646 !important;
			visibility: hidden !important`;
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

		let superDevIframe = document.createElement('iframe');
		superDevIframe.src = chrome.runtime.getURL('index.html');
		superDevIframe.id = 'superDevIframe';
		superDevIframe.scrolling = 'no';
		superDevIframe.style.cssText = `
			width: 335px !important;
			border: 0px !important;
			border-radius: 8px !important;
			display: block !important;
			background-color: rgba(0,0,0,0) !important;
			z-index: 2147483646 !important;
			overflow: hidden !important;`;
		document.querySelector('#superDev').appendChild(superDevIframe);

		$('#superDev').draggable({
			handle: '#superDevHandler',
			iframeFix: true,
		});
		port.postMessage({action: 'Popup Created'});
	}
	// If Popup Visible, Set Hidden
	else if (document.querySelector('#superDev').style.visibility !== 'hidden') {
		chrome.storage.local.set({isPopupHidden: true});
		chrome.storage.local.set({disableActiveFeature: true});
		document.querySelector('#superDev').style.visibility = 'hidden';
		port.postMessage({action: 'Popup Hidden'});
	}
	// If Popup Hidden, Set Visible
	else {
		// Reset on Visible
		chrome.storage.local.set({setMinimised: false});
		chrome.storage.local.set({isPopupPaused: false});
		chrome.storage.local.set({isPopupHidden: false});
		chrome.storage.local.set({disableActiveFeature: false});
		chrome.storage.local.set({whichFeatureActive: null});

		document.querySelector('#superDev').style.top = '32px';
		document.querySelector('#superDev').style.right = '18px';
		document.querySelector('#superDev').style.left = '';
		document.querySelector('#superDev').style.visibility = 'visible';
		port.postMessage({action: 'Popup Visible'});
	}
};

const changeHeight = (port, request) => {
	document.querySelector('#superDevIframe').style.height = `${request.height}px`;
	if (document.querySelector('#superDev').style.visibility === 'hidden')
		document.querySelector('#superDevIframe').onload = document.querySelector('#superDev').style.visibility = 'visible';
	port.postMessage({action: 'Height Changed'});
};

const justChangeHeight = (port, request) => {
	document.querySelector('#superDevIframe').style.height = `${request.height}px`;
	port.postMessage({action: 'Just Height Changed'});
};

const activateTextEditor = (port, request) => {
	window.addEventListener('keyup', detectEscape);
	window.addEventListener('mouseover', detectMouseOver);
	window.addEventListener('mouseout', detectMouseOut);

	let pageGuidelinesWrapper = document.createElement('div');
	pageGuidelinesWrapper.classList.add('pageGuidelinesWrapper');
	document.body.appendChild(pageGuidelinesWrapper);

	function detectEscape(event) {
		event.preventDefault();
		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				destroyTextEditor(true);
			} else if (event.isTrusted === false) {
				destroyTextEditor(false);
			}
		}
	}

	function detectMouseOver(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			if (event.target.innerText !== '') {
				event.target.setAttribute('contenteditable', true);
				event.target.setAttribute('spellcheck', false);
				event.target.classList.add('pageGuidelinesOutline');
				renderPageGuidelines(true);
				event.target.focus();
			}
		}
	}

	function detectMouseOut(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			if (event.target.classList.contains('pageGuidelinesOutline')) {
				event.target.style.outline = 'none';
				event.target.removeAttribute('contenteditable', true);
				event.target.removeAttribute('spellcheck', false);
				event.target.classList.remove('pageGuidelinesOutline');
				renderPageGuidelines(false);
			}
		}
	}

	function destroyTextEditor(isManualEscape) {
		window.removeEventListener('mouseover', detectMouseOver);
		window.removeEventListener('mouseout', detectMouseOut);
		window.removeEventListener('keyup', detectEscape);

		if (isManualEscape === true) {
			if (document.querySelector('.pageGuidelinesOutline')) {
				document.querySelector('.pageGuidelinesOutline').style.outline = 'none';
				document.querySelector('.pageGuidelinesOutline').removeAttribute('contenteditable', true);
				document.querySelector('.pageGuidelinesOutline').removeAttribute('spellcheck', false);
				document.querySelector('.pageGuidelinesOutline').style.outline = 'none';
				document.querySelector('.pageGuidelinesOutline').classList.remove('pageGuidelinesOutline');
			}
			chrome.storage.local.set({disableActiveFeature: true});
		}

		chrome.storage.local.get(['isPopupPaused'], function (result) {
			if (result.isPopupPaused === true || isManualEscape === true) {
				chrome.storage.local.set({setMinimised: false});
				chrome.storage.local.set({isPopupPaused: false});
			}
		});

		document.querySelector('.pageGuidelinesWrapper').remove();
	}

	function renderPageGuidelines(toShow) {
		if (toShow === true) {
			let pageGuidelinesPosition = document.querySelector('.pageGuidelinesOutline').getBoundingClientRect();
			let scrollWidth = document.body.scrollWidth;
			let scrollHeight = document.body.scrollHeight;
			let top = pageGuidelinesPosition.top + document.documentElement.scrollTop;
			let bottom = pageGuidelinesPosition.bottom + document.documentElement.scrollTop;
			let left = pageGuidelinesPosition.left;
			let right = pageGuidelinesPosition.right;

			pageGuidelinesWrapper.innerHTML = `
			<svg  width="100%" viewBox="0 0 ${scrollWidth} ${scrollHeight}" version="1.1"
			xmlns="http://www.w3.org/2000/svg">
				<rect fill="none" width="${scrollWidth}" height="${scrollHeight}" x="${left}" y="${top}" style="display:none;">
				</rect>
					<line x1="${left}" y1="0" x2="${left}" y2="${scrollHeight}"></line>
					<line x1="${right}" y1="0" x2="${right}" y2="${scrollHeight}"></line>
					<line x1="0" y1="${top}" x2="${scrollWidth}" y2="${top}"></line>
					<line x1="0" y1="${bottom}" x2="${scrollWidth}" y2="${bottom}"></line>
			</svg>`;
		} else {
			pageGuidelinesWrapper.innerHTML = ``;
		}
	}

	port.postMessage({action: 'Text Editor Activated'});
	chrome.storage.local.set({setMinimised: true});
};

const deactivateTextEditor = (port, request) => {
	window.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Text Editor Deactivated'});
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
	overlay.className = 'rulerOverlay';

	portThree.onMessage.addListener(function (request) {
		if (connectionClosed) return;

		switch (request.action) {
			// Was Added
			case 'parseScreenshot':
				parseScreenshot(request.dataUrl);
				break;
			// Was Added
			case 'distances':
				window.focus();
				showDimensions(request.data);
				break;
			case 'screenshotProcessed':
				resume();
				break;
		}
	});

	if (document.querySelector('#superDev').style.visibility !== 'hidden') {
		document.querySelector('#superDev').style.visibility = 'hidden';
		port.postMessage({action: 'Popup Hidden'});
		onResizeWindow(), initiate();
		port.postMessage({action: 'Page Ruler Activated'});
	}

	function initiate() {
		window.addEventListener('mousemove', onInputMove);
		window.addEventListener('touchmove', onInputMove);
		window.addEventListener('scroll', onVisibleAreaChange);
		window.addEventListener('resize', onVisibleAreaChange);
		window.addEventListener('keyup', detectEscape);

		disableCursor();
		requestNewScreenshot();
	}

	// Was Added
	function parseScreenshot(dataUrl) {
		// Show Minimised Popup After Screenshot is Done
		chrome.storage.local.set({setMinimised: true});

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

	function destroyPageRuler(isManualEscape) {
		connectionClosed = true;
		window.removeEventListener('mousemove', onInputMove);
		window.removeEventListener('touchmove', onInputMove);
		window.removeEventListener('scroll', onVisibleAreaChange);
		window.removeEventListener('resize', onVisibleAreaChange);
		window.removeEventListener('keyup', detectEscape);

		if (isManualEscape === true) {
			chrome.storage.local.set({disableActiveFeature: true});
		}

		chrome.storage.local.get(['isPopupPaused'], function (result) {
			if (result.isPopupPaused === true || isManualEscape === true) {
				chrome.storage.local.set({setMinimised: false});
				chrome.storage.local.set({isPopupPaused: false});
			}
		});

		removeDimensions();
		enableCursor();
	}

	function removeDimensions() {
		let dimensions = body.querySelector('.rulerDimensions');
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
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
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
		event.preventDefault();
		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				destroyPageRuler(true);
			} else if (event.isTrusted === false) {
				destroyPageRuler(false);
			}
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
		newDimensions.className = 'rulerDimensions';
		newDimensions.style.left = dimensions.x + 'px';
		newDimensions.style.top = dimensions.y + 'px';

		let measureWidth = dimensions.left + dimensions.right;
		let measureHeight = dimensions.top + dimensions.bottom;

		let xAxis = document.createElement('div');
		xAxis.className = 'x rulerAxis';
		xAxis.style.left = -dimensions.left + 'px';
		xAxis.style.width = measureWidth + 'px';

		let yAxis = document.createElement('div');
		yAxis.className = 'y rulerAxis';
		yAxis.style.top = -dimensions.top + 'px';
		yAxis.style.height = measureHeight + 'px';

		let tooltip = document.createElement('div');
		tooltip.className = 'rulerTooltip';

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
	window.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Page Ruler Deactivated'});
};

const activatePageGuidelines = (port, request) => {
	window.addEventListener('keyup', detectEscape);
	window.addEventListener('mouseover', detectMouseOver);
	window.addEventListener('mouseout', detectMouseOut);

	let pageGuidelinesWrapper = document.createElement('div');
	pageGuidelinesWrapper.classList.add('pageGuidelinesWrapper');
	document.body.appendChild(pageGuidelinesWrapper);

	function detectEscape(event) {
		event.preventDefault();
		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				destroyPageGuidelines(true);
			} else if (event.isTrusted === false) {
				destroyPageGuidelines(false);
			}
		}
	}

	function detectMouseOver(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			event.target.classList.add('pageGuidelinesOutline');
			renderPageGuidelines(true);
			event.target.focus();
		}
	}

	function detectMouseOut(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			event.target.style.outline = 'none';
			renderPageGuidelines(false);
			event.target.classList.remove('pageGuidelinesOutline');
		}
	}

	function destroyPageGuidelines(isManualEscape) {
		window.removeEventListener('mouseover', detectMouseOver);
		window.removeEventListener('mouseout', detectMouseOut);
		window.removeEventListener('keyup', detectEscape);

		if (isManualEscape === true) {
			document.querySelector('.pageGuidelinesOutline').style.outline = 'none';
			document.querySelector('.pageGuidelinesOutline').classList.remove('pageGuidelinesOutline');
			chrome.storage.local.set({disableActiveFeature: true});
		}

		chrome.storage.local.get(['isPopupPaused'], function (result) {
			if (result.isPopupPaused === true || isManualEscape === true) {
				chrome.storage.local.set({setMinimised: false});
				chrome.storage.local.set({isPopupPaused: false});
			}
		});

		document.querySelector('.pageGuidelinesWrapper').remove();
	}

	function renderPageGuidelines(toShow) {
		if (toShow === true) {
			let pageGuidelinesPosition = document.querySelector('.pageGuidelinesOutline').getBoundingClientRect();
			let scrollWidth = document.body.scrollWidth;
			let scrollHeight = document.body.scrollHeight;
			let top = pageGuidelinesPosition.top + document.documentElement.scrollTop;
			let bottom = pageGuidelinesPosition.bottom + document.documentElement.scrollTop;
			let left = pageGuidelinesPosition.left;
			let right = pageGuidelinesPosition.right;

			pageGuidelinesWrapper.innerHTML = `
			<svg  width="100%" viewBox="0 0 ${scrollWidth} ${scrollHeight}" version="1.1"
			xmlns="http://www.w3.org/2000/svg">
				<rect fill="none" width="${scrollWidth}" height="${scrollHeight}" x="${left}" y="${top}" style="display:none;">
				</rect>
					<line x1="${left}" y1="0" x2="${left}" y2="${scrollHeight}"></line>
					<line x1="${right}" y1="0" x2="${right}" y2="${scrollHeight}"></line>
					<line x1="0" y1="${top}" x2="${scrollWidth}" y2="${top}"></line>
					<line x1="0" y1="${bottom}" x2="${scrollWidth}" y2="${bottom}"></line>
			</svg>`;
		} else {
			pageGuidelinesWrapper.innerHTML = ``;
		}
	}

	port.postMessage({action: 'Page Guidelines Activated'});
	chrome.storage.local.set({setMinimised: true});
};

const deactivatePageGuidelines = (port, request) => {
	window.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Page Guidelines Deactivated'});
};

const activateMoveElement = (port, request) => {
	window.addEventListener('keyup', detectEscape);
	window.addEventListener('mouseover', detectMouseOver);
	window.addEventListener('mouseout', detectMouseOut);
	window.addEventListener('click', detectMouseClick);

	let pageGuidelinesWrapper = document.createElement('div');
	pageGuidelinesWrapper.classList.add('pageGuidelinesWrapper');
	document.body.appendChild(pageGuidelinesWrapper);

	function detectEscape(event) {
		event.preventDefault();
		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				destroyMoveElement(true);
			} else if (event.isTrusted === false) {
				destroyMoveElement(false);
			}
		}
	}

	function detectMouseOver(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			event.target.classList.add('pageGuidelinesOutline');
			renderPageGuidelines(true);
			event.target.focus();
		}
	}

	function detectMouseOut(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			event.target.style.outline = 'none';
			renderPageGuidelines(false);
			event.target.classList.remove('pageGuidelinesOutline');
		}
	}

	function detectMouseClick(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			renderPageGuidelines(false);
			event.target.classList.add('moveElementDraggable');
			$('.moveElementDraggable').draggable({iframeFix: true});
		}
	}

	function destroyMoveElement(isManualEscape) {
		window.removeEventListener('mouseover', detectMouseOver);
		window.removeEventListener('mouseout', detectMouseOut);
		window.removeEventListener('keyup', detectEscape);
		window.removeEventListener('click', detectMouseClick);

		if (isManualEscape === true) {
			document.querySelector('.pageGuidelinesOutline').style.outline = 'none';
			document.querySelector('.pageGuidelinesOutline').classList.remove('pageGuidelinesOutline');
			chrome.storage.local.set({disableActiveFeature: true});
		}

		chrome.storage.local.get(['isPopupPaused'], function (result) {
			if (result.isPopupPaused === true || isManualEscape === true) {
				chrome.storage.local.set({setMinimised: false});
				chrome.storage.local.set({isPopupPaused: false});
			}
		});

		$('.moveElementDraggable').draggable('destroy');
		document.querySelector('.moveElementDraggable').classList.remove('moveElementDraggable');
		document.querySelector('.pageGuidelinesWrapper').remove();
	}

	function renderPageGuidelines(toShow) {
		if (toShow === true) {
			let pageGuidelinesPosition = document.querySelector('.pageGuidelinesOutline').getBoundingClientRect();
			let scrollWidth = document.body.scrollWidth;
			let scrollHeight = document.body.scrollHeight;
			let top = pageGuidelinesPosition.top + document.documentElement.scrollTop;
			let bottom = pageGuidelinesPosition.bottom + document.documentElement.scrollTop;
			let left = pageGuidelinesPosition.left;
			let right = pageGuidelinesPosition.right;

			pageGuidelinesWrapper.innerHTML = `
			<svg  width="100%" viewBox="0 0 ${scrollWidth} ${scrollHeight}" version="1.1"
			xmlns="http://www.w3.org/2000/svg">
				<rect fill="none" width="${scrollWidth}" height="${scrollHeight}" x="${left}" y="${top}" style="display:none;">
				</rect>
					<line x1="${left}" y1="0" x2="${left}" y2="${scrollHeight}"></line>
					<line x1="${right}" y1="0" x2="${right}" y2="${scrollHeight}"></line>
					<line x1="0" y1="${top}" x2="${scrollWidth}" y2="${top}"></line>
					<line x1="0" y1="${bottom}" x2="${scrollWidth}" y2="${bottom}"></line>
			</svg>`;
		} else {
			pageGuidelinesWrapper.innerHTML = ``;
		}
	}

	port.postMessage({action: 'Move Element Activated'});
	chrome.storage.local.set({setMinimised: true});
};

const deactivateMoveElement = (port, request) => {
	window.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Move Element Deactivated'});
};
