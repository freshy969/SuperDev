import React from 'react';
import {useState, useEffect} from 'react';
import ActDeactFeature from './functions/ActDeactFeature';

export default function MainBody({logConsole, portThree}) {
	const [isLoadingOne, setIsLoadingOne] = useState(true);
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(function () {
		// Get AllFeatures
		chrome.storage.local.get(['allFeatures'], function (result) {
			setAllFeatures(JSON.parse(result.allFeatures));
			setIsLoadingOne(false);
		});

		// OnUpdate AllFeatures
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.allFeatures) setAllFeatures(JSON.parse(changes.allFeatures.newValue));
		});
	}, []);

	if (!isLoadingOne) {
		return (
			<section id='mainBody'>
				<div className='grid grid-cols-2 gap-x-[14px] p-4 pb-0 border border-t-0 border-borderOne dark:border-borderOneD box-border rounded-b-lg'>
					{allFeatures.map(function (value, index) {
						return (
							<button
								key={index}
								id={value.id}
								onClick={function () {
									ActDeactFeature(logConsole, portThree, allFeatures, value.id);
								}}
								className={
									value.id +
									' rounded-md text-left bg-gradient-to-r from-btnOne dark:from-btnOneD to-btnTwo dark:to-btnTwoD hover:from-btnThree hover:via-btnFour hover:to-btnFive dark:hover:from-btnThreeD dark:hover:via-btnFourD dark:hover:to-btnFiveD shadow-lg text-xs text-btnText dark:text-btnTextD p-2 mb-4 font-normal transition ease-in-out scaleButton duration-300'
								}>
								<i className={'fa-regular ' + value.icon + ' px-[5px] text-btnText dark:text-btnTextD'}></i> {value.title}
							</button>
						);
					})}
				</div>
			</section>
		);
	}
}
