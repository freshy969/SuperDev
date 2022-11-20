import React from 'react';
import {useState, useEffect} from 'react';
import NavBar from './components/NavBar';
import MainBody from './components/MainBody';
import ToggleInfo from './components/ToggleInfo';
import ToggleSettings from './components/ToggleSettings';
import ColorPalette from './components/ColorPalette';
import PopupHeight from './components/functions/PopupHeight';

export default function Home() {
	const [isLoadingOne, setIsLoadingOne] = useState(true);
	const [isLoadingTwo, setIsLoadingTwo] = useState(true);
	const [isLoadingThree, setIsLoadingThree] = useState(true);
	const [isLoadingFour, setIsLoadingFour] = useState(true);

	const [allFeatures, setAllFeatures] = useState([]);
	const [activeTab, setActiveTab] = useState();
	const [portThree, setPortThree] = useState();
	const [allFeaturesRef, setAllFeaturesRef] = useState([]);

	useEffect(function () {
		// Dark Mode Initialisation
		chrome.storage.local.get(['colorTheme'], async function (result) {
			if (result['colorTheme'] === undefined) {
				if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
					document.documentElement.classList.add('dark');
					await chrome.storage.local.set({['colorTheme']: 'dark'});
					setIsLoadingOne(false);
				} else {
					document.documentElement.classList.add('dark');
					await chrome.storage.local.set({['colorTheme']: 'dark'});
					//await chrome.storage.local.set({['colorTheme']: 'light'});
					setIsLoadingOne(false);
				}
			} else if (result['colorTheme'] === 'dark') {
				document.documentElement.classList.add('dark');
				setIsLoadingOne(false);
			} else if (result['colorTheme'] === 'light') {
				setIsLoadingOne(false);
			}
		});

		// Set AllFeatures
		chrome.storage.local.get(['allFeatures'], function (result) {
			setAllFeatures(JSON.parse(result['allFeatures']));
			setIsLoadingTwo(false);
		});

		// OnUpdate AllFeatures
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes['allFeatures']) setAllFeatures(JSON.parse(changes['allFeatures']['newValue']));
		});

		// Set PortThree
		chrome.tabs.query({active: true, currentWindow: true}, async function (activeTab) {
			if (
				(activeTab[0].url.startsWith('http://') || activeTab[0].url.startsWith('https://')) &&
				!activeTab[0].url.includes('https://chrome.google.com/webstore')
			) {
				// Initialisation/Reset on First Load
				await chrome.storage.local.set({['setHomePageActive' + activeTab[0].id]: false}); // True, False
				await chrome.storage.local.set({['setActFeatDisabled' + activeTab[0].id]: false}); // True, False
				await chrome.storage.local.set({['setPopupMinimised' + activeTab[0].id]: false}); // True, False
				await chrome.storage.local.set({['setPopupMaximised' + activeTab[0].id]: false}); // True, False
				await chrome.storage.local.set({['whichFeatureActive' + activeTab[0].id]: null}); // String, Null
				await chrome.storage.local.set({['howLongPopupIs' + activeTab[0].id]: null}); // Number, Null

				// Initialising PortThree and ActiveTab
				let portThree = chrome.tabs.connect(activeTab[0].id, {name: 'portThree'});
				setActiveTab(activeTab);
				setPortThree(portThree);

				setIsLoadingThree(false);
			}
		});

		// Set Read Only All Features
		chrome.storage.local.get(['allFeaturesRef'], function (result) {
			setAllFeaturesRef(JSON.parse(result['allFeaturesRef']));
			setIsLoadingFour(false);
		});

		// Remove Old Data
		chrome.storage.local.get(null, function (result) {
			let allKeys = Object.keys(result);
			chrome.tabs.query({}, function (allTabs) {
				allTabs = allTabs.map(function (value, index) {
					return value.id;
				});

				allKeys = allKeys.map(function (value, index) {
					if (value.match(/(\d+)/)) return +value.split(/(\d+)/)[1];
					else return null;
				});

				allKeys = allKeys.filter(function (value, index) {
					return value !== null;
				});

				if (allKeys.length === 0) return false;
				allKeys = [...new Set(allKeys)];

				let oldState = allKeys.filter(function (value, index) {
					return allTabs.indexOf(value) === -1;
				});

				if (oldState.length === 0) return false;

				oldState.forEach(async function (value, index) {
					await chrome.storage.local.remove(['setHomePageActive' + value]);
					await chrome.storage.local.remove(['setActFeatDisabled' + value]);
					await chrome.storage.local.remove(['setPopupMinimised' + value]);
					await chrome.storage.local.remove(['setPopupMaximised' + value]);
					await chrome.storage.local.remove(['whichFeatureActive' + value]);
					await chrome.storage.local.remove(['howLongPopupIs' + value]);
				});
			});
		});
	}, []);

	if (!isLoadingOne && !isLoadingTwo && !isLoadingThree && !isLoadingFour) {
		// Height, Shadow, Visible
		portThree.postMessage({action: 'setFirstRender', height: PopupHeight(allFeatures), activeTab: activeTab});
		return (
			<>
				<NavBar allFeatures={allFeatures} activeTab={activeTab} portThree={portThree} allFeaturesRef={allFeaturesRef} />
				<MainBody allFeatures={allFeatures} activeTab={activeTab} portThree={portThree} allFeaturesRef={allFeaturesRef} />
				<ToggleInfo allFeatures={allFeatures} activeTab={activeTab} portThree={portThree} allFeaturesRef={allFeaturesRef} />
				<ToggleSettings allFeatures={allFeatures} activeTab={activeTab} portThree={portThree} allFeaturesRef={allFeaturesRef} />
				<ColorPalette allFeatures={allFeatures} activeTab={activeTab} portThree={portThree} allFeaturesRef={allFeaturesRef} />
			</>
		);
	}
}
