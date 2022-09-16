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
	// If Popup Doesn't Exists
	if (document.querySelector('#superDev') === null) {
		let superDev = document.createElement('section');
		superDev.id = 'superDev';
		superDev.style.cssText = `
			position: fixed !important;
			top: 32px !important;
			right: 18px !important;
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
			overflow: hidden !important;`;
		document.querySelector('#superDev').appendChild(superDevIframe);

		$('#superDev').draggable({
			handle: '#superDevHandler',
			cursor: 'move',
			iframeFix: true,
		});

		port.postMessage({action: 'Popup Created'});
	}
	// If Popup Visible
	else if (document.querySelector('#superDev').style.visibility !== 'hidden') {
		document.querySelector('#superDev').style.visibility = 'hidden';
		port.postMessage({action: 'Popup Hidden'});
	}
	// If Popup Hidden
	else {
		document.querySelector('#superDev').style.visibility = 'visible';
		port.postMessage({action: 'Popup Visible'});
	}
};

const removePopup = (port, request) => {
	document.querySelector('#superDev').style.visibility = 'hidden';
	port.postMessage({action: 'Popup Hidden'});
};

const changeHeight = (port, request) => {
	document.querySelector('#superDevIframe').style.height = `${request.height}px`;
	if (document.querySelector('#superDev').style.visibility === 'hidden') document.querySelector('#superDev').style.visibility = 'visible';
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
	// Adding Styles To Head
	let style = document.createElement('style');
	document.head.appendChild(style);
	style.textContent = `
	.rulerData {
		position: fixed;
		width: 0;
		height: 0;
		z-index: 2147483646;
		cursor: crosshair;
		top: 0;
		left: 0;
		display: block !important;
	}
	.xAxis {
		height: 1px;
	}
	.rulerAxis {
		position: absolute;
		background: rgb(0, 212, 190);
	}
	.yAxis {
		width: 1px;
	}
	.rulerTooltip {
		position: absolute;
		left: 7px;
		bottom: 6px;
		padding: 1px 10px;
		color: white;
		text-align: center;
		white-space: nowrap;
		font-size: 12px;
		line-height: 25px;
		direction: ltr;
		border-radius: 4px;
		background: rgba(15, 17, 29, 0.95);
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		box-shadow: rgb(0 0 0 / 15%) 0.15em 0.15em 0.2em !important;
		font-family: system-ui, -apple-system, sans-serif;
	}
	.rulerAxis::before,
	.rulerAxis::after {
		content: '';
		position: absolute;
		background: inherit;
	}
	.xAxis::before,
	.xAxis::after {
		left: 0px;
		height: 5px;
		top: -2px;
		width: 1px;
	}
	.yAxis::before,
	.yAxis::after {
		left: -2px;
		height: 1px;
		top: 0px;
		width: 5px;
	}
	.xAxis::after {
		left: 100%;
	}
	.yAxis::after {
		top: 100%;
	}
	`;

	// Global Variables
	let body = document.querySelector('body');
	let canvas = document.createElement('canvas');
	let ctx = canvas.getContext('2d');
	let width = (canvas.width = body.clientWidth);
	let height = (canvas.height = body.clientHeight);
	let portThree = chrome.runtime.connect({name: 'portThree'});
	let image = new Image();
	let inputX, inputY, imageData;

	// Initiate
	port.postMessage({action: 'PageRuler Initiated'});
	drawCanvas();

	function drawCanvas() {
		portThree.postMessage({action: 'bodyScreenshot'});
		console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Started Body Screenshot');
		portThree.onMessage.addListener(function (request) {
			if (request.action && request.action === 'bodyScreenshotDone') {
				console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Done Body Screenshot');
				image.src = request.bodyScreenshot;
				console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Starting Drawing Canvas');
				ctx.drawImage(image, 0, 0, width, height);
				imageData = Array.from(ctx.getImageData(0, 0, width, height).data);
				console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Done Drawing Canvas');
				portThree.postMessage({action: 'toGrayscale', imageData: imageData, width: width, height: height});
				console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Starting Grayscaling');
			}
			if (request.action && request.action === 'toGrayscaleDone') {
				console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Done Grayscaling');
				body.onmousemove = storeMousePosition;
				body.ontouchmove = storeMousePosition;
				body.onmouseleave = removePageRuler;
			}
		});
	}

	// Store Mouse Position
	function storeMousePosition(event) {
		event.preventDefault();
		console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Received Mouse Input');

		if (event.target.classList && event.target.id !== 'superDevIframe') {
			inputX = event.pageX - body.offsetLeft;
			inputY = event.pageY - body.offsetTop;
			askMeasureDistance();
		} else removePageRuler();
	}

	function askMeasureDistance() {
		portThree.postMessage({
			action: 'measureDistance',
			inputX: inputX,
			inputY: inputY,
		});
		portThree.onMessage.addListener(function (request) {
			if (request.action && request.action === 'measureDistanceDone') {
				console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Done Measuring', request.distances);
				showPageRuler(request.distances);
			}
		});
	}

	// Removes Page Ruler From Dom //
	function removePageRuler() {
		let distances = body.querySelector('.rulerData');
		if (distances) body.removeChild(distances);
	}

	// Takes Result From MeasureDistance and Populates/Create HTML
	function showPageRuler(distances) {
		if (!distances) return;

		let newDimensions = body.querySelector('.rulerData') || document.createElement('div');
		let xAxis = body.querySelector('.xAxis.rulerAxis') || document.createElement('div');
		let yAxis = body.querySelector('.yAxis.rulerAxis') || document.createElement('div');
		let tooltip = body.querySelector('.rulerTooltip') || document.createElement('div');

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

		if (!body.querySelector('.rulerData')) {
			newDimensions.appendChild(xAxis);
			newDimensions.appendChild(yAxis);
			newDimensions.appendChild(tooltip);
			body.appendChild(newDimensions);
		}
	}
};
