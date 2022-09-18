export default function DisableAllFeatureExcept(featureId) {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		let portFour = chrome.tabs.connect(tabs[0].id, {name: 'portFour'});
		let allFeatures = JSON.parse(localStorage.getItem('allFeatures'));
		allFeatures.map((value, index) => {
			// Disable All
			if (value.id !== featureId) {
				if (value.id === 'textEditor') {
					if (document.querySelector('#' + value.id).classList.contains('active')) {
						document.querySelector('#' + value.id).classList.remove('from-pink-500', 'via-red-500', 'to-yellow-500', 'active');
						document.querySelector('#' + value.id).classList.add('from-btnOne', 'to-btnTwo');
						portFour.postMessage({action: 'deactivateTextEditor'});
					}
				}
				if (value.id === 'pageRuler') {
					if (document.querySelector('#' + value.id).classList.contains('active')) {
						document.querySelector('#' + value.id).classList.remove('from-pink-500', 'via-red-500', 'to-yellow-500', 'active');
						document.querySelector('#' + value.id).classList.add('from-btnOne', 'to-btnTwo');
						portFour.postMessage({action: 'deactivatePageRuler'});
					}
				}
			}

			// Except The One Clicked
			else if (value.id === featureId) {
				// Text Editor
				if (value.id === 'textEditor') {
					// Activate On Click If Not Active
					if (!document.querySelector('#' + featureId).classList.contains('active')) {
						document.querySelector('#' + featureId).classList.remove('from-btnOne', 'to-btnTwo');
						document.querySelector('#' + featureId).classList.add('from-pink-500', 'via-red-500', 'to-yellow-500', 'active');

						portFour.postMessage({action: 'activateTextEditor'});
						portFour.onMessage.addListener(function (response) {
							console.log('Got Response : ', response.action);
						});
					}
					// Deactivate On Click If Active
					else if (document.querySelector('#' + featureId).classList.contains('active')) {
						document.querySelector('#' + value.id).classList.remove('from-pink-500', 'via-red-500', 'to-yellow-500', 'active');
						document.querySelector('#' + value.id).classList.add('from-btnOne', 'to-btnTwo');

						portFour.postMessage({action: 'deactivateTextEditor'});
						portFour.onMessage.addListener(function (response) {
							console.log('Got Response : ', response.action);
						});
					}
				}

				// Page Ruler
				else if (value.id === 'pageRuler') {
					// Activate On Click If Not Active
					if (!document.querySelector('#' + featureId).classList.contains('active')) {
						document.querySelector('#' + featureId).classList.remove('from-btnOne', 'to-btnTwo');
						document.querySelector('#' + featureId).classList.add('from-pink-500', 'via-red-500', 'to-yellow-500', 'active');

						portFour.postMessage({action: 'activatePageRuler'});
						portFour.onMessage.addListener(function (response) {
							console.log('Got Response : ', response.action);
						});
					}
					// Deactivate On Click If Active
					else if (document.querySelector('#' + featureId).classList.contains('active')) {
						document.querySelector('#' + value.id).classList.remove('from-pink-500', 'via-red-500', 'to-yellow-500', 'active');
						document.querySelector('#' + value.id).classList.add('from-btnOne', 'to-btnTwo');

						portFour.postMessage({action: 'deactivatePageRuler'});
						portFour.onMessage.addListener(function (response) {
							console.log('Got Response : ', response.action);
						});
					}
				}
			}
		});
	});
}
