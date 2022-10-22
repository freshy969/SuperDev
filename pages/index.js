import features from '../data/features';
import {useState, useEffect} from 'react';
import NavBar from '../components/NavBar';
import MainBody from '../components/MainBody';
import ToggleSettings from '../components/ToggleSettings';
import PopupHeight from '../components/functions/PopupHeight';
import ChangeHeight from '../components/functions/ChangeHeight';

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(() => {
		// Initialisation/Reset on First Load
		// SetMinimised, DisableActiveFeature, WhichFeatureActive
		chrome.storage.local.set({isPopupPaused: false});
		chrome.storage.local.set({isPopupHidden: false});
		chrome.storage.local.set({setActiveFeatureDisabled: false});
		chrome.storage.local.set({setMinimised: null});
		chrome.storage.local.set({whichFeatureActive: null});

		// All Features Initialisation
		chrome.storage.local.get(['allFeatures'], function (result) {
			if (result.allFeatures === undefined) {
				chrome.storage.local.set({allFeatures: JSON.stringify(features)}, function () {
					setAllFeatures(features);
					setIsLoading(false);
				});
			} else {
				setAllFeatures(JSON.parse(result.allFeatures));
				setIsLoading(false);
			}
		});
	}, []);

	if (!isLoading) {
		ChangeHeight(PopupHeight(allFeatures));
		return (
			<>
				<NavBar />
				<MainBody />
				<ToggleSettings />
			</>
		);
	}
}
