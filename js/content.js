chrome.runtime.onConnect.addListener(function (port) {
	port.onMessage.addListener(function (request) {
		switch (request.action) {
			case 'extClicked':
				extClicked(port, request);
				break;
			case 'removePopup':
				removePopup(port, request);
				break;
			case 'changeHeight':
				changeHeight(port, request);
				break;
			case 'activateTextEditor':
				activateTextEditor(port, request);
				break;
			case 'deactivateTextEditor':
				deactivateTextEditor(port, request);
				break;
			case 'pageRuler':
				pageRuler(port, request);
				break;
		}
	});
});

const extClicked = (port, request) => {
	if (document.querySelector('#superDev') !== null) {
		document.querySelector('#superDev').remove();
		port.postMessage({action: 'Popup Removed'});
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
		document.querySelector('#superDev').appendChild(superDevHandler);

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
		document.querySelector('#superDev').appendChild(superDevIframe);

		$('#superDev').draggable({
			handle: '#superDevHandler',
			cursor: 'move',
			iframeFix: true,
		});

		port.postMessage({action: 'Popup Created'});
	}
};

const removePopup = (port, request) => {
	if (document.querySelector('#superDev') !== null) {
		// Why postMessage is called here before action.
		// Because the sender (NavbarJs, part of iFrame) cannot receive
		// the message after we remove the whole iFrame from the DOM.
		port.postMessage({action: 'Popup Removed'});
		document.querySelector('#superDev').remove();
	}
};

const changeHeight = (port, request) => {
	document.querySelector('#superDevIframe').style.height = `${request.height}px`;
	document.querySelector('#superDevIframe').style.visibility = 'visible';
	port.postMessage({action: 'Height Changed'});
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

const pageRuler = (port, request) => {
	// Add Global Stylesheet to Head
	let link = document.createElement('link');
	link.href = chrome.runtime.getURL('css/pageruler.css');
	link.type = 'text/css';
	link.rel = 'stylesheet';
	document.querySelector('head')[0].appendChild(link);

	// Global Variables
	let html = document.querySelector('html');
	let canvas = document.createElement('canvas');
	let ctx = canvas.getContext('2d');
	let width = (canvas.width = html.clientWidth);
	let height = (canvas.height = html.clientHeight);
	let image = new Image();
	let inputX;
	let inputY;
	let imageData;

	port.postMessage({action: 'Page Ruler Started'});
	let portThree = chrome.runtime.connect({name: 'portThree'});
	drawCanvas();

	function drawCanvas() {
		portThree.postMessage({action: 'bodyScreenshot'});
		portThree.onMessage.addListener(function (request) {
			if (request.action && request.action === 'bodyScreenshotDone') {
				image.src = request.bodyScreenshot;
				ctx.drawImage(image, 0, 0, width, height);
				imageData = Array.from(ctx.getImageData(0, 0, width, height).data);
				portThree.postMessage({action: 'toGrayscale', imageData: imageData, width: width, height: height});
			}
			if (request.action && request.action === 'toGrayscaleDone') {
				html.onmousemove = storeMousePosition;
				html.ontouchmove = storeMousePosition;
				html.onmouseleave = removePageRuler;
			}
		});
	}

	// Store Mouse Position
	function storeMousePosition(event) {
		event.preventDefault();
		inputX = event.pageX - html.offsetLeft;
		inputY = event.pageY - html.offsetTop;

		// Asking BJS, toGrayscale
		portThree.postMessage({
			action: 'measureDistance',
			inputX: inputX,
			inputY: inputY,
		});
		portThree.onMessage.addListener(function (request) {
			if (request.action && request.action === 'measureDistanceDone') {
				showPageRuler(request.distances);
			}
		});
	}

	// Removes Page Ruler From Dom //
	function removePageRuler() {
		let distances = html.querySelector('.rulerData');
		if (distances) html.removeChild(distances);
	}

	// Takes Result From MeasureDistance and Populates/Create HTML
	function showPageRuler(distances) {
		if (!distances) return;

		let newDimensions = html.querySelector('.rulerData') || document.createElement('div');
		let xAxis = html.querySelector('.xAxis.rulerAxis') || document.createElement('div');
		let yAxis = html.querySelector('.yAxis.rulerAxis') || document.createElement('div');
		let tooltip = html.querySelector('.rulerTooltip') || document.createElement('div');

		newDimensions.className = 'rulerData';

		newDimensions.style.webkitTransform = `translate(${distances.x}px, ${distances.y}px)`;
		newDimensions.style.MozTransform = `translate(${distances.x}px, ${distances.y}px)`;
		newDimensions.style.msTransform = `translate(${distances.x}px, ${distances.y}px)`;
		newDimensions.style.OTransform = `translate(${distances.x}px, ${distances.y}px)`;

		let measureWidth = distances.left + distances.right;
		let measureHeight = distances.top + distances.bottom;

		xAxis.className = 'xAxis rulerAxis';
		xAxis.style.width = measureWidth + 'px';

		yAxis.className = 'yAxis rulerAxis';
		yAxis.style.height = measureHeight + 'px';

		xAxis.style.webkitTransform = `translateX(${-distances.left}px)`;
		xAxis.style.MozTransform = `translateX(${-distances.left}px)`;
		xAxis.style.msTransform = `translateX(${-distances.left}px)`;
		xAxis.style.OTransform = `translateX(${-distances.left}px)`;

		yAxis.style.webkitTransform = `translateY(${-distances.top}px)`;
		yAxis.style.MozTransform = `translateY(${-distances.top}px)`;
		yAxis.style.msTransform = `translateY(${-distances.top}px)`;
		yAxis.style.OTransform = `translateY(${-distances.top}px)`;

		tooltip.className = 'rulerTooltip';
		tooltip.textContent = measureWidth + 1 + ' × ' + (measureHeight + 1);

		if (distances.y < 26) tooltip.classList.add('bottom');
		if (distances.x > window.innerWidth - 110) tooltip.classList.add('left');

		if (!html.querySelector('.rulerData')) {
			newDimensions.appendChild(xAxis);
			newDimensions.appendChild(yAxis);
			newDimensions.appendChild(tooltip);
			html.appendChild(newDimensions);
		}
	}
};
