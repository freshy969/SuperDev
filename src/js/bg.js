// All Features Array
const allFeatures = [
	{
		title: 'Text Editor',
		icon: 'fa-pencil',
		id: 'textEditor',
		settings: {},
	},
	{
		title: 'Page Ruler',
		icon: 'fa-ruler-combined',
		id: 'pageRuler',
		settings: {},
	},
	{
		title: 'Color Picker',
		icon: 'fa-eye-dropper',
		id: 'colorPicker',
		settings: {
			checkboxColorPicker1: true,
			checkboxColorPicker2: false,
			checkboxColorPicker3: false,
		},
	},
	{
		title: 'Color Palette',
		icon: 'fa-swatchbook',
		id: 'colorPalette',
		settings: {
			checkboxColorPalette1: true,
			checkboxColorPalette2: false,
			checkboxColorPalette3: false,
		},
	},
	{
		title: 'Page Guideline',
		icon: 'fa-hashtag',
		id: 'pageGuideline',
		settings: {},
	},
	{
		title: 'Page Highlight',
		icon: 'fa-paintbrush',
		id: 'pageHighlight',
		settings: {
			checkboxPageHighlight1: false,
			checkboxPageHighlight2: true,
			checkboxPageHighlight3: false,
			checkboxPageHighlight4: false,
			checkboxPageHighlight5: false,
			checkboxPageHighlight6: false,
			checkboxPageHighlight7: false,
		},
	},
	{
		title: 'Move Element',
		icon: 'fa-arrows-up-down-left-right',
		id: 'moveElement',
		settings: {},
	},
	{
		title: 'Delete Element',
		icon: 'fa-trash-can',
		id: 'deleteElement',
		settings: {},
	},
	{
		title: 'Export Element',
		icon: 'fa-up-right-from-square',
		id: 'exportElement',
		settings: {
			checkboxExportElement1: true,
			checkboxExportElement2: false,
			checkboxExportElement3: false,
		},
	},
	// {
	// 	title: 'CSS Inspector',
	// 	icon: 'fa-search',
	// 	id: 'cssInspector',
	// 	settings: {},
	// },
	// {
	// 	title: 'Visualise Padding',
	// 	icon: 'fa-distribute-spacing-vertical',
	// 	id: 'visualisePadding',
	// 	settings: {},
	// },
	// {
	// 	title: 'Visualise Margin',
	// 	icon: 'fa-distribute-spacing-horizontal',
	// 	id: 'visualiseMargin',
	// 	settings: {},
	// },
	// {
	// 	title: 'Custom CSS',
	// 	icon: 'fa-code',
	// 	id: 'customCSS',
	// 	settings: {},
	// },
	// {
	// 	title: 'Custom JS',
	// 	icon: 'fa-brackets-curly',
	// 	id: 'customJS',
	// 	settings: {},
	// },
	// {
	// 	title: 'Site Fonts List',
	// 	icon: 'fa-font',
	// 	id: 'siteFontsList',
	// 	settings: {},
	// },
	// {
	// 	title: 'Font Inspector',
	// 	icon: 'fa-text-size',
	// 	id: 'fontInspector',
	// 	settings: {},
	// },
	// {
	// 	title: 'Font Changer',
	// 	icon: 'fa-font-case',
	// 	id: 'fontChanger',
	// 	settings: {},
	// },
	// {
	// 	title: 'Extract Media',
	// 	icon: 'fa-image',
	// 	id: 'extractMedia',
	// 	settings: {},
	// },
	// {
	// 	title: 'Take Screenshot',
	// 	icon: 'fa-aperture',
	// 	id: 'takeScreenshot',
	// 	settings: {},
	// },
	// {
	// 	title: 'View Responsive',
	// 	icon: 'fa-laptop-mobile',
	// 	id: 'viewResponsive',
	// 	settings: {},
	// },
	{
		title: 'Clear All Cache',
		icon: 'fa-recycle',
		id: 'clearAllCache',
		settings: {
			checkboxClearAllCache1: false,
			checkboxClearAllCache2: true,
			checkboxClearAllCache3: false,
			checkboxClearAllCache4: false,
			checkboxClearAllCache5: false,
			checkboxClearAllCache6: false,
		},
	},
	// {
	// 	title: 'Built With',
	// 	icon: 'fa-server',
	// 	id: 'builtWith',
	// 	settings: {},
	// },
];
// Content Scripts Reinjection on Extension Install/Update
chrome.runtime.onInstalled.addListener(async function () {
	// Update Old AllFeatures Data
	chrome.storage.local.get(['extVersion'], function (result) {
		// Means Updated, Not Installed
		if (result.extVersion !== undefined) {
			// Is Really Next Version?
			if (result.extVersion !== chrome.runtime.getManifest().version) {
				chrome.storage.local.get(['allFeatures'], function (result) {
					if (result.allFeatures !== undefined) {
						if (
							!(
								result.allFeatures.includes('textEditor') &&
								result.allFeatures.includes('pageRuler') &&
								result.allFeatures.includes('colorPicker') &&
								result.allFeatures.includes('checkboxColorPicker1') &&
								result.allFeatures.includes('checkboxColorPicker2') &&
								result.allFeatures.includes('checkboxColorPicker3') &&
								result.allFeatures.includes('colorPalette') &&
								result.allFeatures.includes('checkboxColorPalette1') &&
								result.allFeatures.includes('checkboxColorPalette2') &&
								result.allFeatures.includes('checkboxColorPalette3') &&
								result.allFeatures.includes('pageGuideline') &&
								result.allFeatures.includes('pageHighlight') &&
								result.allFeatures.includes('checkboxPageHighlight1') &&
								result.allFeatures.includes('checkboxPageHighlight2') &&
								result.allFeatures.includes('checkboxPageHighlight3') &&
								result.allFeatures.includes('checkboxPageHighlight4') &&
								result.allFeatures.includes('checkboxPageHighlight5') &&
								result.allFeatures.includes('checkboxPageHighlight6') &&
								result.allFeatures.includes('checkboxPageHighlight7') &&
								result.allFeatures.includes('moveElement') &&
								result.allFeatures.includes('deleteElement') &&
								result.allFeatures.includes('exportElement') &&
								result.allFeatures.includes('checkboxExportElement1') &&
								result.allFeatures.includes('checkboxExportElement2') &&
								result.allFeatures.includes('checkboxExportElement3') &&
								result.allFeatures.includes('clearAllCache') &&
								result.allFeatures.includes('checkboxClearAllCache1') &&
								result.allFeatures.includes('checkboxClearAllCache2') &&
								result.allFeatures.includes('checkboxClearAllCache3') &&
								result.allFeatures.includes('checkboxClearAllCache4') &&
								result.allFeatures.includes('checkboxClearAllCache5') &&
								result.allFeatures.includes('checkboxClearAllCache6')
							)
						) {
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
			}
		}
	});

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

// Open Extension on Extension Icon Click
chrome.action.onClicked.addListener(function (tab) {
	if (
		!tab.url.includes('chrome://') &&
		!tab.url.includes('chrome-extension://') &&
		!tab.url.includes('file://') &&
		!tab.url.includes('https://chrome.google.com/webstore')
	) {
		// All Features Initialisation
		chrome.storage.local.get(['allFeatures'], function (result) {
			if (result.allFeatures === undefined) {
				chrome.storage.local.set({extVersion: chrome.runtime.getManifest().version});
				chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
			}
		});

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
		// All Features Initialisation
		chrome.storage.local.get(['allFeatures'], function (result) {
			if (result.allFeatures === undefined) {
				chrome.storage.local.set({extVersion: chrome.runtime.getManifest().version});
				chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
			}
		});

		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			let portOne = chrome.tabs.connect(tabs[0].id, {name: 'portOne'});
			portOne.postMessage({action: 'showHideExtension'});
		});
	}
});

// Extension Shortcuts
chrome.commands.onCommand.addListener(function (command) {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		if (
			!tabs[0].url.includes('chrome://') &&
			!tabs[0].url.includes('chrome-extension://') &&
			!tabs[0].url.includes('file://') &&
			!tabs[0].url.includes('https://chrome.google.com/webstore')
		) {
			if (command === 'clearAllCache') {
				chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
					let portOne = chrome.tabs.connect(tabs[0].id, {name: 'portOne'});
					portOne.postMessage({action: 'activateClearAllCache'});
				});
			}
		}
	});
});

// Page Ruler + Color Picker + Export Element + Clear All Cache
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

			// Color Picker
			case 'getColorAt':
				getColorAt(request.data);
				break;

			// Export Element
			case 'getStylesheet':
				getStylesheet(request.styleSheetUrl);
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
		return '#' + ((1 << 24) + (+r << 16) + (+g << 8) + +b).toString(16).slice(1);
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
