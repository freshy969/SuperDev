import {useState, useEffect} from 'react';

export default function Navbar() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// On Pageload or When Changing Themes.
		if (localStorage.getItem('colorTheme') === 'dark' || (!('colorTheme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		setIsLoading(false);
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
		let enabledFeatures = JSON.parse(localStorage.getItem('enabledFeatures'));
		let count = 0;
		let height = 0;
		enabledFeatures.map((value, index) => {
			if (value.isEnabled === true) count = count + 1;
		});
		if (count % 2 === 0) {
			height = 40.5 + 18 + (count / 2) * 48;
		} else {
			height = 40.5 + 18 + ((count + 1) / 2) * 48;
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
				chrome.tabs.sendMessage(tabs[0].id, {message: 'changeHeight', height: 538.5}, function (response) {
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'NavbarJs Received from ContentJS', response.farewell);
					document.getElementById('mainBody').classList.add('hidden');
					document.getElementById('hideFeature').classList.remove('hidden');
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Hiding Existent Main Body, NavbarJs');
				});
			});
		}
	}

	if (!isLoading) {
		return (
			<>
				<div className='bg-gradient-to-r from-navOne to-navTwo'>
					<div className='flex justify-between border border-b-0 border-borderDark box-border rounded-t-lg py-[10px] px-[18px]'>
						<h1 className='text-[13px] text-navText font-regular cursor-default select-none'>
							SuperDev Pro <i className='fa-regular fa-window px-[3px]'></i>
						</h1>
						<div>
							<button className='text-right fa-solid fa-grip-vertical text-navText text-xs'></button>
							<button className='text-right fa-regular fa-eye-slash text-navText text-xs ml-[18px]' onClick={hideFeature}></button>
							<button className='text-right fa-regular fa-circle-half-stroke text-navText text-xs ml-4' onClick={darkMode}></button>
							<button className='text-right fa-regular fa-gear text-navText text-xs ml-4'></button>
							<button className='text-right fa-solid fa-xmark text-navText text-[15px] ml-4 relative top-[1px]' onClick={removePopup}></button>
						</div>
					</div>
				</div>
			</>
		);
	}
}
