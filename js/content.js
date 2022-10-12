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
			case 'activatePageGuidelines':
				activatePageGuidelines(port, request);
				break;
			case 'deactivatePageGuidelines':
				deactivatePageGuidelines(port, request);
				break;
			case 'activatePageRuler':
				activatePageRuler(port, request);
				break;
			case 'deactivatePageRuler':
				deactivatePageRuler(port, request);
				break;
			case 'activateTextEditor':
				activateTextEditor(port, request);
				break;
			case 'deactivateTextEditor':
				deactivateTextEditor(port, request);
				break;
			case 'activateMoveElement':
				activateMoveElement(port, request);
				break;
			case 'deactivateMoveElement':
				deactivateMoveElement(port, request);
				break;
			case 'activateColorPicker':
				activateColorPicker(port, request);
				break;
			case 'deactivateColorPicker':
				deactivateColorPicker(port, request);
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
			top: 18px !important;
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
			height: 42px !important;
			margin-left:143px !important;
			margin-bottom: -42px !important;
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
			containment: 'document',
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
		chrome.storage.local.set({isPopupPaused: false});
		chrome.storage.local.set({isPopupHidden: false});
		chrome.storage.local.set({disableActiveFeature: false});
		chrome.storage.local.set({setMinimised: null});
		chrome.storage.local.set({whichFeatureActive: null});

		document.querySelector('#superDev').style.top = '18px';
		document.querySelector('#superDev').style.right = '18px';
		document.querySelector('#superDev').style.left = '';
		chrome.storage.local.set({setMinimised: false});

		port.postMessage({action: 'Popup Visible'});
	}
};

const changeHeight = (port, request) => {
	document.querySelector('#superDevIframe').style.height = `${request.height}px`;
	if (document.querySelector('#superDev').style.visibility === 'hidden') document.querySelector('#superDev').style.visibility = 'visible';
	port.postMessage({action: 'Height Changed'});
};

const justChangeHeight = (port, request) => {
	document.querySelector('#superDevIframe').style.height = `${request.height}px`;
	port.postMessage({action: 'Just Height Changed'});
};

const activatePageGuidelines = (port, request) => {
	document.addEventListener('keyup', onEscape);
	document.addEventListener('mouseover', onMouseOver);
	document.addEventListener('mouseout', onMouseOut);
	window.focus({preventScroll: true});

	let pageGuidelinesWrapper = document.createElement('div');
	pageGuidelinesWrapper.classList.add('pageGuidelinesWrapper');
	document.body.appendChild(pageGuidelinesWrapper);

	function onEscape(event) {
		event.preventDefault();
		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				destroyPageGuidelines(true);
			} else if (event.isTrusted === false) {
				destroyPageGuidelines(false);
			}
		}
	}

	function onMouseOver(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			event.target.classList.add('pageGuidelinesOutline');
			renderPageGuidelines(true);
		}
	}

	function onMouseOut(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			event.target.style.outline = 'none';
			renderPageGuidelines(false);
			event.target.classList.remove('pageGuidelinesOutline');
		}
	}

	function destroyPageGuidelines(isManualEscape) {
		document.removeEventListener('mouseover', onMouseOver);
		document.removeEventListener('mouseout', onMouseOut);
		document.removeEventListener('keyup', onEscape);

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
			let left = pageGuidelinesPosition.left + document.documentElement.scrollLeft;
			let right = pageGuidelinesPosition.right + document.documentElement.scrollLeft;

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
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Page Guidelines Deactivated'});
};

const activatePageRuler = (port, request) => {
	let image = new Image();
	let canvas = document.createElement('canvas');
	let ctx = canvas.getContext('2d', {willReadFrequently: true});
	let body = document.querySelector('body');
	let portThree = chrome.runtime.connect({name: 'portThree'});
	let pageScrollDelay = 600;
	let windowResizeDelay = 1200;

	let changeTimeout;
	let paused = true;
	let inputX, inputY;
	let connectionClosed = false;
	let overlay = document.createElement('div');
	overlay.className = 'pageRulerOverlay';

	portThree.onMessage.addListener(function (request) {
		if (connectionClosed) return;

		switch (request.action) {
			case 'parseScreenshot':
				parseScreenshot(request.dataUrl);
				break;
			case 'showDimensions':
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
		// https://macarthur.me/posts/when-dom-updates-appear-to-be-asynchronous
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				initiate();
				port.postMessage({action: 'Page Ruler Activated'});
			});
		});
	}

	function initiate() {
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('touchmove', onMouseMove);
		document.addEventListener('keyup', onEscape);
		document.addEventListener('scroll', onPageScroll);
		window.addEventListener('resize', onWindowResize);
		window.focus({preventScroll: true});

		disableCursor();
		requestNewScreenshot();
	}

	function parseScreenshot(dataUrl) {
		image.src = dataUrl;
		// https://macarthur.me/posts/when-dom-updates-appear-to-be-asynchronous
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				loadImage();
			});
		});
	}

	function loadImage() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
		let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

		// Show Minimised Popup
		chrome.storage.local.set({setMinimised: true});

		portThree.postMessage({
			action: 'toGrayscale',
			imageData: Array.from(imageData),
			width: canvas.width,
			height: canvas.height,
		});
	}

	function destroyPageRuler(isManualEscape) {
		connectionClosed = true;
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('touchmove', onMouseMove);
		document.removeEventListener('keyup', onEscape);
		document.removeEventListener('scroll', onPageScroll);
		window.removeEventListener('resize', onWindowResize);

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
		let dimensions = body.querySelector('.pageRulerDiv');
		if (dimensions) body.removeChild(dimensions);
	}

	function onPageScroll() {
		if (!paused) pause();
		if (changeTimeout) clearTimeout(changeTimeout);
		changeTimeout = setTimeout(requestNewScreenshot, pageScrollDelay);
	}

	function onWindowResize() {
		if (!paused) pause();
		if (changeTimeout) clearTimeout(changeTimeout);
		changeTimeout = setTimeout(requestNewScreenshot, windowResizeDelay);
	}

	function requestNewScreenshot() {
		// In Case od Scroll or Resize
		if (document.querySelector('#superDev').style.visibility !== 'hidden') {
			document.querySelector('#superDev').style.visibility = 'hidden';
			chrome.storage.local.set({setMinimised: null});
			port.postMessage({action: 'Popup Hidden'});

			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					portThree.postMessage({action: 'takeScreenshot'});
				});
			});
		}
		// First Screenshot
		else portThree.postMessage({action: 'takeScreenshot'});
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

	function onMouseMove(event) {
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

	function onEscape(event) {
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
			action: 'measureDistances',
			data: {x: inputX, y: inputY},
		});
	}

	function showDimensions(dimensions) {
		if (paused) return;

		removeDimensions();
		if (!dimensions) return;

		let newPageRulerDiv = document.createElement('div');
		newPageRulerDiv.className = 'pageRulerDiv';
		newPageRulerDiv.style.left = dimensions.x + 'px';
		newPageRulerDiv.style.top = dimensions.y + 'px';

		let measureWidth = dimensions.left + dimensions.right;
		let measureHeight = dimensions.top + dimensions.bottom;

		let xAxis = document.createElement('div');
		xAxis.className = 'x pageRulerAxis';
		xAxis.style.left = -dimensions.left + 'px';
		xAxis.style.width = measureWidth + 'px';

		let yAxis = document.createElement('div');
		yAxis.className = 'y pageRulerAxis';
		yAxis.style.top = -dimensions.top + 'px';
		yAxis.style.height = measureHeight + 'px';

		let pageRulerTooltip = document.createElement('div');
		pageRulerTooltip.className = 'pageRulerTooltip';

		pageRulerTooltip.textContent = measureWidth + 1 + ' x ' + (measureHeight + 1) + ' px';

		if (dimensions.y < 40) pageRulerTooltip.classList.add('bottom');

		if (dimensions.x > window.innerWidth - 120) pageRulerTooltip.classList.add('left');

		newPageRulerDiv.appendChild(xAxis);
		newPageRulerDiv.appendChild(yAxis);
		newPageRulerDiv.appendChild(pageRulerTooltip);

		body.appendChild(newPageRulerDiv);
	}
};

const deactivatePageRuler = (port, request) => {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Page Ruler Deactivated'});
};

const activateTextEditor = (port, request) => {
	document.addEventListener('keyup', onEscape);
	document.addEventListener('mouseover', onMouseOver);
	document.addEventListener('mouseout', onMouseOut);

	let pageGuidelinesWrapper = document.createElement('div');
	pageGuidelinesWrapper.classList.add('pageGuidelinesWrapper');
	document.body.appendChild(pageGuidelinesWrapper);

	function onEscape(event) {
		event.preventDefault();
		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				destroyTextEditor(true);
			} else if (event.isTrusted === false) {
				destroyTextEditor(false);
			}
		}
	}

	function onMouseOver(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			if (event.target.innerText !== '') {
				event.target.setAttribute('contenteditable', true);
				event.target.setAttribute('spellcheck', false);
				event.target.classList.add('pageGuidelinesOutline');
				renderPageGuidelines(true);
				event.target.focus({preventScroll: true});
			}
		}
	}

	function onMouseOut(event) {
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
		document.removeEventListener('mouseover', onMouseOver);
		document.removeEventListener('mouseout', onMouseOut);
		document.removeEventListener('keyup', onEscape);

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
			let left = pageGuidelinesPosition.left + document.documentElement.scrollLeft;
			let right = pageGuidelinesPosition.right + document.documentElement.scrollLeft;

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
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Text Editor Deactivated'});
};

const activateMoveElement = (port, request) => {
	document.addEventListener('keyup', onEscape);
	document.addEventListener('mouseover', onMouseOver);
	document.addEventListener('mouseout', onMouseOut);
	document.addEventListener('click', onMouseClick);
	window.focus({preventScroll: true});

	let pageGuidelinesWrapper = document.createElement('div');
	pageGuidelinesWrapper.classList.add('pageGuidelinesWrapper');
	document.body.appendChild(pageGuidelinesWrapper);

	function onEscape(event) {
		event.preventDefault();
		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				destroyMoveElement(true);
			} else if (event.isTrusted === false) {
				destroyMoveElement(false);
			}
		}
	}

	function onMouseOver(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			event.target.classList.add('pageGuidelinesOutline');
			renderPageGuidelines(true);
		}
	}

	function onMouseOut(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			event.target.style.outline = 'none';
			renderPageGuidelines(false);
			event.target.classList.remove('pageGuidelinesOutline');
		}
	}

	function onMouseClick(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			event.target.style.cursor = 'move';
			event.target.classList.add('moveElementDraggable');
			$('.moveElementDraggable').draggable({
				iframeFix: true,
				containment: 'document',
				cancel: false,
				create: function () {
					renderPageGuidelines(false);
				},
				start: function () {
					document.removeEventListener('mouseover', onMouseOver);
					document.removeEventListener('mouseout', onMouseOut);
				},
				stop: function () {
					document.addEventListener('mouseover', onMouseOver);
					document.addEventListener('mouseout', onMouseOut);
				},
			});
		}
	}

	function destroyMoveElement(isManualEscape) {
		document.removeEventListener('mouseover', onMouseOver);
		document.removeEventListener('mouseout', onMouseOut);
		document.removeEventListener('keyup', onEscape);
		document.removeEventListener('click', onMouseClick);

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

		if (document.querySelector('.moveElementDraggable')) {
			$('.moveElementDraggable').draggable('destroy');
			document.querySelectorAll('.moveElementDraggable').forEach((removeMoveCursor) => {
				removeMoveCursor.style.cursor = 'default';
			});
			document.querySelector('.moveElementDraggable').classList.remove('moveElementDraggable');
		}

		document.querySelector('.pageGuidelinesWrapper').remove();
	}

	function renderPageGuidelines(toShow) {
		if (toShow === true) {
			let pageGuidelinesPosition = document.querySelector('.pageGuidelinesOutline').getBoundingClientRect();
			let scrollWidth = document.body.scrollWidth;
			let scrollHeight = document.body.scrollHeight;
			let top = pageGuidelinesPosition.top + document.documentElement.scrollTop;
			let bottom = pageGuidelinesPosition.bottom + document.documentElement.scrollTop;
			let left = pageGuidelinesPosition.left + document.documentElement.scrollLeft;
			let right = pageGuidelinesPosition.right + document.documentElement.scrollLeft;

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
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Move Element Deactivated'});
};

const activateColorPicker = (port, request) => {
	let image = new Image();
	let canvas = document.createElement('canvas');
	let ctx = canvas.getContext('2d', {willReadFrequently: true});
	let body = document.querySelector('body');
	let portThree = chrome.runtime.connect({name: 'portThree'});
	let pageScrollDelay = 600;
	let windowResizeDelay = 1200;

	let changeTimeout;
	let paused = true;
	let inputX, inputY;
	let connectionClosed = false;
	let overlay = document.createElement('div');
	overlay.className = 'colorPickerOverlay';

	portThree.onMessage.addListener(function (request) {
		if (connectionClosed) return;

		switch (request.action) {
			case 'parseScreenshot':
				parseScreenshot(request.dataUrl);
				break;
			case 'showColorPicker':
				showColorPicker(request.data);
				break;
			case 'colorPickerSet':
				resume();
				break;
		}
	});

	if (document.querySelector('#superDev').style.visibility !== 'hidden') {
		document.querySelector('#superDev').style.visibility = 'hidden';
		port.postMessage({action: 'Popup Hidden'});
		// https://macarthur.me/posts/when-dom-updates-appear-to-be-asynchronous
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				initiate();
				port.postMessage({action: 'Color Picker Activated'});
			});
		});
	}

	function initiate() {
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('touchmove', onMouseMove);
		document.addEventListener('keyup', onEscape);
		document.addEventListener('scroll', onPageScroll);
		document.addEventListener('click', onMouseClick);
		window.addEventListener('resize', onWindowResize);
		window.focus({preventScroll: true});

		disableCursor();
		requestNewScreenshot();
	}

	function parseScreenshot(dataUrl) {
		image.src = dataUrl;
		// https://macarthur.me/posts/when-dom-updates-appear-to-be-asynchronous
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				loadImage();
			});
		});
	}

	function loadImage() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
		let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

		// Show Minimised Popup
		chrome.storage.local.set({setMinimised: true});

		portThree.postMessage({
			action: 'setColorPicker',
			imageData: Array.from(imageData),
			width: canvas.width,
			height: canvas.height,
		});
	}

	function destroyColorPicker(isManualEscape) {
		connectionClosed = true;
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('touchmove', onMouseMove);
		document.removeEventListener('keyup', onEscape);
		document.removeEventListener('scroll', onPageScroll);
		document.removeEventListener('click', onMouseClick);
		window.removeEventListener('resize', onWindowResize);

		if (isManualEscape === true) {
			chrome.storage.local.set({disableActiveFeature: true});
		}

		chrome.storage.local.get(['isPopupPaused'], function (result) {
			if (result.isPopupPaused === true || isManualEscape === true) {
				chrome.storage.local.set({setMinimised: false});
				chrome.storage.local.set({isPopupPaused: false});
			}
		});

		removeColorPicker();
		enableCursor();
	}

	function removeColorPicker() {
		let colorPickerDiv = body.querySelector('.colorPickerDiv');
		if (colorPickerDiv) body.removeChild(colorPickerDiv);
	}

	function onPageScroll() {
		if (!paused) pause();
		if (changeTimeout) clearTimeout(changeTimeout);
		changeTimeout = setTimeout(requestNewScreenshot, pageScrollDelay);
	}

	function onWindowResize() {
		if (!paused) pause();
		if (changeTimeout) clearTimeout(changeTimeout);
		changeTimeout = setTimeout(requestNewScreenshot, windowResizeDelay);
	}

	function requestNewScreenshot() {
		// In Case od Scroll or Resize
		if (document.querySelector('#superDev').style.visibility !== 'hidden') {
			document.querySelector('#superDev').style.visibility = 'hidden';
			chrome.storage.local.set({setMinimised: null});
			port.postMessage({action: 'Popup Hidden'});

			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					portThree.postMessage({action: 'takeScreenshot'});
				});
			});
		}
		// First Screenshot
		else portThree.postMessage({action: 'takeScreenshot'});
	}

	function pause() {
		paused = true;
		removeColorPicker();
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

	function onMouseMove(event) {
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
			removeColorPicker();
		}
	}

	function onMouseClick(event) {
		if (document.querySelector('.colorPickerTooltipColorCode')) {
			navigator.clipboard.writeText(document.querySelector('.colorPickerTooltipColorCode').innerText);
			document.querySelector('.colorPickerTooltipColorCode').innerText = 'Copied';
		}
	}

	function onEscape(event) {
		event.preventDefault();
		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				destroyColorPicker(true);
			} else if (event.isTrusted === false) {
				destroyColorPicker(false);
			}
		}
	}

	function sendToWorker(event) {
		if (paused) return;

		portThree.postMessage({
			action: 'getColorAt',
			data: {x: inputX, y: inputY},
		});
	}

	function showColorPicker(spotColor) {
		console.log(spotColor);
		if (paused) return;

		removeColorPicker();
		if (!spotColor) return;

		let newColorPickerDiv = document.createElement('div');
		newColorPickerDiv.className = 'colorPickerDiv';
		newColorPickerDiv.style.left = spotColor.x + 'px';
		newColorPickerDiv.style.top = spotColor.y + 'px';

		let colorPickerTooltip = document.createElement('div');
		colorPickerTooltip.className = 'colorPickerTooltip';

		let colorPickerTooltipBackground = document.createElement('div');
		colorPickerTooltipBackground.className = 'colorPickerTooltipBackground';
		colorPickerTooltipBackground.style.backgroundColor = spotColor.hex;

		let colorPickerTooltipColorCode = document.createElement('div');
		colorPickerTooltipColorCode.className = 'colorPickerTooltipColorCode';
		colorPickerTooltipColorCode.textContent = spotColor.hex;

		if (spotColor.y < 60) colorPickerTooltip.classList.add('bottom');
		if (spotColor.x > window.innerWidth - 110) colorPickerTooltip.classList.add('left');

		colorPickerTooltip.appendChild(colorPickerTooltipBackground);
		colorPickerTooltip.appendChild(colorPickerTooltipColorCode);
		newColorPickerDiv.appendChild(colorPickerTooltip);
		body.appendChild(newColorPickerDiv);
	}
};

const deactivateColorPicker = (port, request) => {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Color Picker Deactivated'});
};
