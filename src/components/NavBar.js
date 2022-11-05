import React from 'react';
import {useState, useEffect} from 'react';
import HideAllCompExcept from './functions/HideAllCompExcept';
import PopupHeight from './functions/PopupHeight';
import ActDeactFeature from './functions/ActDeactFeature';

export default function NavBar({allFeatures, activeTab, portThree, allFeaturesRef}) {
	useEffect(function () {
		// OnUpdate SetMinimised
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.setMinimised) {
				if (changes.setMinimised.newValue === true) {
					document.querySelector('#navBar').firstChild.style.borderRadius = '8px';
					portThree.postMessage({action: 'changeHeight', height: 40.5});
					chrome.storage.local.set({setMinimised: null});
				} else if (changes.setMinimised.newValue === false) {
					portThree.postMessage({action: 'changeHeight', height: PopupHeight(allFeatures)});
					document.querySelector('#navBar').firstChild.style.borderRadius = '';
					chrome.storage.local.set({setMinimised: null});
				}
			}
		});

		// OnUpdate setHomePageActive
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.setHomePageActive) {
				if (changes.setHomePageActive.newValue === true) {
					portThree.postMessage({action: 'justChangeHeight', height: PopupHeight(allFeatures)});
					HideAllCompExcept('mainBody');
					chrome.storage.local.set({setHomePageActive: false});
				}
			}
		});

		// OnUpdate SetActFeatDisabled
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.setActFeatDisabled) {
				if (changes.setActFeatDisabled.newValue === true) {
					chrome.storage.local.get(['whichFeatureActive'], function (result) {
						if (result.whichFeatureActive !== null) {
							ActDeactFeature(allFeatures, activeTab, portThree, result.whichFeatureActive);
							chrome.storage.local.set({setActFeatDisabled: false});
						}
					});
				}
			}
		});

		// OnUpdate WhichFeatureActive
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.whichFeatureActive) {
				if (changes.whichFeatureActive.newValue === 'clearAllCache') {
					document.querySelector('#clearAllCache > i').classList.remove('fa-recycle');
					document.querySelector('#clearAllCache > i').classList.add('fa-badge-check');
					setTimeout(function () {
						document.querySelector('#clearAllCache > i').classList.remove('fa-badge-check');
						document.querySelector('#clearAllCache > i').classList.add('fa-recycle');
						chrome.storage.local.set({whichFeatureActive: null});
					}, 1000);
				} else if (changes.whichFeatureActive.newValue === 'colorPalette') {
					portThree.postMessage({action: 'changeHeight', height: PopupHeight(allFeatures)});
					HideAllCompExcept('colorPalettePage');
					let childHeight = PopupHeight(allFeatures) - 41.5;
					document.querySelector('#colorPalettePageChild').style.height = `${childHeight}px`;
				}
			}
		});

		// Disable ActFeature on Escape With Focus on Iframe
		document.addEventListener('keyup', function (event) {
			event.preventDefault();
			if (event.key === 'Escape' && event.isTrusted === true) {
				chrome.storage.local.get(['whichFeatureActive'], function (result) {
					if (result.whichFeatureActive !== null) {
						ActDeactFeature(allFeatures, activeTab, portThree, result.whichFeatureActive);
						portThree.postMessage({action: 'changeHeight', height: PopupHeight(allFeatures)});
						HideAllCompExcept('mainBody');
					}
				});
			}
		});
	}, []);

	function darkMode() {
		chrome.storage.local.get(['colorTheme'], function (result) {
			if (result.colorTheme === 'light') {
				document.documentElement.classList.add('dark');
				chrome.storage.local.set({colorTheme: 'dark'});
			} else if (result.colorTheme === 'dark') {
				document.documentElement.classList.remove('dark');
				chrome.storage.local.set({colorTheme: 'light'});
			}
		});
	}

	function toggleInfo() {
		if (document.querySelector('#toggleInfo').classList.contains('hidden')) {
			chrome.storage.local.get(['whichFeatureActive'], function (result) {
				if (result.whichFeatureActive !== null) {
					ActDeactFeature(allFeatures, activeTab, portThree, result.whichFeatureActive);
				}
			});
			portThree.postMessage({action: 'changeHeight', height: PopupHeight(allFeatures)});
			HideAllCompExcept('toggleInfo');

			// Set Child Height, Only Needed For Scrollbar
			let childHeight = PopupHeight(allFeatures) - 41.5;
			document.querySelector('#toggleInfoChild').style.height = `${childHeight}px`;
		} else {
			portThree.postMessage({action: 'changeHeight', height: PopupHeight(allFeatures)});
			HideAllCompExcept('mainBody');
		}
	}

	function toggleSettings() {
		if (document.querySelector('#toggleSettings').classList.contains('hidden')) {
			chrome.storage.local.get(['whichFeatureActive'], function (result) {
				if (result.whichFeatureActive !== null) {
					ActDeactFeature(allFeatures, activeTab, portThree, result.whichFeatureActive);
				}
			});
			portThree.postMessage({action: 'changeHeight', height: PopupHeight(allFeatures)});
			HideAllCompExcept('toggleSettings');

			// Set Child Height, Only Needed For Scrollbar
			let childHeight = PopupHeight(allFeatures) - 41.5;
			document.querySelector('#toggleSettingsChild').style.height = `${childHeight}px`;
		} else {
			portThree.postMessage({action: 'changeHeight', height: PopupHeight(allFeatures)});
			HideAllCompExcept('mainBody');
		}
	}

	function stopActFeatButton() {
		chrome.storage.local.get(['whichFeatureActive'], function (result) {
			if (result.whichFeatureActive !== null) {
				ActDeactFeature(allFeatures, activeTab, portThree, result.whichFeatureActive);
			}
		});
	}

	function minimiseExtension() {
		chrome.storage.local.get(['howLongPopupIs'], function (result) {
			if (result.howLongPopupIs === 40.5) {
				chrome.storage.local.set({setMinimised: false});
			} else {
				chrome.storage.local.set({setMinimised: true});
			}
		});
	}

	function showHideExtension() {
		portThree.postMessage({action: 'showHideExtension'});
	}

	return (
		<header id='navBar'>
			<div className='flex justify-between border border-borderOne dark:border-borderOneD box-border rounded-t-lg py-[8px] px-[18px]'>
				<h1 className='text-[13px] text-titleText dark:text-titleTextD font-medium cursor-default select-none relative top-[0.5px]'>
					SuperDev<img className='inline ml-[6px] relative bottom-[1.5px]' src='../icons/icon128.png' alt='logo' width='14'></img>
				</h1>
				<nav className='relative bottom-[0.5px]'>
					<button
						tabIndex='-1'
						id='stopActFeatButton'
						className='text-faText dark:text-faTextD text-right fa-solid fa-circle-stop text-xs ml-[6px] p-1 py-[5px] border-0 outline-0 invisible'
						onClick={stopActFeatButton}></button>
					<button
						tabIndex='-1'
						id='movePopupButton'
						className='text-faText dark:text-faTextD text-right fa-solid fa-up-down-left-right text-xs ml-[6px] p-1 py-[5px] border-0 outline-0'></button>
					<button
						tabIndex='-1'
						id='toggleInfoButton'
						className='text-faText dark:text-faTextD text-right fa-solid fa-circle-info text-[12.5px] ml-[6px] p-1 py-[5px] border-0 outline-0'
						onClick={toggleInfo}></button>
					<button
						tabIndex='-1'
						id='darkModeButton'
						className='text-faText dark:text-faTextD text-right fa-solid fa-circle-half-stroke text-[12.5px] ml-[6px] p-1 py-[5px] border-0 outline-0'
						onClick={darkMode}></button>
					<button
						tabIndex='-1'
						id='toggleSettingsButton'
						className='text-faText dark:text-faTextD text-right fa-solid fa-gear text-[12.5px] ml-[6px] p-1 py-[5px] border-0 outline-0'
						onClick={toggleSettings}></button>
					<button
						tabIndex='-1'
						id='minimiseExtensionButton'
						className='text-faText dark:text-faTextD text-right fa-solid fa-circle-minus text-[12.5px] ml-[6px] p-1 py-[5px] border-0 outline-0'
						onClick={minimiseExtension}></button>
					<button
						tabIndex='-1'
						id='showHideExtensionButton'
						className='text-faText dark:text-faTextD text-right fa-solid fa-circle-xmark text-[12.5px] ml-[6px] p-1 py-[5px] pr-0 border-0 outline-0'
						onClick={showHideExtension}></button>
				</nav>
			</div>
		</header>
	);
}
