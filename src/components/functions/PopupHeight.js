export default function PopupHeight(allFeatures) {
	if (allFeatures.length !== 0) {
		let [count, height] = [0, 0];
		allFeatures.map(function () {
			count = count + 1;
		});
		if (count === 0) height = 40.5;
		else height = count % 2 === 0 ? 40.5 + 17 + (count / 2) * 48 : 40.5 + 17 + ((count + 1) / 2) * 48;
		return height;
	}
}
