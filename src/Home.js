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
	const [tabId, setTabId] = useState();

	useEffect(function () {
		// Initialisation/Reset on First Load
		chrome.storage.local.set({isStopBtnPressed: false});
		chrome.storage.local.set({setHomePageActive: false});
		chrome.storage.local.set({setActFeatDisabled: false});
		chrome.storage.local.set({setMinimised: null});
		chrome.storage.local.set({whichFeatureActive: null});
		chrome.storage.local.set({howLongPopupIs: null});

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

		// Get AllFeatures
		chrome.storage.local.get(['allFeatures'], function (result) {
			setAllFeatures(JSON.parse(result.allFeatures));
			setIsLoadingTwo(false);
		});

		// OnUpdate AllFeatures
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.allFeatures) setAllFeatures(JSON.parse(changes.allFeatures.newValue));
		});

		// Set Port Three
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			setTabId(tabs[0].id);
			setIsLoadingThree(false);
		});
	}, []);

	if (!isLoadingOne && !isLoadingTwo && !isLoadingThree) {
		// Passing Props to Components
		let logConsole = process.env.REACT_APP_LOG_CONSOLE;
		let portThree = chrome.tabs.connect(tabId, {name: 'portThree'});
		ChangeHeight(portThree, PopupHeight(allFeatures));

		return (
			<>
				<NavBar logConsole={logConsole} portThree={portThree} />
				<MainBody logConsole={logConsole} portThree={portThree} />
				<ToggleInfo logConsole={logConsole} portThree={portThree} />
				<ToggleSettings logConsole={logConsole} portThree={portThree} />
				<ColorPalette logConsole={logConsole} portThree={portThree} />
			</>
		);
	}
}
