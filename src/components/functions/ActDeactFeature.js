export default function ActDeactFeature(portThree, allFeatures, featureId) {
	if (allFeatures.length !== 0) {
		allFeatures.map(function (value, index) {
			// Disable All
			if (featureId !== value.id) {
				JustHideMe(portThree, value.id);
			}
			// Except The One Clicked
			else if (featureId === value.id) {
				HideMeShowMe(portThree, value.id);
			}
		});
	}
}

function HideMeShowMe(portThree, featureId) {
	if (document.querySelector('#' + featureId)) {
		// Activate On Click If Inactive
		if (!document.querySelector('#' + featureId).classList.contains('active')) {
			switch (featureId) {
				case 'clearAllCache':
					setTimeout(function () {
						portThree.postMessage({action: 'activate' + (featureId.charAt(0).toUpperCase() + featureId.slice(1))});
					}, 50);

					portThree.onMessage.addListener(function (response) {
						if (response.action.includes('Activated')) {
							chrome.storage.local.set({whichFeatureActive: featureId});
						}
					});
					break;
				case 'colorPalette':
					document.querySelector('#pauseExtensionButton').style.visibility = 'visible';
					setTimeout(function () {
						portThree.postMessage({action: 'activate' + (featureId.charAt(0).toUpperCase() + featureId.slice(1))});
					}, 50);

					portThree.onMessage.addListener(function (response) {
						if (response.action.includes('Activated')) {
							chrome.storage.local.set({whichFeatureActive: featureId});
						}
					});
					break;
				default:
					document.querySelector('#pauseExtensionButton').style.visibility = 'visible';
					document.querySelector('#' + featureId).classList.remove('from-btnOne', 'dark:from-btnOneD', 'to-btnTwo', 'dark:to-btnTwoD');
					document
						.querySelector('#' + featureId)
						.classList.add('from-btnThree', 'dark:from-btnThreeD', 'via-btnFour', 'dark:via-btnFourD', 'to-btnFive', 'dark:to-btnFiveD', 'active');

					setTimeout(function () {
						portThree.postMessage({action: 'activate' + (featureId.charAt(0).toUpperCase() + featureId.slice(1))});
					}, 50);

					portThree.onMessage.addListener(function (response) {
						if (response.action.includes('Activated')) {
							chrome.storage.local.set({whichFeatureActive: featureId});
						}
					});
					break;
			}
		}

		// Deactivate On Click If Active
		else {
			document.querySelector('#pauseExtensionButton').style.visibility = 'hidden';
			document
				.querySelector('#' + featureId)
				.classList.remove('from-btnThree', 'dark:from-btnThreeD', 'via-btnFour', 'dark:via-btnFourD', 'to-btnFive', 'dark:to-btnFiveD', 'active');
			document.querySelector('#' + featureId).classList.add('from-btnOne', 'dark:from-btnOneD', 'to-btnTwo', 'dark:to-btnTwoD');

			setTimeout(function () {
				portThree.postMessage({action: 'deactivate' + (featureId.charAt(0).toUpperCase() + featureId.slice(1))});
			}, 50);

			portThree.onMessage.addListener(function (response) {
				if (response.action.includes('Deactivated')) {
					chrome.storage.local.set({whichFeatureActive: null});
				}
			});
		}
	}
}

function JustHideMe(portThree, featureId) {
	if (document.querySelector('#' + featureId)) {
		if (document.querySelector('#' + featureId).classList.contains('active')) {
			document
				.querySelector('#' + featureId)
				.classList.remove('from-btnThree', 'dark:from-btnThreeD', 'via-btnFour', 'dark:via-btnFourD', 'to-btnFive', 'dark:to-btnFiveD', 'active');
			document.querySelector('#' + featureId).classList.add('from-btnOne', 'dark:from-btnOneD', 'to-btnTwo', 'dark:to-btnTwoD');

			setTimeout(function () {
				portThree.postMessage({action: 'deactivate' + (featureId.charAt(0).toUpperCase() + featureId.slice(1))});
			}, 50);
		}
	}
}
