import React from 'react';
import {useEffect} from 'react';

export default function ToggleSettings({allFeatures, activeTab, portThree, allFeaturesRef}) {
	useEffect(function () {
		// Set Visible Settings

		allFeatures.map(function (value, index) {
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
			} else if (value.id === 'colorPalette') {
				document.querySelector('#checkboxColorPalette1').checked = value.settings.checkboxColorPalette1;
				document.querySelector('#checkboxColorPalette2').checked = value.settings.checkboxColorPalette2;
				document.querySelector('#checkboxColorPalette3').checked = value.settings.checkboxColorPalette3;
			} else if (value.id === 'clearAllCache') {
				document.querySelector('#checkboxClearAllCache1').checked = value.settings.checkboxClearAllCache1;
				document.querySelector('#checkboxClearAllCache2').checked = value.settings.checkboxClearAllCache2;
				document.querySelector('#checkboxClearAllCache3').checked = value.settings.checkboxClearAllCache3;
				document.querySelector('#checkboxClearAllCache4').checked = value.settings.checkboxClearAllCache4;
				document.querySelector('#checkboxClearAllCache5').checked = value.settings.checkboxClearAllCache5;
				document.querySelector('#checkboxClearAllCache6').checked = value.settings.checkboxClearAllCache6;
			}
		});
	}, []);

	function colorPickerSettings(checkbox) {
		switch (checkbox) {
			case 'checkboxColorPicker1':
				allFeatures.map(async function (value, index) {
					if (value.id === 'colorPicker') {
						if (document.querySelector('#checkboxColorPicker1').checked === true) {
							value.settings.checkboxColorPicker1 = true;
							value.settings.checkboxColorPicker2 = false;
							document.querySelector('#checkboxColorPicker1').checked = true;
							document.querySelector('#checkboxColorPicker2').checked = false;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxColorPicker1 = false;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxColorPicker2':
				allFeatures.map(async function (value, index) {
					if (value.id === 'colorPicker') {
						if (document.querySelector('#checkboxColorPicker2').checked === true) {
							value.settings.checkboxColorPicker1 = false;
							value.settings.checkboxColorPicker2 = true;
							document.querySelector('#checkboxColorPicker1').checked = false;
							document.querySelector('#checkboxColorPicker2').checked = true;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxColorPicker2 = false;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxColorPicker3':
				allFeatures.map(function (valueOne, indexTwo) {
					allFeaturesRef.map(function (valueTwo, indexTwo) {
						if (valueOne.id === 'colorPicker' && valueTwo.id === 'colorPicker') {
							if (document.querySelector('#checkboxColorPicker3').checked === true) {
								setTimeout(async function () {
									valueOne.settings.checkboxColorPicker1 = valueTwo.settings.checkboxColorPicker1;
									valueOne.settings.checkboxColorPicker2 = valueTwo.settings.checkboxColorPicker2;
									valueOne.settings.checkboxColorPicker3 = valueTwo.settings.checkboxColorPicker3;
									document.querySelector('#checkboxColorPicker1').checked = valueTwo.settings.checkboxColorPicker1;
									document.querySelector('#checkboxColorPicker2').checked = valueTwo.settings.checkboxColorPicker2;
									document.querySelector('#checkboxColorPicker3').checked = valueTwo.settings.checkboxColorPicker3;
									await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
								}, 500);
							}
						}
					});
				});
				break;
		}
	}

	function colorPaletteSettings(checkbox) {
		switch (checkbox) {
			case 'checkboxColorPalette1':
				allFeatures.map(async function (value, index) {
					if (value.id === 'colorPalette') {
						if (document.querySelector('#checkboxColorPalette1').checked === true) {
							value.settings.checkboxColorPalette1 = true;
							value.settings.checkboxColorPalette2 = false;
							document.querySelector('#checkboxColorPalette1').checked = true;
							document.querySelector('#checkboxColorPalette2').checked = false;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxColorPalette1 = false;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxColorPalette2':
				allFeatures.map(async function (value, index) {
					if (value.id === 'colorPalette') {
						if (document.querySelector('#checkboxColorPalette2').checked === true) {
							value.settings.checkboxColorPalette1 = false;
							value.settings.checkboxColorPalette2 = true;
							document.querySelector('#checkboxColorPalette1').checked = false;
							document.querySelector('#checkboxColorPalette2').checked = true;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxColorPalette2 = false;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxColorPalette3':
				allFeatures.map(function (valueOne, indexTwo) {
					allFeaturesRef.map(function (valueTwo, indexTwo) {
						if (valueOne.id === 'colorPalette' && valueTwo.id === 'colorPalette') {
							if (document.querySelector('#checkboxColorPalette3').checked === true) {
								setTimeout(async function () {
									valueOne.settings.checkboxColorPalette1 = valueTwo.settings.checkboxColorPalette1;
									valueOne.settings.checkboxColorPalette2 = valueTwo.settings.checkboxColorPalette2;
									valueOne.settings.checkboxColorPalette3 = valueTwo.settings.checkboxColorPalette3;
									document.querySelector('#checkboxColorPalette1').checked = valueTwo.settings.checkboxColorPalette1;
									document.querySelector('#checkboxColorPalette2').checked = valueTwo.settings.checkboxColorPalette2;
									document.querySelector('#checkboxColorPalette3').checked = valueTwo.settings.checkboxColorPalette3;
									await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
								}, 500);
							}
						}
					});
				});
				break;
		}
	}

	function pageHighlightSettings(checkbox) {
		switch (checkbox) {
			case 'checkboxPageHighlight1':
				allFeatures.map(async function (value, index) {
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
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxPageHighlight1 = false;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxPageHighlight2':
				allFeatures.map(async function (value, index) {
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
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxPageHighlight2 = false;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxPageHighlight3':
				allFeatures.map(async function (value, index) {
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
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxPageHighlight3 = false;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxPageHighlight4':
				allFeatures.map(async function (value, index) {
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
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxPageHighlight4 = false;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxPageHighlight5':
				allFeatures.map(async function (value, index) {
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
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxPageHighlight5 = false;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxPageHighlight6':
				allFeatures.map(async function (value, index) {
					if (value.id === 'pageHighlight') {
						if (document.querySelector('#checkboxPageHighlight6').checked === true) {
							value.settings.checkboxPageHighlight6 = true;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxPageHighlight6 = false;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxPageHighlight7':
				allFeatures.map(function (valueOne, indexTwo) {
					allFeaturesRef.map(function (valueTwo, indexTwo) {
						if (valueOne.id === 'pageHighlight' && valueTwo.id === 'pageHighlight') {
							if (document.querySelector('#checkboxPageHighlight7').checked === true) {
								setTimeout(async function () {
									valueOne.settings.checkboxPageHighlight1 = valueTwo.settings.checkboxPageHighlight1;
									valueOne.settings.checkboxPageHighlight2 = valueTwo.settings.checkboxPageHighlight2;
									valueOne.settings.checkboxPageHighlight3 = valueTwo.settings.checkboxPageHighlight3;
									valueOne.settings.checkboxPageHighlight4 = valueTwo.settings.checkboxPageHighlight4;
									valueOne.settings.checkboxPageHighlight5 = valueTwo.settings.checkboxPageHighlight5;
									valueOne.settings.checkboxPageHighlight6 = valueTwo.settings.checkboxPageHighlight6;
									valueOne.settings.checkboxPageHighlight7 = valueTwo.settings.checkboxPageHighlight7;
									document.querySelector('#checkboxPageHighlight1').checked = valueTwo.settings.checkboxPageHighlight1;
									document.querySelector('#checkboxPageHighlight2').checked = valueTwo.settings.checkboxPageHighlight2;
									document.querySelector('#checkboxPageHighlight3').checked = valueTwo.settings.checkboxPageHighlight3;
									document.querySelector('#checkboxPageHighlight4').checked = valueTwo.settings.checkboxPageHighlight4;
									document.querySelector('#checkboxPageHighlight5').checked = valueTwo.settings.checkboxPageHighlight5;
									document.querySelector('#checkboxPageHighlight6').checked = valueTwo.settings.checkboxPageHighlight6;
									document.querySelector('#checkboxPageHighlight7').checked = valueTwo.settings.checkboxPageHighlight7;
									await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
								}, 500);
							}
						}
					});
				});
				break;
		}
	}

	function exportElementSettings(checkbox) {
		switch (checkbox) {
			case 'checkboxExportElement1':
				allFeatures.map(async function (value, index) {
					if (value.id === 'exportElement') {
						if (document.querySelector('#checkboxExportElement1').checked === true) {
							value.settings.checkboxExportElement1 = true;
							value.settings.checkboxExportElement2 = false;
							document.querySelector('#checkboxExportElement1').checked = true;
							document.querySelector('#checkboxExportElement2').checked = false;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxExportElement1 = false;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxExportElement2':
				allFeatures.map(async function (value, index) {
					if (value.id === 'exportElement') {
						if (document.querySelector('#checkboxExportElement2').checked === true) {
							value.settings.checkboxExportElement1 = false;
							value.settings.checkboxExportElement2 = true;
							document.querySelector('#checkboxExportElement1').checked = false;
							document.querySelector('#checkboxExportElement2').checked = true;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxExportElement2 = false;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxExportElement3':
				allFeatures.map(function (valueOne, indexTwo) {
					allFeaturesRef.map(function (valueTwo, indexTwo) {
						if (valueOne.id === 'exportElement' && valueTwo.id === 'exportElement') {
							if (document.querySelector('#checkboxExportElement3').checked === true) {
								setTimeout(async function () {
									valueOne.settings.checkboxExportElement1 = valueTwo.settings.checkboxExportElement1;
									valueOne.settings.checkboxExportElement2 = valueTwo.settings.checkboxExportElement2;
									valueOne.settings.checkboxExportElement3 = valueTwo.settings.checkboxExportElement3;
									document.querySelector('#checkboxExportElement1').checked = valueTwo.settings.checkboxExportElement1;
									document.querySelector('#checkboxExportElement2').checked = valueTwo.settings.checkboxExportElement2;
									document.querySelector('#checkboxExportElement3').checked = valueTwo.settings.checkboxExportElement3;
									await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
								}, 500);
							}
						}
					});
				});
				break;
		}
	}

	function clearAllCacheSettings(checkbox) {
		switch (checkbox) {
			case 'checkboxClearAllCache1':
				allFeatures.map(async function (value, index) {
					if (value.id === 'clearAllCache') {
						if (document.querySelector('#checkboxClearAllCache1').checked === true) {
							value.settings.checkboxClearAllCache1 = true;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxClearAllCache1 = false;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxClearAllCache2':
				allFeatures.map(async function (value, index) {
					if (value.id === 'clearAllCache') {
						if (document.querySelector('#checkboxClearAllCache2').checked === true) {
							value.settings.checkboxClearAllCache2 = true;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxClearAllCache2 = false;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxClearAllCache3':
				allFeatures.map(async function (value, index) {
					if (value.id === 'clearAllCache') {
						if (document.querySelector('#checkboxClearAllCache3').checked === true) {
							value.settings.checkboxClearAllCache3 = true;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxClearAllCache3 = false;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxClearAllCache4':
				allFeatures.map(async function (value, index) {
					if (value.id === 'clearAllCache') {
						if (document.querySelector('#checkboxClearAllCache4').checked === true) {
							value.settings.checkboxClearAllCache4 = true;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxClearAllCache4 = false;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxClearAllCache5':
				allFeatures.map(async function (value, index) {
					if (value.id === 'clearAllCache') {
						if (document.querySelector('#checkboxClearAllCache5').checked === true) {
							value.settings.checkboxClearAllCache5 = true;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						} else {
							value.settings.checkboxClearAllCache5 = false;
							await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
						}
					}
				});
				break;
			case 'checkboxClearAllCache6':
				allFeatures.map(function (valueOne, indexTwo) {
					allFeaturesRef.map(function (valueTwo, indexTwo) {
						if (valueOne.id === 'clearAllCache' && valueTwo.id === 'clearAllCache') {
							if (document.querySelector('#checkboxClearAllCache6').checked === true) {
								setTimeout(async function () {
									valueOne.settings.checkboxClearAllCache1 = valueTwo.settings.checkboxClearAllCache1;
									valueOne.settings.checkboxClearAllCache2 = valueTwo.settings.checkboxClearAllCache2;
									valueOne.settings.checkboxClearAllCache3 = valueTwo.settings.checkboxClearAllCache3;
									valueOne.settings.checkboxClearAllCache4 = valueTwo.settings.checkboxClearAllCache4;
									valueOne.settings.checkboxClearAllCache5 = valueTwo.settings.checkboxClearAllCache5;
									valueOne.settings.checkboxClearAllCache6 = valueTwo.settings.checkboxClearAllCache6;
									document.querySelector('#checkboxClearAllCache1').checked = valueTwo.settings.checkboxClearAllCache1;
									document.querySelector('#checkboxClearAllCache2').checked = valueTwo.settings.checkboxClearAllCache2;
									document.querySelector('#checkboxClearAllCache3').checked = valueTwo.settings.checkboxClearAllCache3;
									document.querySelector('#checkboxClearAllCache4').checked = valueTwo.settings.checkboxClearAllCache4;
									document.querySelector('#checkboxClearAllCache5').checked = valueTwo.settings.checkboxClearAllCache5;
									document.querySelector('#checkboxClearAllCache6').checked = valueTwo.settings.checkboxClearAllCache6;
									await chrome.storage.local.set({['allFeatures']: JSON.stringify(allFeatures)});
								}, 500);
							}
						}
					});
				});

				break;
		}
	}

	return (
		<section id='toggleSettings' className='hidden'>
			<div className='border border-t-0 border-borderOne dark:border-borderOneD box-border rounded-b-lg'>
				<div id='toggleSettingsChild' className='rounded-md p-4'>
					<div>
						<div className='rounded-md text-left bg-bgTwo dark:bg-bgTwoD border box-border border-borderTwo dark:border-borderTwoD shadow text-xs text-allText dark:text-allTextD p-2 mb-3 font-normal select-none'>
							<i className='fa-regular fa-eye-dropper px-[5px] text-allText dark:text-allTextD'></i>Color Picker Settings
						</div>
						<div className='rounded-md border bg-bgTwo dark:bg-bgTwoD border-borderTwo dark:border-borderTwoD shadow p-3 mb-3'>
							{['Copy Color Code in Hex', 'Copy Color Code in RGB', 'Reset Settings to Default'].map(function (value, index) {
								let checkboxId = 'checkboxColorPicker' + (index + 1);
								return (
									<div className={index + 1 === 1 ? '' : 'mt-2'} key={index + 1}>
										<input
											onClick={function () {
												colorPickerSettings(checkboxId);
											}}
											className='rounded-sm float-left bg-white checked:bg-blue-600 border checked:border-0 border-gray-300 checkBox appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
											type='checkbox'
											id={checkboxId}
										/>
										<label className='inline-block text-xs text-allText dark:text-allTextD font-normal cursor-pointer select-none' htmlFor={checkboxId}>
											{value}
										</label>
									</div>
								);
							})}
						</div>
					</div>

					<div>
						<div className='rounded-md text-left bg-bgTwo dark:bg-bgTwoD border box-border border-borderTwo dark:border-borderTwoD shadow text-xs text-allText dark:text-allTextD p-2 mb-3 font-normal select-none'>
							<i className='fa-regular fa-swatchbook px-[5px] text-allText dark:text-allTextD'></i>Color Palette Settings
						</div>
						<div className='rounded-md border bg-bgTwo dark:bg-bgTwoD border-borderTwo dark:border-borderTwoD shadow p-3 mb-3'>
							{['Copy Color Code in Hex', 'Copy Color Code in RGB', 'Reset Settings to Default'].map(function (value, index) {
								let checkboxId = 'checkboxColorPalette' + (index + 1);
								return (
									<div className={index + 1 === 1 ? '' : 'mt-2'} key={index + 1}>
										<input
											onClick={function () {
												colorPaletteSettings(checkboxId);
											}}
											className='rounded-sm float-left bg-white checked:bg-blue-600 border checked:border-0 border-gray-300 checkBox appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
											type='checkbox'
											id={checkboxId}
										/>
										<label className='inline-block text-xs text-allText dark:text-allTextD font-normal cursor-pointer select-none' htmlFor={checkboxId}>
											{value}
										</label>
									</div>
								);
							})}
						</div>
					</div>

					<div>
						<div className='rounded-md text-left bg-bgTwo dark:bg-bgTwoD border box-border border-borderTwo dark:border-borderTwoD shadow text-xs text-allText dark:text-allTextD p-2 mb-3 font-normal select-none'>
							<i className='fa-regular fa-paintbrush px-[5px] text-allText dark:text-allTextD'></i>Page Highlight Settings
						</div>
						<div className='rounded-md border bg-bgTwo dark:bg-bgTwoD border-borderTwo dark:border-borderTwoD shadow p-3 mb-3'>
							{[
								'Highlight All Page Elements',
								'Highlight Block Level Elements',
								'Highlight Inline Level Elements',
								'Highlight Semantic + Div Elements',
								'Highlight Headings + Paragraphs',
								"Don't Add Border to Elements",
								'Reset Settings to Default',
							].map(function (value, index) {
								let checkboxId = 'checkboxPageHighlight' + (index + 1);
								return (
									<div className={index + 1 === 1 ? '' : 'mt-2'} key={index + 1}>
										<input
											onClick={function () {
												pageHighlightSettings(checkboxId);
											}}
											className='rounded-sm float-left bg-white checked:bg-blue-600 border checked:border-0 border-gray-300 checkBox appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
											type='checkbox'
											id={checkboxId}
										/>
										<label className='inline-block text-xs text-allText dark:text-allTextD font-normal cursor-pointer select-none' htmlFor={checkboxId}>
											{value}
										</label>
									</div>
								);
							})}
						</div>
					</div>

					<div>
						<div className='rounded-md text-left bg-bgTwo dark:bg-bgTwoD border box-border border-borderTwo dark:border-borderTwoD shadow text-xs text-allText dark:text-allTextD p-2 mb-3 font-normal select-none'>
							<i className='fa-regular fa-up-right-from-square px-[5px] text-allText dark:text-allTextD'></i>Export Element Settings
						</div>
						<div className='rounded-md border bg-bgTwo dark:bg-bgTwoD border-borderTwo dark:border-borderTwoD shadow p-3 mb-3'>
							{['Export Element to Codepen', 'Export Element to a File', 'Reset Settings to Default'].map(function (value, index) {
								let checkboxId = 'checkboxExportElement' + (index + 1);
								return (
									<div className={index + 1 === 1 ? '' : 'mt-2'} key={index + 1}>
										<input
											onClick={function () {
												exportElementSettings(checkboxId);
											}}
											className='rounded-sm float-left bg-white checked:bg-blue-600 border checked:border-0 border-gray-300 checkBox appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
											type='checkbox'
											id={checkboxId}
										/>
										<label className='inline-block text-xs text-allText dark:text-allTextD font-normal cursor-pointer select-none' htmlFor={checkboxId}>
											{value}
										</label>
									</div>
								);
							})}
						</div>
					</div>

					<div>
						<div className='rounded-md text-left bg-bgTwo dark:bg-bgTwoD border box-border border-borderTwo dark:border-borderTwoD shadow text-xs text-allText dark:text-allTextD p-2 mb-3 font-normal select-none'>
							<i className='fa-regular fa-recycle px-[5px] text-allText dark:text-allTextD'></i>Clear All Cache Settings
						</div>
						<div className='rounded-md border bg-bgTwo dark:bg-bgTwoD border-borderTwo dark:border-borderTwoD shadow p-3'>
							{['Reload After Clearing', 'Clear Cache', 'Clear Cookies', 'Clear Form Data', 'Clear Local Storage', 'Reset Settings to Default'].map(function (
								value,
								index
							) {
								let checkboxId = 'checkboxClearAllCache' + (index + 1);
								return (
									<div className={index + 1 === 1 ? '' : 'mt-2'} key={index + 1}>
										<input
											onClick={function () {
												clearAllCacheSettings(checkboxId);
											}}
											className='rounded-sm float-left bg-white checked:bg-blue-600 border checked:border-0 border-gray-300 checkBox appearance-none h-3 w-3 mt-[3px] align-top mr-2 bg-no-repeat focus:outline-none bg-center bg-contain cursor-pointer transition duration-300'
											type='checkbox'
											id={checkboxId}
										/>
										<label className='inline-block text-xs text-allText dark:text-allTextD font-normal cursor-pointer select-none' htmlFor={checkboxId}>
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
