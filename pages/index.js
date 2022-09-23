import features from '../data/features';
import {useState, useEffect} from 'react';
import NavBar from '../components/NavBar';
import MainBody from '../components/MainBody';
import ToggleFeature from '../components/ToggleFeature';
import ToggleSettings from '../components/ToggleSettings';
import BodyHeight from '../components/functions/BodyHeight';
import ChangeHeight from '../components/functions/ChangeHeight';

export default function Home() {
	const [isLoadingOne, setIsLoadingOne] = useState(true);
	const [isLoadingTwo, setIsLoadingTwo] = useState(true);
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(() => {
		// SetMinimised, DisableActiveFeature, PageRuler Initialisation
		chrome.storage.sync.set({setMinimised: false}, function () {
			chrome.storage.sync.set({disableActiveFeature: false}, function () {
				chrome.storage.sync.set({whichFeatureActive: null}, function () {
					chrome.storage.sync.set({isManualEscape: true});
				});
			});
		});

		// Dark Mode Initialisation
		chrome.storage.sync.get(['colorTheme'], function (result) {
			if (result.colorTheme === undefined) {
				if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
					document.documentElement.classList.add('dark');
					chrome.storage.sync.set({colorTheme: 'dark'});
					setIsLoadingOne(false);
				} else {
					chrome.storage.sync.set({colorTheme: 'light'});
					setIsLoadingOne(false);
				}
			} else if (result.colorTheme === 'dark') {
				document.documentElement.classList.add('dark');
				setIsLoadingOne(false);
			} else {
				setIsLoadingOne(false);
			}
		});

		// All Features Initialisation
		chrome.storage.sync.get(['allFeatures'], function (result) {
			if (result.allFeatures === undefined) {
				chrome.storage.sync.set({allFeatures: JSON.stringify(features)}, function () {
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
				<ToggleFeature />
				<ToggleSettings />
			</>
		);
	}
}
