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
- Export Element - Export HTML + Used CSS of Any Page Element   
- Clear All Cache - Clear Cache/Cookie/LocalStorage   
```

### Troubleshooting
```
- I Am Working At Least 12Hrs A Day On This So Bug Reports Are Most Welcome
- If It's Not Working On A Site, Try Turning It Off And/Or Refreshing The Page
- If It's Still Not Working, Uninstall and Reinstall The Extension
- Make Sure You're Running The Latest Version of SuperDev + The Browser
- If None of This Work, Submit An Issue
```

### Privacy Note
```
- It Does Not Collect Any Data At All
- The Extension Is Fully Offline Except Two Fetch Requests
- Those Fetch Requests Are Used To Fetch Site's External Stylesheets
- And Those Stylesheets Are Needed By Export Element Feature
- Plus Every Bit of SuperDev Free Is Open Source Code
```

### Additional Features
```
- Dark/Light Theme - Choose Theme, Dark or Light
- Minimise Popup - Manual/Auto Minimise Popup
- Move Popup - Move Popup Anywhere On The Page
- Customise Settings - Choose From Multiple Settings
```

### Install On

* [Google Chrome](https://chrome.google.com/webstore/detail/superdev/jlkikimlceonbmfjieipbonnglnlchhl) - Working Perfectly
* [Microsoft Edge](https://chrome.google.com/webstore/detail/superdev/jlkikimlceonbmfjieipbonnglnlchhl) - Working Perfectly
* [Brave Browser](https://chrome.google.com/webstore/detail/superdev/jlkikimlceonbmfjieipbonnglnlchhl) - Working Perfectly
* [Mozilla Firefox]() - Coming Really Soon<br>

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

### Built With
```
ReactJS - SuperDev Popup
TailWindCSS - SuperDev Popup
PostCSS - Used By Export Element
JSBeautify - Used By Export Element
```

### TODO:

```
Fix DOM Reflow on Moving Popup
Optimise Export Element Algorithm
Optimise Code For Performance/Design
```
