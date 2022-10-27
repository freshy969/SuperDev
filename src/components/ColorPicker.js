import React from 'react';

export default function ColorPicker() {
	return (
		<section id='colorPickerPage' className=''>
			<div className='border border-t-0 border-borderOne dark:border-borderOneD box-border rounded-b-lg'>
				<div id='colorPickerPageChild' className='rounded-md p-4'>
					<div className='flex flex-wrap'>
						{[
							'#000000',
							'#FFFFFF',
							'#000000',
							'#FFFFFF',
							'#000000',
							'#FFFFFF',
							'#000000',
							'#FFFFFF',
							'#000000',
							'#FFFFFF',
							'#000000',
							'#FFFFFF',
							'#FFFFFF',
							'#000000',
							'#FFFFFF',
							'#000000',
							'#FFFFFF',
							'#000000',
							'#FFFFFF',
							'#000000',
							'#FFFFFF',
							'#000000',
							'#FFFFFF',
							'#000000',
							'#FFFFFF',
							'#000000',
							'#FFFFFF',
							'#FFFFFF',
							'#000000',
							'#FFFFFF',
						].map(function (value, index) {
							return (
								<div
									id={'colorPalette' + (index + 1)}
									className={
										((index + 1) / 6) % 1 !== 0
											? 'flex flex-wrap justify-center items-center mr-[12px] mb-[12px] h-10 w-10 rounded-md box-border border bg-[' + value + ']'
											: 'flex flex-wrap justify-center items-center mr-[00px] mb-[12px] h-10 w-10 rounded-md box-border border bg-[' + value + ']'
									}
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
