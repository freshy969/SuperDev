import React from 'react';
import {useState, useEffect} from 'react';
import NavBar from './components/NavBar';
import MainBody from './components/MainBody';
import ToggleInfo from './components/ToggleInfo';
import ToggleSettings from './components/ToggleSettings';
import ColorPalette from './components/ColorPalette';
import PopupHeight from './components/functions/PopupHeight';
import ChangeHeight from './components/functions/ChangeHeight';

export default function Home() {
	const [isLoadingOne, setIsLoadingOne] = useState(true);
	const [isLoadingTwo, setIsLoadingTwo] = useState(true);
	const [isLoadingThree, setIsLoadingThree] = useState(true);

	const [allFeatures, setAllFeatures] = useState([]);
	const [portThree, setPortThree] = useState();

	useEffect(function () {
		// Initialisation/Reset on First Load
		chrome.storage.local.set({isStopBtnPressed: false}); // True, False
		chrome.storage.local.set({setHomePageActive: false}); // True, False
		chrome.storage.local.set({setActFeatDisabled: false}); // True, False
		chrome.storage.local.set({setMinimised: null}); // True, False, Null
		chrome.storage.local.set({whichFeatureActive: null}); // String, Null
		chrome.storage.local.set({howLongPopupIs: null}); // Number, Null

		// Dark Mode Initialisation
		chrome.storage.local.get(['colorTheme'], function (result) {
			if (result.colorTheme === undefined) {
				if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
					document.documentElement.classList.add('dark');
					chrome.storage.local.set({colorTheme: 'dark'});
					setIsLoadingOne(false);
				} else {
					// Dark Theme as Default
					chrome.storage.local.set({colorTheme: 'dark'});
					document.documentElement.classList.add('dark');
					setIsLoadingOne(false);
				}
			} else if (result.colorTheme === 'dark') {
				document.documentElement.classList.add('dark');
				setIsLoadingOne(false);
			} else if (result.colorTheme === 'light') {
				setIsLoadingOne(false);
			}
		});

		// Set AllFeatures
		chrome.storage.local.get(['allFeatures'], function (result) {
			setAllFeatures(JSON.parse(result.allFeatures));
			setIsLoadingTwo(false);
		});

		// OnUpdate AllFeatures
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.allFeatures) setAllFeatures(JSON.parse(changes.allFeatures.newValue));
		});

		// Set PortThree
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			if (
				!tabs[0].url.includes('chrome://') &&
				!tabs[0].url.includes('chrome-extension://') &&
				!tabs[0].url.includes('file://') &&
				!tabs[0].url.includes('https://chrome.google.com/webstore')
			) {
				let portThree = chrome.tabs.connect(tabs[0].id, {name: 'portThree'});
				setPortThree(portThree);
				setIsLoadingThree(false);
			}
		});
	}, []);

	if (!isLoadingOne && !isLoadingTwo && !isLoadingThree) {
		ChangeHeight(portThree, PopupHeight(allFeatures));
		return (
			<>
				<NavBar allFeatures={allFeatures} portThree={portThree} />
				<MainBody allFeatures={allFeatures} portThree={portThree} />
				<ToggleInfo allFeatures={allFeatures} portThree={portThree} />
				<ToggleSettings allFeatures={allFeatures} portThree={portThree} />
				<ColorPalette allFeatures={allFeatures} portThree={portThree} />
			</>
		);
	}
}
