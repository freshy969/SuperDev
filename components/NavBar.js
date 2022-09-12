import HideAllExcept from '/components/functions/HidEAll';
import CalcHeightIsEnabled from '/components/functions/CalcHeightIsEnabled';
import CalcHeightAllFeatures from '/components/functions/CalcHeightAllFeatures';
import CalcHeightHasSettings from '/components/functions/CalcHeightHasSettings';
import ChangeHeight from '/components/functions/ChangeHeight';

export default function NavBar() {
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
		if (document.getElementById('toggleFeature').classList.contains('hidden')) {
			ChangeHeight(CalcHeightAllFeatures());
			HideAllExcept('toggleFeature');
		} else {
			ChangeHeight(CalcHeightIsEnabled());
			HideAllExcept('mainBody');
		}
	}

	function toggleSettings() {
		if (document.getElementById('toggleSettings').classList.contains('hidden')) {
			ChangeHeight(CalcHeightHasSettings());
			HideAllExcept('toggleSettings');
		} else {
			ChangeHeight(CalcHeightIsEnabled());
			HideAllExcept('mainBody');
		}
	}

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
