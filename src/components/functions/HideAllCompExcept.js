export default function HideAllCompExcept(componentId) {
	let hideArray = ['mainBody', 'toggleInfo', 'toggleSettings', 'colorPalettePage'];
	hideArray.map(function (value, index) {
		if (value !== componentId) {
			document.querySelector('#' + value).classList.add('hidden');
		} else {
			document.querySelector('#' + value).classList.remove('hidden');
			document.querySelector('#navBar').firstChild.style.borderRadius = '';
		}
	});
}
