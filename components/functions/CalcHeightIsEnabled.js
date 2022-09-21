export default function CalcHeightIsEnabled(allFeatures) {
	if (allFeatures.length !== 0) {
		let [count, height] = [0, 0];
		allFeatures.map((value) => (value.isEnabled === true ? (count = count + 1) : (count = count)));
		height = count % 2 === 0 ? 42 + 17 + (count / 2) * 48 : 42 + 17 + ((count + 1) / 2) * 48;
		console.log('Height Is Enabled', height);
		return height;
	}
}
