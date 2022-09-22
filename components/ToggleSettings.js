import {useState, useEffect} from 'react';
export default function ToggleSettings() {
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(() => {
		chrome.storage.sync.get(['allFeatures'], function (result) {
			setAllFeatures(JSON.parse(result.allFeatures));
		});
	}, []);

	if (allFeatures.length !== 0) {
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.allFeatures) {
				setAllFeatures(JSON.parse(changes.allFeatures.newValue));
			}
		});
		return (
			<section id='toggleSettings' className='hidden'>
				<div className='grid grid-cols-2 gap-x-[14px] p-4 pb-0 border border-t-0 border-borderLight dark:border-borderDark box-border rounded-b-lg'>
					{allFeatures.map((value, index) => {
						if (value.hasSettings === true && value.isEnabled === true) {
							return (
								<button
									key={index}
									id={value.id}
									className='rounded-md text-left bg-gradient-to-r from-btnOne to-btnTwo hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 shadow-lg text-xs text-btnText p-2 mb-4 font-normal transition ease-in-out scaleButton duration-300'>
									<i className={value.id + ' fa-regular ' + value.settingsIcon + ' pl-[5px] pr-[4px] text-btnText text-xs'}></i> {value.title}
								</button>
							);
						}
					})}
				</div>
			</section>
		);
	}
}
