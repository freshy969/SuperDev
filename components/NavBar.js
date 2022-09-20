import {useState, useEffect} from 'react';
import HideAllComponentExcept from '/components/functions/HideAllComponentExcept';
import CalcHeightIsEnabled from '/components/functions/CalcHeightIsEnabled';
import CalcHeightAllFeatures from '/components/functions/CalcHeightAllFeatures';
import CalcHeightHasSettings from '/components/functions/CalcHeightHasSettings';
import ChangeHeight from '/components/functions/ChangeHeight';

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

			//Hide All Active Buttons on isHidden True
			if (changes.isHidden) {
				if (changes.isHidden.newValue === true) {
					chrome.storage.sync.get(['allFeatures'], function (result) {
						JSON.parse(result.allFeatures).map((value, index) => {
							if (document.querySelector('#' + value.id) && document.querySelector('#' + value.id).classList.contains('active')) {
								document.querySelector('#' + value.id).classList.remove('from-pink-500', 'via-red-500', 'to-yellow-500', 'active');
								document.querySelector('#' + value.id).classList.add('from-btnOne', 'to-btnTwo');
								console.log('All Active Button Hidden');
							}
						});
					});
				}
			}
		});
	}, []);

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

	function showHideExtension() {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			let portFour = chrome.tabs.connect(tabs[0].id, {name: 'portFour'});
			portFour.postMessage({action: 'deactivateAll'});
			portFour.postMessage({action: 'showHideExtension'});
			portFour.onMessage.addListener(function (response) {
				console.log('Got Response : ', response.action);
			});
		});
	}

	function toggleFeature() {
		if (document.querySelector('#toggleFeature').classList.contains('hidden')) {
			ChangeHeight(CalcHeightAllFeatures(allFeatures));
			HideAllComponentExcept('toggleFeature');
		} else {
			ChangeHeight(CalcHeightIsEnabled(allFeatures));
			HideAllComponentExcept('mainBody');
		}
	}

	function toggleSettings() {
		if (document.querySelector('#toggleSettings').classList.contains('hidden')) {
			ChangeHeight(CalcHeightHasSettings(allFeatures));
			HideAllComponentExcept('toggleSettings');
		} else {
			ChangeHeight(CalcHeightIsEnabled(allFeatures));
			HideAllComponentExcept('mainBody');
		}
	}

	if (allFeatures.length !== 0) {
		return (
			<header id='navBar' className='bg-navBar'>
				<div className='flex justify-between border border-b-0 border-borderDark box-border rounded-t-lg py-[8px] px-[18px]'>
					<h1 className='text-[13px] text-navText font-regular cursor-default select-none relative top-[2.5px]'>
						SuperDev Pro<img className='inline relative ml-[6px] mt-[-3px]' src='../icons/icon128.png' alt='logo' width='14'></img>
					</h1>
					<nav>
						<button className='text-navText text-right fa-solid fa-grip-vertical text-[13px] p-1 relative top-[0.3px]'></button>
						<button className='text-navText text-right fa-regular fa-eye-slash text-xs ml-[10px] p-1' onClick={toggleFeature}></button>
						<button className='text-navText text-right fa-regular fa-circle-half-stroke text-xs ml-2 p-1' onClick={darkMode}></button>
						<button className='text-navText text-right fa-regular fa-gear text-xs ml-2 p-1' onClick={toggleSettings}></button>
						<button className='text-navText text-right fa-solid fa-xmark text-[16px] ml-2 p-1 relative top-[1.3px]' onClick={showHideExtension}></button>
					</nav>
				</div>
			</header>
		);
	}
}
