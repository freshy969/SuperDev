import features from '../data/features';
import {useState, useEffect} from 'react';
import NavBar from '../components/NavBar';
import MainBody from '../components/MainBody';
import ToggleFeature from '../components/ToggleFeature';
import ToggleSettings from '../components/ToggleSettings';

export default function Home() {
	let allFeatures = [];
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (localStorage.getItem('colorTheme') === 'dark' || (!('colorTheme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
			document.documentElement.classList.add('dark');
		else document.documentElement.classList.remove('dark');

		if (localStorage.getItem('allFeatures') === null) {
			localStorage.setItem('allFeatures', JSON.stringify(features));
			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Features Loaded to LocalStorage', 'IndexJs');
			setIsLoading(false);
		} else {
			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Features Loaded from LocalSotrage', 'IndexJs');
			setIsLoading(false);
		}
	}, []);

	function changeHeight() {
		allFeatures = JSON.parse(localStorage.getItem('allFeatures'));
		let [count, height] = [0, 0];
		allFeatures.map((value) => (value.isEnabled === true ? (count = count + 1) : (count = count)));
		height = count % 2 === 0 ? 41 + 18 + (count / 2) * 48 : 41 + 18 + ((count + 1) / 2) * 48;

		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {message: 'changeHeight', height: height}, function (response) {
				console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Received Regarding Change Height', response.farewell);
			});
		});
	}

	if (!isLoading) {
		changeHeight();
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
