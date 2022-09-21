export default function CalcHeightHasSettings(allFeatures) {
	if (allFeatures.length !== 0) {
		let [count, height] = [0, 0];
		allFeatures.map((value) => (value.hasSettings === true && value.isEnabled === true ? (count = count + 1) : (count = count)));
		height = count % 2 === 0 ? 41 + 17 + (count / 2) * 48 : 41 + 17 + ((count + 1) / 2) * 48;
		console.log('Height of Enabled and Has Settings', height);
		return height;
	}
}
