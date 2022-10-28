export default function HideAllCompExcept(componentId) {
	console.log(componentId);
	let hideArray = ['mainBody', 'toggleInfo', 'toggleSettings', 'colorPickerPage'];
	hideArray.map(function (value, index) {
		if (value !== componentId) {
			document.querySelector('#' + value).classList.add('hidden');
		} else {
			document.querySelector('#' + value).classList.remove('hidden');
			document.querySelector('#navBar').firstChild.style.borderRadius = '';
		}
	});
}
