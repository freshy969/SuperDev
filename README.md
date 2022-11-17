## SuperDev

An Open-Source Swiss Army Toolbox for Web Designers, Developers, and Founders that Minimises the Development/Designing Time and Provides Various Tools to Debug The Web Without Any Hassle.

```
- Text Editor - Edit Any Website's Text Easily   
- Page Ruler - Measure Distance Between Two Points   
- Color Picker - Pick Site Colors, Even From Images in RGB/Hex   
- Color Palette - Website's Colors Palette In RGB/Hex   
- Page Guideline - Check Alignments In Real-time With Guidelines    
- Page Highlight - Highlight Page Elements With Different Colors   
- Move Element - Move Any Element Within The Page   
- Delete Element - Delete Any Element From The Page   
- Export Element - Export HTML + CSS of Any Page Element   
- Clear All Cache - Clear Cache/Cookie/LocalStorage   
```

### Install On

* [Google Chrome](https://chrome.google.com/webstore/detail/superdev/jlkikimlceonbmfjieipbonnglnlchhl) - Working Perfectly
* [Microsoft Edge](https://chrome.google.com/webstore/detail/superdev/jlkikimlceonbmfjieipbonnglnlchhl) - Working Perfectly
* [Brave Browser](https://chrome.google.com/webstore/detail/superdev/jlkikimlceonbmfjieipbonnglnlchhl) - Working Perfectly
* [Mozilla Firefox]() - Coming Really Soon

### Privacy Note
```
- It Does Not Collect Any Data At All
- The Extension Is Fully Offline Except Two Fetch Requests
- Those Fetch Request Are Used To Fetch Site's External Stylesheets
- And Those Stylesheets Are Needed By Export Element Feature
```

### Additional Features
```
- Dark/Light Theme - Choose Theme, Dark or Light
- Minimise Popup - Manual/Auto Minimise Popup
- Move Popup - Move Popup Anywhere On The Page
- Customise Settings - Choose From Multiple Settings
```

### Build Manually

```
pnpm install && pnpm run build
pnpm run move && pnpm run copy && pnpm run remove && pnpm run renameCSS && pnpm run renameHTML
browserify ./src/js/cs.js | terser -c -f ascii_only > ./build/js/cs.js
browserify ./src/js/bg.js | terser -c -f ascii_only > ./build/js/bg.js
```

```
Now Enable Developer Mode in Chrome Extension and Load Unpacked Extension From Build Folder.
```

### TODO:

```
Fix DOM Reflow on Moving Popup
Optimise Export Element Algorithm
Optimise Code For Performance/Design
```
