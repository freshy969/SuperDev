export default function DisableAllFeatureExcept(allFeatures, featureId) {
	if (allFeatures.length !== 0) {
		allFeatures.map((value, index) => {
			chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
				let portFour = chrome.tabs.connect(tabs[0].id, {name: 'portFour'});
				// Disable All
				if (value.id !== featureId) {
					if (value.id === 'textEditor') JustHideMe(portFour, value.id);
					if (value.id === 'pageRuler') JustHideMe(portFour, value.id);
				}
				// Except The One Clicked
				else {
					if (value.id === 'textEditor') HideMeShowMe(portFour, featureId);
					else if (value.id === 'pageRuler') HideMeShowMe(portFour, featureId);
				}
			});
		});
	}
}

function HideMeShowMe(portFour, featureId) {
	// Activate On Click If Not Active
	if (!document.querySelector('#' + featureId).classList.contains('active')) {
		document.querySelector('#' + featureId).classList.remove('from-btnOne', 'to-btnTwo');
		document.querySelector('#' + featureId).classList.add('from-pink-500', 'via-red-500', 'to-yellow-500', 'active');

		portFour.postMessage({action: 'activate' + (featureId.charAt(0).toUpperCase() + featureId.slice(1))});
		portFour.onMessage.addListener(function (response) {
			console.log('Got Response : ', response.action);
		});
	}
	// Deactivate On Click If Active
	else {
		document.querySelector('#' + value.id).classList.remove('from-pink-500', 'via-red-500', 'to-yellow-500', 'active');
		document.querySelector('#' + value.id).classList.add('from-btnOne', 'to-btnTwo');

		portFour.postMessage({action: 'deactivate' + (featureId.charAt(0).toUpperCase() + featureId.slice(1))});
		portFour.onMessage.addListener(function (response) {
			console.log('Got Response : ', response.action);
		});
	}
}

function JustHideMe(portFour, featureId) {
	if (document.querySelector('#' + featureId).classList.contains('active')) {
		document.querySelector('#' + featureId).classList.remove('from-pink-500', 'via-red-500', 'to-yellow-500', 'active');
		document.querySelector('#' + featureId).classList.add('from-btnOne', 'to-btnTwo');
		portFour.postMessage({action: 'deactivate' + (featureId.charAt(0).toUpperCase() + featureId.slice(1))});
		portFour.onMessage.addListener(function (response) {
			console.log('Got Response : ', response.action);
		});
	}
}
