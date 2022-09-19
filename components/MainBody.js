import {useState, useEffect} from 'react';
import DisableAllFeatureExcept from '/components/functions/DisableAllFeatureExcept';

export default function MainBody() {
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(() => {
		chrome.storage.sync.get(['allFeatures'], function (result) {
			setAllFeatures(JSON.parse(result.allFeatures));
		});
		chrome.storage.onChanged.addListener(function (result) {
			if (result.allFeatures) {
				setAllFeatures(JSON.parse(result.allFeatures.newValue));
			}
		});
	}, []);

	if (allFeatures.length !== 0) {
		return (
			<section id='mainBody'>
				<div className='grid grid-cols-2 gap-x-[14px] p-4 pb-0 border border-borderLight dark:border-borderDark box-border rounded-b-lg'>
					{allFeatures.map((value, index) => {
						if (value.isEnabled === true) {
							return (
								<button
									key={index}
									id={value.id}
									onClick={() => DisableAllFeatureExcept(allFeatures, value.id)}
									className={
										value.id +
										' rounded-md text-left bg-gradient-to-r from-btnOne to-btnTwo hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 shadow-lg text-xs text-bodyText p-2 mb-4 font-normal transition ease-in-out scaleButton duration-300'
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
										' rounded-md text-left bg-gradient-to-r from-btnOne to-btnTwo hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 shadow-lg text-xs text-bodyText p-2 mb-4 font-normal transition ease-in-out scaleButton duration-300 hidden'
									}>
									<i className={'fa-regular ' + value.icon + ' px-[5px] text-bodyText'}></i> {value.title}
								</button>
							);
						}
					})}
				</div>
			</section>
		);
	}
}
