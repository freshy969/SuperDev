export default function ActDeactFeature(logConsole, portThree, allFeatures, featureId) {
	if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), `ADFJs, P8 - ${featureId}`);
	if (allFeatures.length !== 0) {
		// Disable All
		allFeatures.map(function (value, index) {
			if (featureId !== value.id) {
				if (featureId === 'clearAllCache' || featureId === 'colorPalette') {
					if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'ADFJs, P81 - JustHideMeExcep');
					JustHideMeExcep(portThree, value.id);
				} else {
					if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'ADFJs, P82 - JustHideMe');
					JustHideMe(portThree, value.id);
				}
			}
		});

		// Except The One Clicked
		allFeatures.map(function (value, index) {
			if (featureId === value.id) {
				if (featureId === 'clearAllCache' || featureId === 'colorPalette') {
					if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'ADFJs, P83 - HideMeShowMeExcep');
					HideMeShowMeExcep(portThree, value.id);
				} else {
					if (logConsole === 'true') console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'ADFJs, P84 - HideMeShowMe');
					HideMeShowMe(portThree, value.id);
				}
			}
		});
	}
}

function HideMeShowMeExcep(portThree, featureId) {
	let featureIdUC = featureId.charAt(0).toUpperCase() + featureId.slice(1);
	let featRespMessage = featureIdUC.match(/[A-Z][a-z]+/g).join(' ');

	// Exceptions
	if (document.querySelector('#' + featureId)) {
		if (!document.querySelector('#' + featureId).classList.contains('active')) {
			if (featureId === 'clearAllCache') {
				portThree.postMessage({
					action: 'activate' + featureIdUC,
				});

				portThree.onMessage.addListener(function (response) {
					if (response.action.includes(featRespMessage + ' Activated')) {
						chrome.storage.local.set({whichFeatureActive: featureId});
					}
				});
			} else if (featureId === 'colorPalette') {
				document.querySelector('#pauseExtensionButton').style.visibility = 'visible';
				document.querySelector('#' + featureId).classList.add('active');

				portThree.postMessage({
					action: 'activate' + featureIdUC,
				});

				portThree.onMessage.addListener(function (response) {
					if (response.action.includes(featRespMessage + ' Activated')) {
						chrome.storage.local.set({whichFeatureActive: featureId});
					}
				});
			}
		} else {
			if (featureId === 'colorPalette') {
				document.querySelector('#pauseExtensionButton').style.visibility = 'hidden';
				document.querySelector('#' + featureId).classList.remove('active');

				portThree.postMessage({
					action: 'deactivate' + featureIdUC,
				});

				portThree.onMessage.addListener(function (response) {
					if (response.action.includes(featRespMessage + ' Deactivated')) {
						chrome.storage.local.set({whichFeatureActive: null});
					}
				});
			}
		}
	}
}

function HideMeShowMe(portThree, featureId) {
	let featureIdUC = featureId.charAt(0).toUpperCase() + featureId.slice(1);
	let featRespMessage = featureIdUC.match(/[A-Z][a-z]+/g).join(' ');

	let arrDef = ['from-btnOne', 'dark:from-btnOneD', 'to-btnTwo', 'dark:to-btnTwoD'];
	let arrAct = ['from-btnThree', 'dark:from-btnThreeD', 'via-btnFour', 'dark:via-btnFourD', 'to-btnFive', 'dark:to-btnFiveD', 'active'];

	if (document.querySelector('#' + featureId)) {
		// Activate/Deactivate On Click If Active (Respectively)
		if (!document.querySelector('#' + featureId).classList.contains('active')) {
			document.querySelector('#pauseExtensionButton').style.visibility = 'visible';
			document.querySelector('#' + featureId).classList.remove(arrDef[0], arrDef[1], arrDef[2], arrDef[3]);
			document.querySelector('#' + featureId).classList.add(arrAct[0], arrAct[1], arrAct[2], arrAct[3], arrAct[4], arrAct[5], arrAct[6]);

			portThree.postMessage({
				action: 'activate' + featureIdUC,
			});

			portThree.onMessage.addListener(function (response) {
				if (response.action.includes(featRespMessage + ' Activated')) {
					chrome.storage.local.set({whichFeatureActive: featureId});
				}
			});
		} else {
			document.querySelector('#pauseExtensionButton').style.visibility = 'hidden';
			document.querySelector('#' + featureId).classList.remove(arrAct[0], arrAct[1], arrAct[2], arrAct[3], arrAct[4], arrAct[5], arrAct[6]);
			document.querySelector('#' + featureId).classList.add(arrDef[0], arrDef[1], arrDef[2], arrDef[3]);

			portThree.postMessage({
				action: 'deactivate' + featureIdUC,
			});

			portThree.onMessage.addListener(function (response) {
				if (response.action.includes(featRespMessage + ' Deactivated')) {
					chrome.storage.local.set({whichFeatureActive: null});
				}
			});
		}
	}
}

function JustHideMeExcep(portThree, featureId) {
	let featureIdUC = featureId.charAt(0).toUpperCase() + featureId.slice(1);
	let featRespMessage = featureIdUC.match(/[A-Z][a-z]+/g).join(' ');

	if (document.querySelector('#' + featureId)) {
		if (document.querySelector('#' + featureId).classList.contains('active')) {
			if (featureId === 'colorPalette') {
				document.querySelector('#pauseExtensionButton').style.visibility = 'hidden';
				document.querySelector('#' + featureId).classList.remove('active');

				portThree.postMessage({
					action: 'deactivate' + featureIdUC,
				});

				portThree.onMessage.addListener(function (response) {
					if (response.action.includes(featRespMessage + ' Deactivated')) {
						chrome.storage.local.set({whichFeatureActive: null});
					}
				});
			}
		}
	}
}

function JustHideMe(portThree, featureId) {
	let featureIdUC = featureId.charAt(0).toUpperCase() + featureId.slice(1);
	let featRespMessage = featureIdUC.match(/[A-Z][a-z]+/g).join(' ');

	let arrDef = ['from-btnOne', 'dark:from-btnOneD', 'to-btnTwo', 'dark:to-btnTwoD'];
	let arrAct = ['from-btnThree', 'dark:from-btnThreeD', 'via-btnFour', 'dark:via-btnFourD', 'to-btnFive', 'dark:to-btnFiveD', 'active'];

	if (document.querySelector('#' + featureId)) {
		if (document.querySelector('#' + featureId).classList.contains('active')) {
			document.querySelector('#' + featureId).classList.remove(arrAct[0], arrAct[1], arrAct[2], arrAct[3], arrAct[4], arrAct[5], arrAct[6]);
			document.querySelector('#' + featureId).classList.add(arrDef[0], arrDef[1], arrDef[2], arrDef[3]);

			portThree.postMessage({
				action: 'deactivate' + featureIdUC,
			});

			portThree.onMessage.addListener(function (response) {
				if (response.action.includes(featRespMessage + ' Deactivated')) {
					chrome.storage.local.set({whichFeatureActive: null});
				}
			});
		}
	}
}
