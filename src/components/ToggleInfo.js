import React from 'react';

export default function ToggleInfo({allFeatures, activeTab, portThree, allFeaturesRef}) {
	function openShortcutPage() {
		chrome.tabs.create({
			index: activeTab[0].index + 1,
			url: 'chrome://extensions/shortcuts',
		});
	}

	return (
		<section id='toggleInfo' className='hidden'>
			<div className='border border-t-0 border-borderOne dark:border-borderOneD box-border rounded-b-lg'>
				<div id='toggleInfoChild' className='rounded-md p-4'>
					{/* SuperDev Default Shortcuts */}
					<div>
						<div
							className='rounded-md text-left bg-bgTwo dark:bg-bgTwoD border box-border border-borderTwo dark:border-borderTwoD shadow text-xs text-allText dark:text-allTextD p-2 mb-3 font-normal select-none cursor-pointer'
							onClick={openShortcutPage}>
							<i className='fa-regular fa-command px-[5px] text-allText dark:text-allTextD'></i>
							Click To Change Shortcuts
						</div>
						<div className='rounded-md border bg-bgTwo dark:bg-bgTwoD border-borderTwo dark:border-borderTwoD shadow p-3 mb-3'>
							{[
								`Open Extension : ${window.navigator?.userAgentData?.platform === 'macOS' ? 'Cmd+Shift+S' : 'Ctrl+Shift+S'}`,
								`Close Extension : ${window.navigator?.userAgentData?.platform === 'macOS' ? 'Cmd+Shift+S' : 'Ctrl+Shift+S'}`,
								`Close Active Feature : ${window.navigator?.userAgentData?.platform === 'macOS' ? 'Escape' : 'Escape'}`,
								`Clear All Cache : ${window.navigator?.userAgentData?.platform === 'macOS' ? 'Cmd+Shift+E' : 'Ctrl+Shift+E'}`,
							].map(function (value, index) {
								return (
									<div className={index + 1 === 1 ? '' : 'mt-2'} key={index + 1}>
										<h6
											className='inline-block text-xs text-allText dark:text-allTextD font-normal select-none'
											htmlFor={'checkboxExportElement' + (index + 1)}>
											<i className='fa-regular fa-square-info pr-[5px] text-allText dark:text-allTextD'></i>
											{value}
										</h6>
									</div>
								);
							})}
						</div>
					</div>

					{/* About Page Ruler/Color Picker */}
					<div>
						<div className='rounded-md text-left bg-bgTwo dark:bg-bgTwoD border box-border border-borderTwo dark:border-borderTwoD shadow text-xs text-allText dark:text-allTextD p-2 mb-3 font-normal select-none'>
							<i className='fa-regular fa-arrows-up-down-left-right px-[5px] text-allText dark:text-allTextD'></i>About Page Ruler/Color Picker
						</div>
						<div className='rounded-md border bg-bgTwo dark:bg-bgTwoD border-borderTwo dark:border-borderTwoD shadow p-3 mb-3'>
							{["It Won't Work On Moving Elements", 'Since It Uses Screenshot For Data :('].map(function (value, index) {
								return (
									<div className={index + 1 === 1 ? '' : 'mt-2'} key={index + 1}>
										<h6
											className='inline-block text-xs text-allText dark:text-allTextD font-normal select-none'
											htmlFor={'checkboxExportElement' + (index + 1)}>
											<i className='fa-regular fa-square-info pr-[5px] text-allText dark:text-allTextD'></i>
											{value}
										</h6>
									</div>
								);
							})}
						</div>
					</div>

					{/* About Export Element Feature */}
					<div>
						<div className='rounded-md text-left bg-bgTwo dark:bg-bgTwoD border box-border border-borderTwo dark:border-borderTwoD shadow text-xs text-allText dark:text-allTextD p-2 mb-3 font-normal select-none'>
							<i className='fa-regular fa-up-right-from-square px-[5px] text-allText dark:text-allTextD'></i>About Export Element Feature
						</div>
						<div className='rounded-md border bg-bgTwo dark:bg-bgTwoD border-borderTwo dark:border-borderTwoD shadow p-3 mb-3'>
							{["Export Won't Work on Secure Sites", "Choose Save As File If That's The Case"].map(function (value, index) {
								return (
									<div className={index + 1 === 1 ? '' : 'mt-2'} key={index + 1}>
										<h6
											className='inline-block text-xs text-allText dark:text-allTextD font-normal select-none'
											htmlFor={'checkboxExportElement' + (index + 1)}>
											<i className='fa-regular fa-square-info pr-[5px] text-allText dark:text-allTextD'></i>
											{value}
										</h6>
									</div>
								);
							})}
						</div>
					</div>

					{/* SuperDev Pro Coming Soon */}
					<div>
						<div className='rounded-md text-left bg-bgTwo dark:bg-bgTwoD border box-border border-borderTwo dark:border-borderTwoD shadow text-xs text-allText dark:text-allTextD p-2 mb-3 font-normal select-none'>
							<i className='fa-regular fa-badge-check px-[5px] text-allText dark:text-allTextD'></i>SuperDev Pro Coming Soon
						</div>
						<div className='rounded-md border bg-bgTwo dark:bg-bgTwoD border-borderTwo dark:border-borderTwoD shadow p-3'>
							{[
								`With Everything In Free +`,
								`CSS Inspector And Viewer`,
								`Visualise Padding/Margin`,
								`Add Custom CSS/JavaScript`,
								`Get Used Site Fonts List`,
								`Font Inspector And Changer`,
								`Extract Media/Images/SVGs`,
								`Take Full Site Screenshot`,
								`Site Responsive Viewer`,
								`Site Info/Technology Lookup`,
								`Quick Source Code Viewer`,
							].map(function (value, index) {
								return (
									<div className={index + 1 === 1 ? '' : 'mt-2'} key={index + 1}>
										<h6
											className='inline-block text-xs text-allText dark:text-allTextD font-normal select-none'
											htmlFor={'checkboxExportElement' + (index + 1)}>
											<i className='fa-regular fa-square-info pr-[5px] text-allText dark:text-allTextD'></i>
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
