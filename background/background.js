chrome.action.onClicked.addListener((tab) => {
	if (!tab.url.includes('chrome://')) {
		chrome.scripting.executeScript({
			target: {tabId: tab.id},
			function: popup,
		});
	}
});

function popup() {
	if (document.getElementById('superDev') !== null) {
		document.getElementById('superDev').remove();
	} else {
		let iframe = document.createElement('iframe');
		iframe.src = chrome.runtime.getURL('index.html');
		iframe.id = 'superDev';
		iframe.attributes = 'draggable';
		iframe.style.cssText =
			'position: fixed !important; animation-duration: 0.5s !important; animation-timing-function: ease-in-out !important; animation-fill-mode: forwards !important; top: 18px !important; right: 18px !important; box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.09) !important; width: 412px !important; height: 625px !important; border: 0 !important; border-radius: 8px !important; transition: 1s !important; transition-timing-function: ease-out; display: block !important; z-index: 99999999 !important;';
		document.body.appendChild(iframe);
	}
}

// if (!tab.url.includes('chrome://')) {
// 	dragElement(document.getElementById('superDev'));
// 	function dragElement(htmlElement) {
// 		var positionOne = 0,
// 			positionTwo = 0,
// 			positionThree = 0,
// 			positionFour = 0;
// 		if (document.getElementById(htmlElement.id + 'Main')) {
// 			document.getElementById(htmlElement.id + 'Main').onmousedown = dragMouseDown;
// 		} else {
// 			htmlElement.onmousedown = dragMouseDown;
// 		}

// 		function dragMouseDown(e) {
// 			e = e || window.event;
// 			e.preventDefault();
// 			positionThree = e.clientX;
// 			positionFour = e.clientY;
// 			document.onmouseup = closeDragElement;
// 			document.onmousemove = elementDrag;
// 		}

// 		function elementDrag(e) {
// 			e = e || window.event;
// 			e.preventDefault();
// 			positionOne = positionThree - e.clientX;
// 			positionTwo = positionFour - e.clientY;
// 			positionThree = e.clientX;
// 			positionFour = e.clientY;
// 			htmlElement.style.top = htmlElement.offsetTop - positionTwo + 'px';
// 			htmlElement.style.left = htmlElement.offsetLeft - positionOne + 'px';
// 		}

// 		function closeDragElement() {
// 			document.onmouseup = null;
// 			document.onmousemove = null;
// 		}
// 	}
// }
