import features from '../data/features';
import {useState, useEffect} from 'react';

export default function Home() {
	let allFeatures = [];
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		// On Pageload or When Changing Themes.
		if (localStorage.getItem('colorTheme') === 'dark' || (!('colorTheme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		//Add All Features to LocalStorage
		if (localStorage.getItem('allFeatures') === null) {
			localStorage.setItem('allFeatures', JSON.stringify(features));
			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Features Loaded to LocalStorage, BodyJs', 'BodyJs');
			setIsLoading(false);
		} else {
			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Features Loaded from LocalSotrage', 'BodyJs');
			setIsLoading(false);
		}
	}, []);

	function darkMode() {
		// If Set Via LocalStorage Previously
		if (localStorage.getItem('colorTheme')) {
			if (localStorage.getItem('colorTheme') === 'light') {
				document.documentElement.classList.add('dark');
				localStorage.setItem('colorTheme', 'dark');
			} else {
				document.documentElement.classList.remove('dark');
				localStorage.setItem('colorTheme', 'light');
			}

			// If Not Set Via LocalStorage Previously
		} else {
			if (document.documentElement.classList.contains('dark')) {
				document.documentElement.classList.remove('dark');
				localStorage.setItem('colorTheme', 'light');
			} else {
				document.documentElement.classList.add('dark');
				localStorage.setItem('colorTheme', 'dark');
			}
		}
	}

	function removePopup() {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {message: 'removePopup'}, function (response) {
				console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavbarJs Received from ContentJS', response.farewell);
			});
		});
	}

	function hideFeature() {
		// Calculate Height Start
		let count = 0;
		let height = 0;
		allFeatures.map((value, index) => {
			if (value.isEnabled === true) count = count + 1;
		});
		if (count % 2 === 0) {
			height = 41 + 18 + (count / 2) * 48;
		} else {
			height = 41 + 18 + ((count + 1) / 2) * 48;
		}
		// Calculating Height End
		// Show/hide Main/Edit Popup and Features
		console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Hide/Show Icon Clicked, NavbarJs');
		if (document.getElementById('mainBody').classList.contains('hidden')) {
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {message: 'changeHeight', height: height}, function (response) {
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavbarJs Received from ContentJS', response.farewell);
					document.getElementById('mainBody').classList.remove('hidden');
					document.getElementById('hideFeature').classList.add('hidden');
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Showing Hidden Main Body, NavbarJs');
				});
			});
		} else {
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {message: 'changeHeight', height: 539}, function (response) {
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavbarJs Received from ContentJS', response.farewell);
					document.getElementById('mainBody').classList.add('hidden');
					document.getElementById('hideFeature').classList.remove('hidden');
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Hiding Existent Main Body, NavbarJs');
				});
			});
		}
	}

	function showSettings() {
		// Calculate Height Start
		let count = 0;
		let height = 0;
		allFeatures.map((value, index) => {
			if (value.hasSettings === true) count = count + 1;
		});
		if (count % 2 === 0) {
			height = 41 + 18 + (count / 2) * 48;
		} else {
			height = 41 + 18 + ((count + 1) / 2) * 48;
		}
		// Calculating Height End
		// Show/hide Main/Edit Popup and Features
		console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Hide/Show Icon Clicked, NavbarJs');
		if (document.getElementById('mainBody').classList.contains('hidden')) {
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {message: 'changeHeight', height: 539}, function (response) {
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavbarJs Received from ContentJS', response.farewell);
					document.getElementById('mainBody').classList.remove('hidden');
					document.getElementById('showSettings').classList.add('hidden');
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Showing Hidden Main Body, NavbarJs');
				});
			});
		} else {
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {message: 'changeHeight', height: height}, function (response) {
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavbarJs Received from ContentJS', response.farewell);
					document.getElementById('mainBody').classList.add('hidden');
					document.getElementById('showSettings').classList.remove('hidden');
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Hiding Existent Main Body, NavbarJs');
				});
			});
		}
	}

	function hideSingleFeature(featureId) {
		allFeatures.map((value, index) => {
			if (value.id === featureId) {
				if (value.isEnabled === false) {
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Found Disabled Feature', value.title);
					document.getElementsByClassName(featureId)[0].classList.remove('hidden');
					document.getElementsByClassName(featureId)[1].classList.replace(value.unhideIcon, value.hideIcon);
					value.isEnabled = true;
					localStorage.setItem('allFeatures', JSON.stringify(allFeatures));
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Feature Enabled on LocalStorage', value.title);
				} else {
					document.getElementsByClassName(featureId)[0].classList.add('hidden');
					document.getElementsByClassName(featureId)[1].classList.replace(value.hideIcon, value.unhideIcon);
					value.isEnabled = false;
					localStorage.setItem('allFeatures', JSON.stringify(allFeatures));
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Feature Disabled on LocalStorage', value.title);
				}
			}
		});
	}

	function singleSettingsPage(featureId) {
		// allFeatures.map((value, index) => {
		// 	if (value.id === featureId) {
		// 		if (value.isEnabled === false) {
		// 			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Found Disabled Feature', value.title);
		// 			document.getElementsByClassName(featureId)[0].classList.remove('hidden');
		// 			document.getElementsByClassName(featureId)[1].classList.replace(value.unhideIcon, value.hideIcon);
		// 			value.isEnabled = true;
		// 			localStorage.setItem('allFeatures', JSON.stringify(allFeatures));
		// 			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Feature Enabled on LocalStorage', value.title);
		// 		} else {
		// 			document.getElementsByClassName(featureId)[0].classList.add('hidden');
		// 			document.getElementsByClassName(featureId)[1].classList.replace(value.hideIcon, value.unhideIcon);
		// 			value.isEnabled = false;
		// 			localStorage.setItem('allFeatures', JSON.stringify(allFeatures));
		// 			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Feature Disabled on LocalStorage', value.title);
		// 		}
		// 	}
		// });
	}

	if (!isLoading) {
		// Set allFeatures as soon as useEffect finishes execution
		allFeatures = JSON.parse(localStorage.getItem('allFeatures'));
		// Height on First Load
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {message: 'changeHeight', height: document.getElementById('mainBody').offsetHeight + 41}, function (response) {
				console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'BodyJs Received from ContentJS', response.farewell);
			});
		});
		return (
			<>
				<header className='bg-gradient-to-r from-navOne to-navTwo'>
					<div className='flex justify-between border border-b-0 border-borderDark box-border rounded-t-lg py-[8px] px-[18px]'>
						<h1 className='text-[13px] text-navText font-regular cursor-default select-none relative top-[2.5px]'>
							SuperDev <i className='fa-regular fa-window px-[3px]'></i>
						</h1>
						<nav>
							<button className='text-navText text-right fa-solid fa-grip-vertical text-[13px] p-1 relative top-[0.3px]'></button>
							<button className='text-navText text-right fa-regular fa-eye-slash text-xs ml-[10px] p-1' onClick={hideFeature}></button>
							<button className='text-navText text-right fa-regular fa-circle-half-stroke text-xs ml-2 p-1' onClick={darkMode}></button>
							<button className='text-navText text-right fa-regular fa-gear text-xs ml-2 p-1' onClick={showSettings}></button>
							<button className='text-navText text-right fa-solid fa-xmark text-[16px] ml-2 p-1 relative top-[1.3px]' onClick={removePopup}></button>
						</nav>
					</div>
				</header>
				<div>
					<section id='mainBody'>
						<div className='grid grid-cols-2 gap-x-[14px] p-4 pb-0 border border-borderLight dark:border-borderDark box-border rounded-b-lg'>
							{allFeatures.map((value, index) => {
								if (value.isEnabled !== false) {
									return (
										<button
											key={index}
											id={value.id}
											className={
												value.id +
												' rounded-md text-left bg-gradient-to-r from-btnThree to-btnFour hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 shadow-lg text-xs text-bodyText p-2 mb-4 font-normal transition ease-in-out scaleButton duration-300'
											}>
											<i className={'fa-regular ' + value.icon + ' px-[5px] text-bodyText'}></i> {value.title}
										</button>
									);
								} else {
									return (
										<button
											key={index}
											id={value.id}
											className={
												value.id +
												' rounded-md text-left bg-gradient-to-r from-btnThree to-btnFour hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 shadow-lg text-xs text-bodyText p-2 mb-4 font-normal transition ease-in-out scaleButton duration-300 hidden'
											}>
											<i className={'fa-regular ' + value.icon + ' px-[5px] text-bodyText'}></i> {value.title}
										</button>
									);
								}
							})}
						</div>
					</section>
					<section id='hideFeature' className='hidden'>
						<div className='grid grid-cols-2 gap-x-[14px] p-4 pb-0 border border-borderLight dark:border-borderDark box-border rounded-b-lg'>
							{allFeatures.map((value, index) => {
								if (value.isEnabled !== false) {
									return (
										<button
											key={index}
											id={value.id}
											onClick={() => hideSingleFeature(value.id)}
											className='rounded-md text-left bg-gradient-to-r from-btnThree to-btnFour hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 shadow-lg text-xs text-bodyText p-2 mb-4 font-normal transition ease-in-out scaleButton duration-300'>
											<i className={value.id + ' fa-regular ' + value.hideIcon + ' pl-[5px] pr-[4px] text-bodyText text-[11px]'}></i> {value.title}
										</button>
									);
								} else {
									return (
										<button
											key={index}
											id={value.id}
											onClick={() => hideSingleFeature(value.id)}
											className='rounded-md text-left bg-gradient-to-r from-btnThree to-btnFour hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 shadow-lg text-xs text-bodyText p-2 mb-4 font-normal transition ease-in-out scaleButton duration-300'>
											<i className={value.id + ' fa-regular ' + value.unhideIcon + ' pl-[5px] pr-[4px] text-bodyText text-[11px]'}></i> {value.title}
										</button>
									);
								}
							})}
						</div>
					</section>
					<section id='showSettings' className='hidden'>
						<div className='grid grid-cols-2 gap-x-[14px] p-4 pb-0 border border-borderLight dark:border-borderDark box-border rounded-b-lg'>
							{allFeatures.map((value, index) => {
								if (value.hasSettings !== false) {
									return (
										<button
											key={index}
											id={value.id}
											onClick={() => singleSettingsPage(value.id)}
											className='rounded-md text-left bg-gradient-to-r from-btnThree to-btnFour hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 shadow-lg text-xs text-bodyText p-2 mb-4 font-normal transition ease-in-out scaleButton duration-300'>
											<i className={value.id + ' fa-regular ' + value.settingsIcon + ' pl-[5px] pr-[4px] text-bodyText text-xs'}></i> {value.title}
										</button>
									);
								}
							})}
						</div>
					</section>
				</div>
			</>
		);
	}
}
