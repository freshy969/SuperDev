import React from 'react';
import {useState, useEffect} from 'react';
import HideAllComponentExcept from './functions/HideAllComponentExcept';
import PopupHeight from './functions/PopupHeight';
import ChangeHeight from './functions/ChangeHeight';
import JustChangeHeight from './functions/JustChangeHeight';
import ActivateDeactivateFeature from './functions/ActivateDeactivateFeature';

export default function NavBar() {
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(function () {
		// Get All Features
		chrome.storage.local.get(['allFeatures'], function (result) {
			setAllFeatures(JSON.parse(result.allFeatures));
		});

		// On AllFeatures Change
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.allFeatures) {
				setAllFeatures(JSON.parse(changes.allFeatures.newValue));
			}
		});

		// On SetMinimised Change
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.setMinimised) {
				if (changes.setMinimised.newValue === true) {
					document.querySelector('#navBar').firstChild.style.borderRadius = '8px';
					ChangeHeight(38.5); // 38.5 = Header Height
				} else if (changes.setMinimised.newValue === false) {
					chrome.storage.local.get(['allFeatures'], function (result) {
						if (!document.querySelector('#mainBody').classList.contains('hidden')) {
							ChangeHeight(PopupHeight(JSON.parse(result.allFeatures)));
							HideAllComponentExcept('mainBody');
						} else if (!document.querySelector('#toggleInfo').classList.contains('hidden')) {
							ChangeHeight(PopupHeight(JSON.parse(result.allFeatures)));
							HideAllComponentExcept('toggleInfo');
						} else if (!document.querySelector('#toggleSettings').classList.contains('hidden')) {
							ChangeHeight(PopupHeight(JSON.parse(result.allFeatures)));
							HideAllComponentExcept('toggleSettings');
						}
					});
				}
			}
		});

		// On IsPopupHidden Change
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.isPopupHidden) {
				if (changes.isPopupHidden.newValue === true) {
					if (document.querySelector('#mainBody').classList.contains('hidden')) {
						chrome.storage.local.get(['allFeatures'], function (result) {
							JustChangeHeight(PopupHeight(JSON.parse(result.allFeatures)));
							HideAllComponentExcept('mainBody');
						});
					}
				}
			}
		});

		// On DisableActiveFeature Change
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.setActiveFeatureDisabled) {
				if (changes.setActiveFeatureDisabled.newValue === true) {
					chrome.storage.local.get(['allFeatures'], function (result) {
						ActivateDeactivateFeature(JSON.parse(result.allFeatures), null);
						chrome.storage.local.set({setActiveFeatureDisabled: false});
					});
				}
			}
		});
	}, []);

	function darkMode() {
		chrome.storage.local.get(['colorTheme'], function (result) {
			if (result.colorTheme === 'light') {
				document.documentElement.classList.add('dark');
				chrome.storage.local.set({colorTheme: 'dark'});
				console.log('Dark Mode Activated');
			} else if (result.colorTheme === 'dark') {
				document.documentElement.classList.remove('dark');
				chrome.storage.local.set({colorTheme: 'light'});
				console.log('Light Mode Activated');
			}
		});
	}

	function toggleInfo() {
		if (document.querySelector('#toggleInfo').classList.contains('hidden')) {
			ActivateDeactivateFeature(allFeatures, null);
			ChangeHeight(PopupHeight(allFeatures));
			HideAllComponentExcept('toggleInfo');

			let bodyHeight = PopupHeight(allFeatures) - 39.5;
			document.querySelector('#toggleInfoChild').style.height = `${bodyHeight}px`;

			chrome.storage.local.set({setMinimised: false});
		} else {
			ChangeHeight(PopupHeight(allFeatures));
			HideAllComponentExcept('mainBody');
			chrome.storage.local.set({setMinimised: false});
		}
	}

	function toggleSettings() {
		if (document.querySelector('#toggleSettings').classList.contains('hidden')) {
			ActivateDeactivateFeature(allFeatures, null);
			ChangeHeight(PopupHeight(allFeatures));
			HideAllComponentExcept('toggleSettings');

			let bodyHeight = PopupHeight(allFeatures) - 39.5;
			document.querySelector('#toggleSettingsChild').style.height = `${bodyHeight}px`;

			chrome.storage.local.set({setMinimised: false});
		} else {
			ChangeHeight(PopupHeight(allFeatures));
			HideAllComponentExcept('mainBody');
			chrome.storage.local.set({setMinimised: false});
		}
	}

	function pauseExtension() {
		ActivateDeactivateFeature(allFeatures, null);
		chrome.storage.local.set({isPopupPaused: true});
	}

	function minimiseExtension() {
		chrome.storage.local.get(['setMinimised'], function (result) {
			if (result.setMinimised === true) chrome.storage.local.set({setMinimised: false});
			else if (result.setMinimised === false) chrome.storage.local.set({setMinimised: true});
			else if (result.setMinimised === null) chrome.storage.local.set({setMinimised: true});
		});
	}

	function showHideExtension() {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			let portThree = chrome.tabs.connect(tabs[0].id, {name: 'portThree'});
			portThree.postMessage({action: 'showHideExtension'});
		});
	}

	if (allFeatures.length !== 0) {
		return (
			<header id='navBar'>
				<div className='flex justify-between border border-borderOne dark:border-borderOneD box-border rounded-t-lg py-[8px] px-[18px]'>
					<h1 className='text-[13px] text-titleText dark:text-titleTextD font-medium cursor-default select-none relative top-[0.5px]'>
						SuperDev<img className='inline ml-[6px] relative bottom-[1.5px]' src='../icons/icon128.png' alt='logo' width='14'></img>
					</h1>
					<nav className='relative bottom-[0.5px]'>
						<button
							id='pauseExtensionButton'
							className='text-faText dark:text-faTextD text-right fa-solid fa-circle-stop text-xs ml-[6px] p-1 invisible'
							onClick={pauseExtension}></button>
						<button id='movePopupButton' className='text-faText dark:text-faTextD text-right fa-solid fa-up-down-left-right text-xs ml-[6px] p-1'></button>
						<button
							id='toggleInfoButton'
							className='text-faText dark:text-faTextD text-right fa-solid fa-circle-info text-[12.5px] ml-[6px] p-1'
							onClick={toggleInfo}></button>
						<button
							id='darkModeButton'
							className='text-faText dark:text-faTextD text-right fa-solid fa-circle-half-stroke text-[12.5px] ml-[6px] p-1'
							onClick={darkMode}></button>
						<button
							id='toggleSettingsButton'
							className='text-faText dark:text-faTextD text-right fa-solid fa-gear text-[12.5px] ml-[6px] p-1'
							onClick={toggleSettings}></button>
						<button
							id='minimiseExtensionButton'
							className='text-faText dark:text-faTextD text-right fa-solid fa-circle-minus text-[12.5px] ml-[6px] p-1'
							onClick={minimiseExtension}></button>
						<button
							id='showHideExtensionButton'
							className='text-faText dark:text-faTextD text-right fa-solid fa-circle-xmark text-[12.5px] ml-[6px] p-1 pr-0'
							onClick={showHideExtension}></button>
					</nav>
				</div>
			</header>
		);
	}
}
