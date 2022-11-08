export default function HideAllCompExcept(componentId) {
	let hideArray = ['mainBody', 'toggleInfo', 'toggleSettings', 'colorPalettePage'];
	hideArray.map(function (value, index) {
		if (value !== componentId) {
			if (!document.querySelector('#' + value).classList.contains('hidden')) {
				document.querySelector('#' + value).classList.add('hidden');
			}
		} else {
			if (document.querySelector('#' + value).classList.contains('hidden')) {
				document.querySelector('#' + value).classList.remove('hidden');
				document.querySelector('#navBar').firstChild.style.setProperty('border-radius', '');
			}
		}
	});
}
