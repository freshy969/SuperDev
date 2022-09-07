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
	return (
		<>
			<div className='flex justify-between bg-gradient-to-r from-navOne to-navTwo py-[12px] px-5'>
				<h1 className='text-[14px] text-navText font-regular cursor-default'>
					SuperDev Pro <i className='fa-regular fa-window px-[3px]'></i>
				</h1>
				<div>
					<button className='text-right fa-solid fa-grip-dots-vertical text-navText text-sm'></button>
					<button className='hidden text-right fa-regular fa-circle-half-stroke text-navText text-sm ml-[18px]' onClick={darkMode}></button>
					<button className='text-right fa-regular fa-gear text-navText text-sm ml-4'></button>
				</div>
			</div>
		</>
	);
}
