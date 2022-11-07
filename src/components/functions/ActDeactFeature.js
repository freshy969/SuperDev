export default function ActDeactFeature(allFeatures, activeTab, portThree, featureId) {
	// Disable All
	allFeatures.map(function (value, index) {
		if (value.id !== featureId) {
			if (value.id === 'clearAllCache' || value.id === 'colorPalette') JustHideMeExcep(activeTab, portThree, value.id);
			else JustHideMe(activeTab, portThree, value.id);
		}
	});

	// Except The One Clicked
	allFeatures.map(function (value, index) {
		if (value.id === featureId) {
			if (value.id === 'clearAllCache' || value.id === 'colorPalette') HideMeShowMeExcep(activeTab, portThree, value.id);
			else HideMeShowMe(activeTab, portThree, value.id);
		}
	});
}

function HideMeShowMeExcep(activeTab, portThree, featureId) {
	let featureIdUC = featureId.charAt(0).toUpperCase() + featureId.slice(1);
	let featRespMessage = featureIdUC.match(/[A-Z][a-z]+/g).join(' ');

	// Exceptions
	if (document.querySelector('#' + featureId)) {
		if (!document.querySelector('#' + featureId).classList.contains('active')) {
			// Clear Cache
			if (featureId === 'clearAllCache') {
				portThree.postMessage({action: 'activate' + featureIdUC, activeTab: activeTab});
				portThree.onMessage.addListener(async function (response) {
					if (response.action.includes(featRespMessage + ' Activated')) {
						await chrome.storage.local.set({['whichFeatureActive' + activeTab[0].id]: featureId});
					}
				});
			}

			// Color Palette
			else if (featureId === 'colorPalette') {
				document.querySelector('#stopActFeatButton').style.visibility = 'visible';
				document.querySelector('#' + featureId).classList.add('active');
				portThree.postMessage({action: 'activate' + featureIdUC, activeTab: activeTab});
				portThree.onMessage.addListener(async function (response) {
					if (response.action.includes(featRespMessage + ' Activated')) {
						await chrome.storage.local.set({['whichFeatureActive' + activeTab[0].id]: featureId});
					}
				});
			}
		} else {
			// Color Palette
			if (featureId === 'colorPalette') {
				document.querySelector('#stopActFeatButton').style.visibility = 'hidden';
				document.querySelector('#' + featureId).classList.remove('active');
				portThree.postMessage({action: 'deactivate' + featureIdUC, activeTab: activeTab});
				portThree.onMessage.addListener(async function (response) {
					if (response.action.includes(featRespMessage + ' Deactivated')) {
						await chrome.storage.local.set({['whichFeatureActive' + activeTab[0].id]: null});
					}
				});
			}
		}
	}
}

function HideMeShowMe(activeTab, portThree, featureId) {
	let featureIdUC = featureId.charAt(0).toUpperCase() + featureId.slice(1);
	let featRespMessage = featureIdUC.match(/[A-Z][a-z]+/g).join(' ');
	let arrDef = ['from-btnOne', 'dark:from-btnOneD', 'to-btnTwo', 'dark:to-btnTwoD'];
	let arrAct = ['from-btnThree', 'dark:from-btnThreeD', 'via-btnFour', 'dark:via-btnFourD', 'to-btnFive', 'dark:to-btnFiveD', 'active'];

	if (document.querySelector('#' + featureId)) {
		// Activate
		if (!document.querySelector('#' + featureId).classList.contains('active')) {
			document.querySelector('#stopActFeatButton').style.visibility = 'visible';
			document.querySelector('#' + featureId).classList.remove(arrDef[0], arrDef[1], arrDef[2], arrDef[3]);
			document.querySelector('#' + featureId).classList.add(arrAct[0], arrAct[1], arrAct[2], arrAct[3], arrAct[4], arrAct[5], arrAct[6]);
			portThree.postMessage({action: 'activate' + featureIdUC, activeTab: activeTab});
			portThree.onMessage.addListener(async function (response) {
				if (response.action.includes(featRespMessage + ' Activated')) {
					await chrome.storage.local.set({['whichFeatureActive' + activeTab[0].id]: featureId});
				}
			});
		}

		// Deactivate
		else {
			document.querySelector('#stopActFeatButton').style.visibility = 'hidden';
			document.querySelector('#' + featureId).classList.remove(arrAct[0], arrAct[1], arrAct[2], arrAct[3], arrAct[4], arrAct[5], arrAct[6]);
			document.querySelector('#' + featureId).classList.add(arrDef[0], arrDef[1], arrDef[2], arrDef[3]);
			portThree.postMessage({action: 'deactivate' + featureIdUC, activeTab: activeTab});
			portThree.onMessage.addListener(async function (response) {
				if (response.action.includes(featRespMessage + ' Deactivated')) {
					await chrome.storage.local.set({['whichFeatureActive' + activeTab[0].id]: null});
				}
			});
		}
	}
}

function JustHideMeExcep(activeTab, portThree, featureId) {
	let featureIdUC = featureId.charAt(0).toUpperCase() + featureId.slice(1);
	let featRespMessage = featureIdUC.match(/[A-Z][a-z]+/g).join(' ');

	if (document.querySelector('#' + featureId)) {
		if (document.querySelector('#' + featureId).classList.contains('active')) {
			if (featureId === 'colorPalette') {
				document.querySelector('#stopActFeatButton').style.visibility = 'hidden';
				document.querySelector('#' + featureId).classList.remove('active');
				portThree.postMessage({action: 'deactivate' + featureIdUC, activeTab: activeTab});
				portThree.onMessage.addListener(async function (response) {
					if (response.action.includes(featRespMessage + ' Deactivated')) {
						await chrome.storage.local.set({['whichFeatureActive' + activeTab[0].id]: null});
					}
				});
			}
		}
	}
}

function JustHideMe(activeTab, portThree, featureId) {
	let featureIdUC = featureId.charAt(0).toUpperCase() + featureId.slice(1);
	let featRespMessage = featureIdUC.match(/[A-Z][a-z]+/g).join(' ');
	let arrDef = ['from-btnOne', 'dark:from-btnOneD', 'to-btnTwo', 'dark:to-btnTwoD'];
	let arrAct = ['from-btnThree', 'dark:from-btnThreeD', 'via-btnFour', 'dark:via-btnFourD', 'to-btnFive', 'dark:to-btnFiveD', 'active'];

	if (document.querySelector('#' + featureId)) {
		if (document.querySelector('#' + featureId).classList.contains('active')) {
			document.querySelector('#' + featureId).classList.remove(arrAct[0], arrAct[1], arrAct[2], arrAct[3], arrAct[4], arrAct[5], arrAct[6]);
			document.querySelector('#' + featureId).classList.add(arrDef[0], arrDef[1], arrDef[2], arrDef[3]);
			portThree.postMessage({action: 'deactivate' + featureIdUC, activeTab: activeTab});
			portThree.onMessage.addListener(async function (response) {
				if (response.action.includes(featRespMessage + ' Deactivated')) {
					await chrome.storage.local.set({['whichFeatureActive' + activeTab[0].id]: null});
				}
			});
		}
	}
}
