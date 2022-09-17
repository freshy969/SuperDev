chrome.runtime.onConnect.addListener(function (port) {
	port.onMessage.addListener(function (request) {
		switch (request.action) {
			case 'pageRuler':
				pageRuler(port, request);
				break;
		}
	});
});

const pageRuler = (port, request) => {
	// Was Added
	let image = new Image();
	let canvas = document.createElement('canvas');
	// Was Added
	let body = document.querySelector('body');
	let portThree = chrome.runtime.connect({name: 'dimensions'});
	let changeDelay = 300;
	let changeTimeout;
	let paused = true;
	let inputX, inputY;
	let altKeyWasPressed = false;
	let connectionClosed = false;
	let lineColor = getLineColor();
	let colorThreshold = [0.2, 0.5, 0.2];
	let overlay = document.createElement('div');
	overlay.className = 'rulerNoCursor';

	portThree.onMessage.addListener(function (request) {
		if (connectionClosed) return;

		switch (request.action) {
			// Was Added
			case 'parseScreenshot':
				parseScreenshot(request.dataUrl);
				loadImage();
				break;
			// Was Added
			case 'distances':
				showDimensions(request.data);
				break;
			case 'screenshotProcessed':
				resume();
				break;
			case 'destroy':
				destroy();
				break;
		}
	});

	onResizeWindow(), initiate();

	function initiate() {
		window.addEventListener('mousemove', onInputMove);
		window.addEventListener('touchmove', onInputMove);
		window.addEventListener('scroll', onVisibleAreaChange);
		window.addEventListener('resize', onResizeWindow);

		window.addEventListener('keydown', detectAltKeyPress);
		window.addEventListener('keyup', detectAltKeyRelease);
		window.addEventListener('keyup', onKeyRelease);

		disableCursor();
		requestNewScreenshot();
	}

	// Was Added
	function parseScreenshot(dataUrl) {
		image.src = dataUrl;
	}

	function loadImage() {
		ctx = canvas.getContext('2d', {willReadFrequently: true});
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

	function destroy() {
		connectionClosed = true;
		window.removeEventListener('mousemove', onInputMove);
		window.removeEventListener('touchmove', onInputMove);
		window.removeEventListener('scroll', onVisibleAreaChange);

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

	function detectAltKeyPress(event) {
		if (event.altKey && !altKeyWasPressed) {
			altKeyWasPressed = true;
			sendToWorker(event);
		}
	}

	function detectAltKeyRelease(event) {
		if (altKeyWasPressed) {
			altKeyWasPressed = false;
			sendToWorker(event);
		}
	}

	function onKeyRelease(event) {
		switch (event.code) {
			case 'Escape':
				portThree.postMessage({action: 'closeOverlay'});
				break;
		}
	}

	function onInputMove(event) {
		if (event.touches) {
			inputX = event.touches[0].clientX;
			inputY = event.touches[0].clientY;
		} else {
			inputX = event.clientX;
			inputY = event.clientY;
		}

		sendToWorker(event);
	}

	function sendToWorker(event) {
		if (paused) return;

		portThree.postMessage({
			action: event.altKey ? 'area' : 'position',
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

		if (
			Math.abs(dimensions.backgroundColor[0] - lineColor[0]) <= colorThreshold[0] &&
			Math.abs(dimensions.backgroundColor[1] - lineColor[1]) <= colorThreshold[1] &&
			Math.abs(dimensions.backgroundColor[2] - lineColor[2]) <= colorThreshold[2]
		)
			newDimensions.className += ' altColor';

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

	function getLineColor() {
		let axis = document.createElement('div');
		axis.className = 'rulerAxis';

		body.appendChild(axis);

		let style = getComputedStyle(axis);
		let rgbString = style.backgroundColor;
		let colorsOnly = rgbString.substring(rgbString.indexOf('(') + 1, rgbString.lastIndexOf(')')).split(/,\s*/);

		body.removeChild(axis);

		return rgbToHsl(colorsOnly[0], colorsOnly[1], colorsOnly[2]);
	}

	function rgbToHsl(r, g, b) {
		(r /= 255), (g /= 255), (b /= 255);
		let max = Math.max(r, g, b),
			min = Math.min(r, g, b);
		let h,
			s,
			l = (max + min) / 2;

		if (max == min) {
			h = s = 0; // achromatic
		} else {
			let d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}

		return [h, s, l];
	}
};
