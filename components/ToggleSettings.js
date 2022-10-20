import {useState, useEffect} from 'react';

export default function ToggleSettings() {
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(() => {
		chrome.storage.local.get(['allFeatures'], function (result) {
			setAllFeatures(JSON.parse(result.allFeatures));
		});
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.allFeatures) {
				setAllFeatures(JSON.parse(changes.allFeatures.newValue));
			}
		});
	}, []);

	function PageOutlineSettings(checkbox) {
		switch (checkbox) {
			case 'checkboxPageOutlineOne':
				console.log(checkbox);
				break;
			case 'checkboxPageOutlineTwo':
				console.log(checkbox);
				break;
			case 'checkboxPageOutlineThree':
				console.log(checkbox);
				break;
			case 'checkboxPageOutlineFour':
				console.log(checkbox);
				break;
			case 'checkboxPageOutlineFive':
				console.log(checkbox);
				break;
			case 'checkboxPageOutlineSix':
				console.log(checkbox);
				break;
		}
	}

	function ColorPickerSettings(checkbox) {
		switch (checkbox) {
			case 'checkboxColorPickerOne':
				console.log(checkbox);
				break;
			case 'checkboxColorPickerTwo':
				console.log(checkbox);
				break;
		}
	}

	if (allFeatures.length !== 0) {
		return (
			<section id='toggleSettings' className='hidden'>
				<div className='border border-t-0 border-borderOne box-border rounded-b-lg'>
					<div id='toggleSettingsChild' className='rounded-md p-4'>
						{allFeatures.map((value, index) => {
							if (value.id === 'pageOutline') {
								return (
									<div key={index}>
										<div className='rounded-md text-left bg-settingsBG border border-borderTwo shadow-lg text-xs text-btnText p-2 mb-3 font-normal'>
											<i className='fa-regular fa-border-all px-[5px] text-btnText'></i>Page Outline Settings
										</div>
										<div className='rounded-md border bg-settingsBG border-borderTwo shadow-lg p-3 mb-3'>
											<div>
												<input
													onClick={() => PageOutlineSettings('checkboxPageOutlineOne')}
													className='rounded-sm float-left bg-white checked:bg-blue-600 form-check-input appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
													type='checkbox'
													id='checkboxPageOutlineOne'
												/>
												<label className='inline-block text-xs text-btnText font-normal cursor-pointer' htmlFor='checkboxPageOutlineOne'>
													Outline Semantic/Div Elements
												</label>
											</div>
											<div className='mt-2'>
												<input
													onClick={() => PageOutlineSettings('checkboxPageOutlineTwo')}
													className='rounded-sm float-left bg-white checked:bg-blue-600 form-check-input appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
													type='checkbox'
													id='checkboxPageOutlineTwo'
												/>
												<label className='inline-block text-xs text-btnText font-normal cursor-pointer' htmlFor='checkboxPageOutlineTwo'>
													Outline Block Level Elements
												</label>
											</div>
											<div className='mt-2'>
												<input
													onClick={() => PageOutlineSettings('checkboxPageOutlineThree')}
													className='rounded-sm float-left bg-white checked:bg-blue-600 form-check-input appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
													type='checkbox'
													id='checkboxPageOutlineThree'
												/>
												<label className='inline-block text-xs text-btnText font-normal cursor-pointer' htmlFor='checkboxPageOutlineThree'>
													Outline Inline Level Elements
												</label>
											</div>
											<div className='mt-2'>
												<input
													onClick={() => PageOutlineSettings('checkboxPageOutlineFour')}
													className='rounded-sm float-left bg-white checked:bg-blue-600 form-check-input appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
													type='checkbox'
													id='checkboxPageOutlineFour'
												/>
												<label className='inline-block text-xs text-btnText font-normal cursor-pointer' htmlFor='checkboxPageOutlineFour'>
													Don&apos;t Add Background Color
												</label>
											</div>
											<div className='mt-2'>
												<input
													onClick={() => PageOutlineSettings('checkboxPageOutlineFive')}
													className='rounded-sm float-left bg-white checked:bg-blue-600 form-check-input appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
													type='checkbox'
													id='checkboxPageOutlineFive'
												/>
												<label className='inline-block text-xs text-btnText font-normal cursor-pointer' htmlFor='checkboxPageOutlineFive'>
													Use Outline Instead of Border
												</label>
											</div>
											<div className='mt-2'>
												<input
													onClick={() => PageOutlineSettings('checkboxPageOutlineSix')}
													className='rounded-sm float-left bg-white checked:bg-blue-600 form-check-input appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
													type='checkbox'
													id='checkboxPageOutlineSix'
												/>
												<label className='inline-block text-xs text-btnText font-normal cursor-pointer' htmlFor='checkboxPageOutlineSix'>
													Reset Settings to Default
												</label>
											</div>
										</div>
									</div>
								);
							} else if (value.id === 'colorPicker') {
								return (
									<div key={index}>
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
												<label className='inline-block text-xs text-btnText font-normal cursor-pointer' htmlFor='checkboxColorPickerOne'>
													Copy Color in RGB Instead of Hex
												</label>
											</div>
											<div className='mt-2'>
												<input
													onClick={() => ColorPickerSettings('checkboxColorPickerTwo')}
													className='rounded-sm float-left bg-white checked:bg-blue-600 form-check-input appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
													type='checkbox'
													id='checkboxColorPickerTwo'
												/>
												<label className='inline-block text-xs text-btnText font-normal cursor-pointer' htmlFor='checkboxColorPickerTwo'>
													Reset Settings to Default
												</label>
											</div>
										</div>
									</div>
								);
							}
						})}
					</div>
				</div>
			</section>
		);
	}
}
