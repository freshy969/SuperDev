import features from '../data/features';
import {useState, useEffect} from 'react';

export default function Home() {
	let allFeatures = [];
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		// Setting Dark/Light Mode On Pageload, Start
		// Depending Upon OS Preference or If Exists, User Preference
		// Sets Dark Mode By Adding .dark Class to <html>
		if (localStorage.getItem('colorTheme') === 'dark' || (!('colorTheme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
			document.documentElement.classList.add('dark');
		else document.documentElement.classList.remove('dark');
		// Setting Dark/Light Mode On Pageload, End

		//Adding All Features to LocalStorage If Nonexistent
		if (localStorage.getItem('allFeatures') === null) {
			localStorage.setItem('allFeatures', JSON.stringify(features));
			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Features Loaded to LocalStorage', 'IndexJs');
			setIsLoading(false);
		}
		//Adding All Features to LocalStorage If Existent
		else {
			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Features Loaded from LocalSotrage', 'IndexJs');
			setIsLoading(false);
		}
	}, []);

	function darkMode() {
		// Called On Navbar Dark/Light Mode Icon Click
		// If Set Via LocalStorage Previously
		// Enable/Disable Dark Mode By Adding/Removing .dark Class to <html>
		// Also Saves User's Preference on LocalStorage
		if (localStorage.getItem('colorTheme')) {
			if (localStorage.getItem('colorTheme') === 'light') {
				document.documentElement.classList.add('dark');
				localStorage.setItem('colorTheme', 'dark');
			} else {
				document.documentElement.classList.remove('dark');
				localStorage.setItem('colorTheme', 'light');
			}
		}

		// If Set Via OS Preference Previously
		// Enable/Disable Dark Mode By Adding/Removing .dark Class to <html>
		// Also Saves User's Preference on LocalStorage
		else {
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
		// Gets Called On Navbar Close Icon Click
		// Close Popup By Sending a Message to ContentJS (Continuously Listening)
		// ContentJs in Turn Closes Popup (It Has Access to Website's DOM and We Have Not)
		// NextJS' Has Only Access to the DOM of Its Own Pages/Components
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {message: 'removePopup'}, function (response) {
				console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Received Regarding Remove Popup', response.farewell);
			});
		});
	}

	function toggleFeature() {
		// Calculating Height Based on the Number of Features/Buttons With Available Settings
		// 41px = Navbar Height
		// 18px = Border(2px) + Body's Top Padding(16px)
		// 48px = Button Height(32px) + Margin Bottom (16px)
		let [count, height] = [0, 0];
		allFeatures.map((value) => (value.isEnabled === true ? (count = count + 1) : (count = count)));
		height = count % 2 === 0 ? 41 + 18 + (count / 2) * 48 : 41 + 18 + ((count + 1) / 2) * 48;
		// Calculating Height End

		// If #mainBody Section is Hidden => #toggleFeature Section is Visible
		if (document.getElementById('mainBody').classList.contains('hidden')) {
			// Send Message to ContentJS With Calculated Height
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				// On Successful Height Change By ContentJ
				chrome.tabs.sendMessage(tabs[0].id, {message: 'changeHeight', height: height}, function (response) {
					// Loggin
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Received Regarding Change Height', response.farewell);
					// Make #mainBody Section Visible
					document.getElementById('mainBody').classList.remove('hidden');
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Showing Main Body, IndexJs');

					// And Hide #toggleFeature Section
					document.getElementById('toggleFeature').classList.add('hidden');
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Hiding Feature Body, IndexJs');
				});
			});
		}

		// If #toggleFeature Section is Hidden => #mainBody Section is Visible
		else {
			// Send Message to ContentJS With Constant Height of #toggleFeature = 539px (498px + 41px)
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				// On Successful Height Change By ContentJ
				chrome.tabs.sendMessage(tabs[0].id, {message: 'changeHeight', height: 539}, function (response) {
					// Loggin
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Received Regarding Change Height', response.farewell);

					// Hide #toggleSettings Section (Edge Case)
					// Just In Case User Opens #toggleFeature Section Without Closing #toggleSettings Section
					document.getElementById('toggleSettings').classList.add('hidden');

					// Hide #mainBody Section
					document.getElementById('mainBody').classList.add('hidden');
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Hiding Main Body, IndexJs');
					// Make #toggleFeature Section Visible
					document.getElementById('toggleFeature').classList.remove('hidden');
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Showing Feature Body, IndexJs');
				});
			});
		}
	}

	function toggleSettings() {
		// Calculating Height Based on the Number of Features/Buttons With Available Settings
		let [count, height] = [0, 0];
		allFeatures.map((value) => (value.hasSettings === true ? (count = count + 1) : (count = count)));
		height = count % 2 === 0 ? 41 + 18 + (count / 2) * 48 : 41 + 18 + ((count + 1) / 2) * 48;
		// Calculating Height End

		// Calculating Height Based on the Number of Enabled Features/Buttons
		let [countt, heightt] = [0, 0];
		allFeatures.map((value) => (value.isEnabled === true ? (countt = countt + 1) : (countt = countt)));
		heightt = countt % 2 === 0 ? 41 + 18 + (countt / 2) * 48 : 41 + 18 + ((countt + 1) / 2) * 48;
		// Calculating Height End

		// If #mainBody Section is Hidden => #toggleSettings Section is Visible
		if (document.getElementById('mainBody').classList.contains('hidden')) {
			// Send Message to ContentJS With Calculated Height
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				// On Successful Height Change By ContentJ
				chrome.tabs.sendMessage(tabs[0].id, {message: 'changeHeight', height: heightt}, function (response) {
					// Loggin
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Received Regarding Change Height', response.farewell);
					// Make #mainBody Section Visible
					document.getElementById('mainBody').classList.remove('hidden');
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Showing Main Body, IndexJs');

					// Hide #toggleSettings Section
					document.getElementById('toggleSettings').classList.add('hidden');
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Hiding Settings Body, IndexJs');
				});
			});
		}
		// If #toggleFeature Section is Hidden => #mainBody Section is Visible
		else {
			// Send Message to ContentJS With Constant Height of #toggleFeature = 539px (498px + 41px)
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				// On Successful Height Change By ContentJ
				chrome.tabs.sendMessage(tabs[0].id, {message: 'changeHeight', height: height}, function (response) {
					// Loggin
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Received Regarding Change Height', response.farewell);

					// Hide #toggleFeature Section (Edge Case)
					// Just In Case User Opens #toggleSettings Section Without Closing #toggleFeature Section
					document.getElementById('toggleFeature').classList.add('hidden');

					// Hide #mainBody Section
					document.getElementById('mainBody').classList.add('hidden');
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Hiding Main Body, IndexJs');

					// Make #toggleSettings Section Visible
					document.getElementById('toggleSettings').classList.remove('hidden');
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Showing Settings Body, IndexJs');
				});
			});
		}
	}

	function toggleSingleFeature(featureId) {
		// Toggle (Enable/Disable) Single Feature Button On #toggleSettings Page
		// Called on #disableIcon and #enableIcon Click
		allFeatures.map((value, index) => {
			// Matching featureId
			if (value.id === featureId) {
				// Is Feature Not Enabled
				if (value.isEnabled === false) {
					// Enable Feature
					document.getElementsByClassName(featureId)[0].classList.remove('hidden');
					// And Replace Icon
					document.getElementsByClassName(featureId)[1].classList.replace(value.enableIcon, value.disableIcon);
					// Set Feature Enabled On LocalStorage
					value.isEnabled = true;
					localStorage.setItem('allFeatures', JSON.stringify(allFeatures));
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Feature Enabled on LocalStorage', value.title);
				}
				// Is Feature Enabled
				else {
					// Disable Feature
					document.getElementsByClassName(featureId)[0].classList.add('hidden');
					// And Replace Icon
					document.getElementsByClassName(featureId)[1].classList.replace(value.disableIcon, value.enableIcon);
					// Set Feature Disabled On LocalStorage
					value.isEnabled = false;
					localStorage.setItem('allFeatures', JSON.stringify(allFeatures));
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Feature Disabled on LocalStorage', value.title);
				}
			}
		});
	}

	function changeHeight() {
		// Set allFeatures as soon as useEffect finishes execution
		allFeatures = JSON.parse(localStorage.getItem('allFeatures'));
		// Height on First Load
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {message: 'changeHeight', height: document.getElementById('mainBody').offsetHeight + 41}, function (response) {
				console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Received Regarding Change Height', response.farewell);
			});
		});
	}

	function singleSettingsPage(featureId) {}

	function singleFeature(featureId) {
		// Working Logic of Each Feature
		// Called on Each Feature Button Click

		// If Text Editor Button Clicked
		// Sending a Message to ContentJS For Doing the Job
		// Why ContentJS? NextJS Doesn't Have Access to the Website's DOM
		if (featureId === 'textEditor') {
			// Deactivate Text Editor On Second Time Button Click
			if (document.getElementById(featureId).classList.contains('active')) {
				document.getElementById(featureId).classList.remove('from-pink-500', 'via-red-500', 'to-yellow-500', 'active');
				document.getElementById(featureId).classList.add('from-btnThree', 'to-btnFour');
				chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
					chrome.tabs.sendMessage(tabs[0].id, {message: featureId, action: 'deactivate'}, function (response) {
						console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Received Regarding Tech Editor', response.farewell);
					});
				});
			}
			// Activate Text Editor On First Time Button Click
			else {
				document.getElementById(featureId).classList.remove('from-btnThree', 'to-btnFour');
				document.getElementById(featureId).classList.add('from-pink-500', 'via-red-500', 'to-yellow-500', 'active');
				chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
					chrome.tabs.sendMessage(tabs[0].id, {message: featureId, action: 'activate'}, function (response) {
						console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Received Regarding Tech Editor', response.farewell);
					});
				});
			}
		}
	}

	if (!isLoading) {
		changeHeight();
		return (
			<>
				<header className='bg-gradient-to-r from-navOne to-navTwo'>
					<div className='flex justify-between border border-b-0 border-borderDark box-border rounded-t-lg py-[8px] px-[18px]'>
						<h1 className='text-[13px] text-navText font-regular cursor-default select-none relative top-[2.5px]'>
							SuperDev <i className='fa-regular fa-window px-[3px]'></i>
						</h1>
						<nav>
							<button className='text-navText text-right fa-solid fa-grip-vertical text-[13px] p-1 relative top-[0.3px]'></button>
							<button className='text-navText text-right fa-regular fa-eye-slash text-xs ml-[10px] p-1' onClick={toggleFeature}></button>
							<button className='text-navText text-right fa-regular fa-circle-half-stroke text-xs ml-2 p-1' onClick={darkMode}></button>
							<button className='text-navText text-right fa-regular fa-gear text-xs ml-2 p-1' onClick={toggleSettings}></button>
							<button className='text-navText text-right fa-solid fa-xmark text-[16px] ml-2 p-1 relative top-[1.3px]' onClick={removePopup}></button>
						</nav>
					</div>
				</header>
				<div>
					<section id='mainBody'>
						<div className='grid grid-cols-2 gap-x-[14px] p-4 pb-0 border border-borderLight dark:border-borderDark box-border rounded-b-lg'>
							{allFeatures.map((value, index) => {
								if (value.isEnabled === true) {
									return (
										<button
											key={index}
											id={value.id}
											onClick={() => singleFeature(value.id)}
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
					<section id='toggleFeature' className='hidden'>
						<div className='grid grid-cols-2 gap-x-[14px] p-4 pb-0 border border-borderLight dark:border-borderDark box-border rounded-b-lg'>
							{allFeatures.map((value, index) => {
								if (value.isEnabled === true) {
									return (
										<button
											key={index}
											id={value.id}
											onClick={() => toggleSingleFeature(value.id)}
											className='rounded-md text-left bg-gradient-to-r from-btnThree to-btnFour hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 shadow-lg text-xs text-bodyText p-2 mb-4 font-normal transition ease-in-out scaleButton duration-300'>
											<i className={value.id + ' fa-regular ' + value.disableIcon + ' pl-[5px] pr-[4px] text-bodyText text-[11px]'}></i> {value.title}
										</button>
									);
								} else {
									return (
										<button
											key={index}
											id={value.id}
											onClick={() => toggleSingleFeature(value.id)}
											className='rounded-md text-left bg-gradient-to-r from-btnThree to-btnFour hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 shadow-lg text-xs text-bodyText p-2 mb-4 font-normal transition ease-in-out scaleButton duration-300'>
											<i className={value.id + ' fa-regular ' + value.enableIcon + ' pl-[5px] pr-[4px] text-bodyText text-[11px]'}></i> {value.title}
										</button>
									);
								}
							})}
						</div>
					</section>
					<section id='toggleSettings' className='hidden'>
						<div className='grid grid-cols-2 gap-x-[14px] p-4 pb-0 border border-borderLight dark:border-borderDark box-border rounded-b-lg'>
							{allFeatures.map((value, index) => {
								if (value.hasSettings === true) {
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
