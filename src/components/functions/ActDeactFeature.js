export default function ActDeactFeature(portThree, allFeatures, featureId) {
	if (allFeatures.length !== 0) {
		allFeatures.map(function (value, index) {
			// Disable All
			if (featureId !== value.id) {
				if (featureId === 'clearAllCache' || featureId === 'colorPalette') {
					JustHideMeExcep(portThree, value.id);
				} else {
					JustHideMe(portThree, value.id);
				}
			}
			// Except The One Clicked
			else if (featureId === value.id) {
				if (featureId === 'clearAllCache' || featureId === 'colorPalette') {
					HideMeShowMeExcep(portThree, value.id);
				} else {
					HideMeShowMe(portThree, value.id);
				}
			}
		});
	}
}

function HideMeShowMeExcep(portThree, featureId) {
	let featureIdUC = featureId.charAt(0).toUpperCase() + featureId.slice(1);
	// Exceptions
	if (document.querySelector('#' + featureId)) {
		if (!document.querySelector('#' + featureId).classList.contains('active')) {
			if (featureId === 'clearAllCache') {
				setTimeout(function () {
					portThree.postMessage({
						action: 'activate' + featureIdUC,
					});
				}, 50);

				portThree.onMessage.addListener(function (response) {
					if (response.action.includes('Activated')) {
						chrome.storage.local.set({whichFeatureActive: featureId});
					}
				});
			} else if (featureId === 'colorPalette') {
				document.querySelector('#pauseExtensionButton').style.visibility = 'visible';
				document.querySelector('#' + featureId).classList.add('active');

				setTimeout(function () {
					portThree.postMessage({
						action: 'activate' + featureIdUC,
					});
				}, 50);

				portThree.onMessage.addListener(function (response) {
					if (response.action.includes('Activated')) {
						chrome.storage.local.set({whichFeatureActive: featureId});
					}
				});
			}
		} else {
			if (featureId === 'colorPalette') {
				document.querySelector('#pauseExtensionButton').style.visibility = 'hidden';
				document.querySelector('#' + featureId).classList.remove('active');

				setTimeout(function () {
					portThree.postMessage({
						action: 'deactivate' + featureIdUC,
					});
				}, 50);

				portThree.onMessage.addListener(function (response) {
					if (response.action.includes('Deactivated')) {
						chrome.storage.local.set({whichFeatureActive: null});
					}
				});
			}
		}
	}
}

function HideMeShowMe(portThree, featureId) {
	let featureIdUC = featureId.charAt(0).toUpperCase() + featureId.slice(1);
	let arrDef = ['from-btnOne', 'dark:from-btnOneD', 'to-btnTwo', 'dark:to-btnTwoD'];
	let arrAct = ['from-btnThree', 'dark:from-btnThreeD', 'via-btnFour', 'dark:via-btnFourD', 'to-btnFive', 'dark:to-btnFiveD', 'active'];

	if (document.querySelector('#' + featureId)) {
		// Activate/Deactivate On Click If Active (Respectively)
		if (!document.querySelector('#' + featureId).classList.contains('active')) {
			document.querySelector('#pauseExtensionButton').style.visibility = 'visible';
			document.querySelector('#' + featureId).classList.remove(arrDef[0], arrDef[1], arrDef[2], arrDef[3]);
			document.querySelector('#' + featureId).classList.add(arrAct[0], arrAct[1], arrAct[2], arrAct[3], arrAct[4], arrAct[5], arrAct[6]);

			setTimeout(function () {
				portThree.postMessage({
					action: 'activate' + featureIdUC,
				});
			}, 50);

			portThree.onMessage.addListener(function (response) {
				if (response.action.includes('Activated')) {
					chrome.storage.local.set({whichFeatureActive: featureId});
				}
			});
		} else {
			document.querySelector('#pauseExtensionButton').style.visibility = 'hidden';
			document.querySelector('#' + featureId).classList.remove(arrAct[0], arrAct[1], arrAct[2], arrAct[3], arrAct[4], arrAct[5], arrAct[6]);
			document.querySelector('#' + featureId).classList.add(arrDef[0], arrDef[1], arrDef[2], arrDef[3]);

			setTimeout(function () {
				portThree.postMessage({
					action: 'deactivate' + featureIdUC,
				});
			}, 50);

			portThree.onMessage.addListener(function (response) {
				if (response.action.includes('Deactivated')) {
					chrome.storage.local.set({whichFeatureActive: null});
				}
			});
		}
	}
}

function JustHideMeExcep(portThree, featureId) {
	let featureIdUC = featureId.charAt(0).toUpperCase() + featureId.slice(1);
	if (document.querySelector('#' + featureId)) {
		if (document.querySelector('#' + featureId).classList.contains('active')) {
			// if (featureId === 'colorPalette') {
			// 	document.querySelector('#pauseExtensionButton').style.visibility = 'hidden';
			// 	document.querySelector('#' + featureId).classList.remove('active');
			// 	setTimeout(function () {
			// 		portThree.postMessage({
			// 			action: 'deactivate' + featureIdUC,
			// 		});
			// 	}, 50);
			// 	portThree.onMessage.addListener(function (response) {
			// 		if (response.action.includes('Deactivated')) {
			// 			chrome.storage.local.set({whichFeatureActive: null});
			// 		}
			// 	});
			// }
		}
	}
}

function JustHideMe(portThree, featureId) {
	let featureIdUC = featureId.charAt(0).toUpperCase() + featureId.slice(1);
	let arrDef = ['from-btnOne', 'dark:from-btnOneD', 'to-btnTwo', 'dark:to-btnTwoD'];
	let arrAct = ['from-btnThree', 'dark:from-btnThreeD', 'via-btnFour', 'dark:via-btnFourD', 'to-btnFive', 'dark:to-btnFiveD', 'active'];

	if (document.querySelector('#' + featureId)) {
		if (document.querySelector('#' + featureId).classList.contains('active')) {
			document.querySelector('#' + featureId).classList.remove(arrAct[0], arrAct[1], arrAct[2], arrAct[3], arrAct[4], arrAct[5], arrAct[6]);
			document.querySelector('#' + featureId).classList.add(arrDef[0], arrDef[1], arrDef[2], arrDef[3]);

			setTimeout(function () {
				portThree.postMessage({
					action: 'deactivate' + featureIdUC,
				});
			}, 50);

			portThree.onMessage.addListener(function (response) {
				if (response.action.includes('Deactivated')) {
					chrome.storage.local.set({whichFeatureActive: null});
				}
			});
		}
	}
}
