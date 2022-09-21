export default function CalcHeightAllFeatures(allFeatures) {
	if (allFeatures.length !== 0) {
		let [count, height] = [0, 0];
		allFeatures.map((value, index) => (count = count + 1));
		height = count % 2 === 0 ? 41 + 17 + (count / 2) * 48 : 41 + 17 + ((count + 1) / 2) * 48;
		console.log('Height All Features', height);
		return height;
	}
}
