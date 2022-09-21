import {useState, useEffect} from 'react';
import HideAllComponentExcept from '/components/functions/HideAllComponentExcept';
import CalcHeightIsEnabled from '/components/functions/CalcHeightIsEnabled';
import CalcHeightAllFeatures from '/components/functions/CalcHeightAllFeatures';
import CalcHeightHasSettings from '/components/functions/CalcHeightHasSettings';
import ChangeHeight from '/components/functions/ChangeHeight';
import ActivateDeactivateFeature from '/components/functions/ActivateDeactivateFeature';

export default function NavBar() {
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(() => {
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
					ChangeHeight(42);
					document.querySelector('#navBar').firstChild.style.borderRadius = '8px';
				} else {
					chrome.storage.sync.get(['allFeatures'], function (result) {
						ChangeHeight(CalcHeightIsEnabled(JSON.parse(result.allFeatures)));
					});
					document.querySelector('#navBar').firstChild.style.borderRadius = '';
				}
			}
		});
	}, []);

	function toggleFeature() {
		if (document.querySelector('#toggleFeature').classList.contains('hidden')) {
			ChangeHeight(CalcHeightAllFeatures(allFeatures));
			ActivateDeactivateFeature(allFeatures, null);
			HideAllComponentExcept('toggleFeature');
		} else {
			ChangeHeight(CalcHeightIsEnabled(allFeatures));
			HideAllComponentExcept('mainBody');
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
			} else {
				if (document.documentElement.classList.contains('dark')) {
					document.documentElement.classList.remove('dark');
					chrome.storage.sync.set({colorTheme: 'light'});
				} else {
					document.documentElement.classList.add('dark');
					chrome.storage.sync.set({colorTheme: 'dark'});
				}
			}
		});
	}

	function toggleSettings() {
		if (document.querySelector('#toggleSettings').classList.contains('hidden')) {
			ChangeHeight(CalcHeightHasSettings(allFeatures));
			ActivateDeactivateFeature(allFeatures, null);
			HideAllComponentExcept('toggleSettings');
		} else {
			ChangeHeight(CalcHeightIsEnabled(allFeatures));
			HideAllComponentExcept('mainBody');
		}
	}

	function pauseExtension() {
		ActivateDeactivateFeature(allFeatures, null);
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
						SuperDev Pro<img className='inline relative ml-[6px] mt-[-3px]' src='../icons/icon128.png' alt='logo' width='14'></img>
					</h1>
					<nav>
						<button className='text-navText text-right fa-regular fa-up-down-left-right text-xs p-1 relative bottom-[2px]'></button>
						<button className='text-navText text-right fa-regular fa-eye text-xs ml-[6px] p-1 relative bottom-[2px]' onClick={toggleFeature}></button>
						<button className='text-navText text-right fa-regular fa-circle-half-stroke text-xs ml-[6px] p-1 relative bottom-[2px]' onClick={darkMode}></button>
						<button className='text-navText text-right fa-regular fa-gear text-xs ml-[6px] p-1 relative bottom-[2px]' onClick={toggleSettings}></button>
						<button className='text-navText text-right fa-regular fa-circle-pause text-xs ml-[6px] p-1 relative bottom-[2px]' onClick={pauseExtension}></button>
						<button
							className='text-navText text-right fa-regular fa-circle-minus text-xs ml-[6px] p-1 relative bottom-[2px]'
							onClick={minimiseExtension}></button>
						<button className='text-navText text-right fa-solid fa-xmark text-[16px] ml-[6px] p-1 relative bottom-[0.5px]' onClick={showHideExtension}></button>
					</nav>
				</div>
			</header>
		);
	}
}
