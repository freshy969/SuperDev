import React from 'react';
import {useState, useEffect} from 'react';

export default function ColorPalette({portThree}) {
	const [isLoadingOne, setIsLoadingOne] = useState(true);
	const [allColors, setAllColors] = useState([]);

	useEffect(function () {
		portThree.onMessage.addListener(function (response) {
			if (response.action === 'allColors') {
				setAllColors(response.allColors);
				setIsLoadingOne(false);
			}
		});
	}, []);

	function CopyColorCode(color, id) {
		navigator.clipboard.writeText(color);
		document.querySelector('#' + id + '> i').classList.remove('before:hidden');
		setTimeout(function () {
			document.querySelector('#' + id + '> i').classList.add('before:hidden');
		}, 1000);
	}

	function hexToRgb(hex) {
		let r = parseInt(hex.slice(1, 3), 16);
		let g = parseInt(hex.slice(3, 5), 16);
		let b = parseInt(hex.slice(5, 7), 16);
		return `rgb(${r}, ${g}, ${b})`;
	}

	return (
		<section id='colorPalettePage' className='hidden'>
			<div className='border border-t-0 border-borderOne dark:border-borderOneD box-border rounded-b-lg'>
				<div id='colorPalettePageChild' className='rounded-md p-4'>
					<div className='flex flex-wrap'>
						{!isLoadingOne
							? allColors.map(function (value, index) {
									// Margin Right/Bottom Calculation
									let id = 'colorPalette' + (index + 1);
									let allClasses;
									let baseClasses =
										'flex flex-wrap justify-center items-center h-[25.5px] w-[63.5px] rounded-md box-border border border-gray-300 cursor-pointer ';
									if (allColors.length - (index + 1) >= 4) {
										if (((index + 1) / 4) % 1 !== 0) allClasses = baseClasses + 'mr-[14.5px] mb-[14.5px]';
										else allClasses = baseClasses + 'mb-[12.5px]';
									} else {
										if (((index + 1) / 4) % 1 !== 0) allClasses = baseClasses + 'mr-[14.5px]';
										else allClasses = baseClasses + '';
									}

									// TickIcon Color Calculation
									let tickColor = value.startsWith('#') ? hexToRgb(value).split('(')[1].split(')')[0].split(',') : value.split('(')[1].split(')')[0].split(',');
									if (tickColor[0] * 0.299 + tickColor[1] * 0.587 + tickColor[2] * 0.114 > 150) tickColor = 'black';
									else tickColor = 'white';

									return (
										<div
											id={id}
											onClick={function () {
												CopyColorCode(value, id);
											}}
											className={allClasses}
											style={{'background-color': value}}
											key={index + 1}>
											<i className='fa-solid fa-badge-check text-base before:hidden' style={{color: tickColor}}></i>
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
