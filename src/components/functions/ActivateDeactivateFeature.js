export default function ActivateDeactivateFeature(allFeatures, featureId) {
	if (allFeatures.length !== 0) {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			let portThree = chrome.tabs.connect(tabs[0].id, {name: 'portThree'});
			allFeatures.map(function (value, index) {
				// If Null, Hide All Active Feature With Nothing Active (For Pause Functionality)
				if (featureId === null) {
					document.querySelector('#pauseExtensionButton').style.visibility = 'hidden';
					JustHideMe(portThree, value.id);
				}
				// Disable All
				else if (featureId !== value.id) {
					JustHideMe(portThree, value.id);
				}
				// Except The One Clicked
				else if (featureId === value.id) {
					HideMeShowMe(portThree, value.id);
				}
			});
		});
	}
}

function HideMeShowMe(portThree, featureId) {
	// Function for Exceptions
	if (featureId === 'clearAllCache') {
		setTimeout(function () {
			portThree.postMessage({action: 'activate' + (featureId.charAt(0).toUpperCase() + featureId.slice(1))});
		}, 50);

		portThree.onMessage.addListener(function (response) {
			if (response.action.includes('Activated')) {
				chrome.storage.local.set({whichFeatureActive: featureId});
			}
		});
	}

	// Function for Most Features
	else if (document.querySelector('#' + featureId)) {
		// Activate On Click If Not Active
		if (!document.querySelector('#' + featureId).classList.contains('active')) {
			document.querySelector('#pauseExtensionButton').style.visibility = 'visible';
			document.querySelector('#' + featureId).classList.remove('from-btnOne', 'to-btnTwo');
			document.querySelector('#' + featureId).classList.add('from-btnThree', 'via-btnFour', 'to-btnFive', 'active');

			setTimeout(function () {
				portThree.postMessage({action: 'activate' + (featureId.charAt(0).toUpperCase() + featureId.slice(1))});
			}, 50);

			portThree.onMessage.addListener(function (response) {
				if (response.action.includes('Activated')) {
					chrome.storage.local.set({whichFeatureActive: featureId});
				}
			});
		}

		// Deactivate On Click If Active
		else {
			document.querySelector('#pauseExtensionButton').style.visibility = 'hidden';
			document.querySelector('#' + featureId).classList.remove('from-btnThree', 'via-btnFour', 'to-btnFive', 'active');
			document.querySelector('#' + featureId).classList.add('from-btnOne', 'to-btnTwo');
			portThree.postMessage({action: 'deactivate' + (featureId.charAt(0).toUpperCase() + featureId.slice(1))});
		}
	}
}

function JustHideMe(portThree, featureId) {
	if (document.querySelector('#' + featureId)) {
		if (document.querySelector('#' + featureId).classList.contains('active')) {
			document.querySelector('#' + featureId).classList.remove('from-btnThree', 'via-btnFour', 'to-btnFive', 'active');
			document.querySelector('#' + featureId).classList.add('from-btnOne', 'to-btnTwo');
			portThree.postMessage({action: 'deactivate' + (featureId.charAt(0).toUpperCase() + featureId.slice(1))});
		}
	}
}
