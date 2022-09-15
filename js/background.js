//Global Vars, PageRuler
let threshold = 20;
let grayImage;
let width;
let height;

chrome.action.onClicked.addListener(() => {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		let portOne = chrome.tabs.connect(tabs[0].id, {name: 'portOne'});
		portOne.postMessage({action: 'extClicked'});
		portOne.onMessage.addListener(function (response) {
			console.log(new Date().getSeconds(), new Date().getMilliseconds(), 'Action', response.action);
		});
	});
});

chrome.runtime.onConnect.addListener(function (portThree) {
	portThree.onMessage.addListener(function (request) {
		if (request.action === 'bodyScreenshot') {
			chrome.tabs.captureVisibleTab({format: 'png'}, function (bodyScreenshot) {
				portThree.postMessage({action: 'bodyScreenshotDone', bodyScreenshot: bodyScreenshot});
			});
		}
		if (request.action === 'storeData') {
			width = request.width;
			height = request.height;
			grayImage = request.grayImage;
		}
		if (request.action === 'measureDistance') {
			portThree.postMessage({
				action: 'measureDistanceDone',
				distances: measureDistance(request.inputX, request.inputY),
			});
		}
	});
});

// Checks If Mouse Position Is Not at Display Boundary
function isDisplayBoundary(inputX, inputY) {
	if (inputX > 0 && inputX < width && inputY > 0 && inputY < height) return true;
	else return false;
}

// Called From MeasureDistances, Returns Lightness at Given Coordinates
function getLightnessAt(grayImage, inputX, inputY) {
	return isDisplayBoundary(inputX, inputY) ? grayImage[inputY * width + inputX] : -1;
}

// Calculates Result using GrayImage + Mouse Coordinates
function measureDistance(inputX, inputY) {
	if (!isDisplayBoundary(inputX, inputY)) return false;

	let area = 0;
	let distances = {top: 0, right: 0, bottom: 0, left: 0};
	let directions = {
		top: {x: 0, y: -1},
		right: {x: 1, y: 0},
		bottom: {x: 0, y: 1},
		left: {x: -1, y: 0},
	};
	let lightness = getLightnessAt(grayImage, inputX, inputY);
	console.log(lightness);

	if (lightness === 68) return false;

	for (let direction in distances) {
		let vector = directions[direction];
		let boundaryFound = false;
		let sX = inputX;
		let sY = inputY;
		let currentLightness;

		while (!boundaryFound) {
			sX += vector.x;
			sY += vector.y;
			currentLightness = getLightnessAt(grayImage, sX, sY);

			if (currentLightness && Math.abs(currentLightness - lightness) < threshold) {
				distances[direction]++;
			} else {
				area += distances[direction];
				boundaryFound = true;
			}
		}
	}

	if (area <= 6) {
		distances = {top: 0, right: 0, bottom: 0, left: 0};
		let similarColorStreakThreshold = 10;

		for (let direction in distances) {
			let vector = directions[direction];
			let boundaryFound = false;
			let sX = inputX;
			let sY = inputY;
			let currentLightness;
			let lastLightness = lightness;
			let similarColorStreak = 0;

			while (!boundaryFound) {
				sX += vector.x;
				sY += vector.y;
				currentLightness = getLightnessAt(grayImage, sX, sY);

				if (currentLightness) {
					distances[direction]++;

					if (Math.abs(currentLightness - lastLightness) < threshold) {
						similarColorStreak++;
						if (similarColorStreak === similarColorStreakThreshold) {
							distances[direction] -= similarColorStreakThreshold + 1;
							boundaryFound = true;
						}
					} else {
						similarColorStreak = 0;
					}
					lastLightness = currentLightness;
				} else {
					boundaryFound = true;
				}
			}
		}
	}

	distances.x = inputX;
	distances.y = inputY;
	return distances;
}
