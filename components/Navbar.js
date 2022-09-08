import {useEffect} from 'react';

export default function Navbar() {
	useEffect(() => {
		// On Pageload or When Changing Themes.
		if (localStorage.getItem('colorTheme') === 'dark' || (!('colorTheme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
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
				console.log('Response Received from Content Script : ', response.farewell);
			});
		});
	}

	return (
		<>
			<div className='w-[340px] h-[40px] bg-gradient-to-r from-navOne to-navTwo'>
				<div className='flex justify-between border border-borderDark box-border rounded-t-lg py-[10px] px-[18px]'>
					<h1 className='text-[13px] text-navText font-regular cursor-default select-none'>
						SuperDev Pro <i className='fa-regular fa-window px-[3px]'></i>
					</h1>
					<div>
						<button className='text-right fa-solid fa-grip-vertical text-navText text-xs'></button>
						<button className='hidden text-right fa-regular fa-circle-half-stroke text-navText text-xs ml-[18px]' onClick={darkMode}></button>
						<button className='text-right fa-regular fa-gear text-navText text-xs ml-4'></button>
						<button className='text-right fa-solid fa-xmark-large text-navText text-[11px] ml-4' onClick={removePopup}></button>
					</div>
				</div>
			</div>
		</>
	);
}
