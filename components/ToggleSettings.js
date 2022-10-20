import {useState, useEffect} from 'react';

export default function ToggleSettings() {
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(() => {
		chrome.storage.local.get(['allFeatures'], function (result) {
			setAllFeatures(JSON.parse(result.allFeatures));
			JSON.parse(result.allFeatures).map((value, index) => {
				if (value.id === 'pageHighlight') {
					document.querySelector('#checkboxPageHighlightOne').checked = value.settings.checkboxPageHighlightOne;
					document.querySelector('#checkboxPageHighlightTwo').checked = value.settings.checkboxPageHighlightTwo;
					document.querySelector('#checkboxPageHighlightThree').checked = value.settings.checkboxPageHighlightThree;
					document.querySelector('#checkboxPageHighlightFour').checked = value.settings.checkboxPageHighlightFour;
					document.querySelector('#checkboxPageHighlightFive').checked = value.settings.checkboxPageHighlightFive;
					document.querySelector('#checkboxPageHighlightSix').checked = value.settings.checkboxPageHighlightSix;
					document.querySelector('#checkboxPageHighlightSeven').checked = value.settings.checkboxPageHighlightSeven;
				} else if (value.id === 'colorPicker') {
					document.querySelector('#checkboxColorPickerOne').checked = value.settings.checkboxColorPickerOne;
					document.querySelector('#checkboxColorPickerTwo').checked = value.settings.checkboxColorPickerTwo;
				}
			});
		});

		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.allFeatures) {
				setAllFeatures(JSON.parse(changes.allFeatures.newValue));
			}
		});
	}, []);

	function PageHighlightSettings(checkbox) {
		switch (checkbox) {
			case 'checkboxPageHighlightOne':
				allFeatures.map((value, index) => {
					if (value.id === 'pageHighlight') {
						if (document.querySelector('#checkboxPageHighlightOne').checked === true) {
							value.settings.checkboxPageHighlightOne = true;
							value.settings.checkboxPageHighlightTwo = false;
							value.settings.checkboxPageHighlightThree = false;
							value.settings.checkboxPageHighlightFour = false;
							value.settings.checkboxPageHighlightFive = false;
							document.querySelector('#checkboxPageHighlightOne').checked = true;
							document.querySelector('#checkboxPageHighlightTwo').checked = false;
							document.querySelector('#checkboxPageHighlightThree').checked = false;
							document.querySelector('#checkboxPageHighlightFour').checked = false;
							document.querySelector('#checkboxPageHighlightFive').checked = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxPageHighlightOne = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxPageHighlightTwo':
				allFeatures.map((value, index) => {
					if (value.id === 'pageHighlight') {
						if (document.querySelector('#checkboxPageHighlightTwo').checked === true) {
							value.settings.checkboxPageHighlightOne = false;
							value.settings.checkboxPageHighlightTwo = true;
							value.settings.checkboxPageHighlightThree = false;
							value.settings.checkboxPageHighlightFour = false;
							value.settings.checkboxPageHighlightFive = false;
							document.querySelector('#checkboxPageHighlightOne').checked = false;
							document.querySelector('#checkboxPageHighlightTwo').checked = true;
							document.querySelector('#checkboxPageHighlightThree').checked = false;
							document.querySelector('#checkboxPageHighlightFour').checked = false;
							document.querySelector('#checkboxPageHighlightFive').checked = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxPageHighlightTwo = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxPageHighlightThree':
				allFeatures.map((value, index) => {
					if (value.id === 'pageHighlight') {
						if (document.querySelector('#checkboxPageHighlightThree').checked === true) {
							value.settings.checkboxPageHighlightOne = false;
							value.settings.checkboxPageHighlightTwo = false;
							value.settings.checkboxPageHighlightThree = true;
							value.settings.checkboxPageHighlightFour = false;
							value.settings.checkboxPageHighlightFive = false;
							document.querySelector('#checkboxPageHighlightOne').checked = false;
							document.querySelector('#checkboxPageHighlightTwo').checked = false;
							document.querySelector('#checkboxPageHighlightThree').checked = true;
							document.querySelector('#checkboxPageHighlightFour').checked = false;
							document.querySelector('#checkboxPageHighlightFive').checked = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxPageHighlightThree = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxPageHighlightFour':
				allFeatures.map((value, index) => {
					if (value.id === 'pageHighlight') {
						if (document.querySelector('#checkboxPageHighlightFour').checked === true) {
							value.settings.checkboxPageHighlightOne = false;
							value.settings.checkboxPageHighlightTwo = false;
							value.settings.checkboxPageHighlightThree = false;
							value.settings.checkboxPageHighlightFour = true;
							value.settings.checkboxPageHighlightFive = false;
							document.querySelector('#checkboxPageHighlightOne').checked = false;
							document.querySelector('#checkboxPageHighlightTwo').checked = false;
							document.querySelector('#checkboxPageHighlightThree').checked = false;
							document.querySelector('#checkboxPageHighlightFour').checked = true;
							document.querySelector('#checkboxPageHighlightFive').checked = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxPageHighlightFour = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxPageHighlightFive':
				allFeatures.map((value, index) => {
					if (value.id === 'pageHighlight') {
						if (document.querySelector('#checkboxPageHighlightFive').checked === true) {
							value.settings.checkboxPageHighlightOne = false;
							value.settings.checkboxPageHighlightTwo = false;
							value.settings.checkboxPageHighlightThree = false;
							value.settings.checkboxPageHighlightFour = false;
							value.settings.checkboxPageHighlightFive = true;
							document.querySelector('#checkboxPageHighlightOne').checked = false;
							document.querySelector('#checkboxPageHighlightTwo').checked = false;
							document.querySelector('#checkboxPageHighlightThree').checked = false;
							document.querySelector('#checkboxPageHighlightFour').checked = false;
							document.querySelector('#checkboxPageHighlightFive').checked = true;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxPageHighlightFive = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxPageHighlightSix':
				allFeatures.map((value, index) => {
					if (value.id === 'pageHighlight') {
						if (document.querySelector('#checkboxPageHighlightSix').checked === true) {
							value.settings.checkboxPageHighlightSix = true;
							document.querySelector('#checkboxPageHighlightSix').checked = true;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxPageHighlightSix = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxPageHighlightSeven':
				allFeatures.map((value, index) => {
					if (value.id === 'pageHighlight') {
						if (document.querySelector('#checkboxPageHighlightSeven').checked === true) {
							setTimeout(() => {
								value.settings.checkboxPageHighlightOne = true;
								value.settings.checkboxPageHighlightTwo = false;
								value.settings.checkboxPageHighlightThree = false;
								value.settings.checkboxPageHighlightFour = false;
								value.settings.checkboxPageHighlightFive = false;
								value.settings.checkboxPageHighlightSix = false;
								value.settings.checkboxPageHighlightSeven = false;
								document.querySelector('#checkboxPageHighlightOne').checked = true;
								document.querySelector('#checkboxPageHighlightTwo').checked = false;
								document.querySelector('#checkboxPageHighlightThree').checked = false;
								document.querySelector('#checkboxPageHighlightFour').checked = false;
								document.querySelector('#checkboxPageHighlightFive').checked = false;
								document.querySelector('#checkboxPageHighlightSix').checked = false;
								document.querySelector('#checkboxPageHighlightSeven').checked = false;
								chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
							}, 300);
						}
					}
				});
				break;
		}
	}

	function ColorPickerSettings(checkbox) {
		switch (checkbox) {
			case 'checkboxColorPickerOne':
				allFeatures.map((value, index) => {
					if (value.id === 'colorPicker') {
						if (document.querySelector('#checkboxColorPickerOne').checked === true) {
							value.settings.checkboxColorPickerOne = true;
							value.settings.checkboxColorPickerTwo = false;
							document.querySelector('#checkboxColorPickerOne').checked = true;
							document.querySelector('#checkboxColorPickerTwo').checked = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxColorPickerOne = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxColorPickerTwo':
				allFeatures.map((value, index) => {
					if (value.id === 'colorPicker') {
						if (document.querySelector('#checkboxColorPickerTwo').checked === true) {
							setTimeout(() => {
								value.settings.checkboxColorPickerOne = false;
								value.settings.checkboxColorPickerTwo = false;
								document.querySelector('#checkboxColorPickerOne').checked = false;
								document.querySelector('#checkboxColorPickerTwo').checked = false;
								chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
							}, 300);
						}
					}
				});
				break;
		}
	}

	return (
		<section id='toggleSettings' className='hidden'>
			<div className='border border-t-0 border-borderOne box-border rounded-b-lg'>
				<div id='toggleSettingsChild' className='rounded-md p-4'>
					<div>
						<div className='rounded-md text-left bg-settingsBG border border-borderTwo shadow-lg text-xs text-btnText p-2 mb-3 font-normal'>
							<i className='fa-regular fa-border-all px-[5px] text-btnText'></i>Page Highlight Settings
						</div>
						<div className='rounded-md border bg-settingsBG border-borderTwo shadow-lg p-3 mb-3'>
							<div>
								<input
									onClick={() => PageHighlightSettings('checkboxPageHighlightOne')}
									className='rounded-sm float-left bg-white checked:bg-blue-600 form-check-input appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
									type='checkbox'
									id='checkboxPageHighlightOne'
								/>
								<label className='inline-block text-xs text-btnText font-normal cursor-pointer select-none' htmlFor='checkboxPageHighlightOne'>
									Highlight Semantic/Div Elements
								</label>
							</div>
							<div className='mt-2'>
								<input
									onClick={() => PageHighlightSettings('checkboxPageHighlightTwo')}
									className='rounded-sm float-left bg-white checked:bg-blue-600 form-check-input appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
									type='checkbox'
									id='checkboxPageHighlightTwo'
								/>
								<label className='inline-block text-xs text-btnText font-normal cursor-pointer select-none' htmlFor='checkboxPageHighlightTwo'>
									Highlight Block Level Elements
								</label>
							</div>
							<div className='mt-2'>
								<input
									onClick={() => PageHighlightSettings('checkboxPageHighlightThree')}
									className='rounded-sm float-left bg-white checked:bg-blue-600 form-check-input appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
									type='checkbox'
									id='checkboxPageHighlightThree'
								/>
								<label className='inline-block text-xs text-btnText font-normal cursor-pointer select-none' htmlFor='checkboxPageHighlightThree'>
									Highlight Inline Level Elements
								</label>
							</div>
							<div className='mt-2'>
								<input
									onClick={() => PageHighlightSettings('checkboxPageHighlightFour')}
									className='rounded-sm float-left bg-white checked:bg-blue-600 form-check-input appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
									type='checkbox'
									id='checkboxPageHighlightFour'
								/>
								<label className='inline-block text-xs text-btnText font-normal cursor-pointer select-none' htmlFor='checkboxPageHighlightFour'>
									Highlight Headings/Paragraphs
								</label>
							</div>
							<div className='mt-2'>
								<input
									onClick={() => PageHighlightSettings('checkboxPageHighlightFive')}
									className='rounded-sm float-left bg-white checked:bg-blue-600 form-check-input appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
									type='checkbox'
									id='checkboxPageHighlightFive'
								/>
								<label className='inline-block text-xs text-btnText font-normal cursor-pointer select-none' htmlFor='checkboxPageHighlightFive'>
									Highlight All Page Elements
								</label>
							</div>
							<div className='mt-2'>
								<input
									onClick={() => PageHighlightSettings('checkboxPageHighlightSix')}
									className='rounded-sm float-left bg-white checked:bg-blue-600 form-check-input appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
									type='checkbox'
									id='checkboxPageHighlightSix'
								/>
								<label className='inline-block text-xs text-btnText font-normal cursor-pointer select-none' htmlFor='checkboxPageHighlightSix'>
									Don&apos;t Add Border to Elements
								</label>
							</div>
							<div className='mt-2'>
								<input
									onClick={() => PageHighlightSettings('checkboxPageHighlightSeven')}
									className='rounded-sm float-left bg-white checked:bg-blue-600 form-check-input appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
									type='checkbox'
									id='checkboxPageHighlightSeven'
								/>
								<label className='inline-block text-xs text-btnText font-normal cursor-pointer select-none' htmlFor='checkboxPageHighlightSeven'>
									Reset Settings to Default
								</label>
							</div>
						</div>
					</div>

					<div>
						<div className='rounded-md text-left bg-settingsBG border border-borderTwo shadow-lg text-xs text-btnText p-2 mb-3 font-normal'>
							<i className='fa-regular fa-border-all px-[5px] text-btnText'></i>Color Picker Settings
						</div>
						<div className='rounded-md border bg-settingsBG border-borderTwo shadow-lg p-3'>
							<div>
								<input
									onClick={() => ColorPickerSettings('checkboxColorPickerOne')}
									className='rounded-sm float-left bg-white checked:bg-blue-600 form-check-input appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
									type='checkbox'
									id='checkboxColorPickerOne'
								/>
								<label className='inline-block text-xs text-btnText font-normal cursor-pointer select-none' htmlFor='checkboxColorPickerOne'>
									Copy Color Code in RGB
								</label>
							</div>
							<div className='mt-2'>
								<input
									onClick={() => ColorPickerSettings('checkboxColorPickerTwo')}
									className='rounded-sm float-left bg-white checked:bg-blue-600 form-check-input appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
									type='checkbox'
									id='checkboxColorPickerTwo'
								/>
								<label className='inline-block text-xs text-btnText font-normal cursor-pointer select-none' htmlFor='checkboxColorPickerTwo'>
									Reset Settings to Default
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
