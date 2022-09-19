import features from '../data/features';
import {useState, useEffect} from 'react';
import NavBar from '../components/NavBar';
import MainBody from '../components/MainBody';
import ToggleFeature from '../components/ToggleFeature';
import ToggleSettings from '../components/ToggleSettings';
import CalcHeightIsEnabled from '../components/functions/CalcHeightIsEnabled';
import ChangeHeight from '../components/functions/ChangeHeight';

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(() => {
		chrome.storage.sync.get(['colorTheme'], function (result) {
			if (result.colorTheme === 'dark' || (result.colorTheme === undefined && window.matchMedia('(prefers-color-scheme: dark)').matches))
				document.documentElement.classList.add('dark');
			else document.documentElement.classList.remove('dark');
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
	}, []);

	if (!isLoading) {
		ChangeHeight(CalcHeightIsEnabled(allFeatures));
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
