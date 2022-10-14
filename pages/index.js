import features from '../data/features';
import {useState, useEffect} from 'react';
import NavBar from '../components/NavBar';
import MainBody from '../components/MainBody';
import ToggleSettings from '../components/ToggleSettings';
import BodyHeight from '../components/functions/BodyHeight';
import ChangeHeight from '../components/functions/ChangeHeight';

export default function Home() {
	const [isLoadingOne, setIsLoadingOne] = useState(true);
	const [isLoadingTwo, setIsLoadingTwo] = useState(true);
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(() => {
		// Initialisation/Reset on First Load
		// SetMinimised, DisableActiveFeature, WhichFeatureActive
		chrome.storage.local.set({isPopupPaused: false});
		chrome.storage.local.set({isPopupHidden: false});
		chrome.storage.local.set({disableActiveFeature: false});
		chrome.storage.local.set({setMinimised: null});
		chrome.storage.local.set({whichFeatureActive: null});

		// Dark Mode Initialisation
		chrome.storage.local.get(['colorTheme'], function (result) {
			if (result.colorTheme === undefined) {
				if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
					document.documentElement.classList.add('dark');
					chrome.storage.local.set({colorTheme: 'dark'});
					console.log('Dark Mode Activated');
					setIsLoadingOne(false);
				} else {
					chrome.storage.local.set({colorTheme: 'light'});
					console.log('Light Mode Activated');
					setIsLoadingOne(false);
				}
			} else if (result.colorTheme === 'dark') {
				document.documentElement.classList.add('dark');
				console.log('Dark Mode Activated');
				setIsLoadingOne(false);
			} else if (result.colorTheme === 'light') {
				console.log('Light Mode Activated');
				setIsLoadingOne(false);
			}
		});

		// All Features Initialisation
		chrome.storage.local.get(['allFeatures'], function (result) {
			if (result.allFeatures === undefined) {
				chrome.storage.local.set({allFeatures: JSON.stringify(features)}, function () {
					setAllFeatures(features);
					setIsLoadingTwo(false);
				});
			} else {
				setAllFeatures(JSON.parse(result.allFeatures));
				setIsLoadingTwo(false);
			}
		});
	}, []);

	if (!isLoadingOne && !isLoadingTwo) {
		ChangeHeight(BodyHeight(allFeatures));
		return (
			<>
				<NavBar />
				<MainBody />
				<ToggleSettings />
			</>
		);
	}
}
