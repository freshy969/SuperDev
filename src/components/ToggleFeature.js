import React from 'react';
import {useState, useEffect} from 'react';
export default function ToggleFeature() {
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(() => {
		console.log(4);

		chrome.storage.sync.get(['allFeatures'], function (result) {
			setAllFeatures(JSON.parse(result.allFeatures));
		});
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.allFeatures) {
				setAllFeatures(JSON.parse(changes.allFeatures.newValue));
			}
		});
	}, []);

	function toggleSingleFeature(featureId) {
		allFeatures.map((value, index) => {
			if (value.id === featureId) {
				if (value.isEnabled === true) {
					document.getElementsByClassName(featureId)[0].classList.add('sd-hidden');
					document.getElementsByClassName(featureId)[1].classList.replace(value.disableIcon, value.enableIcon);
					value.isEnabled = false;
					chrome.storage.sync.set({allFeatures: JSON.stringify(allFeatures)});
				} else {
					document.getElementsByClassName(featureId)[0].classList.remove('sd-hidden');
					document.getElementsByClassName(featureId)[1].classList.replace(value.enableIcon, value.disableIcon);
					value.isEnabled = true;
					chrome.storage.sync.set({allFeatures: JSON.stringify(allFeatures)});
				}
			}
		});
	}

	if (allFeatures.length !== 0) {
		return (
			<section id='toggleFeature' className='sd-hidden'>
				<div className='sd-grid sd-grid-cols-2 sd-gap-x-[14px] sd-p-4 sd-pb-0 sd-border sd-border-t-0 sd-border-borderLight dark:sd-border-borderDark sd-box-border sd-rounded-b-lg'>
					{allFeatures.map((value, index) => {
						if (value.isEnabled === true) {
							return (
								<button
									key={index}
									id={value.id}
									onClick={() => toggleSingleFeature(value.id)}
									className='sd-rounded-md sd-text-left sd-bg-gradient-to-r sd-from-btnOne sd-to-btnTwo hover:sd-from-pink-500 hover:sd-via-red-500 hover:sd-to-yellow-500 sd-shadow-lg sd-text-xs sd-text-btnText sd-p-2 sd-mb-4 sd-font-normal sd-transition sd-ease-in-out scaleButton sd-duration-300'>
									<i className={value.id + ' fa-regular ' + value.disableIcon + ' sd-pl-[5px] sd-pr-[4px] sd-text-btnText sd-text-[11px]'}></i> {value.title}
								</button>
							);
						} else {
							return (
								<button
									key={index}
									id={value.id}
									onClick={() => toggleSingleFeature(value.id)}
									className='sd-rounded-md sd-text-left sd-bg-gradient-to-r sd-from-btnOne sd-to-btnTwo hover:sd-from-pink-500 hover:sd-via-red-500 hover:sd-to-yellow-500 sd-shadow-lg sd-text-xs sd-text-btnText sd-p-2 sd-mb-4 sd-font-normal sd-transition sd-ease-in-out scaleButton sd-duration-300'>
									<i className={value.id + ' fa-regular ' + value.enableIcon + ' sd-pl-[5px] sd-pr-[4px] sd-text-btnText sd-text-[11px]'}></i> {value.title}
								</button>
							);
						}
					})}
				</div>
			</section>
		);
	}
}
