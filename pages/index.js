import features from '../data/features';

export default function Home() {
	let height = 18 + ((features.length % 2 === 0 && (features.length / 2) * 48) || (features.length % 2 !== 0 && ((features.length - 1) / 2) * 48));
	let fullHeight = 40 + height;

	console.log('Popup Height : ', height);

	function changeHeight() {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {message: 'changeHeight', fullHeight: fullHeight}, function (response) {
				console.log('Response Receied from Content Script : ', response.farewell);
			});
		});
	}

	return (
		<>
			<div className={'w-[340px] h-[' + height + '] bg-gradient-to-r from-bodyOne to-bodyTwo dark:from-navOne dark:to-navTwo'}>
				<div className='grid grid-cols-2 gap-x-[14px] p-4 pb-0 border border-borderLight dark:border-borderDark box-border rounded-b-lg'>
					{features.map((value, index) => {
						return (
							<button
								key={index}
								id={value.id}
								className='rounded-md text-left bg-gradient-to-r from-btnOne to-btnTwo shadow-lg text-xs text-bodyText p-2 mb-4 font-normal transition ease-in-out hover:scale-[1.03] duration-300'>
								<i className={value.icon + ' px-[5px] text-bodyText'}></i> {value.title}
							</button>
						);
					})}
				</div>
			</div>
		</>
	);
}
