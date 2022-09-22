export default function HideAllComponentExcept(componentId) {
	let hideArray = ['mainBody', 'toggleFeature', 'toggleSettings'];
	hideArray.map((value, index) => {
		if (value !== componentId) {
			document.querySelector('#' + value).classList.add('hidden');
		} else {
			document.querySelector('#' + value).classList.remove('hidden');
		}
	});
}
