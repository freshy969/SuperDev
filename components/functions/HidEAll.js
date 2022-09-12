export default function HideAllExcept(featureId) {
	let hideArray = ['mainBody', 'toggleFeature', 'toggleSettings'];
	hideArray.map((value, index) => {
		if (value !== featureId) {
			document.getElementById(value).classList.add('hidden');
		} else {
			document.getElementById(value).classList.remove('hidden');
		}
	});
}
