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

	function CopyColorCode(value, id) {
		navigator.clipboard.writeText(value);
		document.querySelector('#' + id + '> i').classList.remove('before:hidden');
		setTimeout(function () {
			document.querySelector('#' + id + '> i').classList.add('before:hidden');
		}, 500);
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
