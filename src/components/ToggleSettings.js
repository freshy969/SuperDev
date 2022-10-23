import React from 'react';
import {useState, useEffect} from 'react';

export default function ToggleSettings() {
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(function () {
		chrome.storage.local.get(['allFeatures'], function (result) {
			setAllFeatures(JSON.parse(result.allFeatures));
			JSON.parse(result.allFeatures).map(function (value, index) {
				if (value.id === 'pageHighlight') {
					document.querySelector('#checkboxPageHighlight1').checked = value.settings.checkboxPageHighlight1;
					document.querySelector('#checkboxPageHighlight2').checked = value.settings.checkboxPageHighlight2;
					document.querySelector('#checkboxPageHighlight3').checked = value.settings.checkboxPageHighlight3;
					document.querySelector('#checkboxPageHighlight4').checked = value.settings.checkboxPageHighlight4;
					document.querySelector('#checkboxPageHighlight5').checked = value.settings.checkboxPageHighlight5;
					document.querySelector('#checkboxPageHighlight6').checked = value.settings.checkboxPageHighlight6;
					document.querySelector('#checkboxPageHighlight7').checked = value.settings.checkboxPageHighlight7;
				} else if (value.id === 'exportElement') {
					document.querySelector('#checkboxExportElement1').checked = value.settings.checkboxExportElement1;
					document.querySelector('#checkboxExportElement2').checked = value.settings.checkboxExportElement2;
					document.querySelector('#checkboxExportElement3').checked = value.settings.checkboxExportElement3;
				} else if (value.id === 'colorPicker') {
					document.querySelector('#checkboxColorPicker1').checked = value.settings.checkboxColorPicker1;
					document.querySelector('#checkboxColorPicker2').checked = value.settings.checkboxColorPicker2;
					document.querySelector('#checkboxColorPicker3').checked = value.settings.checkboxColorPicker3;
				} else if (value.id === 'clearCache') {
					document.querySelector('#checkboxClearCache1').checked = value.settings.checkboxClearCache1;
					document.querySelector('#checkboxClearCache2').checked = value.settings.checkboxClearCache2;
					document.querySelector('#checkboxClearCache3').checked = value.settings.checkboxClearCache3;
					document.querySelector('#checkboxClearCache4').checked = value.settings.checkboxClearCache4;
					document.querySelector('#checkboxClearCache5').checked = value.settings.checkboxClearCache5;
					document.querySelector('#checkboxClearCache6').checked = value.settings.checkboxClearCache6;
					document.querySelector('#checkboxClearCache7').checked = value.settings.checkboxClearCache7;
					document.querySelector('#checkboxClearCache8').checked = value.settings.checkboxClearCache8;
					document.querySelector('#checkboxClearCache9').checked = value.settings.checkboxClearCache9;
					document.querySelector('#checkboxClearCache10').checked = value.settings.checkboxClearCache10;
					document.querySelector('#checkboxClearCache11').checked = value.settings.checkboxClearCache11;
					document.querySelector('#checkboxClearCache12').checked = value.settings.checkboxClearCache12;
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
			case 'checkboxPageHighlight1':
				allFeatures.map(function (value, index) {
					if (value.id === 'pageHighlight') {
						if (document.querySelector('#checkboxPageHighlight1').checked === true) {
							value.settings.checkboxPageHighlight1 = true;
							value.settings.checkboxPageHighlight2 = false;
							value.settings.checkboxPageHighlight3 = false;
							value.settings.checkboxPageHighlight4 = false;
							value.settings.checkboxPageHighlight5 = false;
							document.querySelector('#checkboxPageHighlight1').checked = true;
							document.querySelector('#checkboxPageHighlight2').checked = false;
							document.querySelector('#checkboxPageHighlight3').checked = false;
							document.querySelector('#checkboxPageHighlight4').checked = false;
							document.querySelector('#checkboxPageHighlight5').checked = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxPageHighlight1 = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxPageHighlight2':
				allFeatures.map(function (value, index) {
					if (value.id === 'pageHighlight') {
						if (document.querySelector('#checkboxPageHighlight2').checked === true) {
							value.settings.checkboxPageHighlight1 = false;
							value.settings.checkboxPageHighlight2 = true;
							value.settings.checkboxPageHighlight3 = false;
							value.settings.checkboxPageHighlight4 = false;
							value.settings.checkboxPageHighlight5 = false;
							document.querySelector('#checkboxPageHighlight1').checked = false;
							document.querySelector('#checkboxPageHighlight2').checked = true;
							document.querySelector('#checkboxPageHighlight3').checked = false;
							document.querySelector('#checkboxPageHighlight4').checked = false;
							document.querySelector('#checkboxPageHighlight5').checked = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxPageHighlight2 = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxPageHighlight3':
				allFeatures.map(function (value, index) {
					if (value.id === 'pageHighlight') {
						if (document.querySelector('#checkboxPageHighlight3').checked === true) {
							value.settings.checkboxPageHighlight1 = false;
							value.settings.checkboxPageHighlight2 = false;
							value.settings.checkboxPageHighlight3 = true;
							value.settings.checkboxPageHighlight4 = false;
							value.settings.checkboxPageHighlight5 = false;
							document.querySelector('#checkboxPageHighlight1').checked = false;
							document.querySelector('#checkboxPageHighlight2').checked = false;
							document.querySelector('#checkboxPageHighlight3').checked = true;
							document.querySelector('#checkboxPageHighlight4').checked = false;
							document.querySelector('#checkboxPageHighlight5').checked = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxPageHighlight3 = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxPageHighlight4':
				allFeatures.map(function (value, index) {
					if (value.id === 'pageHighlight') {
						if (document.querySelector('#checkboxPageHighlight4').checked === true) {
							value.settings.checkboxPageHighlight1 = false;
							value.settings.checkboxPageHighlight2 = false;
							value.settings.checkboxPageHighlight3 = false;
							value.settings.checkboxPageHighlight4 = true;
							value.settings.checkboxPageHighlight5 = false;
							document.querySelector('#checkboxPageHighlight1').checked = false;
							document.querySelector('#checkboxPageHighlight2').checked = false;
							document.querySelector('#checkboxPageHighlight3').checked = false;
							document.querySelector('#checkboxPageHighlight4').checked = true;
							document.querySelector('#checkboxPageHighlight5').checked = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxPageHighlight4 = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxPageHighlight5':
				allFeatures.map(function (value, index) {
					if (value.id === 'pageHighlight') {
						if (document.querySelector('#checkboxPageHighlight5').checked === true) {
							value.settings.checkboxPageHighlight1 = false;
							value.settings.checkboxPageHighlight2 = false;
							value.settings.checkboxPageHighlight3 = false;
							value.settings.checkboxPageHighlight4 = false;
							value.settings.checkboxPageHighlight5 = true;
							document.querySelector('#checkboxPageHighlight1').checked = false;
							document.querySelector('#checkboxPageHighlight2').checked = false;
							document.querySelector('#checkboxPageHighlight3').checked = false;
							document.querySelector('#checkboxPageHighlight4').checked = false;
							document.querySelector('#checkboxPageHighlight5').checked = true;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxPageHighlight5 = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxPageHighlight6':
				allFeatures.map(function (value, index) {
					if (value.id === 'pageHighlight') {
						if (document.querySelector('#checkboxPageHighlight6').checked === true) {
							value.settings.checkboxPageHighlight6 = true;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxPageHighlight6 = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxPageHighlight7':
				allFeatures.map(function (value, index) {
					if (value.id === 'pageHighlight') {
						if (document.querySelector('#checkboxPageHighlight7').checked === true) {
							setTimeout(function () {
								value.settings.checkboxPageHighlight1 = true;
								value.settings.checkboxPageHighlight2 = false;
								value.settings.checkboxPageHighlight3 = false;
								value.settings.checkboxPageHighlight4 = false;
								value.settings.checkboxPageHighlight5 = false;
								value.settings.checkboxPageHighlight6 = false;
								value.settings.checkboxPageHighlight7 = false;
								document.querySelector('#checkboxPageHighlight1').checked = true;
								document.querySelector('#checkboxPageHighlight2').checked = false;
								document.querySelector('#checkboxPageHighlight3').checked = false;
								document.querySelector('#checkboxPageHighlight4').checked = false;
								document.querySelector('#checkboxPageHighlight5').checked = false;
								document.querySelector('#checkboxPageHighlight6').checked = false;
								document.querySelector('#checkboxPageHighlight7').checked = false;
								chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
							}, 300);
						}
					}
				});
				break;
		}
	}

	function ExportElementSettings(checkbox) {
		switch (checkbox) {
			case 'checkboxExportElement1':
				allFeatures.map(function (value, index) {
					if (value.id === 'exportElement') {
						if (document.querySelector('#checkboxExportElement1').checked === true) {
							value.settings.checkboxExportElement1 = true;
							value.settings.checkboxExportElement2 = false;
							document.querySelector('#checkboxExportElement1').checked = true;
							document.querySelector('#checkboxExportElement2').checked = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxExportElement1 = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxExportElement2':
				allFeatures.map(function (value, index) {
					if (value.id === 'exportElement') {
						if (document.querySelector('#checkboxExportElement2').checked === true) {
							value.settings.checkboxExportElement1 = false;
							value.settings.checkboxExportElement2 = true;
							document.querySelector('#checkboxExportElement1').checked = false;
							document.querySelector('#checkboxExportElement2').checked = true;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxExportElement2 = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxExportElement3':
				allFeatures.map(function (value, index) {
					if (value.id === 'exportElement') {
						if (document.querySelector('#checkboxExportElement3').checked === true) {
							setTimeout(function () {
								value.settings.checkboxExportElement1 = true;
								value.settings.checkboxExportElement2 = false;
								value.settings.checkboxExportElement3 = false;
								document.querySelector('#checkboxExportElement1').checked = true;
								document.querySelector('#checkboxExportElement2').checked = false;
								document.querySelector('#checkboxExportElement3').checked = false;
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
			case 'checkboxColorPicker1':
				allFeatures.map(function (value, index) {
					if (value.id === 'colorPicker') {
						if (document.querySelector('#checkboxColorPicker1').checked === true) {
							value.settings.checkboxColorPicker1 = true;
							value.settings.checkboxColorPicker2 = false;
							document.querySelector('#checkboxColorPicker1').checked = true;
							document.querySelector('#checkboxColorPicker2').checked = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxColorPicker1 = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxColorPicker2':
				allFeatures.map(function (value, index) {
					if (value.id === 'colorPicker') {
						if (document.querySelector('#checkboxColorPicker2').checked === true) {
							value.settings.checkboxColorPicker1 = false;
							value.settings.checkboxColorPicker2 = true;
							document.querySelector('#checkboxColorPicker1').checked = false;
							document.querySelector('#checkboxColorPicker2').checked = true;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxColorPicker2 = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxColorPicker3':
				allFeatures.map(function (value, index) {
					if (value.id === 'colorPicker') {
						if (document.querySelector('#checkboxColorPicker3').checked === true) {
							setTimeout(function () {
								value.settings.checkboxColorPicker1 = true;
								value.settings.checkboxColorPicker2 = false;
								value.settings.checkboxColorPicker3 = false;
								document.querySelector('#checkboxColorPicker1').checked = true;
								document.querySelector('#checkboxColorPicker2').checked = false;
								document.querySelector('#checkboxColorPicker3').checked = false;
								chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
							}, 300);
						}
					}
				});
				break;
		}
	}

	function ClearCacheSettings(checkbox) {
		switch (checkbox) {
			case 'checkboxClearCache1':
				allFeatures.map(function (value, index) {
					if (value.id === 'clearCache') {
						if (document.querySelector('#checkboxClearCache1').checked === true) {
							value.settings.checkboxClearCache1 = true;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxClearCache1 = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxClearCache2':
				allFeatures.map(function (value, index) {
					if (value.id === 'clearCache') {
						if (document.querySelector('#checkboxClearCache2').checked === true) {
							value.settings.checkboxClearCache2 = true;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxClearCache2 = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxClearCache3':
				allFeatures.map(function (value, index) {
					if (value.id === 'clearCache') {
						if (document.querySelector('#checkboxClearCache3').checked === true) {
							value.settings.checkboxClearCache3 = true;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxClearCache3 = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxClearCache4':
				allFeatures.map(function (value, index) {
					if (value.id === 'clearCache') {
						if (document.querySelector('#checkboxClearCache4').checked === true) {
							value.settings.checkboxClearCache4 = true;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxClearCache4 = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxClearCache5':
				allFeatures.map(function (value, index) {
					if (value.id === 'clearCache') {
						if (document.querySelector('#checkboxClearCache5').checked === true) {
							value.settings.checkboxClearCache5 = true;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxClearCache5 = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxClearCache6':
				allFeatures.map(function (value, index) {
					if (value.id === 'clearCache') {
						if (document.querySelector('#checkboxClearCache6').checked === true) {
							value.settings.checkboxClearCache6 = true;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxClearCache6 = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxClearCache7':
				allFeatures.map(function (value, index) {
					if (value.id === 'clearCache') {
						if (document.querySelector('#checkboxClearCache7').checked === true) {
							value.settings.checkboxClearCache7 = true;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxClearCache7 = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxClearCache8':
				allFeatures.map(function (value, index) {
					if (value.id === 'clearCache') {
						if (document.querySelector('#checkboxClearCache8').checked === true) {
							value.settings.checkboxClearCache8 = true;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxClearCache8 = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxClearCache9':
				allFeatures.map(function (value, index) {
					if (value.id === 'clearCache') {
						if (document.querySelector('#checkboxClearCache9').checked === true) {
							value.settings.checkboxClearCache9 = true;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxClearCache9 = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxClearCache10':
				allFeatures.map(function (value, index) {
					if (value.id === 'clearCache') {
						if (document.querySelector('#checkboxClearCache10').checked === true) {
							value.settings.checkboxClearCache10 = true;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxClearCache10 = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxClearCache11':
				allFeatures.map(function (value, index) {
					if (value.id === 'clearCache') {
						if (document.querySelector('#checkboxClearCache11').checked === true) {
							value.settings.checkboxClearCache11 = true;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxClearCache11 = false;
							chrome.storage.local.set({allFeatures: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxClearCache12':
				allFeatures.map(function (value, index) {
					if (value.id === 'clearCache') {
						if (document.querySelector('#checkboxClearCache12').checked === true) {
							setTimeout(function () {
								value.settings.checkboxClearCache1 = false;
								value.settings.checkboxClearCache2 = false;
								value.settings.checkboxClearCache3 = true;
								value.settings.checkboxClearCache4 = false;
								value.settings.checkboxClearCache5 = false;
								value.settings.checkboxClearCache6 = false;
								value.settings.checkboxClearCache7 = false;
								value.settings.checkboxClearCache8 = false;
								value.settings.checkboxClearCache9 = false;
								value.settings.checkboxClearCache10 = false;
								value.settings.checkboxClearCache11 = false;
								value.settings.checkboxClearCache12 = false;
								document.querySelector('#checkboxClearCache1').checked = false;
								document.querySelector('#checkboxClearCache2').checked = false;
								document.querySelector('#checkboxClearCache3').checked = true;
								document.querySelector('#checkboxClearCache4').checked = false;
								document.querySelector('#checkboxClearCache5').checked = false;
								document.querySelector('#checkboxClearCache6').checked = false;
								document.querySelector('#checkboxClearCache7').checked = false;
								document.querySelector('#checkboxClearCache8').checked = false;
								document.querySelector('#checkboxClearCache9').checked = false;
								document.querySelector('#checkboxClearCache10').checked = false;
								document.querySelector('#checkboxClearCache11').checked = false;
								document.querySelector('#checkboxClearCache12').checked = false;
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
						<div className='rounded-md text-left bg-settingsBG border border-borderTwo shadow-lg text-xs text-allText p-2 mb-3 font-normal'>
							<i className='fa-regular fa-border-all px-[5px] text-allText'></i>Page Highlight Settings
						</div>
						<div className='rounded-md border bg-settingsBG border-borderTwo shadow-lg p-3 mb-3'>
							{[
								'Highlight Semantic/Div Elements',
								'Highlight Block Level Elements',
								'Highlight Inline Level Elements',
								'Highlight Headings/Paragraphs',
								'Highlight All Page Elements',
								"Don't Add Border to Elements",
								'Reset Settings to Default',
							].map(function (value, index) {
								return (
									<div className={index + 1 === 1 ? '' : 'mt-2'} key={index + 1}>
										<input
											onClick={function () {
												PageHighlightSettings('checkboxPageHighlight' + (index + 1));
											}}
											className='rounded-sm float-left bg-white checked:bg-blue-600 form-check-input appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
											type='checkbox'
											id={'checkboxPageHighlight' + (index + 1)}
										/>
										<label className='inline-block text-xs text-allText font-normal cursor-pointer select-none' htmlFor={'checkboxPageHighlight' + (index + 1)}>
											{value}
										</label>
									</div>
								);
							})}
						</div>
					</div>

					<div>
						<div className='rounded-md text-left bg-settingsBG border border-borderTwo shadow-lg text-xs text-allText p-2 mb-3 font-normal'>
							<i className='fa-regular fa-border-all px-[5px] text-allText'></i>Export Element Settings
						</div>
						<div className='rounded-md border bg-settingsBG border-borderTwo shadow-lg p-3 mb-3'>
							{['Export Element to Codepen', 'Export Element to a File', 'Reset Settings to Default'].map(function (value, index) {
								return (
									<div className={index + 1 === 1 ? '' : 'mt-2'} key={index + 1}>
										<input
											onClick={function () {
												ExportElementSettings('checkboxExportElement' + (index + 1));
											}}
											className='rounded-sm float-left bg-white checked:bg-blue-600 form-check-input appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
											type='checkbox'
											id={'checkboxExportElement' + (index + 1)}
										/>
										<label className='inline-block text-xs text-allText font-normal cursor-pointer select-none' htmlFor={'checkboxExportElement' + (index + 1)}>
											{value}
										</label>
									</div>
								);
							})}
						</div>
					</div>

					<div>
						<div className='rounded-md text-left bg-settingsBG border border-borderTwo shadow-lg text-xs text-allText p-2 mb-3 font-normal'>
							<i className='fa-regular fa-border-all px-[5px] text-allText'></i>Color Picker Settings
						</div>
						<div className='rounded-md border bg-settingsBG border-borderTwo shadow-lg p-3 mb-3'>
							{['Copy Color Code in Hex', 'Copy Color Code in RGB', 'Reset Settings to Default'].map(function (value, index) {
								return (
									<div className={index + 1 === 1 ? '' : 'mt-2'} key={index + 1}>
										<input
											onClick={function () {
												ColorPickerSettings('checkboxColorPicker' + (index + 1));
											}}
											className='rounded-sm float-left bg-white checked:bg-blue-600 form-check-input appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
											type='checkbox'
											id={'checkboxColorPicker' + (index + 1)}
										/>
										<label className='inline-block text-xs text-allText font-normal cursor-pointer select-none' htmlFor={'checkboxColorPicker' + (index + 1)}>
											{value}
										</label>
									</div>
								);
							})}
						</div>
					</div>

					<div>
						<div className='rounded-md text-left bg-settingsBG border border-borderTwo shadow-lg text-xs text-allText p-2 mb-3 font-normal'>
							<i className='fa-regular fa-border-all px-[5px] text-allText'></i>Clear Cache Settings
						</div>
						<div className='rounded-md border bg-settingsBG border-borderTwo shadow-lg p-3'>
							{[
								'Reload After Clearing',
								'Clear App Cache',
								'Clear Cache',
								'Clear Cache Storage',
								'Clear Cookies',
								'Clear File Systems',
								'Clear Form Data',
								'Clear Indexed DB',
								'Clear Local Storage',
								'Clear Service Workers',
								'Clear Web SQL',
								'Reset Settings to Default',
							].map(function (value, index) {
								return (
									<div className={index + 1 === 1 ? '' : 'mt-2'} key={index + 1}>
										<input
											onClick={function () {
												ClearCacheSettings('checkboxClearCache' + (index + 1));
											}}
											className='rounded-sm float-left bg-white checked:bg-blue-600 form-check-input appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
											type='checkbox'
											id={'checkboxClearCache' + (index + 1)}
										/>
										<label className='inline-block text-xs text-allText font-normal cursor-pointer select-none' htmlFor={'checkboxClearCache' + (index + 1)}>
											{value}
										</label>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
