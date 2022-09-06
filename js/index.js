let indexDim = [412, 625];
let indexPos = [18, 18];
document.getElementById('superDevIndex').style.width = `${indexDim[0]}px`;
document.getElementById('superDevIndex').style.height = `${indexDim[1]}px`;
chrome.storage.sync.set({indexDim: indexDim}, function () {});
chrome.storage.sync.set({indexPos: indexPos}, function () {});
