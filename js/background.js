// Open Extension on Icon Click
chrome.action.onClicked.addListener(() => {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		let portOne = chrome.tabs.connect(tabs[0].id, {name: 'portOne'});
		portOne.postMessage({action: 'showHideExtension'});
		portOne.onMessage.addListener(function (response) {
			if (response.action === 'Popup Hidden') {
				portOne.postMessage({action: 'deactivateAll'});
				portOne.onMessage.addListener(function (response) {
					console.log('Got Response : ', response.action);
				});
			}
		});
	});
});

// Open Extension on Context Menu Click
chrome.contextMenus.create({title: 'Inspect with SuperDev Pro', id: 'inspectWith', contexts: ['all']});
chrome.contextMenus.onClicked.addListener(function () {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		let portTwo = chrome.tabs.connect(tabs[0].id, {name: 'portTwo'});
		portTwo.postMessage({action: 'showHideExtension'});
		portTwo.onMessage.addListener(function (response) {
			if (response.action === 'Popup Hidden') {
				portTwo.postMessage({action: 'deactivateAll'});
				portTwo.onMessage.addListener(function (response) {
					console.log('Got Response : ', response.action);
				});
			}
		});
	});
});

// Page Ruler
chrome.runtime.onConnect.addListener(function (portThree) {
	let areaThreshold = 6;
	let dimensionsThreshold = 6;
	let map;

	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		chrome.scripting.insertCSS({
			target: {tabId: tabs[0].id},
			files: ['css/tooltip.css'],
		});
	});

	portThree.onMessage.addListener(function (request) {
		switch (request.action) {
			// Was Added
			case 'takeScreenshot':
				takeScreenshot();
				break;
			// Was Added
			case 'imageData':
				imageData = new Uint8ClampedArray(request.imageData);
				data = grayscale(imageData);
				width = request.width;
				height = request.height;
				portThree.postMessage({action: 'screenshotProcessed'});
				break;
			case 'position':
				measureAreaStopped = true;
				measureDistances(request.data);
				break;
			case 'area':
				measureAreaStopped = true;
				measureArea(request.data);
				break;
		}
	});

	// Was Added
	function takeScreenshot() {
		chrome.tabs.captureVisibleTab({format: 'png'}, function (dataUrl) {
			portThree.postMessage({action: 'parseScreenshot', dataUrl: dataUrl});
		});
	}
	// Was Added

	function measureArea(pos) {
		let x0, y0, startLightness;

		map = new Int16Array(data);
		x0 = pos.x;
		y0 = pos.y;
		startLightness = getLightnessAt(map, x0, y0);
		stack = [[x0, y0, startLightness]];
		area = {top: y0, right: x0, bottom: y0, left: x0};
		pixelsInArea = [];

		measureAreaStopped = false;

		setTimeout(nextTick, 0);
	}

	function nextTick() {
		workOffStack();

		if (!measureAreaStopped) {
			if (stack.length) {
				setTimeout(nextTick, 0);
			} else {
				finishMeasureArea();
			}
		}
	}

	function workOffStack() {
		let max = 500000;
		let count = 0;

		while (count++ < max && stack.length) {
			floodFill();
		}
	}

	function floodFill() {
		let xyl = stack.shift();
		let x = xyl[0];
		let y = xyl[1];
		let lastLightness = xyl[2];
		let currentLightness = getLightnessAt(map, x, y);

		if (currentLightness > -1 && currentLightness < 256 && Math.abs(currentLightness - lastLightness) < areaThreshold) {
			setLightnessAt(map, x, y, 256);
			pixelsInArea.push([x, y]);

			if (x < area.left) area.left = x;
			else if (x > area.right) area.right = x;
			if (y < area.top) area.top = y;
			else if (y > area.bottom) area.bottom = y;

			stack.push([x - 1, y, currentLightness]);
			stack.push([x, y + 1, currentLightness]);
			stack.push([x + 1, y, currentLightness]);
			stack.push([x, y - 1, currentLightness]);
		}
	}

	function finishMeasureArea() {
		let boundariePixels = {
			top: [],
			right: [],
			bottom: [],
			left: [],
		};

		// clear map
		map = [];

		for (let i = 0, l = pixelsInArea.length; i < l; i++) {
			let x = pixelsInArea[i][0];
			let y = pixelsInArea[i][1];

			if (x === area.left) boundariePixels.left.push(y);
			if (x === area.right) boundariePixels.right.push(y);

			if (y === area.top) boundariePixels.top.push(x);
			if (y === area.bottom) boundariePixels.bottom.push(x);
		}

		let x = getMaxSpread(boundariePixels.top, boundariePixels.bottom);
		let y = getMaxSpread(boundariePixels.left, boundariePixels.right);

		area.x = x;
		area.y = y;
		area.left = area.x - area.left;
		area.right = area.right - area.x;
		area.top = area.y - area.top;
		area.bottom = area.bottom - area.y;

		area.backgroundColor = getColorAt(area.x, area.y);

		portThree.postMessage({
			action: 'distances',
			data: area,
		});
	}

	function getMaxSpread(sideA, sideB) {
		let a = getDimensions(sideA);
		let b = getDimensions(sideB);

		let smallerSide = a.length < b.length ? a : b;

		return smallerSide.center;
	}

	function getDimensions(values) {
		let min = Infinity;
		let max = 0;

		for (let i = 0, l = values.length; i < l; i++) {
			if (values[i] < min) min = values[i];
			if (values[i] > max) max = values[i];
		}

		return {
			min: min,
			center: min + Math.floor((max - min) / 2),
			max: max,
			length: max - min,
		};
	}

	function measureDistances(input) {
		let distances = {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		};
		let directions = {
			top: {x: 0, y: -1},
			right: {x: 1, y: 0},
			bottom: {x: 0, y: 1},
			left: {x: -1, y: 0},
		};
		let area = 0;
		let startLightness = getLightnessAt(data, input.x, input.y);
		let lastLightness;

		for (let direction in distances) {
			let vector = directions[direction];
			let boundaryFound = false;
			let sx = input.x;
			let sy = input.y;
			let currentLightness;

			lastLightness = startLightness;

			while (!boundaryFound) {
				sx += vector.x;
				sy += vector.y;
				currentLightness = getLightnessAt(data, sx, sy);

				if (currentLightness > -1 && Math.abs(currentLightness - lastLightness) < dimensionsThreshold) {
					distances[direction]++;
					lastLightness = currentLightness;
				} else {
					boundaryFound = true;
				}
			}

			area += distances[direction];
		}

		if (area <= 6) {
			distances = {top: 0, right: 0, bottom: 0, left: 0};
			let similarColorStreakThreshold = 8;

			for (let direction in distances) {
				let vector = directions[direction];
				let boundaryFound = false;
				let sx = input.x;
				let sy = input.y;
				let currentLightness;
				let similarColorStreak = 0;

				lastLightness = startLightness;

				while (!boundaryFound) {
					sx += vector.x;
					sy += vector.y;
					currentLightness = getLightnessAt(data, sx, sy);

					if (currentLightness > -1) {
						distances[direction]++;

						if (Math.abs(currentLightness - lastLightness) < dimensionsThreshold) {
							similarColorStreak++;
							if (similarColorStreak === similarColorStreakThreshold) {
								distances[direction] -= similarColorStreakThreshold + 1;
								boundaryFound = true;
							}
						} else {
							lastLightness = currentLightness;
							similarColorStreak = 0;
						}
					} else {
						boundaryFound = true;
					}
				}
			}
		}

		distances.x = input.x;
		distances.y = input.y;
		distances.backgroundColor = getColorAt(input.x, input.y);

		portThree.postMessage({
			action: 'distances',
			data: distances,
		});
	}

	function getColorAt(x, y) {
		if (!inBoundaries(x, y)) return -1;

		let i = y * width * 4 + x * 4;

		return rgbToHsl(imageData[i], imageData[++i], imageData[++i]);
	}

	function getLightnessAt(data, x, y) {
		return inBoundaries(x, y) ? data[y * width + x] : -1;
	}

	function setLightnessAt(data, x, y, value) {
		return inBoundaries(x, y) ? (data[y * width + x] = value) : -1;
	}

	function inBoundaries(x, y) {
		if (x >= 0 && x < width && y >= 0 && y < height) return true;
		else return false;
	}

	function grayscale(imageData) {
		let gray = new Int16Array(imageData.length / 4);

		for (let i = 0, n = 0, l = imageData.length; i < l; i += 4, n++) {
			let r = imageData[i],
				g = imageData[i + 1],
				b = imageData[i + 2];

			gray[n] = Math.round(r * 0.3 + g * 0.59 + b * 0.11);
		}

		return gray;
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
});
