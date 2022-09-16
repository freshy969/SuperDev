export default function HideAllExcept(featureId) {
	let hideArray = ['mainBody', 'toggleFeature', 'toggleSettings'];
	hideArray.map((value, index) => {
		if (value !== featureId) {
			document.querySelector('#' + value).classList.add('hidden');
		} else {
			document.querySelector('#' + value).classList.remove('hidden');
		}
	});
}
