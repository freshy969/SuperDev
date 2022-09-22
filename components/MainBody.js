import {useState, useEffect} from 'react';
import ActivateDeactivateFeature from '/components/functions/ActivateDeactivateFeature';

export default function MainBody() {
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
			<section id='mainBody'>
				<div className='grid grid-cols-2 gap-x-[14px] p-4 pb-0 border border-t-0 border-borderLight dark:border-borderDark box-border rounded-b-lg'>
					{allFeatures.map((value, index) => {
						if (value.isEnabled === true) {
							return (
								<button
									key={index}
									id={value.id}
									onClick={() => ActivateDeactivateFeature(allFeatures, value.id)}
									className={
										value.id +
										' rounded-md text-left bg-gradient-to-r from-btnOne to-btnTwo hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 shadow-lg text-xs text-btnText p-2 mb-4 font-normal transition ease-in-out scaleButton duration-300'
									}>
									<i className={'fa-regular ' + value.icon + ' px-[5px] text-btnText'}></i> {value.title}
								</button>
							);
						} else {
							return (
								<button
									key={index}
									id={value.id}
									className={
										value.id +
										' rounded-md text-left bg-gradient-to-r from-btnOne to-btnTwo hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 shadow-lg text-xs text-btnText p-2 mb-4 font-normal transition ease-in-out scaleButton duration-300 hidden'
									}>
									<i className={'fa-regular ' + value.icon + ' px-[5px] text-btnText'}></i> {value.title}
								</button>
							);
						}
					})}
				</div>
			</section>
		);
	}
}
