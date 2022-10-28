export default function ChangeHeight(portThree, height) {
	portThree.postMessage({action: 'changeHeight', height: height});
}
