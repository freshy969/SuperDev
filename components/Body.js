import features from '../data/features';
import {useState, useEffect} from 'react';

export default function Body() {
	let enabledFeatures = [];
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		//Add All Features to LocalStorage
		if (localStorage.getItem('enabledFeatures') === null) {
			localStorage.setItem('enabledFeatures', JSON.stringify(features));
			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Features Loaded to LocalStorage, BodyJs', 'BodyJs');
			setIsLoading(false);
		} else {
			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Features Loaded from LocalSotrage', 'BodyJs');
			setIsLoading(false);
		}
	}, []);

	// Set enabledFeatures as soon as useEffect finishes execution
	if (!isLoading) enabledFeatures = JSON.parse(localStorage.getItem('enabledFeatures'));

	function hideFeature(featureId) {
		enabledFeatures.map((value, index) => {
			if (value.id === featureId) {
				if (value.isEnabled === false) {
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Found Disabled Feature', value.title);
					document.getElementsByClassName(featureId)[0].classList.remove('hidden');
					document.getElementsByClassName(featureId)[1].classList.replace(value.addIcon, value.closeIcon);
					value.isEnabled = true;
					localStorage.setItem('enabledFeatures', JSON.stringify(enabledFeatures));
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Feature Enabled on LocalStorage', value.title);
				} else {
					document.getElementsByClassName(featureId)[0].classList.add('hidden');
					document.getElementsByClassName(featureId)[1].classList.replace(value.closeIcon, value.addIcon);
					value.isEnabled = false;
					localStorage.setItem('enabledFeatures', JSON.stringify(enabledFeatures));
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Feature Disabled on LocalStorage', value.title);
				}
			}
		});
	}
	if (!isLoading) {
		// Height on First Load
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {message: 'changeHeight', height: document.getElementById('mainBody').offsetHeight + 40.5}, function (response) {
				console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'BodyJs Received from ContentJS', response.farewell);
			});
		});
		return (
			<>
				<div>
					<section id='mainBody'>
						<div className='grid grid-cols-2 gap-x-[14px] p-4 pb-0 border border-borderLight dark:border-borderDark box-border rounded-b-lg'>
							{enabledFeatures.map((value, index) => {
								if (value.isEnabled !== false) {
									return (
										<button
											key={index}
											id={value.id}
											className={
												value.id +
												' rounded-md text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-xs text-bodyText p-2 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'
											}>
											<i className={'fa-regular ' + value.icon + ' px-[5px] text-bodyText'}></i> {value.title}
										</button>
									);
								} else {
									return (
										<button
											key={index}
											id={value.id}
											className={
												value.id +
												' rounded-md text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-xs text-bodyText p-2 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300 hidden'
											}>
											<i className={'fa-regular ' + value.icon + ' px-[5px] text-bodyText'}></i> {value.title}
										</button>
									);
								}
							})}
						</div>
					</section>
					<section id='hideFeature' className='hidden'>
						<div className='grid grid-cols-2 gap-x-[14px] p-4 pb-0 border border-borderLight dark:border-borderDark box-border rounded-b-lg'>
							{enabledFeatures.map((value, index) => {
								if (value.isEnabled !== false) {
									return (
										<button
											key={index}
											id={value.id}
											onClick={() => hideFeature(value.id)}
											className='rounded-md text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-xs text-bodyText p-2 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
											<i className={value.id + ' fa-regular ' + value.closeIcon + ' pl-[5px] pr-[4px] text-bodyText text-[11px]'}></i> {value.title}
										</button>
									);
								} else {
									return (
										<button
											key={index}
											id={value.id}
											onClick={() => hideFeature(value.id)}
											className='rounded-md text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-xs text-bodyText p-2 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
											<i className={value.id + ' fa-regular ' + value.addIcon + ' pl-[5px] pr-[4px] text-bodyText text-[11px]'}></i> {value.title}
										</button>
									);
								}
							})}
						</div>
					</section>
				</div>
			</>
		);
	}
}
