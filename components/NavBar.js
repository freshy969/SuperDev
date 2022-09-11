import {useState, useEffect} from 'react';

export default function NavBar() {
	let allFeatures = [];
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (localStorage.getItem('allFeatures') !== null) {
			setIsLoading(false);
		}
	}, []);

	function darkMode() {
		if (localStorage.getItem('colorTheme')) {
			if (localStorage.getItem('colorTheme') === 'light') {
				document.documentElement.classList.add('dark');
				localStorage.setItem('colorTheme', 'dark');
			} else {
				document.documentElement.classList.remove('dark');
				localStorage.setItem('colorTheme', 'light');
			}
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
				console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Received Regarding Remove Popup', response.farewell);
			});
		});
	}

	function toggleFeature() {
		allFeatures = JSON.parse(localStorage.getItem('allFeatures'));
		let [count, height] = [0, 0];
		allFeatures.map((value) => (value.isEnabled === true ? (count = count + 1) : (count = count)));
		height = count % 2 === 0 ? 41 + 18 + (count / 2) * 48 : 41 + 18 + ((count + 1) / 2) * 48;

		let [countt, heightt] = [0, 0];
		allFeatures.map((value, index) => (countt = countt + 1));
		heightt = countt % 2 === 0 ? 41 + 18 + (countt / 2) * 48 : 41 + 18 + ((countt + 1) / 2) * 48;

		if (document.getElementById('toggleFeature').classList.contains('hidden')) {
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {message: 'changeHeight', height: heightt}, function (response) {
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Received Regarding Change Height', response.farewell);
					document.getElementById('toggleSettings').classList.add('hidden');
					document.getElementById('mainBody').classList.add('hidden');
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Hiding Main Body, NavbarJS');
					document.getElementById('toggleFeature').classList.remove('hidden');
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Showing Feature Body, NavbarJS');
				});
			});
		} else {
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {message: 'changeHeight', height: height}, function (response) {
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Received Regarding Change Height', response.farewell);
					document.getElementById('mainBody').classList.remove('hidden');
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Showing Main Body, NavbarJS');
					document.getElementById('toggleFeature').classList.add('hidden');
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Hiding Feature Body, NavbarJS');
				});
			});
		}
	}

	function toggleSettings() {
		allFeatures = JSON.parse(localStorage.getItem('allFeatures'));
		let [count, height] = [0, 0];
		allFeatures.map((value) => (value.isEnabled === true ? (count = count + 1) : (count = count)));
		height = count % 2 === 0 ? 41 + 18 + (count / 2) * 48 : 41 + 18 + ((count + 1) / 2) * 48;

		let [countt, heightt] = [0, 0];
		allFeatures.map((value) => (value.hasSettings === true ? (countt = countt + 1) : (countt = countt)));
		heightt = countt % 2 === 0 ? 41 + 18 + (countt / 2) * 48 : 41 + 18 + ((countt + 1) / 2) * 48;

		if (document.getElementById('toggleSettings').classList.contains('hidden')) {
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {message: 'changeHeight', height: heightt}, function (response) {
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Received Regarding Change Height', response.farewell);
					document.getElementById('toggleFeature').classList.add('hidden');
					document.getElementById('mainBody').classList.add('hidden');
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Hiding Main Body, NavbarJS');
					document.getElementById('toggleSettings').classList.remove('hidden');
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Showing Settings Body, NavbarJS');
				});
			});
		} else {
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {message: 'changeHeight', height: height}, function (response) {
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Received Regarding Change Height', response.farewell);
					document.getElementById('mainBody').classList.remove('hidden');
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Showing Main Body, NavbarJS');
					document.getElementById('toggleSettings').classList.add('hidden');
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Hiding Settings Body, NavbarJS');
				});
			});
		}
	}

	if (!isLoading) {
		return (
			<header id='navBar' className='bg-navBar'>
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
		);
	}
}
