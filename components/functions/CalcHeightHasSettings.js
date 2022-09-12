export default function CalcHeightHasSettings() {
	let allFeatures = JSON.parse(localStorage.getItem('allFeatures'));
	let [count, height] = [0, 0];
	allFeatures.map((value) => (value.hasSettings === true ? (count = count + 1) : (count = count)));
	height = count % 2 === 0 ? 41 + 18 + (count / 2) * 48 : 41 + 18 + ((count + 1) / 2) * 48;
	return height;
}
