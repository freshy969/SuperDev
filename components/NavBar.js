import {useState, useEffect} from 'react';
import HideAllComponentExcept from '/components/functions/HideAllComponentExcept';
import PopupHeight from '/components/functions/PopupHeight';
import ChangeHeight from '/components/functions/ChangeHeight';
import JustChangeHeight from '/components/functions/JustChangeHeight';
import ActivateDeactivateFeature from '/components/functions/ActivateDeactivateFeature';

export default function NavBar() {
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(() => {
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
					ChangeHeight(42); // 42 = Header Height
					console.log('Popup Minimised');
				} else if (changes.setMinimised.newValue === false) {
					chrome.storage.local.get(['allFeatures'], function (result) {
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
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.isPopupHidden) {
				if (changes.isPopupHidden.newValue === true) {
					if (document.querySelector('#mainBody').classList.contains('hidden')) {
						chrome.storage.local.get(['allFeatures'], function (result) {
							JustChangeHeight(PopupHeight(JSON.parse(result.allFeatures)));
							HideAllComponentExcept('mainBody');
							console.log('Set Homepage as Default');
						});
					}
				}
			}
		});

		// On DisableActiveFeature Change
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.disableActiveFeature) {
				if (changes.disableActiveFeature.newValue === true) {
					chrome.storage.local.get(['allFeatures'], function (result) {
						ActivateDeactivateFeature(JSON.parse(result.allFeatures), null);
						chrome.storage.local.set({disableActiveFeature: false});
						console.log('Deactivated Active Feature');
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

	function toggleSettings() {
		if (document.querySelector('#toggleSettings').classList.contains('hidden')) {
			ActivateDeactivateFeature(allFeatures, null);
			ChangeHeight(PopupHeight(allFeatures));
			HideAllComponentExcept('toggleSettings');
			chrome.storage.local.set({setMinimised: false});
			console.log('Toggle Settings Activated');
		} else {
			ChangeHeight(PopupHeight(allFeatures));
			HideAllComponentExcept('mainBody');
			chrome.storage.local.set({setMinimised: false});
			console.log('Toggle Settings Dectivated');
		}
	}

	function pauseExtension() {
		ActivateDeactivateFeature(allFeatures, null);
		chrome.storage.local.set({isPopupPaused: true});
		console.log('Extension Paused');
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
			let portFour = chrome.tabs.connect(tabs[0].id, {name: 'portFour'});
			portFour.postMessage({action: 'showHideExtension'});
			portFour.onMessage.addListener(function (response) {
				console.log('Got Response : ', response.action);
			});
		});
	}

	if (allFeatures.length !== 0) {
		return (
			<header id='navBar' className='bg-navBar'>
				<div className='flex justify-between border border-borderDark box-border rounded-t-lg py-[8px] px-[18px]'>
					<h1 className='text-[13px] text-navText font-regular cursor-default select-none relative top-[2px]'>
						SuperDev<img className='inline relative ml-[6px] mt-[-3px]' src='../icons/icon128.png' alt='logo' width='14'></img>
					</h1>
					<nav>
						<button
							id='pauseExtensionButton'
							className='text-navText text-right fa-regular fa-circle-stop text-xs ml-[6px] p-1 relative bottom-[1px] invisible'
							onClick={pauseExtension}></button>
						<button
							id='movePopupButton'
							className='text-navText text-right fa-regular fa-up-down-left-right text-[12.5px] ml-[6px] p-1 relative bottom-[1px]'></button>
						<button
							id='darkModeButton'
							className='text-navText text-right fa-regular fa-circle-half-stroke text-xs ml-[6px] p-1 relative bottom-[1px]'
							onClick={darkMode}></button>
						<button
							id='toggleSettingsButton'
							className='text-navText text-right fa-regular fa-gear text-xs ml-[6px] p-1 relative bottom-[1px]'
							onClick={toggleSettings}></button>
						<button
							id='minimiseExtensionButton'
							className='text-navText text-right fa-solid fa-down-left-and-up-right-to-center text-[11.5px] ml-[6px] p-1 relative bottom-[1.3px]'
							onClick={minimiseExtension}></button>
						<button
							id='showHideExtensionButton'
							className='text-navText text-right fa-solid fa-xmark text-[16px] ml-[6px] p-1 pr-0 relative bottom-[0px]'
							onClick={showHideExtension}></button>
					</nav>
				</div>
			</header>
		);
	}
}
