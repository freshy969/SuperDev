import {useState, useEffect} from 'react';
export default function ToggleFeature() {
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(() => {
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
		function toggleSingleFeature(featureId) {
			allFeatures.map((value, index) => {
				if (value.id === featureId) {
					if (value.isEnabled === true) {
						document.getElementsByClassName(featureId)[0].classList.add('hidden');
						document.getElementsByClassName(featureId)[1].classList.replace(value.disableIcon, value.enableIcon);
						value.isEnabled = false;
						chrome.storage.sync.set({allFeatures: JSON.stringify(allFeatures)});
					} else {
						document.getElementsByClassName(featureId)[0].classList.remove('hidden');
						document.getElementsByClassName(featureId)[1].classList.replace(value.enableIcon, value.disableIcon);
						value.isEnabled = true;
						chrome.storage.sync.set({allFeatures: JSON.stringify(allFeatures)});
					}
				}
			});
		}

		return (
			<section id='toggleFeature' className='hidden'>
				<div className='grid grid-cols-2 gap-x-[14px] p-4 pb-0 border border-borderLight dark:border-borderDark box-border rounded-b-lg'>
					{allFeatures.map((value, index) => {
						if (value.isEnabled === true) {
							return (
								<button
									key={index}
									id={value.id}
									onClick={() => toggleSingleFeature(value.id)}
									className='rounded-md text-left bg-gradient-to-r from-btnOne to-btnTwo hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 shadow-lg text-xs text-btnText p-2 mb-4 font-normal transition ease-in-out scaleButton duration-300'>
									<i className={value.id + ' fa-regular ' + value.disableIcon + ' pl-[5px] pr-[4px] text-btnText text-[11px]'}></i> {value.title}
								</button>
							);
						} else {
							return (
								<button
									key={index}
									id={value.id}
									onClick={() => toggleSingleFeature(value.id)}
									className='rounded-md text-left bg-gradient-to-r from-btnOne to-btnTwo hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 shadow-lg text-xs text-btnText p-2 mb-4 font-normal transition ease-in-out scaleButton duration-300'>
									<i className={value.id + ' fa-regular ' + value.enableIcon + ' pl-[5px] pr-[4px] text-btnText text-[11px]'}></i> {value.title}
								</button>
							);
						}
					})}
				</div>
			</section>
		);
	}
}
