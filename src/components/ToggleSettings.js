import React from 'react';
import {useState, useEffect} from 'react';
export default function ToggleSettings() {
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(() => {
		console.log(5);

		chrome.storage.sync.get(['allFeatures'], function (result) {
			setAllFeatures(JSON.parse(result.allFeatures));
		});
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.allFeatures) {
				setAllFeatures(JSON.parse(changes.allFeatures.newValue));
			}
		});
	}, []);

	if (allFeatures.length !== 0) {
		return (
			<section id='toggleSettings' className='sd-hidden'>
				<div className='sd-grid sd-grid-cols-2 sd-gap-x-[14px] sd-p-4 sd-pb-0 sd-border sd-border-t-0 sd-border-borderLight dark:sd-border-borderDark sd-box-border sd-rounded-b-lg'>
					{allFeatures.map((value, index) => {
						if (value.hasSettings === true && value.isEnabled === true) {
							return (
								<button
									key={index}
									id={value.id}
									className='sd-rounded-md sd-text-left sd-bg-gradient-to-r sd-from-btnOne sd-to-btnTwo hover:sd-from-pink-500 hover:sd-via-red-500 hover:sd-to-yellow-500 sd-shadow-lg sd-text-xs sd-text-btnText sd-p-2 sd-mb-4 sd-font-normal sd-transition sd-ease-in-out scaleButton sd-duration-300'>
									<i className={value.id + ' fa-regular ' + value.settingsIcon + ' sd-pl-[5px] sd-pr-[4px] sd-text-btnText sd-text-xs'}></i> {value.title}
								</button>
							);
						}
					})}
				</div>
			</section>
		);
	}
}
