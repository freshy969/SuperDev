import {useState, useEffect} from 'react';
import HideAllComponentExcept from '/components/functions/HideAllComponentExcept';
import BodyHeight from '/components/functions/BodyHeight';
import AllFeaturesHeight from '/components/functions/AllFeaturesHeight';
import SettingsHeight from '/components/functions/SettingsHeight';
import ChangeHeight from '/components/functions/ChangeHeight';
import ActivateDeactivateFeature from '/components/functions/ActivateDeactivateFeature';

export default function NavBar() {
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(() => {
		// Get All Features
		chrome.storage.sync.get(['allFeatures'], function (result) {
			setAllFeatures(JSON.parse(result.allFeatures));
		});
	}, []);

	function toggleFeature() {
		if (document.querySelector('#toggleFeature').classList.contains('hidden')) {
			ChangeHeight(AllFeaturesHeight(allFeatures));
			ActivateDeactivateFeature(allFeatures, null);
			HideAllComponentExcept('toggleFeature');
			chrome.storage.sync.set({setMinimised: false});
		} else {
			ChangeHeight(BodyHeight(allFeatures));
			HideAllComponentExcept('mainBody');
			chrome.storage.sync.set({setMinimised: false});
		}
	}

	function darkMode() {
		chrome.storage.sync.get(['colorTheme'], function (result) {
			if (result.colorTheme) {
				if (result.colorTheme === 'light') {
					document.documentElement.classList.add('dark');
					chrome.storage.sync.set({colorTheme: 'dark'});
				} else {
					document.documentElement.classList.remove('dark');
					chrome.storage.sync.set({colorTheme: 'light'});
				}
			}
		});
	}

	function toggleSettings() {
		if (document.querySelector('#toggleSettings').classList.contains('hidden')) {
			ChangeHeight(SettingsHeight(allFeatures));
			ActivateDeactivateFeature(allFeatures, null);
			HideAllComponentExcept('toggleSettings');
			chrome.storage.sync.set({setMinimised: false});
		} else {
			ChangeHeight(BodyHeight(allFeatures));
			HideAllComponentExcept('mainBody');
			chrome.storage.sync.set({setMinimised: false});
		}
	}

	function pauseExtension() {
		ActivateDeactivateFeature(allFeatures, null);
	}

	function minimiseExtension() {
		chrome.storage.sync.get(['setMinimised'], function (result) {
			if (result.setMinimised) {
				if (result.setMinimised === true) chrome.storage.sync.set({setMinimised: false});
				else chrome.storage.sync.set({setMinimised: true});
			} else chrome.storage.sync.set({setMinimised: true});
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
		// On Storage Change
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.allFeatures) {
				setAllFeatures(JSON.parse(changes.allFeatures.newValue));
			}
		});

		// On Storage Change
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.setMinimised) {
				if (changes.setMinimised.newValue === true) {
					document.querySelector('#navBar').firstChild.style.borderRadius = '8px';
					ChangeHeight(42);
				} else {
					if (!document.querySelector('#mainBody').classList.contains('hidden')) {
						ChangeHeight(BodyHeight(allFeatures));
						HideAllComponentExcept('mainBody');
					} else if (!document.querySelector('#toggleFeature').classList.contains('hidden')) {
						ChangeHeight(AllFeaturesHeight(allFeatures));
						HideAllComponentExcept('toggleFeature');
					} else if (!document.querySelector('#toggleSettings').classList.contains('hidden')) {
						ChangeHeight(SettingsHeight(allFeatures));
						HideAllComponentExcept('toggleSettings');
					}
				}
			}
		});

		// On Storage Change
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.disableActiveFeature) {
				if (changes.disableActiveFeature.newValue === true) {
					ActivateDeactivateFeature(allFeatures, null);
				}
			}
		});

		return (
			<header id='navBar' className='bg-navBar'>
				<div className='flex justify-between border border-borderDark box-border rounded-t-lg py-[8px] px-[18px]'>
					<h1 className='text-[13px] text-navText font-regular cursor-default select-none relative top-[2px]'>
						SuperDev Pro<img className='inline relative ml-[6px] mt-[-3px]' src='../icons/icon128.png' alt='logo' width='14'></img>
					</h1>
					<nav>
						<button className='text-navText text-right fa-regular fa-up-down-left-right text-[12.5px] p-1 relative bottom-[1px]'></button>
						<button className='text-navText text-right fa-regular fa-eye text-[13px] ml-[6px] p-1 relative bottom-[0.5px]' onClick={toggleFeature}></button>
						<button className='text-navText text-right fa-regular fa-circle-half-stroke text-xs ml-[6px] p-1 relative bottom-[1px]' onClick={darkMode}></button>
						<button className='text-navText text-right fa-regular fa-gear text-xs ml-[6px] p-1 relative bottom-[1px]' onClick={toggleSettings}></button>
						<button
							className='text-navText text-right fa-solid fa-down-left-and-up-right-to-center text-xs ml-[6px] p-1 relative bottom-[1px]'
							onClick={minimiseExtension}></button>
						<button className='text-navText text-right fa-regular fa-circle-stop text-xs ml-[6px] p-1 relative bottom-[1px]' onClick={pauseExtension}></button>
						<button
							className='text-navText text-right fa-solid fa-xmark text-[16px] ml-[6px] p-1 pr-0 relative bottom-[0px]'
							onClick={showHideExtension}></button>
					</nav>
				</div>
			</header>
		);
	}
}
