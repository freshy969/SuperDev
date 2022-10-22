import React from 'react';
import {useState, useEffect} from 'react';
import HideAllComponentExcept from './functions/HideAllComponentExcept';
import PopupHeight from './functions/PopupHeight';
import ChangeHeight from './functions/ChangeHeight';
import JustChangeHeight from './functions/JustChangeHeight';
import ActivateDeactivateFeature from './functions/ActivateDeactivateFeature';

export default function NavBar() {
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(() => {
		// Get All Features
		chrome.storage.local.get(['allFeatures'], (result) => {
			setAllFeatures(JSON.parse(result.allFeatures));
		});

		// On AllFeatures Change
		chrome.storage.onChanged.addListener((changes) => {
			if (changes.allFeatures) {
				setAllFeatures(JSON.parse(changes.allFeatures.newValue));
			}
		});

		// On SetMinimised Change
		chrome.storage.onChanged.addListener((changes) => {
			if (changes.setMinimised) {
				if (changes.setMinimised.newValue === true) {
					document.querySelector('#navBar').firstChild.style.borderRadius = '8px';
					ChangeHeight(42); // 42 = Header Height
					console.log('Popup Minimised');
				} else if (changes.setMinimised.newValue === false) {
					chrome.storage.local.get(['allFeatures'], (result) => {
						if (!document.querySelector('#mainBody').classList.contains('hidden')) {
							ChangeHeight(PopupHeight(JSON.parse(result.allFeatures)));
							HideAllComponentExcept('mainBody');
							console.log('Popup Expanded');
						} else if (!document.querySelector('#toggleSettings').classList.contains('hidden')) {
							ChangeHeight(PopupHeight(JSON.parse(result.allFeatures)));
							HideAllComponentExcept('toggleSettings');
							console.log('Popup Expanded');
						}
					});
				}
			}
		});

		// On IsPopupHidden Change
		chrome.storage.onChanged.addListener((changes) => {
			if (changes.isPopupHidden) {
				if (changes.isPopupHidden.newValue === true) {
					if (document.querySelector('#mainBody').classList.contains('hidden')) {
						chrome.storage.local.get(['allFeatures'], (result) => {
							JustChangeHeight(PopupHeight(JSON.parse(result.allFeatures)));
							HideAllComponentExcept('mainBody');
							console.log('Set Homepage as Default');
						});
					}
				}
			}
		});

		// On DisableActiveFeature Change
		chrome.storage.onChanged.addListener((changes) => {
			if (changes.setActiveFeatureDisabled) {
				if (changes.setActiveFeatureDisabled.newValue === true) {
					chrome.storage.local.get(['allFeatures'], (result) => {
						ActivateDeactivateFeature(JSON.parse(result.allFeatures), null);
						chrome.storage.local.set({setActiveFeatureDisabled: false});
						console.log('Deactivated Active Feature');
					});
				}
			}
		});
	}, []);

	const toggleSettings = () => {
		if (document.querySelector('#toggleSettings').classList.contains('hidden')) {
			ActivateDeactivateFeature(allFeatures, null);
			ChangeHeight(PopupHeight(allFeatures));
			HideAllComponentExcept('toggleSettings');

			let bodyHeight = PopupHeight(allFeatures) - 43;
			document.querySelector('#toggleSettingsChild').style.height = `${bodyHeight}px`;

			chrome.storage.local.set({setMinimised: false});
			console.log('Toggle Settings Activated');
		} else {
			ChangeHeight(PopupHeight(allFeatures));
			HideAllComponentExcept('mainBody');
			chrome.storage.local.set({setMinimised: false});
			console.log('Toggle Settings Dectivated');
		}
	};

	const pauseExtension = () => {
		ActivateDeactivateFeature(allFeatures, null);
		chrome.storage.local.set({isPopupPaused: true});
		console.log('Extension Paused');
	};

	const minimiseExtension = () => {
		chrome.storage.local.get(['setMinimised'], (result) => {
			if (result.setMinimised === true) chrome.storage.local.set({setMinimised: false});
			else if (result.setMinimised === false) chrome.storage.local.set({setMinimised: true});
			else if (result.setMinimised === null) chrome.storage.local.set({setMinimised: true});
		});
	};

	const showHideExtension = () => {
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			let portFour = chrome.tabs.connect(tabs[0].id, {name: 'portFour'});
			portFour.postMessage({action: 'showHideExtension'});
			portFour.onMessage.addListener((response) => {
				console.log('Got Response : ', response.action);
			});
		});
	};

	if (allFeatures.length !== 0) {
		return (
			<header id='navBar'>
				<div className='flex justify-between border border-borderOne box-border rounded-t-lg py-[8px] px-[18px]'>
					<h1 className='text-[13px] text-allText font-regular cursor-default select-none relative top-[2px]'>
						SuperDev<img className='inline relative ml-[6px] mt-[-3px]' src='../icons/icon128.png' alt='logo' width='14'></img>
					</h1>
					<nav>
						<button
							id='pauseExtensionButton'
							className='text-allText text-right fa-regular fa-circle-stop text-xs ml-[6px] p-1 relative bottom-[1px] invisible'
							onClick={pauseExtension}></button>
						<button
							id='movePopupButton'
							className='text-allText text-right fa-regular fa-up-down-left-right text-[12.5px] ml-[6px] p-1 relative bottom-[1px]'></button>
						<button
							id='toggleSettingsButton'
							className='text-allText text-right fa-regular fa-gear text-xs ml-[6px] p-1 relative bottom-[1px]'
							onClick={toggleSettings}></button>
						<button
							id='minimiseExtensionButton'
							className='text-allText text-right fa-solid fa-down-left-and-up-right-to-center text-[11.5px] ml-[6px] p-1 relative bottom-[1.3px]'
							onClick={minimiseExtension}></button>
						<button
							id='showHideExtensionButton'
							className='text-allText text-right fa-solid fa-xmark text-[16px] ml-[6px] p-1 pr-0 relative bottom-[0px]'
							onClick={showHideExtension}></button>
					</nav>
				</div>
			</header>
		);
	}
}
