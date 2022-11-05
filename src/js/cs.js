chrome.runtime.onConnect.addListener(function (port) {
	port.onMessage.addListener(function (request) {
		switch (request.action) {
			case 'showHideExtension':
				showHideExtension(request.activeTab, port, request);
				break;
			case 'changeHeight':
				changeHeight(request.activeTab, port, request);
				break;
			case 'justChangeHeight':
				justChangeHeight(request.activeTab, port, request);
				break;
			case 'activateTextEditor':
				activateTextEditor(request.activeTab, port, request);
				break;
			case 'deactivateTextEditor':
				deactivateTextEditor(request.activeTab, port, request);
				break;
			case 'activatePageRuler':
				activatePageRuler(request.activeTab, port, request);
				break;
			case 'deactivatePageRuler':
				deactivatePageRuler(request.activeTab, port, request);
				break;
			case 'activateColorPicker':
				activateColorPicker(request.activeTab, port, request);
				break;
			case 'deactivateColorPicker':
				deactivateColorPicker(request.activeTab, port, request);
				break;
			case 'activateColorPalette':
				activateColorPalette(request.activeTab, port, request);
				break;
			case 'deactivateColorPalette':
				deactivateColorPalette(request.activeTab, port, request);
				break;
			case 'activatePageGuideline':
				activatePageGuideline(request.activeTab, port, request);
				break;
			case 'deactivatePageGuideline':
				deactivatePageGuideline(request.activeTab, port, request);
				break;
			case 'activatePageHighlight':
				activatePageHighlight(request.activeTab, port, request);
				break;
			case 'deactivatePageHighlight':
				deactivatePageHighlight(request.activeTab, port, request);
				break;
			case 'activateMoveElement':
				activateMoveElement(request.activeTab, port, request);
				break;
			case 'deactivateMoveElement':
				deactivateMoveElement(request.activeTab, port, request);
				break;
			case 'activateExportElement':
				activateExportElement(request.activeTab, port, request);
				break;
			case 'deactivateExportElement':
				deactivateExportElement(request.activeTab, port, request);
				break;
			case 'activateDeleteElement':
				activateDeleteElement(request.activeTab, port, request);
				break;
			case 'deactivateDeleteElement':
				deactivateDeleteElement(request.activeTab, port, request);
				break;
			case 'activateClearAllCache':
				activateClearAllCache(request.activeTab, port, request);
				break;
		}
	});
});

function showHideExtension(activeTab, port, request) {
	// If Popup Doesn't Exists, Create
	if (document.querySelector('#superDevWrapper') === null) {
		let superDevWrapper = document.createElement('superdev-wrapper');
		superDevWrapper.id = 'superDevWrapper';
		superDevWrapper.style.cssText = `
			display: block !important;
			padding: 0 !important;
			margin: 0 !important;
			border: 0 !important;
			outline: 0 !important;
			background-color: transparent !important;
			box-sizing: border-box !important;

			position: fixed !important;
			top: 18px !important;
			right: 18px !important;
			width: 335px !important;
			visibility: hidden !important;
			z-index: 2147483646 !important;`;
		document.body.appendChild(superDevWrapper);

		let superDevHandler = document.createElement('superdev-handler');
		superDevHandler.id = 'superDevHandler';
		superDevHandler.style.cssText = `
			display: block !important;
			position: relative !important;
			padding: 0 !important;
			margin: 0 !important;
			border: 0 !important;
			outline: 0 !important;
			background-color: transparent !important;
			box-sizing: border-box !important;

			cursor: move !important;
			width: 18px !important;
			height: 38.5px !important;
			margin-left: 168px !important;
			margin-bottom: -38.5px !important;
			z-index: 2147483647 !important;`;
		superDevWrapper.appendChild(superDevHandler);

		let superDevPopup = document.createElement('iframe');
		superDevPopup.src = chrome.runtime.getURL('index.html');
		superDevPopup.id = 'superDevPopup';
		superDevPopup.scrolling = 'no';
		superDevPopup.allow = 'clipboard-write';
		superDevPopup.style.cssText = `
			display: block !important;
			padding: 0 !important;
			margin: 0 !important;
			border: 0 !important;
			outline: 0 !important;
			background-color: transparent !important;
			box-sizing: border-box !important;

			width: 335px !important;
			border-radius: 8px !important;
			box-shadow: rgb(0 0 0 / 12%) 0px 0px 8px 0px, rgb(0 0 0 / 24%) 0px 4px 8px 0px !important;
			z-index: 2147483646 !important;`;
		superDevWrapper.appendChild(superDevPopup);

		$('#superDevWrapper').draggable({
			handle: '#superDevHandler',
			iframeFix: true,
			containment: 'document',
		});
		port.postMessage({action: 'Popup Created'});
	}

	// If Popup Visible, Set Hidden
	else if (document.querySelector('#superDevWrapper').style.visibility !== 'hidden') {
		chrome.storage.local.set({['setHomePageActive' + activeTab[0].id]: true});
		chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: true});
		document.querySelector('#superDevWrapper').style.visibility = 'hidden';
		port.postMessage({action: 'Popup Hidden'});
	}

	// If Popup Hidden, Set Visible
	else {
		// Reset on Visible
		chrome.storage.local.set({['setHomePageActive' + activeTab[0].id]: false}); // True, False
		chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: false}); // True, False
		chrome.storage.local.set({['setMinimised' + activeTab[0].id]: null}); // True, False, Null
		chrome.storage.local.set({['whichFeatureActive' + activeTab[0].id]: null}); // String, Null
		//chrome.storage.local.set({['howLongPopupIs' + activeTab[0].id]: null}); // Number, Null

		document.querySelector('#superDevWrapper').style.top = '18px';
		document.querySelector('#superDevWrapper').style.right = '18px';
		document.querySelector('#superDevWrapper').style.left = '';
		document.querySelector('#superDevWrapper').style.visibility = 'visible';

		chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], function (result) {
			if (result['howLongPopupIs' + activeTab[0].id] === 40.5) {
				chrome.storage.local.set({['setMinimised' + activeTab[0].id]: false});
			}
		});

		port.postMessage({action: 'Popup Visible'});
	}
}

function changeHeight(activeTab, port, request) {
	chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], function (result) {
		if (result['howLongPopupIs' + activeTab[0].id] !== request.height) {
			chrome.storage.local.set({['howLongPopupIs' + activeTab[0].id]: request.height});
			document.querySelector('#superDevPopup').style.height = `${request.height}px`;
			if (document.querySelector('#superDevWrapper').style.visibility === 'hidden') {
				document.querySelector('#superDevWrapper').style.visibility = 'visible';
			}
			port.postMessage({action: 'Height Changed'});
		}
	});
}

function justChangeHeight(activeTab, port, request) {
	chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], function (result) {
		if (result['howLongPopupIs' + activeTab[0].id] !== request.height) {
			chrome.storage.local.set({['howLongPopupIs' + activeTab[0].id]: request.height});
			document.querySelector('#superDevPopup').style.height = `${request.height}px`;
			port.postMessage({action: 'Just Height Changed'});
		}
	});
}

function activateTextEditor(activeTab, port, request) {
	document.addEventListener('mouseover', onMouseOver);
	document.addEventListener('mouseout', onMouseOut);
	document.addEventListener('keyup', onEscape);

	let pageGuidelineWrapper = document.createElement('page-guideline-wrapper');
	pageGuidelineWrapper.classList.add('pageGuidelineWrapper');
	document.body.appendChild(pageGuidelineWrapper);

	function onMouseOver(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevPopup' && event.target.id !== 'superDevWrapper') {
			if (event.target.innerText !== '') {
				event.target.setAttribute('contenteditable', true);
				event.target.setAttribute('spellcheck', false);
				event.target.classList.add('pageGuidelineOutline');
				renderPageGuideline(true);
				event.target.focus({preventScroll: true});
			}
		}
	}

	function onMouseOut(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevPopup' && event.target.id !== 'superDevWrapper') {
			if (event.target.classList.contains('pageGuidelineOutline')) {
				event.target.removeAttribute('contenteditable', true);
				event.target.removeAttribute('spellcheck', false);
				event.target.classList.remove('pageGuidelineOutline');
				renderPageGuideline(false);
			}
		}
	}

	function renderPageGuideline(toShow) {
		if (toShow === true) {
			let guidelinePosition = document.querySelector('.pageGuidelineOutline').getBoundingClientRect();
			let scrollWidth =
				document.body.scrollWidth -
				(document.body.scrollWidth -
					(document.body.offsetWidth +
						(+window.getComputedStyle(document.body).getPropertyValue('margin-left').replace('px', '') +
							+window.getComputedStyle(document.body).getPropertyValue('margin-right').replace('px', ''))));
			let scrollHeight = document.body.scrollHeight;
			let top = guidelinePosition.top + document.documentElement.scrollTop;
			let bottom = guidelinePosition.bottom + document.documentElement.scrollTop;
			let left = guidelinePosition.left + document.documentElement.scrollLeft;
			let right = guidelinePosition.right + document.documentElement.scrollLeft;

			pageGuidelineWrapper.innerHTML = `
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
			pageGuidelineWrapper.innerHTML = ``;
		}
	}

	port.postMessage({action: 'Text Editor Activated'});
	chrome.storage.local.set({['setMinimised' + activeTab[0].id]: true});

	function onEscape(event) {
		event.preventDefault();
		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: true});
			} else if (event.isTrusted === false) {
				destroyTextEditor();
			}
		}
	}

	function destroyTextEditor() {
		document.removeEventListener('mouseover', onMouseOver);
		document.removeEventListener('mouseout', onMouseOut);
		document.removeEventListener('keyup', onEscape);

		if (document.querySelector('.pageGuidelineOutline')) {
			document.querySelector('.pageGuidelineOutline').blur();
			document.querySelector('.pageGuidelineOutline').removeAttribute('contenteditable', true);
			document.querySelector('.pageGuidelineOutline').removeAttribute('spellcheck', false);
			document.querySelector('.pageGuidelineOutline').classList.remove('pageGuidelineOutline');
		}

		chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], function (result) {
			if (result['howLongPopupIs' + activeTab[0].id] === 40.5) {
				chrome.storage.local.set({['setMinimised' + activeTab[0].id]: false});
			}
		});

		document.querySelector('.pageGuidelineWrapper').remove();
	}
}

function deactivateTextEditor(activeTab, port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Text Editor Deactivated'});
}

function activatePageRuler(activeTab, port, request) {
	let image = new Image();
	let canvas = document.createElement('canvas');
	let ctx = canvas.getContext('2d', {willReadFrequently: true});
	let body = document.body;
	let portTwo = chrome.runtime.connect({name: 'portTwo'});
	let pageScrollDelay = 600;
	let windowResizeDelay = 1200;

	let changeTimeout;
	let paused = true;
	let inputX, inputY;
	let connectionClosed = false;
	let pageRulerOverlay = document.createElement('page-ruler-overlay');
	pageRulerOverlay.className = 'pageRulerOverlay';

	portTwo.onMessage.addListener(function (request) {
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

	if (document.querySelector('#superDevWrapper').style.visibility !== 'hidden') {
		document.querySelector('#superDevWrapper').style.visibility = 'hidden';
		port.postMessage({action: 'Popup Hidden'});
		// https://macarthur.me/posts/when-dom-updates-appear-to-be-asynchronous
		requestAnimationFrame(function () {
			requestAnimationFrame(function () {
				initiate();
				port.postMessage({action: 'Page Ruler Activated'});
			});
		});
	}

	function initiate() {
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('touchmove', onMouseMove);
		document.addEventListener('scroll', onPageScroll);
		window.addEventListener('resize', onWindowResize);
		document.addEventListener('keyup', onEscape);
		window.focus({preventScroll: true});

		disableCursor();
		requestNewScreenshot();
	}

	function parseScreenshot(dataUrl) {
		image.src = dataUrl;
		// https://macarthur.me/posts/when-dom-updates-appear-to-be-asynchronous
		requestAnimationFrame(function () {
			requestAnimationFrame(function () {
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
		chrome.storage.local.set({['setMinimised' + activeTab[0].id]: true});

		portTwo.postMessage({
			action: 'toGrayscale',
			imageData: Array.from(imageData),
			width: canvas.width,
			height: canvas.height,
		});
	}

	function removeDimensions() {
		let dimensions = body.querySelector('.pageRulerWrapper');
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
		if (document.querySelector('#superDevWrapper').style.visibility !== 'hidden') {
			document.querySelector('#superDevWrapper').style.visibility = 'hidden';
			chrome.storage.local.set({['setMinimised' + activeTab[0].id]: null});
			port.postMessage({action: 'Popup Hidden'});

			requestAnimationFrame(function () {
				requestAnimationFrame(function () {
					portTwo.postMessage({action: 'takeScreenshot'});
				});
			});
		}

		// First Screenshot
		else portTwo.postMessage({action: 'takeScreenshot'});
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
		body.appendChild(pageRulerOverlay);
	}

	function enableCursor() {
		body.removeChild(pageRulerOverlay);
	}

	function onMouseMove(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevPopup' && event.target.id !== 'superDevWrapper') {
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

	function sendToWorker(event) {
		if (paused) return;

		portTwo.postMessage({
			action: 'measureDistances',
			data: {x: inputX, y: inputY},
		});
	}

	function showDimensions(dimensions) {
		if (paused) return;

		removeDimensions();
		if (!dimensions) return;

		let pageRulerWrapper = document.createElement('page-ruler-wrapper');
		pageRulerWrapper.className = 'pageRulerWrapper';
		pageRulerWrapper.style.left = dimensions.x + 'px';
		pageRulerWrapper.style.top = dimensions.y + 'px';

		let measureWidth = dimensions.left + dimensions.right;
		let measureHeight = dimensions.top + dimensions.bottom;

		let xAxis = document.createElement('page-ruler-x-axis');
		xAxis.className = 'x pageRulerAxis';
		xAxis.style.left = -dimensions.left + 'px';
		xAxis.style.width = measureWidth + 'px';

		let yAxis = document.createElement('page-ruler-y-axis');
		yAxis.className = 'y pageRulerAxis';
		yAxis.style.top = -dimensions.top + 'px';
		yAxis.style.height = measureHeight + 'px';

		let pageRulerTooltip = document.createElement('page-ruler-tooltip');
		pageRulerTooltip.className = 'pageRulerTooltip';

		pageRulerTooltip.textContent = measureWidth + 1 + ' x ' + (measureHeight + 1) + ' px';

		if (dimensions.y < 40) pageRulerTooltip.classList.add('bottom');

		if (dimensions.x > window.innerWidth - 120) pageRulerTooltip.classList.add('left');

		pageRulerWrapper.appendChild(xAxis);
		pageRulerWrapper.appendChild(yAxis);
		pageRulerWrapper.appendChild(pageRulerTooltip);

		body.appendChild(pageRulerWrapper);
	}

	function onEscape(event) {
		event.preventDefault();
		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: true});
			} else if (event.isTrusted === false) {
				destroyPageRuler();
			}
		}
	}

	function destroyPageRuler() {
		connectionClosed = true;
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('touchmove', onMouseMove);
		document.removeEventListener('scroll', onPageScroll);
		window.removeEventListener('resize', onWindowResize);
		document.removeEventListener('keyup', onEscape);

		chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], function (result) {
			if (result['howLongPopupIs' + activeTab[0].id] === 40.5) {
				chrome.storage.local.set({['setMinimised' + activeTab[0].id]: false});
			}
		});

		removeDimensions();
		enableCursor();
	}
}

function deactivatePageRuler(activeTab, port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Page Ruler Deactivated'});
}

function activateColorPicker(activeTab, port, request) {
	let image = new Image();
	let canvas = document.createElement('canvas');
	let ctx = canvas.getContext('2d', {willReadFrequently: true});
	let body = document.body;
	let portTwo = chrome.runtime.connect({name: 'portTwo'});
	let pageScrollDelay = 600;
	let windowResizeDelay = 1200;

	let changeTimeout;
	let paused = true;
	let inputX, inputY;
	let connectionClosed = false;
	let colorPickerOverlay = document.createElement('color-picker-overlay');
	colorPickerOverlay.className = 'colorPickerOverlay';

	portTwo.onMessage.addListener(function (request) {
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

	if (document.querySelector('#superDevWrapper').style.visibility !== 'hidden') {
		document.querySelector('#superDevWrapper').style.visibility = 'hidden';
		port.postMessage({action: 'Popup Hidden'});
		// https://macarthur.me/posts/when-dom-updates-appear-to-be-asynchronous
		requestAnimationFrame(function () {
			requestAnimationFrame(function () {
				initiate();
				port.postMessage({action: 'Color Picker Activated'});
			});
		});
	}

	function initiate() {
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('touchmove', onMouseMove);
		document.addEventListener('scroll', onPageScroll);
		document.addEventListener('click', onMouseClick);
		window.addEventListener('resize', onWindowResize);
		document.addEventListener('keyup', onEscape);
		window.focus({preventScroll: true});

		disableCursor();
		requestNewScreenshot();
	}

	function parseScreenshot(dataUrl) {
		image.src = dataUrl;
		// https://macarthur.me/posts/when-dom-updates-appear-to-be-asynchronous
		requestAnimationFrame(function () {
			requestAnimationFrame(function () {
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
		chrome.storage.local.set({['setMinimised' + activeTab[0].id]: true});

		portTwo.postMessage({
			action: 'setColorPicker',
			imageData: Array.from(imageData),
			width: canvas.width,
			height: canvas.height,
		});
	}

	function removeColorPicker() {
		let colorPickerWrapper = body.querySelector('.colorPickerWrapper');
		if (colorPickerWrapper) body.removeChild(colorPickerWrapper);
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
		if (document.querySelector('#superDevWrapper').style.visibility !== 'hidden') {
			document.querySelector('#superDevWrapper').style.visibility = 'hidden';
			chrome.storage.local.set({['setMinimised' + activeTab[0].id]: null});
			port.postMessage({action: 'Popup Hidden'});

			requestAnimationFrame(function () {
				requestAnimationFrame(function () {
					portTwo.postMessage({action: 'takeScreenshot'});
				});
			});
		}

		// First Screenshot
		else portTwo.postMessage({action: 'takeScreenshot'});
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
		body.appendChild(colorPickerOverlay);
	}

	function enableCursor() {
		body.removeChild(colorPickerOverlay);
	}

	function onMouseMove(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevPopup' && event.target.id !== 'superDevWrapper') {
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
		if (document.querySelector('.colorPickerTooltipChild')) {
			navigator.clipboard.writeText(document.querySelector('.colorPickerTooltipChild').innerText);
			document.querySelector('.colorPickerTooltipChild').innerText = 'Copied';
		}
	}

	function sendToWorker(event) {
		if (paused) return;

		portTwo.postMessage({
			action: 'getColorAt',
			data: {x: inputX, y: inputY},
		});
	}

	function showColorPicker(spotColor) {
		if (paused) return;

		removeColorPicker();
		if (!spotColor) return;

		let colorPickerWrapper = document.createElement('color-picker-wrapper');
		colorPickerWrapper.className = 'colorPickerWrapper';
		colorPickerWrapper.style.left = spotColor.x + 'px';
		colorPickerWrapper.style.top = spotColor.y + 'px';

		let colorPickerTooltip = document.createElement('color-picker-tooltip');
		colorPickerTooltip.className = 'colorPickerTooltip';

		let colorPickerTooltipBG = document.createElement('color-picker-tooltip-bg');
		colorPickerTooltipBG.className = 'colorPickerTooltipBG';

		let colorPickerTooltipChild = document.createElement('color-picker-tooltip-child');
		colorPickerTooltipChild.className = 'colorPickerTooltipChild';

		chrome.storage.local.get(['allFeatures'], function (result) {
			JSON.parse(result['allFeatures']).map(function (value, index) {
				if (value.id === 'colorPicker') {
					if (value.settings.checkboxColorPicker1 === true) {
						colorPickerTooltipBG.style.backgroundColor = spotColor.hex;
						colorPickerTooltipChild.textContent = spotColor.hex;
						if (spotColor.y < 60) colorPickerTooltip.classList.add('bottom');
						if (spotColor.x > window.innerWidth - 110) colorPickerTooltip.classList.add('left');
					} else if (value.settings.checkboxColorPicker2 === true) {
						colorPickerTooltipBG.style.backgroundColor = spotColor.rgb;
						colorPickerTooltipChild.textContent = spotColor.rgb;
						if (spotColor.y < 60) colorPickerTooltip.classList.add('bottom');
						if (spotColor.x > window.innerWidth - 220) colorPickerTooltip.classList.add('left');
					}
				}
			});
		});

		colorPickerTooltip.appendChild(colorPickerTooltipBG);
		colorPickerTooltip.appendChild(colorPickerTooltipChild);
		colorPickerWrapper.appendChild(colorPickerTooltip);
		body.appendChild(colorPickerWrapper);
	}

	function onEscape(event) {
		event.preventDefault();
		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: true});
			} else if (event.isTrusted === false) {
				destroyColorPicker();
			}
		}
	}

	function destroyColorPicker() {
		connectionClosed = true;
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('touchmove', onMouseMove);
		document.removeEventListener('scroll', onPageScroll);
		document.removeEventListener('click', onMouseClick);
		window.removeEventListener('resize', onWindowResize);
		document.removeEventListener('keyup', onEscape);

		chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], function (result) {
			if (result['howLongPopupIs' + activeTab[0].id] === 40.5) {
				chrome.storage.local.set({['setMinimised' + activeTab[0].id]: false});
			}
		});

		removeColorPicker();
		enableCursor();
	}
}

function deactivateColorPicker(activeTab, port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Color Picker Deactivated'});
}

function activateColorPalette(activeTab, port, request) {
	document.addEventListener('keyup', onEscape);
	window.focus({preventScroll: true});

	// Get All Colors
	let allColors = [];
	document.querySelectorAll('*').forEach(function (element) {
		let elementComputedStyles = window.getComputedStyle(element);
		allColors.push(elementComputedStyles.getPropertyValue('background-color'));
		allColors.push(elementComputedStyles.getPropertyValue('border-color'));
		allColors.push(elementComputedStyles.getPropertyValue('border-block-color'));
		allColors.push(elementComputedStyles.getPropertyValue('border-block-end-color'));
		allColors.push(elementComputedStyles.getPropertyValue('border-block-start-color'));
		allColors.push(elementComputedStyles.getPropertyValue('border-bottom-color'));
		allColors.push(elementComputedStyles.getPropertyValue('border-inline-end-color'));
		allColors.push(elementComputedStyles.getPropertyValue('border-inline-start-color'));
		allColors.push(elementComputedStyles.getPropertyValue('border-left-color'));
		allColors.push(elementComputedStyles.getPropertyValue('border-right-color'));
		allColors.push(elementComputedStyles.getPropertyValue('border-top-color'));
		allColors.push(elementComputedStyles.getPropertyValue('caret-color'));
		allColors.push(elementComputedStyles.getPropertyValue('color'));
		allColors.push(elementComputedStyles.getPropertyValue('column-rule-color'));
		allColors.push(elementComputedStyles.getPropertyValue('fill'));
		allColors.push(elementComputedStyles.getPropertyValue('flood-color'));
		allColors.push(elementComputedStyles.getPropertyValue('lighting-color'));
		allColors.push(elementComputedStyles.getPropertyValue('outline-color'));
		allColors.push(elementComputedStyles.getPropertyValue('stop-color'));
		allColors.push(elementComputedStyles.getPropertyValue('stroke'));
		allColors.push(elementComputedStyles.getPropertyValue('text-decoration-color'));
		allColors.push(elementComputedStyles.getPropertyValue('text-emphasis-color'));
		allColors.push(elementComputedStyles.getPropertyValue('webkit-border-after-color'));
		allColors.push(elementComputedStyles.getPropertyValue('webkit-border-before-color'));
		allColors.push(elementComputedStyles.getPropertyValue('webkit-border-end-color'));
		allColors.push(elementComputedStyles.getPropertyValue('webkit-border-start-color'));
		allColors.push(elementComputedStyles.getPropertyValue('webkit-column-rule-color'));
		allColors.push(elementComputedStyles.getPropertyValue('webkit-tap-highlight-color'));
		allColors.push(elementComputedStyles.getPropertyValue('webkit-text-emphasis-color'));
		allColors.push(elementComputedStyles.getPropertyValue('webkit-text-fill-color'));
		allColors.push(elementComputedStyles.getPropertyValue('webkit-text-stroke-color'));
	});

	// Color Processing/Filtering
	allColors = [...new Set(allColors)];
	allColors = allColors.filter(function (value, index) {
		return value.startsWith('rgb(');
	});
	allColors = allColors.map(function (valueOne, indexOne) {
		if (valueOne.includes(') ')) return valueOne.replaceAll(') ', ');').split(';');
		else return valueOne;
	});
	allColors = [...new Set(allColors.flat())];

	// RGB or Hex?
	chrome.storage.local.get(['allFeatures'], function (result) {
		JSON.parse(result['allFeatures']).map(function (value, index) {
			if (value.id === 'colorPalette') {
				if (value.settings.checkboxColorPalette1 === true) {
					allColors = allColors.map(function (value, index) {
						return rgbToHex(value);
					});
					port.postMessage({action: 'allColors', allColors: allColors});
				} else if (value.settings.checkboxColorPalette2 === true) {
					port.postMessage({action: 'allColors', allColors: allColors});
				}
			}
		});
	});

	function rgbToHex(rgb) {
		let hex = rgb.split('(')[1].split(')')[0];
		hex = hex.split(',');
		hex = '#' + ((1 << 24) + (+hex[0] << 16) + (+hex[1] << 8) + +hex[2]).toString(16).slice(1);
		return hex.toUpperCase();
	}

	port.postMessage({action: 'Color Palette Activated'});

	function onEscape(event) {
		event.preventDefault();
		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: true});
			} else if (event.isTrusted === false) {
				destroyColorPalette();
			}
		}
	}

	function destroyColorPalette() {
		document.removeEventListener('keyup', onEscape);
		chrome.storage.local.set({['setHomePageActive' + activeTab[0].id]: true});
	}
}

function deactivateColorPalette(activeTab, port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Color Palette Deactivated'});
}

function activatePageGuideline(activeTab, port, request) {
	document.addEventListener('mouseover', onMouseOver);
	document.addEventListener('mouseout', onMouseOut);
	document.addEventListener('keyup', onEscape);
	window.focus({preventScroll: true});

	let pageGuidelineWrapper = document.createElement('page-guideline-wrapper');
	pageGuidelineWrapper.classList.add('pageGuidelineWrapper');
	document.body.appendChild(pageGuidelineWrapper);

	function onMouseOver(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevPopup' && event.target.id !== 'superDevWrapper') {
			event.target.classList.add('pageGuidelineOutline');
			renderPageGuideline(true);
		}
	}

	function onMouseOut(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevPopup' && event.target.id !== 'superDevWrapper') {
			renderPageGuideline(false);
			event.target.classList.remove('pageGuidelineOutline');
		}
	}

	function renderPageGuideline(toShow) {
		if (toShow === true) {
			let guidelinePosition = document.querySelector('.pageGuidelineOutline').getBoundingClientRect();
			let scrollWidth =
				document.body.scrollWidth -
				(document.body.scrollWidth -
					(document.body.offsetWidth +
						(+window.getComputedStyle(document.body).getPropertyValue('margin-left').replace('px', '').replace('px', '') +
							+window.getComputedStyle(document.body).getPropertyValue('margin-right').replace('px', '').replace('px', ''))));

			let scrollHeight = document.body.scrollHeight;
			let top = guidelinePosition.top + document.documentElement.scrollTop;
			let bottom = guidelinePosition.bottom + document.documentElement.scrollTop;
			let left = guidelinePosition.left + document.documentElement.scrollLeft;
			let right = guidelinePosition.right + document.documentElement.scrollLeft;

			pageGuidelineWrapper.innerHTML = `
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
			pageGuidelineWrapper.innerHTML = ``;
		}
	}

	port.postMessage({action: 'Page Guideline Activated'});
	chrome.storage.local.set({['setMinimised' + activeTab[0].id]: true});

	function onEscape(event) {
		event.preventDefault();
		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: true});
			} else if (event.isTrusted === false) {
				destroyPageGuideline();
			}
		}
	}

	function destroyPageGuideline() {
		document.removeEventListener('mouseover', onMouseOver);
		document.removeEventListener('mouseout', onMouseOut);
		document.removeEventListener('keyup', onEscape);

		if (document.querySelector('.pageGuidelineOutline')) {
			document.querySelector('.pageGuidelineOutline').blur();
			document.querySelector('.pageGuidelineOutline').classList.remove('pageGuidelineOutline');
		}

		chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], function (result) {
			if (result['howLongPopupIs' + activeTab[0].id] === 40.5) {
				chrome.storage.local.set({['setMinimised' + activeTab[0].id]: false});
			}
		});

		document.querySelector('.pageGuidelineWrapper').remove();
	}
}

function deactivatePageGuideline(activeTab, port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Page Guideline Deactivated'});
}

function activatePageHighlight(activeTab, port, request) {
	document.addEventListener('keyup', onEscape);
	window.focus({preventScroll: true});

	chrome.storage.local.get(['allFeatures'], function (result) {
		JSON.parse(result['allFeatures']).map(function (value, index) {
			if (value.id === 'pageHighlight') {
				if (value.settings.checkboxPageHighlight1 === true) {
					// All Page Elements
					document.querySelectorAll('*').forEach(function (element) {
						if (
							element.offsetHeight !== 0 &&
							element.offsetWidth !== 0 &&
							element.id !== 'superDevHandler' &&
							element.id !== 'superDevPopup' &&
							element.id !== 'superDevWrapper'
						) {
							let color = rgba();
							if (value.settings.checkboxPageHighlight6 !== true) {
								element.style.setProperty('box-sizing', 'border-box', 'important');
								element.style.setProperty('border', '2px solid ' + color, 'important');
							}

							element.style.setProperty('background-color', color, 'important');
						}
					});
				} else if (value.settings.checkboxPageHighlight2 === true) {
					// Block Level
					document.querySelectorAll('*').forEach(function (element) {
						if (
							element.offsetHeight !== 0 &&
							element.offsetWidth !== 0 &&
							element.id !== 'superDevHandler' &&
							element.id !== 'superDevPopup' &&
							element.id !== 'superDevWrapper'
						) {
							if (
								element.tagName === 'ADDRESS' ||
								element.tagName === 'ARTICLE' ||
								element.tagName === 'ASIDE' ||
								element.tagName === 'BLOCKQUOTE' ||
								element.tagName === 'CANVAS' ||
								element.tagName === 'DD' ||
								element.tagName === 'DIV' ||
								element.tagName === 'DL' ||
								element.tagName === 'DT' ||
								element.tagName === 'FIELDSET' ||
								element.tagName === 'FIGCAPTION' ||
								element.tagName === 'FIGURE' ||
								element.tagName === 'FOOTER' ||
								element.tagName === 'FORM' ||
								element.tagName === 'H1' ||
								element.tagName === 'H2' ||
								element.tagName === 'H3' ||
								element.tagName === 'H4' ||
								element.tagName === 'H5' ||
								element.tagName === 'H6' ||
								element.tagName === 'HEADER' ||
								element.tagName === 'HR' ||
								element.tagName === 'LI' ||
								element.tagName === 'MAIN' ||
								element.tagName === 'NAV' ||
								element.tagName === 'NOSCRIPT' ||
								element.tagName === 'OL' ||
								element.tagName === 'P' ||
								element.tagName === 'PRE' ||
								element.tagName === 'SECTION' ||
								element.tagName === 'TABLE' ||
								element.tagName === 'TFOOT' ||
								element.tagName === 'UL' ||
								element.tagName === 'VIDEO'
							) {
								let color = rgba();
								if (value.settings.checkboxPageHighlight6 !== true) {
									element.style.setProperty('box-sizing', 'border-box', 'important');
									element.style.setProperty('border', '2px solid ' + color, 'important');
								}

								element.style.setProperty('background-color', color, 'important');
							}
						}
					});
				} else if (value.settings.checkboxPageHighlight3 === true) {
					// Inline Level
					document.querySelectorAll('*').forEach(function (element) {
						if (
							element.offsetHeight !== 0 &&
							element.offsetWidth !== 0 &&
							element.id !== 'superDevHandler' &&
							element.id !== 'superDevPopup' &&
							element.id !== 'superDevWrapper'
						) {
							if (
								element.tagName === 'A' ||
								element.tagName === 'ABBR' ||
								element.tagName === 'ACRONYM' ||
								element.tagName === 'B' ||
								element.tagName === 'BDO' ||
								element.tagName === 'BIG' ||
								element.tagName === 'BR' ||
								element.tagName === 'BUTTON' ||
								element.tagName === 'CITE' ||
								element.tagName === 'CODE' ||
								element.tagName === 'DFN' ||
								element.tagName === 'EM' ||
								element.tagName === 'I' ||
								element.tagName === 'IMG' ||
								element.tagName === 'INPUT' ||
								element.tagName === 'KBD' ||
								element.tagName === 'LABEL' ||
								element.tagName === 'MAP' ||
								element.tagName === 'OBJECT' ||
								element.tagName === 'OUTPUT' ||
								element.tagName === 'Q' ||
								element.tagName === 'SAMP' ||
								element.tagName === 'SCRIPT' ||
								element.tagName === 'SELECT' ||
								element.tagName === 'SMALL' ||
								element.tagName === 'SPAN' ||
								element.tagName === 'STRONG' ||
								element.tagName === 'SUB' ||
								element.tagName === 'SUP' ||
								element.tagName === 'TEXTAREA' ||
								element.tagName === 'TIME' ||
								element.tagName === 'TT' ||
								element.tagName === 'VAR'
							) {
								let color = rgba();
								if (value.settings.checkboxPageHighlight6 !== true) {
									element.style.setProperty('box-sizing', 'border-box', 'important');
									element.style.setProperty('border', '2px solid ' + color, 'important');
								}

								element.style.setProperty('background-color', color, 'important');
							}
						}
					});
				} else if (value.settings.checkboxPageHighlight4 === true) {
					// Semantic + Div
					document.querySelectorAll('*').forEach(function (element) {
						if (
							element.offsetHeight !== 0 &&
							element.offsetWidth !== 0 &&
							element.id !== 'superDevHandler' &&
							element.id !== 'superDevPopup' &&
							element.id !== 'superDevWrapper'
						) {
							if (
								element.tagName === 'ARTICLE' ||
								element.tagName === 'ASIDE' ||
								element.tagName === 'DETAILS' ||
								element.tagName === 'FIGCAPTION' ||
								element.tagName === 'FIGURE' ||
								element.tagName === 'FOOTER' ||
								element.tagName === 'HEADER' ||
								element.tagName === 'MAIN' ||
								element.tagName === 'MARK' ||
								element.tagName === 'NAV' ||
								element.tagName === 'SECTION' ||
								element.tagName === 'SUMMARY' ||
								element.tagName === 'TIME'
							) {
								let color = rgba();
								if (value.settings.checkboxPageHighlight6 !== true) {
									element.style.setProperty('box-sizing', 'border-box', 'important');
									element.style.setProperty('border', '2px solid ' + color, 'important');
								}

								element.style.setProperty('background-color', color, 'important');
							}
						}
					});
				} else if (value.settings.checkboxPageHighlight5 === true) {
					// Headings + Paragraphgs
					document.querySelectorAll('*').forEach(function (element) {
						if (
							element.offsetHeight !== 0 &&
							element.offsetWidth !== 0 &&
							element.id !== 'superDevHandler' &&
							element.id !== 'superDevPopup' &&
							element.id !== 'superDevWrapper'
						) {
							if (
								element.tagName === 'H1' ||
								element.tagName === 'H2' ||
								element.tagName === 'H3' ||
								element.tagName === 'H4' ||
								element.tagName === 'H5' ||
								element.tagName === 'H6' ||
								element.tagName === 'P'
							) {
								let color = rgba();
								if (value.settings.checkboxPageHighlight6 !== true) {
									element.style.setProperty('box-sizing', 'border-box', 'important');
									element.style.setProperty('border', '2px solid ' + color, 'important');
								}

								element.style.setProperty('background-color', color, 'important');
							}
						}
					});
				}
			}
		});
	});

	function rgba() {
		let o = Math.round,
			r = Math.random,
			s = 255;
		return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.4 + ')';
	}

	port.postMessage({action: 'Page Highlight Activated'});
	chrome.storage.local.set({['setMinimised' + activeTab[0].id]: true});

	function onEscape(event) {
		event.preventDefault();
		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: true});
			} else if (event.isTrusted === false) {
				destroyPageHighlight();
			}
		}
	}

	function destroyPageHighlight() {
		document.removeEventListener('keyup', onEscape);

		chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], function (result) {
			if (result['howLongPopupIs' + activeTab[0].id] === 40.5) {
				chrome.storage.local.set({['setMinimised' + activeTab[0].id]: false});
			}
		});

		chrome.storage.local.get(['allFeatures'], function (result) {
			JSON.parse(result['allFeatures']).map(function (value, index) {
				if (value.id === 'pageHighlight') {
					if (value.settings.checkboxPageHighlight1 === true) {
						// All Page Elements
						document.querySelectorAll('*').forEach(function (element) {
							if (
								element.offsetHeight !== 0 &&
								element.offsetWidth !== 0 &&
								element.id !== 'superDevHandler' &&
								element.id !== 'superDevPopup' &&
								element.id !== 'superDevWrapper'
							) {
								if (value.settings.checkboxPageHighlight6 !== true) {
									element.style.removeProperty('box-sizing');
									element.style.removeProperty('border');
								}

								element.style.removeProperty('background-color');
							}
						});
					} else if (value.settings.checkboxPageHighlight2 === true) {
						// Block Level
						document.querySelectorAll('*').forEach(function (element) {
							if (
								element.offsetHeight !== 0 &&
								element.offsetWidth !== 0 &&
								element.id !== 'superDevHandler' &&
								element.id !== 'superDevPopup' &&
								element.id !== 'superDevWrapper'
							) {
								if (
									element.tagName === 'ADDRESS' ||
									element.tagName === 'ARTICLE' ||
									element.tagName === 'ASIDE' ||
									element.tagName === 'BLOCKQUOTE' ||
									element.tagName === 'CANVAS' ||
									element.tagName === 'DD' ||
									element.tagName === 'DIV' ||
									element.tagName === 'DL' ||
									element.tagName === 'DT' ||
									element.tagName === 'FIELDSET' ||
									element.tagName === 'FIGCAPTION' ||
									element.tagName === 'FIGURE' ||
									element.tagName === 'FOOTER' ||
									element.tagName === 'FORM' ||
									element.tagName === 'H1' ||
									element.tagName === 'H2' ||
									element.tagName === 'H3' ||
									element.tagName === 'H4' ||
									element.tagName === 'H5' ||
									element.tagName === 'H6' ||
									element.tagName === 'HEADER' ||
									element.tagName === 'HR' ||
									element.tagName === 'LI' ||
									element.tagName === 'MAIN' ||
									element.tagName === 'NAV' ||
									element.tagName === 'NOSCRIPT' ||
									element.tagName === 'OL' ||
									element.tagName === 'P' ||
									element.tagName === 'PRE' ||
									element.tagName === 'SECTION' ||
									element.tagName === 'TABLE' ||
									element.tagName === 'TFOOT' ||
									element.tagName === 'UL' ||
									element.tagName === 'VIDEO'
								) {
									if (value.settings.checkboxPageHighlight6 !== true) {
										element.style.removeProperty('box-sizing');
										element.style.removeProperty('border');
									}

									element.style.removeProperty('background-color');
								}
							}
						});
					} else if (value.settings.checkboxPageHighlight3 === true) {
						// Inline Level
						document.querySelectorAll('*').forEach(function (element) {
							if (
								element.offsetHeight !== 0 &&
								element.offsetWidth !== 0 &&
								element.id !== 'superDevHandler' &&
								element.id !== 'superDevPopup' &&
								element.id !== 'superDevWrapper'
							) {
								if (
									element.tagName === 'A' ||
									element.tagName === 'ABBR' ||
									element.tagName === 'ACRONYM' ||
									element.tagName === 'B' ||
									element.tagName === 'BDO' ||
									element.tagName === 'BIG' ||
									element.tagName === 'BR' ||
									element.tagName === 'BUTTON' ||
									element.tagName === 'CITE' ||
									element.tagName === 'CODE' ||
									element.tagName === 'DFN' ||
									element.tagName === 'EM' ||
									element.tagName === 'I' ||
									element.tagName === 'IMG' ||
									element.tagName === 'INPUT' ||
									element.tagName === 'KBD' ||
									element.tagName === 'LABEL' ||
									element.tagName === 'MAP' ||
									element.tagName === 'OBJECT' ||
									element.tagName === 'OUTPUT' ||
									element.tagName === 'Q' ||
									element.tagName === 'SAMP' ||
									element.tagName === 'SCRIPT' ||
									element.tagName === 'SELECT' ||
									element.tagName === 'SMALL' ||
									element.tagName === 'SPAN' ||
									element.tagName === 'STRONG' ||
									element.tagName === 'SUB' ||
									element.tagName === 'SUP' ||
									element.tagName === 'TEXTAREA' ||
									element.tagName === 'TIME' ||
									element.tagName === 'TT' ||
									element.tagName === 'VAR'
								) {
									if (value.settings.checkboxPageHighlight6 !== true) {
										element.style.removeProperty('box-sizing');
										element.style.removeProperty('border');
									}

									element.style.removeProperty('background-color');
								}
							}
						});
					} else if (value.settings.checkboxPageHighlight4 === true) {
						// Semantic + Div
						document.querySelectorAll('*').forEach(function (element) {
							if (
								element.offsetHeight !== 0 &&
								element.offsetWidth !== 0 &&
								element.id !== 'superDevHandler' &&
								element.id !== 'superDevPopup' &&
								element.id !== 'superDevWrapper'
							) {
								if (
									element.tagName === 'ARTICLE' ||
									element.tagName === 'ASIDE' ||
									element.tagName === 'DETAILS' ||
									element.tagName === 'FIGCAPTION' ||
									element.tagName === 'FIGURE' ||
									element.tagName === 'FOOTER' ||
									element.tagName === 'HEADER' ||
									element.tagName === 'MAIN' ||
									element.tagName === 'MARK' ||
									element.tagName === 'NAV' ||
									element.tagName === 'SECTION' ||
									element.tagName === 'SUMMARY' ||
									element.tagName === 'TIME'
								) {
									if (value.settings.checkboxPageHighlight6 !== true) {
										element.style.removeProperty('box-sizing');
										element.style.removeProperty('border');
									}

									element.style.removeProperty('background-color');
								}
							}
						});
					} else if (value.settings.checkboxPageHighlight5 === true) {
						// Headings + Paragraphgs
						document.querySelectorAll('*').forEach(function (element) {
							if (
								element.offsetHeight !== 0 &&
								element.offsetWidth !== 0 &&
								element.id !== 'superDevHandler' &&
								element.id !== 'superDevPopup' &&
								element.id !== 'superDevWrapper'
							) {
								if (
									element.tagName === 'H1' ||
									element.tagName === 'H2' ||
									element.tagName === 'H3' ||
									element.tagName === 'H4' ||
									element.tagName === 'H5' ||
									element.tagName === 'H6' ||
									element.tagName === 'P'
								) {
									if (value.settings.checkboxPageHighlight6 !== true) {
										element.style.removeProperty('box-sizing');
										element.style.removeProperty('border');
									}

									element.style.removeProperty('background-color');
								}
							}
						});
					}
				}
			});
		});
	}
}

function deactivatePageHighlight(activeTab, port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Page Highlight Deactivated'});
}

function activateMoveElement(activeTab, port, request) {
	document.addEventListener('mouseover', onMouseOver);
	document.addEventListener('mouseout', onMouseOut);
	document.addEventListener('click', onMouseClick);
	document.addEventListener('keyup', onEscape);
	window.focus({preventScroll: true});

	let pageGuidelineWrapper = document.createElement('page-guideline-wrapper');
	pageGuidelineWrapper.classList.add('pageGuidelineWrapper');
	document.body.appendChild(pageGuidelineWrapper);

	function onMouseOver(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevPopup' && event.target.id !== 'superDevWrapper') {
			event.target.classList.add('pageGuidelineOutline');
			renderPageGuideline(true);
		}
	}

	function onMouseOut(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevPopup' && event.target.id !== 'superDevWrapper') {
			renderPageGuideline(false);
			event.target.classList.remove('pageGuidelineOutline');
		}
	}

	function onMouseClick(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevPopup' && event.target.id !== 'superDevWrapper') {
			event.target.style.setProperty('cursor', 'move', 'important');
			event.target.classList.add('moveElementDraggable');
			$('.moveElementDraggable').draggable({
				iframeFix: true,
				containment: 'document',
				cancel: false,
				create: function () {
					renderPageGuideline(false);
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

	function renderPageGuideline(toShow) {
		if (toShow === true) {
			let guidelinePosition = document.querySelector('.pageGuidelineOutline').getBoundingClientRect();
			let scrollWidth =
				document.body.scrollWidth -
				(document.body.scrollWidth -
					(document.body.offsetWidth +
						(+window.getComputedStyle(document.body).getPropertyValue('margin-left').replace('px', '') +
							+window.getComputedStyle(document.body).getPropertyValue('margin-right').replace('px', ''))));
			let scrollHeight = document.body.scrollHeight;
			let top = guidelinePosition.top + document.documentElement.scrollTop;
			let bottom = guidelinePosition.bottom + document.documentElement.scrollTop;
			let left = guidelinePosition.left + document.documentElement.scrollLeft;
			let right = guidelinePosition.right + document.documentElement.scrollLeft;

			pageGuidelineWrapper.innerHTML = `
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
			pageGuidelineWrapper.innerHTML = ``;
		}
	}

	port.postMessage({action: 'Move Element Activated'});
	chrome.storage.local.set({['setMinimised' + activeTab[0].id]: true});

	function onEscape(event) {
		event.preventDefault();
		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: true});
			} else if (event.isTrusted === false) {
				destroyMoveElement();
			}
		}
	}

	function destroyMoveElement() {
		document.removeEventListener('mouseover', onMouseOver);
		document.removeEventListener('mouseout', onMouseOut);
		document.removeEventListener('click', onMouseClick);
		document.removeEventListener('keyup', onEscape);

		if (document.querySelector('.pageGuidelineOutline')) {
			document.querySelector('.pageGuidelineOutline').blur();
			document.querySelector('.pageGuidelineOutline').classList.remove('pageGuidelineOutline');
		}

		chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], function (result) {
			if (result['howLongPopupIs' + activeTab[0].id] === 40.5) {
				chrome.storage.local.set({['setMinimised' + activeTab[0].id]: false});
			}
		});

		if (document.querySelector('.moveElementDraggable')) {
			$('.moveElementDraggable').draggable('destroy');
			document.querySelectorAll('.moveElementDraggable').forEach(function (element) {
				element.style.setProperty('cursor', 'default', 'important');
			});
			document.querySelector('.moveElementDraggable').classList.remove('moveElementDraggable');
		}

		document.querySelector('.pageGuidelineWrapper').remove();
	}
}

function deactivateMoveElement(activeTab, port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Move Element Deactivated'});
}

function activateExportElement(activeTab, port, request) {
	document.addEventListener('mouseover', onMouseOver);
	document.addEventListener('mouseout', onMouseOut);
	document.addEventListener('click', onMouseClick);
	document.addEventListener('keyup', onEscape);
	window.focus({preventScroll: true});

	let pageGuidelineWrapper = document.createElement('page-guideline-wrapper');
	pageGuidelineWrapper.classList.add('pageGuidelineWrapper');
	document.body.appendChild(pageGuidelineWrapper);

	function onMouseOver(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevPopup' && event.target.id !== 'superDevWrapper') {
			event.target.classList.add('pageGuidelineOutline');
			renderPageGuideline(true);
		}
	}

	function onMouseOut(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevPopup' && event.target.id !== 'superDevWrapper') {
			renderPageGuideline(false);
			event.target.classList.remove('pageGuidelineOutline');
		}
	}

	let portTwo = chrome.runtime.connect({name: 'portTwo'});
	let allStyleSheets = [];

	// Saving All CSSRules to AllStyleSheets 2D Array
	[...document.styleSheets].map(function (valueOne, indexOne) {
		try {
			if ([...valueOne.cssRules].length !== 0) {
				let singleStylesheet = [];
				[...valueOne.cssRules].map(function (valueTwo, indexTwo) {
					singleStylesheet.push(valueTwo);
				});
				allStyleSheets.push(singleStylesheet);
			}
		} catch (e) {
			allStyleSheets.push([]);
			portTwo.postMessage({action: 'getStylesheet', styleSheetUrl: valueOne.href});
		}
	});

	// Saving External Stylesheets' CSSRules
	// to AllStyleSheets 2D Array
	let exportElementWrapper = document.createElement('export-element-wrapper');
	let exportElementShaRoot = exportElementWrapper.attachShadow({mode: 'closed'});
	let exportElementStyle = document.createElement('style');
	exportElementShaRoot.appendChild(exportElementStyle);
	document.body.appendChild(exportElementWrapper);

	portTwo.onMessage.addListener(function (request) {
		if (request.action === 'parseStylesheet' && request.styleSheet !== false) {
			for (let i = 0; i < allStyleSheets.length; i++) {
				if (allStyleSheets[i].length === 0) {
					exportElementStyle.textContent = request.styleSheet;
					[...exportElementWrapper.contentWindow.document.styleSheets].map(function (valueOne, indexOne) {
						if ([...valueOne.cssRules].length !== 0) {
							let singleStylesheet = [];
							[...valueOne.cssRules].map(function (valueTwo, indexTwo) {
								singleStylesheet.push(valueTwo);
							});
							allStyleSheets[i].push(singleStylesheet);
							allStyleSheets[i] = allStyleSheets[i].flat();
						}
					});
					break;
				}
			}
		}
	});

	function onMouseClick(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevPopup' && event.target.id !== 'superDevWrapper') {
			// Saving OutHTML Selectors
			// IDs, Classes, Tags
			let usedStyles = [];
			let allSelectors = [];
			let allKeyframes = [];
			let allAnimations = [];

			[event.target, ...event.target.querySelectorAll('*')].map(function (valueOne, indexOne) {
				let tempSelectors = [];
				if (valueOne.id !== '') tempSelectors.push('#' + valueOne.id);
				if (valueOne.className !== '') {
					[...valueOne.classList].map(function (valueTwo, indexTwo) {
						if (valueTwo !== 'pageGuidelineOutline') tempSelectors.push('.' + valueTwo);
					});
				}
				tempSelectors.push(valueOne.tagName.toLowerCase());
				allSelectors.push(tempSelectors);
			});
			allSelectors = [...new Set(allSelectors.flat())];

			// Removing Unused CSS
			allStyleSheets.flat().map(function (valueOne, indexOne) {
				allSelectors.map(function (valueTwo, indexTwo) {
					let regexZero = new RegExp(/\\/gm);
					let regexOne = new RegExp('[ ,]([*]|html|body)[ [,:.>+~#]', 'gm'); // For Html, Body, :Root
					let regexTwo = new RegExp('[ [,:.>+~#](' + valueTwo + ')[ [,:.>+~#]', 'gm'); // For Classes
					let regexThree = new RegExp('[ ,](' + valueTwo + ')[ [,:.>+~#]', 'gm'); // For Tags Only

					// If CSSStyles
					if (!valueOne.cssText.startsWith('@')) {
						// IDs
						if (valueTwo.startsWith('#')) {
							if ((' ' + valueOne.selectorText.replaceAll(regexZero, '') + ' ').match(regexTwo) !== null) {
								usedStyles.push(valueOne.cssText);
							}
						}
						// Classes
						else if (valueTwo.startsWith('.')) {
							if (
								(' ' + valueOne.selectorText.replaceAll(regexZero, '') + ' ').match(regexOne) !== null ||
								(' ' + valueOne.selectorText.replaceAll(regexZero, '') + ' ').match(regexTwo) !== null
							) {
								usedStyles.push(valueOne.cssText);
							}
						}
						// Tags
						else {
							if ((' ' + valueOne.selectorText.replaceAll(regexZero, '') + ' ').match(regexThree) !== null) {
								usedStyles.push(valueOne.cssText);
							}
						}
					}

					// If MediaQuery
					else if (valueOne.cssText.startsWith('@media')) {
						let mediaStyles = [];
						[...valueOne.cssRules].map(function (valueThree, indexThree) {
							// If CSSStyles
							if (!valueThree.cssText.startsWith('@')) {
								// IDs
								if (valueTwo.startsWith('#')) {
									if ((' ' + valueThree.selectorText.replaceAll(regexZero, '') + ' ').match(regexTwo) !== null) {
										mediaStyles.push(valueThree.cssText);
									}
								}
								// Classes
								else if (valueTwo.startsWith('.')) {
									if (
										(' ' + valueThree.selectorText.replaceAll(regexZero, '') + ' ').match(regexOne) !== null ||
										(' ' + valueThree.selectorText.replaceAll(regexZero, '') + ' ').match(regexTwo) !== null
									) {
										mediaStyles.push(valueThree.cssText);
									}
								}
								// Tags
								else {
									if ((' ' + valueThree.selectorText.replaceAll(regexZero, '') + ' ').match(regexThree) !== null) {
										mediaStyles.push(valueThree.cssText);
									}
								}
							}
							// If CSSSupports
							else if (valueThree.cssText.startsWith('@supports')) {
								let cssSupports = [];
								[...valueThree.cssRules].map(function (valueFour, indexFour) {
									// If CSSStyles
									if (!valueFour.cssText.startsWith('@')) {
										// IDs
										if (valueTwo.startsWith('#')) {
											if ((' ' + valueFour.selectorText.replaceAll(regexZero, '') + ' ').match(regexTwo) !== null) {
												cssSupports.push(valueFour.cssText);
											}
										}
										// Classes
										else if (valueTwo.startsWith('.')) {
											if (
												(' ' + valueFour.selectorText.replaceAll(regexZero, '') + ' ').match(regexOne) !== null ||
												(' ' + valueFour.selectorText.replaceAll(regexZero, '') + ' ').match(regexTwo) !== null
											) {
												cssSupports.push(valueFour.cssText);
											}
										}
										// Tags
										else {
											if ((' ' + valueFour.selectorText.replaceAll(regexZero, '') + ' ').match(regexThree) !== null) {
												cssSupports.push(valueFour.cssText);
											}
										}
									}
									// If CSSKeyframes
									else if (valueFour.cssText.startsWith('@keyframes')) {
										let cssKeyframes = [];
										[...valueFour.cssRules].map(function (valueFive, indexFive) {
											cssKeyframes.push(valueFive.cssText);
										});
										if (cssKeyframes.length !== 0) {
											allKeyframes.push({name: valueFour.name, value: `@keyframes ${valueFour.name} { ${cssKeyframes.join('\n')} }`});
											cssSupports.push(`@keyframes ${valueFour.name} { ${cssKeyframes.join('\n')} }`);
										}
									}
								});
								if (cssSupports.length !== 0) {
									mediaStyles.push(`@supports ${valueThree.conditionText} { ${cssSupports.join('\n')} }`);
								}
							}
							// If CSSKeyframes
							else if (valueThree.cssText.startsWith('@keyframes')) {
								let cssKeyframes = [];
								[...valueThree.cssRules].map(function (valueFour, indexFour) {
									cssKeyframes.push(valueFour.cssText);
								});
								if (cssKeyframes.length !== 0) {
									allKeyframes.push({name: valueThree.name, value: `@keyframes ${valueThree.name} { ${cssKeyframes.join('\n')} }`});
									mediaStyles.push(`@keyframes ${valueThree.name} { ${cssKeyframes.join('\n')} }`);
								}
							}
						});
						if (mediaStyles.length !== 0) {
							usedStyles.push(`@media ${valueOne.conditionText} { ${mediaStyles.join('\n')} }`);
						}
					}

					// If CSSSupports
					else if (valueOne.cssText.startsWith('@supports')) {
						let cssSupports = [];
						[...valueOne.cssRules].map(function (valueThree, indexThree) {
							// If CSSStyles
							if (!valueThree.cssText.startsWith('@')) {
								// IDs
								if (valueTwo.startsWith('#')) {
									if ((' ' + valueThree.selectorText.replaceAll(regexZero, '') + ' ').match(regexTwo) !== null) {
										cssSupports.push(valueThree.cssText);
									}
								}
								// Classes
								else if (valueTwo.startsWith('.')) {
									if (
										(' ' + valueThree.selectorText.replaceAll(regexZero, '') + ' ').match(regexOne) !== null ||
										(' ' + valueThree.selectorText.replaceAll(regexZero, '') + ' ').match(regexTwo) !== null
									) {
										cssSupports.push(valueThree.cssText);
									}
								}
								// Tags
								else {
									if ((' ' + valueThree.selectorText.replaceAll(regexZero, '') + ' ').match(regexThree) !== null) {
										cssSupports.push(valueThree.cssText);
									}
								}
							}
							// If MediaQuery
							else if (valueThree.cssText.startsWith('@media')) {
								let mediaStyles = [];
								[...valueThree.cssRules].map(function (valueFour, indexFour) {
									// If CSSStyles
									if (!valueFour.cssText.startsWith('@')) {
										// IDs
										if (valueTwo.startsWith('#')) {
											if ((' ' + valueFour.selectorText.replaceAll(regexZero, '') + ' ').match(regexTwo) !== null) {
												mediaStyles.push(valueFour.cssText);
											}
										}
										// Classes
										else if (valueTwo.startsWith('.')) {
											if (
												(' ' + valueFour.selectorText.replaceAll(regexZero, '') + ' ').match(regexOne) !== null ||
												(' ' + valueFour.selectorText.replaceAll(regexZero, '') + ' ').match(regexTwo) !== null
											) {
												mediaStyles.push(valueFour.cssText);
											}
										}
										// Tags
										else {
											if ((' ' + valueFour.selectorText.replaceAll(regexZero, '') + ' ').match(regexThree) !== null) {
												mediaStyles.push(valueFour.cssText);
											}
										}
									}
									// If CSSKeyframes
									else if (valueFour.cssText.startsWith('@keyframes')) {
										let cssKeyframes = [];
										[...valueFour.cssRules].map(function (valueFive, indexFive) {
											cssKeyframes.push(valueFive.cssText);
										});
										if (cssKeyframes.length !== 0) {
											allKeyframes.push({name: valueFour.name, value: `@keyframes ${valueFour.name} { ${cssKeyframes.join('\n')} }`});
											mediaStyles.push(`@keyframes ${valueFour.name} { ${cssKeyframes.join('\n')} }`);
										}
									}
								});
								if (mediaStyles.length !== 0) {
									cssSupports.push(`@media ${valueThree.conditionText} { ${mediaStyles.join('\n')} }`);
								}
							}
							// If CSSKeyframes
							else if (valueThree.cssText.startsWith('@keyframes')) {
								let cssKeyframes = [];
								[...valueThree.cssRules].map(function (valueFour, indexFour) {
									cssKeyframes.push(valueFour.cssText);
								});
								if (cssKeyframes.length !== 0) {
									allKeyframes.push({name: valueThree.name, value: `@keyframes ${valueThree.name} { ${cssKeyframes.join('\n')} }`});
									cssSupports.push(`@keyframes ${valueThree.name} { ${cssKeyframes.join('\n')} }`);
								}
							}
						});
						if (cssSupports.length !== 0) {
							usedStyles.push(`@supports ${valueOne.conditionText} { ${cssSupports.join('\n')} }`);
						}
					}

					// If CSSKeyframes
					else if (valueOne.cssText.startsWith('@keyframes')) {
						let cssKeyframes = [];
						[...valueOne.cssRules].map(function (valueThree, indexThree) {
							cssKeyframes.push(valueThree.cssText);
						});
						if (cssKeyframes.length !== 0) {
							allKeyframes.push({name: valueOne.name, value: `@keyframes ${valueOne.name} { ${cssKeyframes.join('\n')} }`});
							usedStyles.push(`@keyframes ${valueOne.name} { ${cssKeyframes.join('\n')} }`);
						}
					}
				});
			});

			usedStyles = [...new Set(usedStyles)];
			usedStyles = usedStyles.join(' ');

			// CSS Variables Replace
			let bodyStyle = window.getComputedStyle(document.body);
			let usedVars = usedStyles.match(/var\(([a-zA-Z0-9-_\s]+)\)/gm); // /var\(([a-zA-Z-0-9_,#."%\s]+)\)/gm
			if (usedVars !== null) {
				usedVars = [...new Set(usedVars?.flat())];
				usedVars.map(function (valueOne, indexOne) {
					valueOne.match(/(--[a-zA-Z0-9-_]+)/gm).map(function (valueTwo, indexTwo) {
						if (valueTwo !== null && bodyStyle.getPropertyValue(valueTwo) !== '') {
							usedStyles = usedStyles.replaceAll(valueOne, bodyStyle.getPropertyValue(valueTwo));
						}
					});
				});
			}

			// CSS Keyframe Replace, Regex Will Get Chars Between Two Strings Without The Two Chars Itself
			allAnimations = usedStyles.match(/(?<=animation:)([\S\s]*?)(?=;)|(?<=animation-name:)([\S\s]*?)(?=;)/gm);
			allAnimations = [...new Set(allAnimations)];
			if (allAnimations !== null) {
				allAnimations.map(function (valueOne, indexOne) {
					if (allKeyframes !== null) {
						allKeyframes.map(function (valueTwo, indexTwo) {
							if (!valueOne.includes(valueTwo.name + ';') && !valueOne.includes(valueTwo.name + ' ')) {
								usedStyles = usedStyles.replaceAll(valueTwo.value, '');
							}
						});
					}
				});
			}

			// CodePen or Save to File
			chrome.storage.local.get(['allFeatures'], function (result) {
				JSON.parse(result['allFeatures']).map(function (value, index) {
					if (value.id === 'exportElement') {
						let html = event.target.outerHTML;
						let helper = 'body { background: #eee; /* Helper CSS, Remove This */ }';
						let css = helper + usedStyles;
						usedStyles = []; // Reset

						// Remove PageGuidelineOutline Class From OuterHTML
						if (html.includes('class="pageGuidelineOutline"')) {
							html = html.replace('class="pageGuidelineOutline"', '');
						} else if (html.includes(' pageGuidelineOutline')) {
							html = html.replace(' pageGuidelineOutline', '');
						} else if (html.includes('pageGuidelineOutline ')) {
							html = html.replace('pageGuidelineOutline ', '');
						}

						// Remove MoveElement Cursor From OuterHTML
						if (html.includes('cursor: default !important; ')) {
							html = html.replace('cursor: default !important; ', '');
						} else if (html.includes(' cursor: default !important;')) {
							html = html.replace(' cursor: default !important;', '');
						}

						// Remove SuperDev && Page Guideline Wrapper from Body
						// Regex Will Get Chars Between Two Strings + The Two Chars Itself
						html = html.replaceAll(/<superdev-wrapper([\S\s]*?)<\/superdev-wrapper>/gm, '');
						html = html.replaceAll(/<page-guideline-wrapper([\S\s]*?)<\/page-guideline-wrapper>/gm, '');
						html = html.replaceAll(/<export-element-wrapper([\S\s]*?)<\/export-element-wrapper>/gm, '');

						// Format Before Codepen/Save File
						html = html_beautify(html, {indent_size: 2, indent_with_tabs: true, preserve_newlines: false});
						css = css_beautify(css, {indent_size: 2, indent_with_tabs: true, preserve_newlines: false});

						// Export to Codepen
						if (value.settings.checkboxExportElement1 === true) {
							let codepenValue = JSON.stringify({
								title: 'SuperDev - Exported Element',
								description: 'Copied with SuperDev',
								html: html,
								css: css,
								tags: ['SuperDev'],
							});

							let codepenForm = document.createElement('form');
							codepenForm.setAttribute('action', 'https://codepen.io/pen/define');
							codepenForm.setAttribute('method', 'POST');
							codepenForm.setAttribute('target', 'view');
							codepenForm.innerHTML = '<input type="hidden" name="data" value=\'\' id="codepenValue" />';
							codepenForm.querySelector('#codepenValue').value = codepenValue;
							document.body.appendChild(codepenForm);
							codepenForm.submit();
							codepenForm.remove();
						}
						// Export to File
						else if (value.settings.checkboxExportElement2 === true) {
							let text = `${html} <style> ${css} </style>`;
							let file = new Blob([text], {type: 'text/plain;charset=utf-8'});

							let a = document.createElement('a');
							a.href = URL.createObjectURL(file);
							a.download = 'exported-element.html';
							document.body.appendChild(a);

							let clickEvent = new MouseEvent('click', {bubbles: false});
							a.dispatchEvent(clickEvent);

							setTimeout(function () {
								URL.revokeObjectURL(a.href);
								document.body.removeChild(a);
							}, 50);
						}
					}
				});
			});
		}
	}

	function renderPageGuideline(toShow) {
		if (toShow === true) {
			let guidelinePosition = document.querySelector('.pageGuidelineOutline').getBoundingClientRect();
			let scrollWidth =
				document.body.scrollWidth -
				(document.body.scrollWidth -
					(document.body.offsetWidth +
						(+window.getComputedStyle(document.body).getPropertyValue('margin-left').replace('px', '') +
							+window.getComputedStyle(document.body).getPropertyValue('margin-right').replace('px', ''))));
			let scrollHeight = document.body.scrollHeight;
			let top = guidelinePosition.top + document.documentElement.scrollTop;
			let bottom = guidelinePosition.bottom + document.documentElement.scrollTop;
			let left = guidelinePosition.left + document.documentElement.scrollLeft;
			let right = guidelinePosition.right + document.documentElement.scrollLeft;

			pageGuidelineWrapper.innerHTML = `
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
			pageGuidelineWrapper.innerHTML = ``;
		}
	}

	port.postMessage({action: 'Export Element Activated'});
	chrome.storage.local.set({['setMinimised' + activeTab[0].id]: true});

	function onEscape(event) {
		event.preventDefault();
		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: true});
			} else if (event.isTrusted === false) {
				destroyExportElement();
			}
		}
	}

	function destroyExportElement() {
		document.removeEventListener('mouseover', onMouseOver);
		document.removeEventListener('mouseout', onMouseOut);
		document.removeEventListener('click', onMouseClick);
		document.removeEventListener('keyup', onEscape);

		if (document.querySelector('.pageGuidelineOutline')) {
			document.querySelector('.pageGuidelineOutline').blur();
			document.querySelector('.pageGuidelineOutline').classList.remove('pageGuidelineOutline');
		}

		chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], function (result) {
			if (result['howLongPopupIs' + activeTab[0].id] === 40.5) {
				chrome.storage.local.set({['setMinimised' + activeTab[0].id]: false});
			}
		});

		document.querySelector('.pageGuidelineWrapper').remove();
	}
}

function deactivateExportElement(activeTab, port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Export Element Deactivated'});
}

function activateDeleteElement(activeTab, port, request) {
	document.addEventListener('mouseover', onMouseOver);
	document.addEventListener('mouseout', onMouseOut);
	document.addEventListener('click', onMouseClick);
	document.addEventListener('keyup', onEscape);
	window.focus({preventScroll: true});

	let pageGuidelineWrapper = document.createElement('page-guideline-wrapper');
	pageGuidelineWrapper.classList.add('pageGuidelineWrapper');
	document.body.appendChild(pageGuidelineWrapper);

	function onMouseOver(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevPopup' && event.target.id !== 'superDevWrapper') {
			event.target.classList.add('pageGuidelineOutline');
			renderPageGuideline(true);
		}
	}

	function onMouseOut(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevPopup' && event.target.id !== 'superDevWrapper') {
			renderPageGuideline(false);
			event.target.classList.remove('pageGuidelineOutline');
		}
	}

	function onMouseClick(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevPopup' && event.target.id !== 'superDevWrapper') {
			event.target.classList.add('deleteElementWrapper');
			document.querySelector('.deleteElementWrapper').remove();
		}
	}

	function renderPageGuideline(toShow) {
		if (toShow === true) {
			let guidelinePosition = document.querySelector('.pageGuidelineOutline').getBoundingClientRect();
			let scrollWidth =
				document.body.scrollWidth -
				(document.body.scrollWidth -
					(document.body.offsetWidth +
						(+window.getComputedStyle(document.body).getPropertyValue('margin-left').replace('px', '') +
							+window.getComputedStyle(document.body).getPropertyValue('margin-right').replace('px', ''))));
			let scrollHeight = document.body.scrollHeight;
			let top = guidelinePosition.top + document.documentElement.scrollTop;
			let bottom = guidelinePosition.bottom + document.documentElement.scrollTop;
			let left = guidelinePosition.left + document.documentElement.scrollLeft;
			let right = guidelinePosition.right + document.documentElement.scrollLeft;

			pageGuidelineWrapper.innerHTML = `
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
			pageGuidelineWrapper.innerHTML = ``;
		}
	}

	port.postMessage({action: 'Delete Element Activated'});
	chrome.storage.local.set({['setMinimised' + activeTab[0].id]: true});

	function onEscape(event) {
		event.preventDefault();
		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: true});
			} else if (event.isTrusted === false) {
				destroyDeleteElement();
			}
		}
	}

	function destroyDeleteElement() {
		document.removeEventListener('mouseover', onMouseOver);
		document.removeEventListener('mouseout', onMouseOut);
		document.removeEventListener('click', onMouseClick);
		document.removeEventListener('keyup', onEscape);

		if (document.querySelector('.pageGuidelineOutline')) {
			document.querySelector('.pageGuidelineOutline').blur();
			document.querySelector('.pageGuidelineOutline').classList.remove('pageGuidelineOutline');
		}

		chrome.storage.local.get(['howLongPopupIs' + activeTab[0].id], function (result) {
			if (result['howLongPopupIs' + activeTab[0].id] === 40.5) {
				chrome.storage.local.set({['setMinimised' + activeTab[0].id]: false});
			}
		});

		document.querySelector('.pageGuidelineWrapper').remove();
	}
}

function deactivateDeleteElement(activeTab, port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Delete Element Deactivated'});
}

function activateClearAllCache(activeTab, port, request) {
	chrome.storage.local.get(['allFeatures'], function (result) {
		JSON.parse(result['allFeatures']).map(function (value, index) {
			if (value.id === 'clearAllCache') {
				let portTwo = chrome.runtime.connect({name: 'portTwo'});
				portTwo.postMessage({action: 'clearAllCache', settings: value.settings});
			}
		});
	});
	port.postMessage({action: 'Clear All Cache Activated'});
}
