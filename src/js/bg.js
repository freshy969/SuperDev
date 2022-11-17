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

// On Extension Install/Update
chrome.runtime.onInstalled.addListener(function (reason) {
	// Content Scripts Reinjection
	chrome.tabs.query({}, function (result) {
		result.map(function (valueTwo, indexTwo) {
			if ((valueTwo.url.startsWith('http://') || valueTwo.url.startsWith('https://')) && !valueTwo.url.includes('https://chrome.google.com/webstore')) {
				chrome.scripting.executeScript({
					target: {tabId: valueTwo.id},
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
					target: {tabId: valueTwo.id},
					files: ['css/cs.css'],
				});
			}
		});
	});

	// All Features Initialisation
	chrome.storage.local.get(['allFeatures'], async function (result) {
		if (result['allFeatures'] === undefined) {
			await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
		}
	});

	// Extension Version Initialisation
	chrome.storage.local.get(['extVersion'], async function (result) {
		if (result['extVersion'] === undefined) {
			await chrome.storage.local.set({['extVersion']: chrome.runtime.getManifest().version});
		}
	});

	// Read Only All Features Initialisation
	chrome.storage.local.get(['allFeaturesRef'], async function (result) {
		if (result['allFeaturesRef'] === undefined) {
			await chrome.storage.local.set({['allFeaturesRef']: JSON.stringify(allFeatures)});
		}
	});

	// Update Old AllFeatures Data
	chrome.storage.local.get(['extVersion'], function (result) {
		if (result['extVersion'] !== undefined) {
			// Means Updated, Not Installed
			if (result['extVersion'] !== chrome.runtime.getManifest().version) {
				// Update Old AllFeatures Data
				chrome.storage.local.get(['allFeatures'], async function (result) {
					let localAllFeatures = allFeatures;
					let storedAllFeatures = JSON.parse(result['allFeatures']);

					// Add Any Feature From Local To Stored Storage
					// That's Missing From Stored Storage
					localAllFeatures.map(function (value, index) {
						if (storedAllFeatures.indexOf(value) === -1) {
							storedAllFeatures.splice(index, 0, value);
						}
					});

					// Delete (Null + Filter) Any Feature From Stored
					// Storage That's Missing From Local Storage
					storedAllFeatures = storedAllFeatures.filter(function (value, index) {
						if (localAllFeatures.indexOf(value) === -1) value = null;
						return value !== null;
					});

					// If A Feature Exists in Both Stored Data And
					// Local Storage, Sync That Feature's Data + Settings
					localAllFeatures.map(function (valueOne, indexOne) {
						storedAllFeatures.map(function (valueTwo, indexTwo) {
							if (valueOne.id === valueTwo.id) {
								// Update Icon If Mismatch
								if (valueOne.icon !== valueTwo.icon) valueTwo.icon = valueOne.icon;

								// If Local Settings is Empty and
								// Stored Settings Exists, Empty Stored Settings
								if (Object.keys(valueOne.settings).length === 0) {
									if (Object.keys(valueTwo.settings).length !== 0) {
										valueTwo.settings = valueOne.settings;
									}
								}

								// If Local Settings Exists and
								// Stored Settings Is Empty, Set Stored Settings
								if (Object.keys(valueOne.settings).length !== 0) {
									if (Object.keys(valueTwo.settings).length === 0) {
										valueTwo.settings = valueOne.settings;
									}
								}

								// If Both Local and Stored Settings Exists
								if (Object.keys(valueOne.settings).length !== 0) {
									if (Object.keys(valueTwo.settings).length !== 0) {
										// Iterating Local Settings Keys
										Object.keys(valueOne.settings).map(function (valueThree, indexThree) {
											// Put Local Settings Key to Stored Settings
											// Undefined Means That Key Doesn't Exists in Stored,
											// Add That Key-Value Pair to Stored Settings
											if (valueTwo.settings[valueThree] === undefined) {
												valueTwo.settings[valueThree] = valueOne.settings[valueThree];
											}
										});

										// Iterating Stored Settings Keys
										Object.keys(valueTwo.settings).map(function (valueThree, indexThree) {
											// Put Stored Settings Key to Local Settings
											// Undefined Means That Key Doesn't Exists in Local
											// Delete That Key from Stored Settings
											if (valueOne.settings[valueThree] === undefined) {
												delete valueTwo.settings[valueThree];
											}
										});
									}
								}
							}
						});
					});

					await chrome.storage.local.set({['allFeatures']: JSON.stringify(storedAllFeatures)});
					await chrome.storage.local.set({['extVersion']: chrome.runtime.getManifest().version});
					await chrome.storage.local.set({['allFeaturesRef']: JSON.stringify(allFeatures)});
				});
			}
		}
	});

	// Creating Chrome Context Menu
	chrome.contextMenus.create({title: 'Inspect with SuperDev', id: 'inspectWith', contexts: ['all']});
});

// Content Scripts Reinjection on Extension Enable
chrome.management.onEnabled.addListener(function (extension) {
	if (extension.name === chrome.runtime.getManifest().name) {
		// Content Scripts Reinjection
		chrome.tabs.query({}, function (result) {
			result.map(function (valueTwo, indexTwo) {
				if ((valueTwo.url.startsWith('http://') || valueTwo.url.startsWith('https://')) && !valueTwo.url.includes('https://chrome.google.com/webstore')) {
					chrome.scripting.executeScript({
						target: {tabId: valueTwo.id},
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
						target: {tabId: valueTwo.id},
						files: ['css/cs.css'],
					});
				}
			});
		});
	}
});

// Open Extension on Extension Icon Click
chrome.action.onClicked.addListener(function (tab) {
	chrome.tabs.query({active: true, currentWindow: true}, function (activeTab) {
		if (
			(activeTab[0].url.startsWith('http://') || activeTab[0].url.startsWith('https://')) &&
			!activeTab[0].url.includes('https://chrome.google.com/webstore')
		) {
			// All Features Initialisation || Start
			chrome.storage.local.get(['allFeatures'], async function (result) {
				if (result['allFeatures'] === undefined) {
					await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
				} else {
					let portOne = chrome.tabs.connect(activeTab[0].id, {name: 'portOne'});
					portOne.postMessage({action: 'showHideExtension', activeTab: activeTab});
				}
			});

			// Extension Version Initialisation
			chrome.storage.local.get(['extVersion'], async function (result) {
				if (result['extVersion'] === undefined) {
					await chrome.storage.local.set({['extVersion']: chrome.runtime.getManifest().version});
				}
			});

			// Read Only All Features Initialisation
			chrome.storage.local.get(['allFeaturesRef'], async function (result) {
				if (result['allFeaturesRef'] === undefined) {
					await chrome.storage.local.set({['allFeaturesRef']: JSON.stringify(allFeatures)});
				}
			});
		}
	});
});

// Open Extension on Context Menu Click
chrome.contextMenus.onClicked.addListener(function (tab) {
	chrome.tabs.query({active: true, currentWindow: true}, function (activeTab) {
		if (
			(activeTab[0].url.startsWith('http://') || activeTab[0].url.startsWith('https://')) &&
			!activeTab[0].url.includes('https://chrome.google.com/webstore')
		) {
			// All Features Initialisation || Start
			chrome.storage.local.get(['allFeatures'], async function (result) {
				if (result['allFeatures'] === undefined) {
					await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
				} else {
					let portOne = chrome.tabs.connect(activeTab[0].id, {name: 'portOne'});
					portOne.postMessage({action: 'showHideExtension', activeTab: activeTab});
				}
			});

			// Extension Version Initialisation
			chrome.storage.local.get(['extVersion'], async function (result) {
				if (result['extVersion'] === undefined) {
					await chrome.storage.local.set({['extVersion']: chrome.runtime.getManifest().version});
				}
			});

			// Read Only All Features Initialisation
			chrome.storage.local.get(['allFeaturesRef'], async function (result) {
				if (result['allFeaturesRef'] === undefined) {
					await chrome.storage.local.set({['allFeaturesRef']: JSON.stringify(allFeatures)});
				}
			});
		}
	});
});

// Extension Shortcuts
chrome.commands.onCommand.addListener(function (command) {
	chrome.tabs.query({active: true, currentWindow: true}, function (activeTab) {
		if (
			(activeTab[0].url.startsWith('http://') || activeTab[0].url.startsWith('https://')) &&
			!activeTab[0].url.includes('https://chrome.google.com/webstore')
		) {
			if (command === 'clearAllCache') {
				let portOne = chrome.tabs.connect(activeTab[0].id, {name: 'portOne'});
				portOne.postMessage({action: 'activateClearAllCache', activeTab: activeTab});
			}
		}
	});
});

// Page Ruler + Color Picker + Export Element + Clear All Cache
chrome.runtime.onConnect.addListener(function (port) {
	let imageData, data, width, height;

	port.onMessage.addListener(function (request) {
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
				port.postMessage({action: 'screenshotProcessed'});
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
				port.postMessage({action: 'colorPickerSet'});
				break;

			// Color Picker
			case 'getColorAt':
				getColorAt(request.data);
				break;

			// Export Element
			case 'fetchStyles':
				fetchStyles(request.allStyleSheets);
				break;

			// Clear All Cache
			case 'clearAllCache':
				clearAllCache(request.settings);
		}
	});

	// Page Ruler + Color Picker
	function takeScreenshot() {
		chrome.tabs.captureVisibleTab({format: 'png'}, function (dataUrl) {
			port.postMessage({action: 'parseScreenshot', dataUrl: dataUrl});
		});
	}

	// Page Ruler
	function grayscale(imageData) {
		let gray = new Int16Array(imageData.length / 4);
		for (let i = 0, n = 0, l = imageData.length; i < l; i += 4, n++) {
			let r = imageData[i];
			let g = imageData[i + 1];
			let b = imageData[i + 2];
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
				if (currentLightness > -1 && Math.abs(currentLightness - lastLightness) < 6) {
					dimensions[direction]++;
					lastLightness = currentLightness;
				} else boundaryFound = true;
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
						if (Math.abs(currentLightness - lastLightness) < 6) {
							similarColorStreak++;
							if (similarColorStreak === similarColorStreakThreshold) {
								dimensions[direction] -= similarColorStreakThreshold + 1;
								boundaryFound = true;
							}
						} else {
							lastLightness = currentLightness;
							similarColorStreak = 0;
						}
					} else boundaryFound = true;
				}
			}
		}

		dimensions.x = input.x;
		dimensions.y = input.y;
		port.postMessage({
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
		let r = imageData[i];
		let g = imageData[i + 1];
		let b = imageData[i + 2];
		let spotColor = {
			x: input.x,
			y: input.y,
			rgb: `rgb(${r}, ${g}, ${b})`,
			hex: rgbToHex(r, g, b),
		};

		port.postMessage({
			action: 'showColorPicker',
			data: spotColor,
		});
	}

	// Color Picker
	function rgbToHex(r, g, b) {
		let hex = '#' + ((1 << 24) + (+r << 16) + (+g << 8) + +b).toString(16).slice(1);
		return hex.toUpperCase();
	}

	// Export Element
	function fetchStyles(allStyleSheets) {
		let promiseAllOne = [];
		let promiseAllTwo = [];
		let regexZero = new RegExp(/url\(['"]?(.*?)['"]?\)/gm); // Search for url('') or url("")
		let regexSix = new RegExp(/\\/gm); // Remove backslashes
		let regexSeven = new RegExp(/\/[^/]*$/gm); // Remove everything after last slash
		let regexEight = new RegExp(/@import.*?url\(["'](.*?)["')]+.*?;/gm); // Search for @import * url('') *;

		allStyleSheets.map(async function (valueOne, indexOne) {
			if (valueOne.startsWith('http://') || valueOne.startsWith('https://')) {
				promiseAllOne.push(
					fetch(valueOne)
						.then(function (response) {
							if (response.status >= 200 && response.status < 300) return response.text();
							else return '';
						})
						.then(function (data) {
							allStyleSheets[indexOne] = data;

							// Relative CSS URL to Absolute CSS URL
							if (allStyleSheets[indexOne].includes('url(')) {
								let matchStyleURLs = [...allStyleSheets[indexOne].matchAll(regexZero)];
								matchStyleURLs.map(function (valueTwo, indexTwo) {
									if (
										!valueTwo[1].replaceAll(regexSix, '').startsWith('//') &&
										!valueTwo[1].replaceAll(regexSix, '').startsWith('blob:') &&
										!valueTwo[1].replaceAll(regexSix, '').startsWith('data:') &&
										!valueTwo[1].replaceAll(regexSix, '').startsWith('http://') &&
										!valueTwo[1].replaceAll(regexSix, '').startsWith('https://')
									) {
										if (valueTwo[1].startsWith('/')) {
											allStyleSheets[indexOne] = allStyleSheets[indexOne].replaceAll(
												valueTwo[0],
												valueTwo[0].replaceAll(valueTwo[1], new URL(new URL(valueOne).origin + valueTwo[1]).href)
											);
										} else {
											allStyleSheets[indexOne] = allStyleSheets[indexOne].replaceAll(
												valueTwo[0],
												valueTwo[0].replaceAll(valueTwo[1], new URL(valueOne.replaceAll(regexSeven, '') + '/' + valueTwo[1]).href)
											);
										}
									} else if (valueTwo[1].replaceAll(regexSix, '').startsWith('//')) {
										allStyleSheets[indexOne] = allStyleSheets[indexOne].replaceAll(
											valueTwo[0],
											valueTwo[0].replaceAll(valueTwo[1], new URL('https:' + valueTwo[1]).href)
										);
									}
								});
							}
						})
				);
			}
		});

		Promise.all(promiseAllOne).then(function () {
			allStyleSheets = allStyleSheets
				.filter(function (value, index) {
					return value !== null && value !== undefined && value !== '';
				})
				.join('');
			let matchImportURLs = [...allStyleSheets.matchAll(regexEight)];
			matchImportURLs.map(function (valueOne, indexTwo) {
				if (valueOne[1].replaceAll(regexSix, '').startsWith('http://') || valueOne[1].replaceAll(regexSix, '').startsWith('https://')) {
					promiseAllTwo.push(
						fetch(valueOne[1])
							.then(function (response) {
								if (response.status >= 200 && response.status < 300) return response.text();
								else return '';
							})
							.then(function (data) {
								allStyleSheets = allStyleSheets.replaceAll(valueOne[0], data);
							})
					);
				}
			});
			Promise.all(promiseAllTwo).then(function () {
				port.postMessage({action: 'allStyleSheets', allStyleSheets: allStyleSheets});
			});
		});
	}

	// Clear All Cache
	function clearAllCache(settings) {
		chrome.tabs.query({active: true, currentWindow: true}, function (activeTab) {
			chrome.browsingData.remove(
				{
					origins: [activeTab[0].url],
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
								chrome.tabs.reload(activeTab[0].id);
							}
						}
					);
				}
			);
		});
	}
});
