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

	useEffect(() => {
		if (localStorage.getItem('colorTheme') === 'dark' || (!('colorTheme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
			document.documentElement.classList.add('dark');
		else document.documentElement.classList.remove('dark');

		if (localStorage.getItem('allFeatures') === null) {
			localStorage.setItem('allFeatures', JSON.stringify(features));
			console.log('Features Loaded to LocalStorage');
			setIsLoading(false);
		} else {
			console.log('Features Loaded from LocalStorage');
			setIsLoading(false);
		}
	}, []);

	if (!isLoading) {
		ChangeHeight(CalcHeightIsEnabled());
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
