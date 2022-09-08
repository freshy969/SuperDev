import features from '../data/features';
import {useEffect} from 'react';

export default function Body() {
	useEffect(() => {
		// Add All Features to LocalStorage
		localStorage.setItem('features', JSON.stringify(features));
		console.log('All Features Added to LocalStorage : ', localStorage.getItem('features'));
	}, []);

	function hideFeature(featureId) {
		let enabledFeatures = JSON.parse(localStorage.getItem('features'));
		enabledFeatures.map((value, index) => {
			if (value.id === featureId) {
				document.getElementById(featureId).classList.add('hidden');
			}
		});
	}

	return (
		<>
			<div className={'w-[340px] h-[498px] bg-gradient-to-r from-bodyOne to-bodyTwo dark:from-navOne dark:to-navTwo'}>
				<section id='mainBody'>
					<div className='grid grid-cols-2 gap-x-[14px] p-4 pb-0 border border-borderLight dark:border-borderDark box-border rounded-b-lg'>
						{features.map((value, index) => {
							return (
								<button
									key={index}
									id={value.id}
									className='rounded-md text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-xs text-bodyText p-2 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
									<i className={'fa-regular ' + value.icon + ' px-[5px] text-bodyText'}></i> {value.title}
								</button>
							);
						})}
					</div>
				</section>
				<section id='hideFeature' className='hidden'>
					<div className='grid grid-cols-2 gap-x-[14px] p-4 pb-0 border border-borderLight dark:border-borderDark box-border rounded-b-lg'>
						{features.map((value, index) => {
							return (
								<button
									key={index}
									id={value.id}
									onClick={hideFeature(value.id)}
									className='rounded-md text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-xs text-bodyText p-2 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
									<i className={'fa-solid ' + value.closeIcon + ' px-[5px] text-bodyText text-[11px]'}></i> {value.title}
								</button>
							);
						})}
					</div>
				</section>
			</div>
		</>
	);
}
