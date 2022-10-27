import React from 'react';

export default function ColorPicker() {
	function CopyColorCode(value, id) {
		navigator.clipboard.writeText(value);
		document.querySelector('#' + id).classList.remove('before:hidden');
	}

	let colors = [
		'#e63946',
		'#f1faee',
		'#1d3557',
		'#a8dadc',
		'#457b9d',
		'#ffbe0b',
		'#000000',
		'#ef233c',
		'#14213d',
		'#3a86ff',
		'#2a9d8f',
		'#90e0ef',
		'#ffb4a2',
		'#e5e5e5',
		'#00f5d4',
		'#aec3b0',
		'#00f5d4',
		'#4a4e69',
	];
	return (
		<section id='colorPickerPage' className='hidden'>
			<div className='border border-t-0 border-borderOne dark:border-borderOneD box-border rounded-b-lg'>
				<div id='colorPickerPageChild' className='rounded-md p-4'>
					<div className='flex flex-wrap'>
						{colors.map(function (value, index) {
							let id = 'colorPalette' + (index + 1);
							return (
								<div
									id={id}
									onClick={function () {
										CopyColorCode(value, id);
									}}
									className={
										((index + 1) / 6) % 1 !== 0
											? 'flex flex-wrap justify-center items-center mr-[12px] mb-[12px] h-8 w-10 rounded-md box-border border'
											: 'flex flex-wrap justify-center items-center mr-[00px] mb-[12px] h-8 w-10 rounded-md box-border border'
									}
									style={{'background-color': value}}
									key={index + 1}>
									<i className='fa-solid fa-check text-base before:hidden'></i>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
