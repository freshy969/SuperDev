import React from 'react';
export default function ToggleInfo() {
	return (
		<section id='toggleInfo' className='hidden'>
			<div className='border border-t-0 border-borderOne box-border rounded-b-lg'>
				<div id='toggleInfoChild' className='rounded-md p-4'>
					<div>
						<div className='rounded-md text-left bg-bgTwo border border-borderTwo shadow-lg text-xs text-allText p-2 mb-3 font-normal select-none'>
							<i className='fa-regular fa-command px-[5px] text-allText'></i>Extension Shortcuts
						</div>
						<div className='rounded-md border bg-bgTwo border-borderTwo shadow-lg p-3 mb-3'>
							{[`Open Extension : ${window.navigator?.userAgentData?.platform === 'macOS' ? 'Cmd+Shift+S' : 'Ctrl+Shift+S'}`].map(function (value, index) {
								return (
									<div className={index + 1 === 1 ? '' : 'mt-2'} key={index + 1}>
										<h6 className='inline-block text-xs text-allText font-normal select-none' htmlFor={'checkboxExportElement' + (index + 1)}>
											<i className='fa-regular fa-square-info pr-[5px] text-allText'></i>
											{value}
										</h6>
									</div>
								);
							})}
						</div>
					</div>

					<div>
						<div className='rounded-md text-left bg-bgTwo border border-borderTwo shadow-lg text-xs text-allText p-2 mb-3 font-normal select-none'>
							<i className='fa-regular fa-up-right-from-square px-[5px] text-allText'></i>About Export Element
						</div>
						<div className='rounded-md border bg-bgTwo border-borderTwo shadow-lg p-3 mb-3'>
							{[
								`Open Extension : ${window.navigator?.userAgentData?.platform === 'macOS' ? 'Cmd+Shift+S' : 'Ctrl+Shift+S'}`,
								`Close Extension : ${window.navigator?.userAgentData?.platform === 'macOS' ? 'Cmd+Shift+S' : 'Ctrl+Shift+S'}`,
								`Close Active Feature : ${window.navigator?.userAgentData?.platform === 'macOS' ? 'ESC' : 'ESC'}`,
								`Clear All Cache : ${window.navigator?.userAgentData?.platform === 'macOS' ? 'Cmd+Shift+E' : 'Ctrl+Shift+E'}`,
							].map(function (value, index) {
								return (
									<div className={index + 1 === 1 ? '' : 'mt-2'} key={index + 1}>
										<h6 className='inline-block text-xs text-allText font-normal select-none' htmlFor={'checkboxExportElement' + (index + 1)}>
											<i className='fa-regular fa-square-info pr-[5px] text-allText'></i>
											{value}
										</h6>
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
