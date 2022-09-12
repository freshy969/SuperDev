export default function CalcHeightAllFeatures() {
	let allFeatures = JSON.parse(localStorage.getItem('allFeatures'));
	let [count, height] = [0, 0];
	allFeatures.map((value, index) => (count = count + 1));
	height = count % 2 === 0 ? 41 + 18 + (count / 2) * 48 : 41 + 18 + ((count + 1) / 2) * 48;
	return height;
}
