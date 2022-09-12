export default function ToggleSettings() {
	let allFeatures = JSON.parse(localStorage.getItem('allFeatures'));

	function singleSettingsPage(featureId) {}

	return (
		<section id='toggleSettings' className='hidden'>
			<div className='grid grid-cols-2 gap-x-[14px] p-4 pb-0 border border-borderLight dark:border-borderDark box-border rounded-b-lg'>
				{allFeatures.map((value, index) => {
					if (value.hasSettings === true) {
						return (
							<button
								key={index}
								id={value.id}
								onClick={() => singleSettingsPage(value.id)}
								className='rounded-md text-left bg-gradient-to-r from-btnOne to-btnTwo hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 shadow-lg text-xs text-bodyText p-2 mb-4 font-normal transition ease-in-out scaleButton duration-300'>
								<i className={value.id + ' fa-regular ' + value.settingsIcon + ' pl-[5px] pr-[4px] text-bodyText text-xs'}></i> {value.title}
							</button>
						);
					}
				})}
			</div>
		</section>
	);
}
