import React from 'react';
import {useState, useEffect} from 'react';
import HideAllCompExcept from './functions/HideAllCompExcept';
import PopupHeight from './functions/PopupHeight';
import ChangeHeight from './functions/ChangeHeight';
import JustChangeHeight from './functions/JustChangeHeight';
import ActDeactFeature from './functions/ActDeactFeature';

export default function NavBar({logConsole, portThree}) {
	const [isLoadingOne, setIsLoadingOne] = useState(true);
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(function () {
		// Get AllFeatures
		chrome.storage.local.get(['allFeatures'], function (result) {
			setAllFeatures(JSON.parse(result.allFeatures));
			if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UE - Set AllFeatures');
			setIsLoadingOne(false);
		});

		// OnUpdate AllFeatures
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.allFeatures) {
				setAllFeatures(JSON.parse(changes.allFeatures.newValue));
				if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UE, OU - Set AllFeatures');
			}
		});

		// OnUpdate SetMinimised
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.setMinimised) {
				if (changes.setMinimised.newValue === true) {
					if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UE, OU - If SetMinimised True, Minimise');
					document.querySelector('#navBar').firstChild.style.borderRadius = '8px';
					ChangeHeight(portThree, 40.5); // 40.5 = Header Height
				} else if (changes.setMinimised.newValue === false) {
					if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UE, OU, P1 - If SetMinimised False');
					chrome.storage.local.get(['allFeatures'], function (result) {
						if (!document.querySelector('#mainBody').classList.contains('hidden')) {
							if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UE, OU, P1C - ChangeHeight, HAE MainBody');
							ChangeHeight(portThree, PopupHeight(JSON.parse(result.allFeatures)));
							HideAllCompExcept('mainBody');
						} else if (!document.querySelector('#toggleInfo').classList.contains('hidden')) {
							if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UE, OU, P1C - ChangeHeight, HAE Info');
							ChangeHeight(portThree, PopupHeight(JSON.parse(result.allFeatures)));
							HideAllCompExcept('toggleInfo');
						} else if (!document.querySelector('#toggleSettings').classList.contains('hidden')) {
							if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UE, OU, P1C - ChangeHeight, HAE Settings');
							ChangeHeight(portThree, PopupHeight(JSON.parse(result.allFeatures)));
							HideAllCompExcept('toggleSettings');
						} else if (!document.querySelector('#colorPalettePage').classList.contains('hidden')) {
							if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UE, OU, P1C - ChangeHeight, HAE Palette');
							ChangeHeight(portThree, PopupHeight(JSON.parse(result.allFeatures)));
							HideAllCompExcept('colorPalettePage');
						}
					});
				}
			}
		});

		// OnUpdate setHomePageActive
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.setHomePageActive) {
				if (changes.setHomePageActive.newValue === true) {
					if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UE, OU, P2 - If SetHomeActive');
					if (document.querySelector('#mainBody').classList.contains('hidden')) {
						chrome.storage.local.get(['allFeatures'], function (result) {
							if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UE, OU, P2C - ChangeHeight, HAE MainBody');
							JustChangeHeight(portThree, PopupHeight(JSON.parse(result.allFeatures)));
							HideAllCompExcept('mainBody');
						});
					}
					chrome.storage.local.set({setHomePageActive: false});
				}
			}
		});

		// OnUpdate SetActFeatDisabled
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.setActFeatDisabled) {
				if (changes.setActFeatDisabled.newValue === true) {
					if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UE, OU, P3 - If SetActFeatDisable');
					chrome.storage.local.get(['allFeatures'], function (result) {
						chrome.storage.local.get(['whichFeatureActive'], function (outcome) {
							if (outcome.whichFeatureActive !== null) {
								if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), `NavJs, UE, OU, P3C, ADF - ${outcome.whichFeatureActive}`);
								ActDeactFeature(logConsole, portThree, JSON.parse(result.allFeatures), outcome.whichFeatureActive);
								chrome.storage.local.set({setActFeatDisabled: false});
							}
						});
					});
				}
			}
		});

		// OnUpdate WhichFeatureActive
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.whichFeatureActive) {
				if (changes.whichFeatureActive.newValue === 'clearAllCache') {
					if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UE, OU, WFA - ClearAllCache');
					if (document.querySelector('#clearAllCache')) {
						document.querySelector('#clearAllCache > i').classList.remove('fa-recycle');
						document.querySelector('#clearAllCache > i').classList.add('fa-badge-check');
						setTimeout(function () {
							document.querySelector('#clearAllCache > i').classList.remove('fa-badge-check');
							document.querySelector('#clearAllCache > i').classList.add('fa-recycle');
							chrome.storage.local.set({whichFeatureActive: null});
						}, 1000);
					}
				} else if (changes.whichFeatureActive.newValue === 'colorPalette') {
					if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UE, OU, P5, WFA - Palette');
					chrome.storage.local.get(['allFeatures'], function (result) {
						if (document.querySelector('#colorPalettePage')) {
							if (document.querySelector('#colorPalettePage').classList.contains('hidden')) {
								if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, UE, OU, P5C - ChangeHeight, HAE Palette');
								ChangeHeight(portThree, PopupHeight(JSON.parse(result.allFeatures)));
								HideAllCompExcept('colorPalettePage');

								let bodyHeight = PopupHeight(JSON.parse(result.allFeatures)) - 41.5;
								document.querySelector('#colorPalettePageChild').style.height = `${bodyHeight}px`;
							}
						}
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
					if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), `NavJs, TI, P6, If WFA, ADF - ${result.whichFeatureActive}`);
					ActDeactFeature(logConsole, portThree, allFeatures, result.whichFeatureActive);
				}
			});

			if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, TI, P6C - ChangeHeight, HAE ToggleInfo');
			ChangeHeight(portThree, PopupHeight(allFeatures));
			HideAllCompExcept('toggleInfo');

			let bodyHeight = PopupHeight(allFeatures) - 41.5;
			document.querySelector('#toggleInfoChild').style.height = `${bodyHeight}px`;

			chrome.storage.local.get(['howLongPopupIs'], function (result) {
				if (result.howLongPopupIs === 40.5) chrome.storage.local.set({setMinimised: false});
			});
		} else {
			if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, TI, P6C - ChangeHeight, HAE MainBody');
			ChangeHeight(portThree, PopupHeight(allFeatures));
			HideAllCompExcept('mainBody');
			chrome.storage.local.get(['howLongPopupIs'], function (result) {
				if (result.howLongPopupIs === 40.5) chrome.storage.local.set({setMinimised: false});
			});
		}
	}

	function toggleSettings() {
		if (document.querySelector('#toggleSettings').classList.contains('hidden')) {
			chrome.storage.local.get(['whichFeatureActive'], function (result) {
				if (result.whichFeatureActive !== null) {
					if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), `NavJs, TS, P7, If WFA, ADF - ${result.whichFeatureActive}`);
					ActDeactFeature(logConsole, portThree, allFeatures, result.whichFeatureActive);
				}
			});

			if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, TS, P7C - ChangeHeight, HAE ToggleSettings');
			ChangeHeight(portThree, PopupHeight(allFeatures));
			HideAllCompExcept('toggleSettings');

			let bodyHeight = PopupHeight(allFeatures) - 41.5;
			document.querySelector('#toggleSettingsChild').style.height = `${bodyHeight}px`;

			chrome.storage.local.get(['howLongPopupIs'], function (result) {
				if (result.howLongPopupIs === 40.5) chrome.storage.local.set({setMinimised: false});
			});
		} else {
			if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, TS, P7C - ChangeHeight, HAE MainBody');
			ChangeHeight(portThree, PopupHeight(allFeatures));
			HideAllCompExcept('mainBody');
			chrome.storage.local.get(['howLongPopupIs'], function (result) {
				if (result.howLongPopupIs === 40.5) chrome.storage.local.set({setMinimised: false});
			});
		}
	}

	function pauseExtension() {
		chrome.storage.local.get(['whichFeatureActive'], function (result) {
			if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), `NavJs, PE, If WFA, ADF - ${result.whichFeatureActive}`);
			if (result.whichFeatureActive !== null) ActDeactFeature(logConsole, portThree, allFeatures, result.whichFeatureActive);
		});
		chrome.storage.local.set({isStopBtnPressed: true});
	}

	function minimiseExtension() {
		chrome.storage.local.get(['howLongPopupIs'], function (result) {
			if (result.howLongPopupIs === 40.5) {
				if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, ME, If Minimised, SetMinimised False');
				chrome.storage.local.set({setMinimised: false});
			} else {
				if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, ME, If Maximised, SetMinimised True');
				chrome.storage.local.set({setMinimised: true});
			}
		});
	}

	function showHideExtension() {
		if (logConsole) console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavJs, SHE, Send MSG to CJS');
		portThree.postMessage({action: 'showHideExtension'});
	}

	if (!isLoadingOne) {
		return (
			<header id='navBar'>
				<div className='flex justify-between border border-borderOne dark:border-borderOneD box-border rounded-t-lg py-[8px] px-[18px]'>
					<h1 className='text-[13px] text-titleText dark:text-titleTextD font-medium cursor-default select-none relative top-[0.5px]'>
						SuperDev<img className='inline ml-[6px] relative bottom-[1.5px]' src='../icons/icon128.png' alt='logo' width='14'></img>
					</h1>
					<nav className='relative bottom-[0.5px]'>
						<button
							id='pauseExtensionButton'
							className='text-faText dark:text-faTextD text-right fa-solid fa-circle-stop text-xs ml-[6px] p-1 py-[5px] invisible'
							onClick={pauseExtension}></button>
						<button
							id='movePopupButton'
							className='text-faText dark:text-faTextD text-right fa-solid fa-up-down-left-right text-xs ml-[6px] p-1 py-[5px]'></button>
						<button
							id='toggleInfoButton'
							className='text-faText dark:text-faTextD text-right fa-solid fa-circle-info text-[12.5px] ml-[6px] p-1 py-[5px]'
							onClick={toggleInfo}></button>
						<button
							id='darkModeButton'
							className='text-faText dark:text-faTextD text-right fa-solid fa-circle-half-stroke text-[12.5px] ml-[6px] p-1 py-[5px]'
							onClick={darkMode}></button>
						<button
							id='toggleSettingsButton'
							className='text-faText dark:text-faTextD text-right fa-solid fa-gear text-[12.5px] ml-[6px] p-1 py-[5px]'
							onClick={toggleSettings}></button>
						<button
							id='minimiseExtensionButton'
							className='text-faText dark:text-faTextD text-right fa-solid fa-circle-minus text-[12.5px] ml-[6px] p-1 py-[5px]'
							onClick={minimiseExtension}></button>
						<button
							id='showHideExtensionButton'
							className='text-faText dark:text-faTextD text-right fa-solid fa-circle-xmark text-[12.5px] ml-[6px] p-1 py-[5px] pr-0'
							onClick={showHideExtension}></button>
					</nav>
				</div>
			</header>
		);
	}
}
