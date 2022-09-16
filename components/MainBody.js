export default function MainBody() {
	let allFeatures = JSON.parse(localStorage.getItem('allFeatures'));

	function singleFeature(featureId) {
		if (featureId === 'textEditor') {
			if (!document.querySelector('#' + featureId).classList.contains('active')) {
				document.querySelector('#' + featureId).classList.remove('from-btnOne', 'to-btnTwo');
				document.querySelector('#' + featureId).classList.add('from-btnThree', 'via-btnFour', 'to-btnFive', 'active');

				chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
					let portTwo = chrome.tabs.connect(tabs[0].id, {name: 'portTwo'});
					portTwo.postMessage({action: 'activateTextEditor'});
					portTwo.onMessage.addListener(function (response) {
						console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Action', response.action);
					});
				});
			} else {
				document.querySelector('#' + featureId).classList.remove('from-btnThree', 'via-btnFour', 'to-btnFive', 'active');
				document.querySelector('#' + featureId).classList.add('from-btnOne', 'to-btnTwo');

				chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
					let portTwo = chrome.tabs.connect(tabs[0].id, {name: 'portTwo'});
					portTwo.postMessage({action: 'deactivateTextEditor'});
					portTwo.onMessage.addListener(function (response) {
						console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Action', response.action);
					});
				});
			}
		} else if (featureId === 'pageRuler') {
			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Started PageRuler');
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				let portTwo = chrome.tabs.connect(tabs[0].id, {name: 'portTwo'});
				portTwo.postMessage({action: 'pageRuler'});
				portTwo.onMessage.addListener(function (response) {
					console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Action', response.action);
				});
			});
		}
	}

	return (
		<section id='mainBody'>
			<div className='grid grid-cols-2 gap-x-[14px] p-4 pb-0 border border-borderLight dark:border-borderDark box-border rounded-b-lg'>
				{allFeatures.map((value, index) => {
					if (value.isEnabled === true) {
						return (
							<button
								key={index}
								id={value.id}
								onClick={() => singleFeature(value.id)}
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
