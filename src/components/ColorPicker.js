import React from 'react';
import {useState, useEffect} from 'react';

export default function ColorPicker({portThree}) {
	const [isLoadingOne, setIsLoadingOne] = useState(true);
	const [allColors, setAllColors] = useState([]);

	useEffect(function () {
		portThree.onMessage.addListener(function (response) {
			if (response.action === 'Color Palette Activated') {
				setAllColors(response.allColors);
				setIsLoadingOne(false);
			}
		});
	}, []);

	function CopyColorCode(rgbColor, id) {
		chrome.storage.local.get(['allFeatures'], function (result) {
			JSON.parse(result.allFeatures).map(function (value, index) {
				if (value.id === 'colorPalette') {
					if (value.settings.checkboxColorPalette1 === true) {
						navigator.clipboard.writeText(rgbaToHex(rgbColor));
						document.querySelector('#' + id + '> i').classList.remove('before:hidden');
						setTimeout(function () {
							document.querySelector('#' + id + '> i').classList.add('before:hidden');
						}, 500);
					} else if (value.settings.checkboxColorPalette2 === true) {
						navigator.clipboard.writeText(rgbColor);
						document.querySelector('#' + id + '> i').classList.remove('before:hidden');
						setTimeout(function () {
							document.querySelector('#' + id + '> i').classList.add('before:hidden');
						}, 500);
					}
				}
			});
		});

		function rgbaToHex(rgba) {
			let hex = rgba.split('(')[1].split(')')[0];
			hex = hex.split(',');
			hex.length === 3
				? (hex = '#' + ((1 << 24) + (+hex[0] << 16) + (+hex[1] << 8) + +hex[2]).toString(16).slice(1))
				: (hex = '#' + ((1 << 24) + (+hex[0] << 16) + (+hex[1] << 8) + +hex[2]).toString(16).slice(1) + ((+hex[3] * 255) | (1 << 8)).toString(16).slice(1));
			return hex;
		}
	}

	return (
		<section id='colorPickerPage' className='hidden'>
			<div className='border border-t-0 border-borderOne dark:border-borderOneD box-border rounded-b-lg'>
				<div id='colorPickerPageChild' className='rounded-md p-4'>
					<div className='flex flex-wrap'>
						{!isLoadingOne
							? allColors.map(function (value, index) {
									let id = 'colorPalette' + (index + 1);
									let allClasses;
									let baseClasses = 'flex flex-wrap justify-center items-center h-8 w-8 rounded-md box-border border border-gray-300 ';
									if (allColors.length - (index + 1) >= 7) {
										if (((index + 1) / 7) % 1 !== 0) allClasses = baseClasses + 'mr-[12.5px] mb-[12.5px]';
										else allClasses = baseClasses + 'mb-[12.5px]';
									} else {
										if (((index + 1) / 7) % 1 !== 0) allClasses = baseClasses + 'mr-[12.5px]';
										else allClasses = baseClasses + '';
									}
									return (
										<div
											id={id}
											onClick={function () {
												CopyColorCode(value, id);
											}}
											className={allClasses}
											style={{'background-color': value}}
											key={index + 1}>
											<i className='fa-solid fa-badge-check text-base text-white before:hidden'></i>
										</div>
									);
							  })
							: ''}
					</div>
				</div>
			</div>
		</section>
	);
}
