import features from '../data/features';
import {useState, useEffect} from 'react';

export default function Body() {
	let enabledFeatures = [];
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		//Add All Features to LocalStorage
		if (localStorage.getItem('enabledFeatures') === null) {
			localStorage.setItem('enabledFeatures', JSON.stringify(features));
			console.log('All Features Added to LocalStorage : ', localStorage.getItem('enabledFeatures'));
			setIsLoading(false);
		} else {
			console.log('The Existent One, If Any : ', localStorage.getItem('enabledFeatures'));
			setIsLoading(false);
		}
	}, []);

	// Set enabledFeatures as soon as useEffect finishes execution
	if (!isLoading) enabledFeatures = JSON.parse(localStorage.getItem('enabledFeatures'));

	function hideFeature(featureId) {
		enabledFeatures.map((value, index) => {
			if (value.id === featureId) {
				if (value.isEnabled === false) {
					console.log('Found Disabled Feature : ', featureId);
					console.log(document.getElementsByClassName(featureId));
					document.getElementsByClassName(featureId)[0].classList.remove('hidden');
					document.getElementsByClassName(featureId)[1].classList.replace(value.addIcon, value.closeIcon);
					value.isEnabled = true;
					localStorage.setItem('enabledFeatures', JSON.stringify(enabledFeatures));
					console.log('Feature Added to LocalStorage : ', localStorage.getItem('enabledFeatures'));
				} else {
					document.getElementsByClassName(featureId)[0].classList.add('hidden');
					document.getElementsByClassName(featureId)[1].classList.replace(value.closeIcon, value.addIcon);
					value.isEnabled = false;
					localStorage.setItem('enabledFeatures', JSON.stringify(enabledFeatures));
					console.log('Feature Removed from LocalStorage : ', localStorage.getItem('enabledFeatures'));
				}
			}
		});
	}
	if (!isLoading) {
		// Height on First Load
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {message: 'changeHeight', height: document.getElementById('mainBody').offsetHeight + 40.5}, function (response) {
				console.log('Response Received from Content Script : ', response.farewell);
			});
		});
		return (
			<>
				<div className={'bg-gradient-to-r from-bodyOne to-bodyTwo dark:from-navOne dark:to-navTwo'}>
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
											<i className={value.id + ' fa-solid ' + value.closeIcon + ' px-[7px] text-bodyText text-[10px]'}></i> {value.title}
										</button>
									);
								} else {
									return (
										<button
											key={index}
											id={value.id}
											onClick={() => hideFeature(value.id)}
											className='rounded-md text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-xs text-bodyText p-2 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
											<i className={value.id + ' fa-solid ' + value.addIcon + ' px-[7px] text-bodyText text-[10px]'}></i> {value.title}
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
