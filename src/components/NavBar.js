import React from 'react';
import {useState, useEffect} from 'react';
import HideAllComponentExcept from './functions/HideAllComponentExcept';
import ActivateDeactivateFeature from './functions/ActivateDeactivateFeature';

export default function NavBar() {
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(() => {
		console.log(2);

		chrome.storage.sync.get(['allFeatures'], function (result) {
			setAllFeatures(JSON.parse(result.allFeatures));
		});

		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.allFeatures) {
				setAllFeatures(JSON.parse(changes.allFeatures.newValue));
			}

			//Disable All Active Feature on isHidden=True
			if (changes.isHidden) {
				if (changes.isHidden.newValue === true) {
					chrome.storage.sync.get(['allFeatures'], function (result) {
						ActivateDeactivateFeature(JSON.parse(result.allFeatures), null);
					});
				}
			}

			//Disable All Active Feature on isHidden=True
			if (changes.isMinimised) {
				if (changes.isMinimised.newValue === true) {
					document.querySelector('#superDevBody').style.height = '42px';
					document.querySelector('#navBar').firstChild.style.borderRadius = '8px';
				} else {
					document.querySelector('#superDevBody').style.height = '';
					document.querySelector('#navBar').firstChild.style.borderRadius = '';
				}
			}
		});
	}, []);

	function toggleFeature() {
		// if (document.querySelector('#toggleFeature').classList.contains('sd-hidden')) {
		// 	ActivateDeactivateFeature(allFeatures, null);
		// 	HideAllComponentExcept('toggleFeature');
		// } else {
		// 	HideAllComponentExcept('mainBody');
		// }
	}

	function darkMode() {
		chrome.storage.sync.get(['colorTheme'], function (result) {
			if (result.colorTheme) {
				if (result.colorTheme === 'light') {
					document.documentElement.classList.add('sd-dark');
					chrome.storage.sync.set({colorTheme: 'dark'});
				} else {
					document.documentElement.classList.remove('sd-dark');
					chrome.storage.sync.set({colorTheme: 'light'});
				}
			} else {
				if (document.documentElement.classList.contains('sd-dark')) {
					document.documentElement.classList.remove('sd-dark');
					chrome.storage.sync.set({colorTheme: 'light'});
				} else {
					document.documentElement.classList.add('sd-dark');
					chrome.storage.sync.set({colorTheme: 'dark'});
				}
			}
		});
	}

	function toggleSettings() {
		// if (document.querySelector('#toggleSettings').classList.contains('sd-hidden')) {
		// 	ActivateDeactivateFeature(allFeatures, null);
		// 	HideAllComponentExcept('toggleSettings');
		// } else {
		// 	HideAllComponentExcept('mainBody');
		// }
	}

	function pauseExtension() {
		//ActivateDeactivateFeature(allFeatures, null);
	}

	function minimiseExtension() {
		chrome.storage.sync.get(['isMinimised'], function (result) {
			if (result.isMinimised) {
				if (result.isMinimised === true) chrome.storage.sync.set({isMinimised: false});
				else chrome.storage.sync.set({isMinimised: true});
			} else chrome.storage.sync.set({isMinimised: true});
		});
	}

	function showHideExtension() {
		// chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		// 	let portFour = chrome.tabs.connect(tabs[0].id, {name: 'portFour'});
		// 	portFour.postMessage({action: 'showHideExtension'});
		// 	portFour.onMessage.addListener(function (response) {
		// 		console.log('Got Response : ', response.action);
		// 	});
		// });
	}

	if (allFeatures.length !== 0) {
		return (
			<header id='navBar' className='sd-bg-navBar'>
				<div className='sd-flex sd-justify-between sd-border sd-border-borderDark sd-box-border sd-rounded-t-lg sd-py-[8px] sd-px-[18px]'>
					<h1 className='sd-text-[13px] sd-text-navText sd-font-normal sd-cursor-default sd-select-none sd-relative sd-top-[2px]'>
						SuperDev Pro
						<img
							className='sd-inline  sd-relative sd-ml-[6px] sd-mt-[-3px]'
							src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGkmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuNTY2ZWJjNWI0LCAyMDIyLzA1LzA5LTA4OjI1OjU1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjMuNCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjItMDktMjBUMDA6MDE6MDYrMDU6MzAiIHhtcDpNb2RpZnlEYXRlPSIyMDIyLTA5LTIwVDAwOjE2OjU2KzA1OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTA5LTIwVDAwOjE2OjU2KzA1OjMwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozOTI5NzZkZC1iNGFlLTQxZTgtOTZmZi02Y2EwNGQ1ZTJjMTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzI0MzMyMDMtZTNmOS00ZmM4LThjNWYtYTRiOGYyNDg1MDg3IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NzI0MzMyMDMtZTNmOS00ZmM4LThjNWYtYTRiOGYyNDg1MDg3Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MjQzMzIwMy1lM2Y5LTRmYzgtOGM1Zi1hNGI4ZjI0ODUwODciIHN0RXZ0OndoZW49IjIwMjItMDktMjBUMDA6MDE6MDYrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMy40IChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5YjEyNzEzNi0xNGY4LTQ5ZjItYThkOS0wYTZkZWMwZDU1YTciIHN0RXZ0OndoZW49IjIwMjItMDktMjBUMDA6MTY6MjQrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMy40IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozOTI5NzZkZC1iNGFlLTQxZTgtOTZmZi02Y2EwNGQ1ZTJjMTgiIHN0RXZ0OndoZW49IjIwMjItMDktMjBUMDA6MTY6NTYrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMy40IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgG7p2IAAAlKSURBVGiBzZp7cFTVHcc/59zdJJtk835BkGdCePgAgQQlNjxsRSVSqJUKtWrtY+zU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'
							alt='logo'
							width='14'></img>
					</h1>
					<nav>
						<button className='sd-text-navText sd-text-right fa-regular fa-up-down-left-right sd-text-xs sd-p-1  sd-relative sd-bottom-[2px]'></button>
						<button
							className='sd-text-navText sd-text-right fa-regular fa-eye sd-text-xs sd-ml-[6px] sd-p-1  sd-relative sd-bottom-[2px]'
							onClick={toggleFeature}></button>
						<button
							className='sd-text-navText sd-text-right fa-regular fa-circle-half-stroke sd-text-xs sd-ml-[6px] sd-p-1  sd-relative sd-bottom-[2px]'
							onClick={darkMode}></button>
						<button
							className='sd-text-navText sd-text-right fa-regular fa-gear sd-text-xs sd-ml-[6px] sd-p-1  sd-relative sd-bottom-[2px]'
							onClick={toggleSettings}></button>
						<button
							className='sd-text-navText sd-text-right fa-regular fa-circle-pause sd-text-xs sd-ml-[6px] sd-p-1  sd-relative sd-bottom-[2px]'
							onClick={pauseExtension}></button>
						<button
							className='sd-text-navText sd-text-right fa-regular fa-circle-minus sd-text-xs sd-ml-[6px] sd-p-1  sd-relative sd-bottom-[2px]'
							onClick={minimiseExtension}></button>
						<button
							className='sd-text-navText sd-text-right fa-solid fa-xmark sd-text-[16px] sd-ml-[6px] sd-p-1  sd-relative sd-bottom-[0.5px]'
							onClick={showHideExtension}></button>
					</nav>
				</div>
			</header>
		);
	}
}
