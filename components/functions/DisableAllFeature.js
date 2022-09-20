export default function DisableAllFeature(allFeatures) {
	if (allFeatures.length !== 0) {
		chrome.storage.onChanged.addListener(function (changes) {
			if (changes.isHidden) {
				if (changes.isHidden.newValue === true) {
					allFeatures.map((value, index) => {
						if (document.querySelector('#' + value.id) && document.querySelector('#' + value.id).classList.contains('active')) {
							document.querySelector('#' + value.id).classList.remove('from-pink-500', 'via-red-500', 'to-yellow-500', 'active');
							document.querySelector('#' + value.id).classList.add('from-btnOne', 'to-btnTwo');
							portFour.postMessage({action: 'deactivatePageRuler'});
						}
					});
				}
			}
		});
	}
}
