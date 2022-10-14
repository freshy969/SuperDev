import {useState, useEffect} from 'react';
export default function ToggleSettings() {
	const [allFeatures, setAllFeatures] = useState([]);

	useEffect(() => {
		chrome.storage.local.get(['allFeatures'], function (result) {
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
			<section id='toggleSettings' className='hidden'>
				<div className='grid grid-cols-2 gap-x-[14px] p-4 pb-0 border border-t-0 border-borderLight dark:border-borderDark box-border rounded-b-lg'>
					{allFeatures.map((value, index) => {
						return null;
					})}
				</div>
			</section>
		);
	}
}
