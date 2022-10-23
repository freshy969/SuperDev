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
			case 'activatePageGuideline':
				activatePageGuideline(port, request);
				break;
			case 'deactivatePageGuideline':
				deactivatePageGuideline(port, request);
				break;
			case 'activatePageHighlight':
				activatePageHighlight(port, request);
				break;
			case 'deactivatePageHighlight':
				deactivatePageHighlight(port, request);
				break;
			case 'activatePageRuler':
				activatePageRuler(port, request);
				break;
			case 'deactivatePageRuler':
				deactivatePageRuler(port, request);
				break;
			case 'activateMoveElement':
				activateMoveElement(port, request);
				break;
			case 'deactivateMoveElement':
				deactivateMoveElement(port, request);
				break;
			case 'activateDeleteElement':
				activateDeleteElement(port, request);
				break;
			case 'deactivateDeleteElement':
				deactivateDeleteElement(port, request);
				break;
			case 'activateExportElement':
				activateExportElement(port, request);
				break;
			case 'deactivateExportElement':
				deactivateExportElement(port, request);
				break;
			case 'activateTextEditor':
				activateTextEditor(port, request);
				break;
			case 'deactivateTextEditor':
				deactivateTextEditor(port, request);
				break;
			case 'activateColorPicker':
				activateColorPicker(port, request);
				break;
			case 'deactivateColorPicker':
				deactivateColorPicker(port, request);
				break;
			case 'activateClearCache':
				activateClearCache(port, request);
				break;
		}
	});
});

function showHideExtension(port, request) {
	// If Popup Doesn't Exists
	if (document.querySelector('#superDev') === null) {
		let superDev = document.createElement('section');
		superDev.id = 'superDev';
		superDev.style.cssText = `
			padding: 0 !important;
			margin: 0 !important;
			position: fixed !important;
			top: 18px !important;
			right: 18px !important;
			width: 335px !important;
			background-color: rgba(0,0,0,0) !important;
			z-index: 2147483646 !important;
			visibility: hidden !important;`;
		document.body.appendChild(superDev);

		let superDevHandler = document.createElement('div');
		superDevHandler.id = 'superDevHandler';
		superDevHandler.style.cssText = `
			padding: 0 !important;
			margin: 0 !important;
			position: relative !important;
			cursor: move !important;
			width: 18px !important;
			background-color: rgba(0,0,0,0) !important;
			height: 42px !important;
			margin-left: 225px !important;
			margin-bottom: -42px !important;
			z-index: 2147483647 !important;`;
		document.querySelector('#superDev').appendChild(superDevHandler);

		let superDevIframe = document.createElement('iframe');
		superDevIframe.src = chrome.runtime.getURL('index.html');
		superDevIframe.id = 'superDevIframe';
		superDevIframe.scrolling = 'no';
		superDevIframe.style.cssText = `
			padding: 0 !important;
			margin: 0 !important;
			width: 335px !important;
			border: 0px !important;
			border-radius: 8px !important;
			display: block !important;
			background-color: rgba(0,0,0,0) !important;
			z-index: 2147483646 !important;
			overflow: hidden !important;
			box-shadow: rgb(0 0 0 / 12%) 0px 0px 8px 0px, rgb(0 0 0 / 24%) 0px 4px 8px 0px !important;`;
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
		chrome.storage.local.set({setActiveFeatureDisabled: true});
		document.querySelector('#superDev').style.visibility = 'hidden';
		port.postMessage({action: 'Popup Hidden'});
	}

	// If Popup Hidden, Set Visible
	else {
		// Reset on Visible
		chrome.storage.local.set({isPopupPaused: false});
		chrome.storage.local.set({isPopupHidden: false});
		chrome.storage.local.set({setActiveFeatureDisabled: false});
		chrome.storage.local.set({setMinimised: null});
		chrome.storage.local.set({whichFeatureActive: null});

		document.querySelector('#superDev').style.top = '18px';
		document.querySelector('#superDev').style.right = '18px';
		document.querySelector('#superDev').style.left = '';
		chrome.storage.local.set({setMinimised: false});

		port.postMessage({action: 'Popup Visible'});
	}
}

function changeHeight(port, request) {
	document.querySelector('#superDevIframe').style.height = `${request.height}px`;
	if (document.querySelector('#superDev').style.visibility === 'hidden') document.querySelector('#superDev').style.visibility = 'visible';
	port.postMessage({action: 'Height Changed'});
}

function justChangeHeight(port, request) {
	document.querySelector('#superDevIframe').style.height = `${request.height}px`;
	port.postMessage({action: 'Just Height Changed'});
}

function activatePageGuideline(port, request) {
	document.addEventListener('keyup', onEscape);
	document.addEventListener('mouseover', onMouseOver);
	document.addEventListener('mouseout', onMouseOut);
	window.focus({preventScroll: true});

	let pageGuidelineWrapper = document.createElement('div');
	pageGuidelineWrapper.classList.add('pageGuidelineWrapper');
	document.body.appendChild(pageGuidelineWrapper);

	function onEscape(event) {
		event.preventDefault();
		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				destroyPageGuideline(true);
			} else if (event.isTrusted === false) {
				destroyPageGuideline(false);
			}
		}
	}

	function onMouseOver(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			event.target.classList.add('pageGuidelineOutline');
			renderPageGuideline(true);
		}
	}

	function onMouseOut(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			renderPageGuideline(false);
			event.target.classList.remove('pageGuidelineOutline');
		}
	}

	function destroyPageGuideline(isManualEscape) {
		document.removeEventListener('mouseover', onMouseOver);
		document.removeEventListener('mouseout', onMouseOut);
		document.removeEventListener('keyup', onEscape);

		if (isManualEscape === true) {
			if (document.querySelector('.pageGuidelineOutline')) {
				document.querySelector('.pageGuidelineOutline').blur();
				document.querySelector('.pageGuidelineOutline').classList.remove('pageGuidelineOutline');
			}
			chrome.storage.local.set({setActiveFeatureDisabled: true});
		}

		chrome.storage.local.get(['isPopupPaused'], function (result) {
			if (result.isPopupPaused === true || isManualEscape === true) {
				chrome.storage.local.set({setMinimised: false});
				chrome.storage.local.set({isPopupPaused: false});
			}
		});

		document.querySelector('.pageGuidelineWrapper').remove();
	}

	function renderPageGuideline(toShow) {
		if (toShow === true) {
			let pageGuidelinePosition = document.querySelector('.pageGuidelineOutline').getBoundingClientRect();
			let scrollWidth = document.body.scrollWidth;
			let scrollHeight = document.body.scrollHeight;
			let top = pageGuidelinePosition.top + document.documentElement.scrollTop;
			let bottom = pageGuidelinePosition.bottom + document.documentElement.scrollTop;
			let left = pageGuidelinePosition.left + document.documentElement.scrollLeft;
			let right = pageGuidelinePosition.right + document.documentElement.scrollLeft;

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
	chrome.storage.local.set({setMinimised: true});
}

function deactivatePageGuideline(port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Page Guideline Deactivated'});
}

function activatePageHighlight(port, request) {
	document.addEventListener('keyup', onEscape);
	window.focus({preventScroll: true});

	function rgba() {
		let o = Math.round,
			r = Math.random,
			s = 255;
		return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.4 + ')';
	}

	chrome.storage.local.get(['allFeatures'], function (result) {
		JSON.parse(result.allFeatures).map(function (value, index) {
			if (value.id === 'pageHighlight') {
				if (value.settings.checkboxPageHighlight1 === true) {
					document.querySelectorAll('*').forEach(function (element) {
						if (
							element.offsetHeight !== 0 &&
							element.offsetWidth !== 0 &&
							element.id !== 'superDevHandler' &&
							element.id !== 'superDevIframe' &&
							element.id !== 'superDev'
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
				} else if (value.settings.checkboxPageHighlight2 === true) {
					document.querySelectorAll('*').forEach(function (element) {
						if (
							element.offsetHeight !== 0 &&
							element.offsetWidth !== 0 &&
							element.id !== 'superDevHandler' &&
							element.id !== 'superDevIframe' &&
							element.id !== 'superDev'
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
					document.querySelectorAll('*').forEach(function (element) {
						if (
							element.offsetHeight !== 0 &&
							element.offsetWidth !== 0 &&
							element.id !== 'superDevHandler' &&
							element.id !== 'superDevIframe' &&
							element.id !== 'superDev'
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
					document.querySelectorAll('*').forEach(function (element) {
						if (
							element.offsetHeight !== 0 &&
							element.offsetWidth !== 0 &&
							element.id !== 'superDevHandler' &&
							element.id !== 'superDevIframe' &&
							element.id !== 'superDev'
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
				} else if (value.settings.checkboxPageHighlight5 === true) {
					document.querySelectorAll('*').forEach(function (element) {
						if (
							element.offsetHeight !== 0 &&
							element.offsetWidth !== 0 &&
							element.id !== 'superDevHandler' &&
							element.id !== 'superDevIframe' &&
							element.id !== 'superDev'
						) {
							let color = rgba();
							if (value.settings.checkboxPageHighlight6 !== true) {
								element.style.setProperty('box-sizing', 'border-box', 'important');
								element.style.setProperty('border', '2px solid ' + color, 'important');
							}

							element.style.setProperty('background-color', color, 'important');
						}
					});
				}
			}
		});
	});

	function onEscape(event) {
		event.preventDefault();
		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				destroyPageHighlight(true);
			} else if (event.isTrusted === false) {
				destroyPageHighlight(false);
			}
		}
	}

	function destroyPageHighlight(isManualEscape) {
		document.removeEventListener('keyup', onEscape);

		if (isManualEscape === true) {
			chrome.storage.local.set({setActiveFeatureDisabled: true});
		}

		chrome.storage.local.get(['isPopupPaused'], function (result) {
			if (result.isPopupPaused === true || isManualEscape === true) {
				chrome.storage.local.set({setMinimised: false});
				chrome.storage.local.set({isPopupPaused: false});
			}
		});

		chrome.storage.local.get(['allFeatures'], function (result) {
			JSON.parse(result.allFeatures).map(function (value, index) {
				if (value.id === 'pageHighlight') {
					if (value.settings.checkboxPageHighlight1 === true) {
						document.querySelectorAll('*').forEach(function (element) {
							if (
								element.offsetHeight !== 0 &&
								element.offsetWidth !== 0 &&
								element.id !== 'superDevHandler' &&
								element.id !== 'superDevIframe' &&
								element.id !== 'superDev'
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
					} else if (value.settings.checkboxPageHighlight2 === true) {
						document.querySelectorAll('*').forEach(function (element) {
							if (
								element.offsetHeight !== 0 &&
								element.offsetWidth !== 0 &&
								element.id !== 'superDevHandler' &&
								element.id !== 'superDevIframe' &&
								element.id !== 'superDev'
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
						document.querySelectorAll('*').forEach(function (element) {
							if (
								element.offsetHeight !== 0 &&
								element.offsetWidth !== 0 &&
								element.id !== 'superDevHandler' &&
								element.id !== 'superDevIframe' &&
								element.id !== 'superDev'
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
						document.querySelectorAll('*').forEach(function (element) {
							if (
								element.offsetHeight !== 0 &&
								element.offsetWidth !== 0 &&
								element.id !== 'superDevHandler' &&
								element.id !== 'superDevIframe' &&
								element.id !== 'superDev'
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
					} else if (value.settings.checkboxPageHighlight5 === true) {
						document.querySelectorAll('*').forEach(function (element) {
							if (
								element.offsetHeight !== 0 &&
								element.offsetWidth !== 0 &&
								element.id !== 'superDevHandler' &&
								element.id !== 'superDevIframe' &&
								element.id !== 'superDev'
							) {
								if (value.settings.checkboxPageHighlight6 !== true) {
									element.style.removeProperty('box-sizing');
									element.style.removeProperty('border');
								}

								element.style.removeProperty('background-color');
							}
						});
					}
				}
			});
		});
	}

	port.postMessage({action: 'Page Highlight Activated'});
	chrome.storage.local.set({setMinimised: true});
}

function deactivatePageHighlight(port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Page Highlight Deactivated'});
}

function activatePageRuler(port, request) {
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
			chrome.storage.local.set({setActiveFeatureDisabled: true});
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

			requestAnimationFrame(function () {
				requestAnimationFrame(function () {
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
}

function deactivatePageRuler(port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Page Ruler Deactivated'});
}

function activateMoveElement(port, request) {
	document.addEventListener('keyup', onEscape);
	document.addEventListener('mouseover', onMouseOver);
	document.addEventListener('mouseout', onMouseOut);
	document.addEventListener('click', onMouseClick);
	window.focus({preventScroll: true});

	let pageGuidelineWrapper = document.createElement('div');
	pageGuidelineWrapper.classList.add('pageGuidelineWrapper');
	document.body.appendChild(pageGuidelineWrapper);

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
			event.target.classList.add('pageGuidelineOutline');
			renderPageGuideline(true);
		}
	}

	function onMouseOut(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			renderPageGuideline(false);
			event.target.classList.remove('pageGuidelineOutline');
		}
	}

	function onMouseClick(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
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

	function destroyMoveElement(isManualEscape) {
		document.removeEventListener('mouseover', onMouseOver);
		document.removeEventListener('mouseout', onMouseOut);
		document.removeEventListener('keyup', onEscape);
		document.removeEventListener('click', onMouseClick);

		if (isManualEscape === true) {
			if (document.querySelector('.pageGuidelineOutline')) {
				document.querySelector('.pageGuidelineOutline').blur();
				document.querySelector('.pageGuidelineOutline').classList.remove('pageGuidelineOutline');
			}
			chrome.storage.local.set({setActiveFeatureDisabled: true});
		}

		chrome.storage.local.get(['isPopupPaused'], function (result) {
			if (result.isPopupPaused === true || isManualEscape === true) {
				chrome.storage.local.set({setMinimised: false});
				chrome.storage.local.set({isPopupPaused: false});
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

	function renderPageGuideline(toShow) {
		if (toShow === true) {
			let pageGuidelinePosition = document.querySelector('.pageGuidelineOutline').getBoundingClientRect();
			let scrollWidth = document.body.scrollWidth;
			let scrollHeight = document.body.scrollHeight;
			let top = pageGuidelinePosition.top + document.documentElement.scrollTop;
			let bottom = pageGuidelinePosition.bottom + document.documentElement.scrollTop;
			let left = pageGuidelinePosition.left + document.documentElement.scrollLeft;
			let right = pageGuidelinePosition.right + document.documentElement.scrollLeft;

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
	chrome.storage.local.set({setMinimised: true});
}

function deactivateMoveElement(port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Move Element Deactivated'});
}

function activateDeleteElement(port, request) {
	document.addEventListener('keyup', onEscape);
	document.addEventListener('mouseover', onMouseOver);
	document.addEventListener('mouseout', onMouseOut);
	document.addEventListener('click', onMouseClick);
	window.focus({preventScroll: true});

	let pageGuidelineWrapper = document.createElement('div');
	pageGuidelineWrapper.classList.add('pageGuidelineWrapper');
	document.body.appendChild(pageGuidelineWrapper);

	function onEscape(event) {
		event.preventDefault();
		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				destroyDeleteElement(true);
			} else if (event.isTrusted === false) {
				destroyDeleteElement(false);
			}
		}
	}

	function onMouseOver(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			event.target.classList.add('pageGuidelineOutline');
			renderPageGuideline(true);
		}
	}

	function onMouseOut(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			renderPageGuideline(false);
			event.target.classList.remove('pageGuidelineOutline');
		}
	}

	function onMouseClick(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			event.target.classList.add('deleteElementWrapper');
			document.querySelector('.deleteElementWrapper').remove();
		}
	}

	function destroyDeleteElement(isManualEscape) {
		document.removeEventListener('mouseover', onMouseOver);
		document.removeEventListener('mouseout', onMouseOut);
		document.removeEventListener('keyup', onEscape);
		document.removeEventListener('click', onMouseClick);

		if (isManualEscape === true) {
			if (document.querySelector('.pageGuidelineOutline')) {
				document.querySelector('.pageGuidelineOutline').blur();
				document.querySelector('.pageGuidelineOutline').classList.remove('pageGuidelineOutline');
			}
			chrome.storage.local.set({setActiveFeatureDisabled: true});
		}

		chrome.storage.local.get(['isPopupPaused'], function (result) {
			if (result.isPopupPaused === true || isManualEscape === true) {
				chrome.storage.local.set({setMinimised: false});
				chrome.storage.local.set({isPopupPaused: false});
			}
		});

		document.querySelector('.pageGuidelineWrapper').remove();
	}

	function renderPageGuideline(toShow) {
		if (toShow === true) {
			let pageGuidelinePosition = document.querySelector('.pageGuidelineOutline').getBoundingClientRect();
			let scrollWidth = document.body.scrollWidth;
			let scrollHeight = document.body.scrollHeight;
			let top = pageGuidelinePosition.top + document.documentElement.scrollTop;
			let bottom = pageGuidelinePosition.bottom + document.documentElement.scrollTop;
			let left = pageGuidelinePosition.left + document.documentElement.scrollLeft;
			let right = pageGuidelinePosition.right + document.documentElement.scrollLeft;

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
	chrome.storage.local.set({setMinimised: true});
}

function deactivateDeleteElement(port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Delete Element Deactivated'});
}

function activateExportElement(port, request) {
	document.addEventListener('keyup', onEscape);
	document.addEventListener('mouseover', onMouseOver);
	document.addEventListener('mouseout', onMouseOut);
	document.addEventListener('click', onMouseClick);
	window.focus({preventScroll: true});

	let pageGuidelineWrapper = document.createElement('div');
	pageGuidelineWrapper.classList.add('pageGuidelineWrapper');
	document.body.appendChild(pageGuidelineWrapper);

	function onEscape(event) {
		event.preventDefault();
		if (event.key === 'Escape') {
			if (event.isTrusted === true) {
				destroyExportElement(true);
			} else if (event.isTrusted === false) {
				destroyExportElement(false);
			}
		}
	}

	function onMouseOver(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			event.target.classList.add('pageGuidelineOutline');
			renderPageGuideline(true);
		}
	}

	function onMouseOut(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			renderPageGuideline(false);
			event.target.classList.remove('pageGuidelineOutline');
		}
	}

	function onMouseClick(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			chrome.storage.local.get(['allFeatures'], function (result) {
				JSON.parse(result.allFeatures).map(function (value, index) {
					if (value.id === 'exportElement') {
						let html = html_beautify(event.target.outerHTML, {indent_size: 2, indent_with_tabs: true});

						let css = [...document.styleSheets]
							.map((styleSheet) => {
								try {
									return [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
								} catch (e) {
									console.log('Access to stylesheet %s is denied. Ignoring…', styleSheet.href);
								}
							})
							.filter(Boolean)
							.join('\n');
						let tagName = event.target.tagName.toLowerCase();
						let classList = event.target.classList;
						let id = event.target.id;

						// Remove PageGuidelineOutline Class From OuterHTML
						if (html.includes('class="pageGuidelineOutline"')) {
							html = html.replace('class="pageGuidelineOutline"', '');
						} else if (html.includes(' pageGuidelineOutline')) {
							html = html.replace(' pageGuidelineOutline', '');
						}

						// Remove MoveElement Cursor From OuterHTML
						if (html.includes('cursor: default !important; ')) {
							html = html.replace('cursor: default !important; ', '');
						}

						// CSS Computation

						// Export to Codepen
						if (value.settings.checkboxExportElement1 === true) {
							let codepenValue = JSON.stringify({
								description: 'Copied with SuperDev',
								html: html,
								css: css,
								tags: ['SuperDev'],
							});
							let codepenForm = document.createElement('form');
							codepenForm.setAttribute('action', 'https://codepen.io/pen/define');
							codepenForm.setAttribute('method', 'POST');
							codepenForm.setAttribute('target', '_blank');
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

	function destroyExportElement(isManualEscape) {
		document.removeEventListener('mouseover', onMouseOver);
		document.removeEventListener('mouseout', onMouseOut);
		document.removeEventListener('keyup', onEscape);
		document.removeEventListener('click', onMouseClick);

		if (isManualEscape === true) {
			if (document.querySelector('.pageGuidelineOutline')) {
				document.querySelector('.pageGuidelineOutline').blur();
				document.querySelector('.pageGuidelineOutline').classList.remove('pageGuidelineOutline');
			}
			chrome.storage.local.set({setActiveFeatureDisabled: true});
		}

		chrome.storage.local.get(['isPopupPaused'], function (result) {
			if (result.isPopupPaused === true || isManualEscape === true) {
				chrome.storage.local.set({setMinimised: false});
				chrome.storage.local.set({isPopupPaused: false});
			}
		});

		document.querySelector('.pageGuidelineWrapper').remove();
	}

	function renderPageGuideline(toShow) {
		if (toShow === true) {
			let pageGuidelinePosition = document.querySelector('.pageGuidelineOutline').getBoundingClientRect();
			let scrollWidth = document.body.scrollWidth;
			let scrollHeight = document.body.scrollHeight;
			let top = pageGuidelinePosition.top + document.documentElement.scrollTop;
			let bottom = pageGuidelinePosition.bottom + document.documentElement.scrollTop;
			let left = pageGuidelinePosition.left + document.documentElement.scrollLeft;
			let right = pageGuidelinePosition.right + document.documentElement.scrollLeft;

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
	chrome.storage.local.set({setMinimised: true});
}

function deactivateExportElement(port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Export Element Deactivated'});
}

function activateTextEditor(port, request) {
	document.addEventListener('keyup', onEscape);
	document.addEventListener('mouseover', onMouseOver);
	document.addEventListener('mouseout', onMouseOut);

	let pageGuidelineWrapper = document.createElement('div');
	pageGuidelineWrapper.classList.add('pageGuidelineWrapper');
	document.body.appendChild(pageGuidelineWrapper);

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
				event.target.classList.add('pageGuidelineOutline');
				renderPageGuideline(true);
				event.target.focus({preventScroll: true});
			}
		}
	}

	function onMouseOut(event) {
		event.preventDefault();
		if (event.target.id !== 'superDevHandler' && event.target.id !== 'superDevIframe' && event.target.id !== 'superDev') {
			if (event.target.classList.contains('pageGuidelineOutline')) {
				event.target.removeAttribute('contenteditable', true);
				event.target.removeAttribute('spellcheck', false);
				event.target.classList.remove('pageGuidelineOutline');
				renderPageGuideline(false);
			}
		}
	}

	function destroyTextEditor(isManualEscape) {
		document.removeEventListener('mouseover', onMouseOver);
		document.removeEventListener('mouseout', onMouseOut);
		document.removeEventListener('keyup', onEscape);

		if (isManualEscape === true) {
			if (document.querySelector('.pageGuidelineOutline')) {
				document.querySelector('.pageGuidelineOutline').blur();
				document.querySelector('.pageGuidelineOutline').removeAttribute('contenteditable', true);
				document.querySelector('.pageGuidelineOutline').removeAttribute('spellcheck', false);
				document.querySelector('.pageGuidelineOutline').classList.remove('pageGuidelineOutline');
			}
			chrome.storage.local.set({setActiveFeatureDisabled: true});
		}

		chrome.storage.local.get(['isPopupPaused'], function (result) {
			if (result.isPopupPaused === true || isManualEscape === true) {
				chrome.storage.local.set({setMinimised: false});
				chrome.storage.local.set({isPopupPaused: false});
			}
		});

		document.querySelector('.pageGuidelineWrapper').remove();
	}

	function renderPageGuideline(toShow) {
		if (toShow === true) {
			let pageGuidelinePosition = document.querySelector('.pageGuidelineOutline').getBoundingClientRect();
			let scrollWidth = document.body.scrollWidth;
			let scrollHeight = document.body.scrollHeight;
			let top = pageGuidelinePosition.top + document.documentElement.scrollTop;
			let bottom = pageGuidelinePosition.bottom + document.documentElement.scrollTop;
			let left = pageGuidelinePosition.left + document.documentElement.scrollLeft;
			let right = pageGuidelinePosition.right + document.documentElement.scrollLeft;

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
	chrome.storage.local.set({setMinimised: true});
}

function deactivateTextEditor(port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Text Editor Deactivated'});
}

function activateColorPicker(port, request) {
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
			chrome.storage.local.set({setActiveFeatureDisabled: true});
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

			requestAnimationFrame(function () {
				requestAnimationFrame(function () {
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

		let colorPickerTooltipColorCode = document.createElement('div');
		colorPickerTooltipColorCode.className = 'colorPickerTooltipColorCode';

		chrome.storage.local.get(['allFeatures'], function (result) {
			JSON.parse(result.allFeatures).map(function (value, index) {
				if (value.id === 'colorPicker') {
					if (value.settings.checkboxColorPicker1 === true) {
						colorPickerTooltipBackground.style.backgroundColor = spotColor.hex;
						colorPickerTooltipColorCode.textContent = spotColor.hex;
						if (spotColor.y < 60) colorPickerTooltip.classList.add('bottom');
						if (spotColor.x > window.innerWidth - 110) colorPickerTooltip.classList.add('left');
					} else if (value.settings.checkboxColorPicker2 === true) {
						colorPickerTooltipBackground.style.backgroundColor = spotColor.rgb;
						colorPickerTooltipColorCode.textContent = spotColor.rgb;
						if (spotColor.y < 60) colorPickerTooltip.classList.add('bottom');
						if (spotColor.x > window.innerWidth - 220) colorPickerTooltip.classList.add('left');
					}
				}
			});
		});

		colorPickerTooltip.appendChild(colorPickerTooltipBackground);
		colorPickerTooltip.appendChild(colorPickerTooltipColorCode);
		newColorPickerDiv.appendChild(colorPickerTooltip);
		body.appendChild(newColorPickerDiv);
	}
}

function deactivateColorPicker(port, request) {
	document.dispatchEvent(new KeyboardEvent('keyup', {key: 'Escape'}));
	port.postMessage({action: 'Color Picker Deactivated'});
}

function activateClearCache(port, request) {
	chrome.storage.local.get(['allFeatures'], function (result) {
		JSON.parse(result.allFeatures).map(function (value, index) {
			if (value.id === 'clearCache') {
				let portThree = chrome.runtime.connect({name: 'portThree'});
				portThree.postMessage({action: 'clearCache', settings: value.settings});
			}
		});
	});
}
