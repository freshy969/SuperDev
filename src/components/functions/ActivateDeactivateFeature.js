export default function ActivateDeactivateFeature(allFeatures, featureId) {
	if (allFeatures.length !== 0) {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			let portFour = chrome.tabs.connect(tabs[0].id, {name: 'portFour'});
			allFeatures.map((value, index) => {
				// If Null, Hide All Active Feature With Nothing Active (For Pause Functionality)
				if (featureId === null) JustHideMe(portFour, value.id);
				// Disable All
				else if (featureId !== value.id) JustHideMe(portFour, value.id);
				// Except The One Clicked
				else if (featureId === value.id) HideMeShowMe(portFour, value.id);
			});
		});
	}
}

function HideMeShowMe(portFour, featureId) {
	if (document.querySelector('#' + featureId)) {
		// Activate On Click If Not Active
		if (!document.querySelector('#' + featureId).classList.contains('sd-active')) {
			document.querySelector('#' + featureId).classList.remove('sd-from-btnOne', 'sd-to-btnTwo');
			document.querySelector('#' + featureId).classList.add('sd-from-pink-500', 'sd-via-red-500', 'sd-to-yellow-500', 'sd-active');

			portFour.postMessage({action: 'activate' + (featureId.charAt(0).toUpperCase() + featureId.slice(1))});
			portFour.onMessage.addListener(function (response) {
				console.log('Got Response : ', response.action);
			});
		}
		// Deactivate On Click If Active
		else {
			document.querySelector('#' + featureId).classList.remove('sd-from-pink-500', 'sd-via-red-500', 'sd-to-yellow-500', 'sd-active');
			document.querySelector('#' + featureId).classList.add('sd-from-btnOne', 'sd-to-btnTwo');

			portFour.postMessage({action: 'deactivate' + (featureId.charAt(0).toUpperCase() + featureId.slice(1))});
			portFour.onMessage.addListener(function (response) {
				console.log('Got Response : ', response.action);
			});
		}
	}
}

function JustHideMe(portFour, featureId) {
	if (document.querySelector('#' + featureId)) {
		if (document.querySelector('#' + featureId).classList.contains('sd-active')) {
			document.querySelector('#' + featureId).classList.remove('sd-from-pink-500', 'sd-via-red-500', 'sd-to-yellow-500', 'sd-active');
			document.querySelector('#' + featureId).classList.add('sd-from-btnOne', 'sd-to-btnTwo');
			portFour.postMessage({action: 'deactivate' + (featureId.charAt(0).toUpperCase() + featureId.slice(1))});
		}
	}
}
