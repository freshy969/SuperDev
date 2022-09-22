import React from 'react';
import {useState, useEffect} from 'react';
import ActivateDeactivateFeature from './functions/ActivateDeactivateFeature';

export default function MainBody() {
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(() => {
		console.log(3);

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
			<section id='mainBody'>
				<div className='sd-grid sd-grid-cols-2 sd-gap-x-[14px] sd-p-4 sd-pb-0 sd-border sd-border-t-0 sd-border-borderLight dark:sd-border-borderDark sd-box-border sd-rounded-b-lg'>
					{allFeatures.map((value, index) => {
						if (value.isEnabled === true) {
							return (
								<button
									key={index}
									id={value.id}
									onClick={() => ActivateDeactivateFeature(allFeatures, value.id)}
									className={
										value.id +
										' sd-rounded-md sd-text-left sd-bg-gradient-to-r sd-from-btnOne sd-to-btnTwo hover:sd-from-pink-500 hover:sd-via-red-500 hover:sd-to-yellow-500 sd-shadow-lg sd-text-xs sd-text-btnText sd-p-2 sd-mb-4 sd-font-normal sd-transition sd-ease-in-out scaleButton sd-duration-300'
									}>
									<i className={'fa-regular ' + value.icon + ' sd-px-[5px] sd-text-btnText'}></i> {value.title}
								</button>
							);
						} else {
							return (
								<button
									key={index}
									id={value.id}
									className={
										value.id +
										' sd-rounded-md sd-text-left sd-bg-gradient-to-r sd-from-btnOne sd-to-btnTwo hover:sd-from-pink-500 hover:sd-via-red-500 hover:sd-to-yellow-500 sd-shadow-lg sd-text-xs sd-text-btnText sd-p-2 sd-mb-4 sd-font-normal sd-transition sd-ease-in-out scaleButton sd-duration-300 sd-hidden'
									}>
									<i className={'fa-regular ' + value.icon + ' sd-px-[5px] sd-text-btnText'}></i> {value.title}
								</button>
							);
						}
					})}
				</div>
			</section>
		);
	}
}
