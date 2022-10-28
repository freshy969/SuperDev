export default function JustChangeHeight(portThree, height) {
	portThree.postMessage({action: 'justChangeHeight', height: height});
}
