import React from 'react';
import features from './data/features';
import {useState, useEffect} from 'react';
import NavBar from './components/NavBar';
import MainBody from './components/MainBody';
import ToggleFeature from './components/ToggleFeature';
import ToggleSettings from './components/ToggleSettings';

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(() => {
		console.log(1);
		chrome.storage.sync.get(['colorTheme'], function (result) {
			if (result.colorTheme === 'dark' || (result.colorTheme === undefined && window.matchMedia('(prefers-color-scheme: dark)').matches))
				document.documentElement.classList.add('sd-dark');
			else document.documentElement.classList.remove('sd-dark');
		});

		chrome.storage.sync.get(['allFeatures'], function (result) {
			if (result.allFeatures === undefined) {
				chrome.storage.sync.set({allFeatures: JSON.stringify(features)}, function () {
					setAllFeatures(features);
					setIsLoading(false);
				});
			} else {
				setAllFeatures(JSON.parse(result.allFeatures));
				setIsLoading(false);
			}
		});

		// Set isMinimised, isHidden False on Page Reload
		chrome.storage.sync.set({isMinimised: false});
		chrome.storage.sync.set({isHidden: false});
	}, []);

	if (!isLoading) {
		return (
			<div className='sd-bg-bodyLight dark:sd-bg-bodyDark'>
				<NavBar />
				<MainBody />
				<ToggleFeature />
				<ToggleSettings />
			</div>
		);
	}
}
