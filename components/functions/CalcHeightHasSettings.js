export default function CalcHeightHasSettings(allFeatures) {
	if (allFeatures.length !== 0) {
		let [count, height] = [0, 0];
		allFeatures.map((value) => (value.hasSettings === true && value.isEnabled === true ? (count = count + 1) : (count = count)));
		height = count % 2 === 0 ? 42 + 17 + (count / 2) * 48 : 42 + 17 + ((count + 1) / 2) * 48;
		console.log('Height Is Enabled & Has Settings', height);
		return height;
	}
}
