import React from 'react';
import {useState, useEffect} from 'react';
import NavBar from './components/NavBar';
import MainBody from './components/MainBody';
import ToggleInfo from './components/ToggleInfo';
import ToggleSettings from './components/ToggleSettings';
import ColorPicker from './components/ColorPicker';
import PopupHeight from './components/functions/PopupHeight';
import ChangeHeight from './components/functions/ChangeHeight';

export default function Home() {
	const [isLoadingOne, setIsLoadingOne] = useState(true);
	const [isLoadingTwo, setIsLoadingTwo] = useState(true);
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(function () {
		// Initialisation/Reset on First Load
		chrome.storage.local.set({isPopupPaused: false});
		chrome.storage.local.set({isPopupHidden: false});
		chrome.storage.local.set({setActiveFeatureDisabled: false});
		chrome.storage.local.set({setMinimised: null});
		chrome.storage.local.set({whichFeatureActive: null});

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
			if (changes.allFeatures) {
				setAllFeatures(JSON.parse(changes.allFeatures.newValue));
			}
		});
	}, []);

	if (!isLoadingOne && !isLoadingTwo) {
		ChangeHeight(PopupHeight(allFeatures));
		return (
			<>
				<NavBar />
				<MainBody />
				<ToggleInfo />
				<ToggleSettings />
				<ColorPicker />
			</>
		);
	}
}
