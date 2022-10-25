// Page Ruler + Export Element + Color Picker + Clear All Cache
chrome.runtime.onConnect.addListener(function (portTwo) {
	let dimensionsThreshold = 6;
	let imageData, data, width, height;

	portTwo.onMessage.addListener(function (request) {
		switch (request.action) {
			// Page Ruler + Color Picker
			case 'takeScreenshot':
				takeScreenshot();
				break;

			// Page Ruler
			case 'toGrayscale':
				imageData = new Uint8ClampedArray(request.imageData);
				data = grayscale(imageData);
				width = request.width;
				height = request.height;
				portTwo.postMessage({action: 'screenshotProcessed'});
				break;

			// Page Ruler
			case 'measureDistances':
				measureDistances(request.data);
				break;

			// Color Picker
			case 'setColorPicker':
				imageData = new Uint8ClampedArray(request.imageData);
				width = request.width;
				height = request.height;
				portTwo.postMessage({action: 'colorPickerSet'});
				break;

			// Export Element
			case 'getStylesheet':
				getStylesheet(request.styleSheetUrl);
				break;

			// Color Picker
			case 'getColorAt':
				getColorAt(request.data);
				break;

			// Clear All Cache
			case 'clearAllCache':
				clearAllCache(request.settings);
		}
	});

	// Page Ruler + Color Picker
	function takeScreenshot() {
		chrome.tabs.captureVisibleTab({format: 'png'}, function (dataUrl) {
			portTwo.postMessage({action: 'parseScreenshot', dataUrl: dataUrl});
		});
	}

	// Page Ruler
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

	// Page Ruler
	function measureDistances(input) {
		let dimensions = {
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

		for (let direction in dimensions) {
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
					dimensions[direction]++;
					lastLightness = currentLightness;
				} else {
					boundaryFound = true;
				}
			}

			area += dimensions[direction];
		}

		if (area <= 6) {
			dimensions = {top: 0, right: 0, bottom: 0, left: 0};
			let similarColorStreakThreshold = 8;

			for (let direction in dimensions) {
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
						dimensions[direction]++;

						if (Math.abs(currentLightness - lastLightness) < dimensionsThreshold) {
							similarColorStreak++;
							if (similarColorStreak === similarColorStreakThreshold) {
								dimensions[direction] -= similarColorStreakThreshold + 1;
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

		dimensions.x = input.x;
		dimensions.y = input.y;

		portTwo.postMessage({
			action: 'showDimensions',
			data: dimensions,
		});
	}

	// Page Ruler
	function getLightnessAt(data, x, y) {
		return inBoundaries(x, y) ? data[y * width + x] : -1;
	}

	// Export Element
	function getStylesheet(styleSheetUrl) {
		fetch(styleSheetUrl)
			.then(function (response) {
				if (response.status >= 200 && response.status < 300) return response.text();
				else return false;
			})
			.then(function (styleSheet) {
				portTwo.postMessage({action: 'parseStylesheet', styleSheet: styleSheet});
			});
	}

	// Color Picker
	function inBoundaries(x, y) {
		if (x >= 0 && x < width && y >= 0 && y < height) return true;
		else return false;
	}

	// Color Picker
	function getColorAt(input) {
		if (!inBoundaries(input.x, input.y)) return -1;
		let i = input.y * width * 4 + input.x * 4;
		let r = imageData[i],
			g = imageData[i + 1],
			b = imageData[i + 2];

		let spotColor = {
			x: input.x,
			y: input.y,
			rgb: `rgb(${r}, ${g}, ${b})`,
			hex: rgbToHex(r, g, b),
		};

		portTwo.postMessage({
			action: 'showColorPicker',
			data: spotColor,
		});
	}

	// Color Picker
	function rgbToHex(r, g, b) {
		return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}

	// Color Picker
	function componentToHex(c) {
		let hex = c.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	}

	// Clear All Cache
	function clearAllCache(settings) {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			chrome.browsingData.remove(
				{
					origins: [tabs[0].url],
				},
				{
					cookies: settings.checkboxClearAllCache3,
					localStorage: settings.checkboxClearAllCache5,
				},
				function () {
					chrome.browsingData.remove(
						{},
						{
							cache: settings.checkboxClearAllCache2,
							formData: settings.checkboxClearAllCache4,
						},
						function () {
							if (settings.checkboxClearAllCache1 === true) {
								chrome.tabs.reload(tabs[0].id);
							}
						}
					);
				}
			);
		});
	}
});

// Open Extension on Extension Icon Click
chrome.action.onClicked.addListener(function (tab) {
	if (
		!tab.url.includes('chrome://') &&
		!tab.url.includes('chrome-extension://') &&
		!tab.url.includes('file://') &&
		!tab.url.includes('https://chrome.google.com/webstore')
	) {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			let portOne = chrome.tabs.connect(tabs[0].id, {name: 'portOne'});
			portOne.postMessage({action: 'showHideExtension'});
		});
	}
});

// Open Extension on Context Menu Click
chrome.contextMenus.onClicked.addListener(function (tab) {
	if (
		!tab.pageUrl.includes('chrome://') &&
		!tab.pageUrl.includes('chrome-extension://') &&
		!tab.pageUrl.includes('file://') &&
		!tab.pageUrl.includes('https://chrome.google.com/webstore')
	) {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			let portOne = chrome.tabs.connect(tabs[0].id, {name: 'portOne'});
			portOne.postMessage({action: 'showHideExtension'});
		});
	}
});

// Content Scripts Reinjection on Extension Install/Update
chrome.runtime.onInstalled.addListener(async function () {
	// ContentJs Reinjection
	for (const contentScript of chrome.runtime.getManifest().content_scripts) {
		for (const tab of await chrome.tabs.query({url: contentScript.matches})) {
			if (
				!tab.url.includes('chrome://') &&
				!tab.url.includes('chrome-extension://') &&
				!tab.url.includes('file://') &&
				!tab.url.includes('https://chrome.google.com/webstore')
			) {
				chrome.scripting.executeScript({
					target: {tabId: tab.id},
					files: [
						'libs/js/jquery.min.js',
						'libs/js/jquery-ui.min.js',
						'libs/js/beautify.min.js',
						'libs/js/beautify-css.min.js',
						'libs/js/beautify-html.min.js',
						'js/cs.js',
					],
				});
				chrome.scripting.insertCSS({
					target: {tabId: tab.id},
					files: ['css/tabs.css'],
				});
			}
		}
	}
	// Creating Chrome Context Menu
	chrome.contextMenus.create({title: 'Inspect with SuperDev', id: 'inspectWith', contexts: ['all']});
});

// Content Scripts Reinjection on Extension Enable
chrome.management.onEnabled.addListener(async function (extension) {
	if (extension.name === chrome.runtime.getManifest().name) {
		for (const contentScript of chrome.runtime.getManifest().content_scripts) {
			for (const tab of await chrome.tabs.query({url: contentScript.matches})) {
				if (
					!tab.url.includes('chrome://') &&
					!tab.url.includes('chrome-extension://') &&
					!tab.url.includes('file://') &&
					!tab.url.includes('https://chrome.google.com/webstore')
				) {
					chrome.scripting.executeScript({
						target: {tabId: tab.id},
						files: [
							'libs/js/jquery.min.js',
							'libs/js/jquery-ui.min.js',
							'libs/js/beautify.min.js',
							'libs/js/beautify-css.min.js',
							'libs/js/beautify-html.min.js',
							'js/cs.js',
						],
					});
					chrome.scripting.insertCSS({
						target: {tabId: tab.id},
						files: ['css/tabs.css'],
					});
				}
			}
		}
	}
});

// Extension Shortcuts
chrome.commands.onCommand.addListener((command) => {
	if (command === 'clearAllCache') {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			let portOne = chrome.tabs.connect(tabs[0].id, {name: 'portOne'});
			portOne.postMessage({action: 'activateClearAllCache'});
		});
	}
});
