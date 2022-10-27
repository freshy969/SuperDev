import React from 'react';

export default function ColorPicker() {
	function CopyColorCode(value, id) {
		navigator.clipboard.writeText(value);
		document.querySelector('#' + id + '> i').classList.remove('before:hidden');
		setTimeout(function () {
			document.querySelector('#' + id + '> i').classList.add('before:hidden');
		}, 500);
	}

	let colors = [
		'#e63946',
		'#f1faee',
		'#1d3557',
		'#a8dadc',
		'#457b9d',
		'#ffffff',
		'#000000',
		'#ef233c',
		'#14213d',
		'#3a86ff',
		'#2a9d8f',
		'#90e0ef',
		'#f3f3f3',
		'#e5e5e5',
		'#00f5d4',
		'#aec3b0',
		'#000000',
		'#4a4e69',
		'#e63946',
		'#f1faee',
		'#1d3557',
		'#a8dadc',
		'#457b9d',
		'#ffffff',
		'#000000',
		'#ef233c',
		'#14213d',
		'#3a86ff',
		'#2a9d8f',
		'#90e0ef',
		'#f3f3f3',
		'#e5e5e5',
		'#00f5d4',
		'#aec3b0',
		'#000000',
	];
	return (
		<section id='colorPickerPage' className='hidden'>
			<div className='border border-t-0 border-borderOne dark:border-borderOneD box-border rounded-b-lg'>
				<div id='colorPickerPageChild' className='rounded-md p-4'>
					<div className='flex flex-wrap'>
						{colors.map(function (value, index) {
							let id = 'colorPalette' + (index + 1);
							let allClasses;
							let baseClasses = 'flex flex-wrap justify-center items-center h-8 w-8 rounded-md box-border border border-gray-300 ';
							if (colors.length - (index + 1) >= 7) {
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
									<i className='fa-solid fa-check text-base text-white before:hidden'></i>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
