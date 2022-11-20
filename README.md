## SuperDev &middot; [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

An Open-Source Swiss Army Toolbox for Web Designers, Developers, and Founders that Minimises the Development/Designing Time and Provides Various Tools to Debug The Web Without Any Hassle.

* Text Editor - Edit Any Website's Text Easily
* Page Ruler - Measure Distance Between Two Points
* Color Picker - Pick Site Colors, Even From Images in RGB/Hex
* Color Palette - Website's Colors Palette In RGB/Hex
* Page Guideline - Check Alignments In Real-time With Guidelines
* Page Highlight - Highlight Page Elements With Different Colors
* Move Element - Move Any Element Within The Page
* Delete Element - Delete Any Element From The Page
* Export Element - Export HTML + Used CSS of Any Page Element
* Clear All Cache - Clear Cache/Cookie/LocalStorage

### Screenshots
<p align="center">
  <img src="https://github.com/twoabd/superdev/blob/main/screenshots/github/1.png">
</p>

### Click to Watch on Youtube
<p align="center">
  <a href="https://www.youtube.com/watch?v=KWj-TqCuoHo">
    <img src="https://github.com/twoabd/superdev/blob/main/screenshots/youtube/1.png">
  </a>
</p>

### Privacy Note
* It Does Not Collect Any Data At All
* The Extension Is Fully Offline Except For Two Fetch Requests
* Those Fetch Requests Are Used To Fetch The Site's External Stylesheets
* And Those Stylesheets Are Needed By Export Element Feature
* Plus, Every Bit of SuperDev Free Is Open Source Code


### Additional Features
* Dark/Light Theme - Choose Between Dark And Light Mode
* Minimise Popup - Manual/Auto Minimise Popup
* Move Popup - Move Popup Anywhere On The Page
* Customise Settings - Choose From Multiple Settings


### Install On
* [Google Chrome](https://chrome.google.com/webstore/detail/superdev/jlkikimlceonbmfjieipbonnglnlchhl) - Working Perfectly
* [Microsoft Edge](https://chrome.google.com/webstore/detail/superdev/jlkikimlceonbmfjieipbonnglnlchhl) - Working Perfectly
* [Brave Browser](https://chrome.google.com/webstore/detail/superdev/jlkikimlceonbmfjieipbonnglnlchhl) - Working Perfectly
* [Mozilla Firefox]() - Coming Really Soon<br>

### Build Manually
```
pnpm install
pnpm run build
pnpm browserify
```

Now Enable Developer Mode in Chrome Extension and Load Unpacked Extension From Build Folder.


### Built With
* ReactJS - Used By SuperDev Popup
* TailWindCSS - Used By SuperDev Popup
* PostCSS - Used By Export Element
* JSBeautify - Used By Export Element


### Troubleshooting
* I Am Working At Least 12Hrs A Day On This, So Bug Reports Are Most Welcome
* If It's Not Working On A Site, Try Turning It Off And/Or Refreshing The Page
* If It's Still Not Working, Uninstall and Reinstall The Extension
*  Make Sure You're Running The Latest Version of SuperDev + The Browser
* If None of This Work, Submit An Issue

### Important Note
* Page Ruler and Color Picker Both Takes Page Screenshots, Process That Image to Find the Distance Between Two Objects and The Color of That Area. It Means It Won't Work Properly on Sliders and Moving Elements of The Page
* Export to Codepen Functionality of Export Element Features Won't Work on Some Super Secure Sites Because of CSP (Form Action) Header, Save to File Instead in That Case. Due to Issues in Chrome API MV3, CSP Header Can't Be Modified Programmatically, and Disabling CSP Will Be A Major Security Risk, That's Why I Am Leaving It As It Is.
* Export Element Feature Currently Disables CORS on All Fonts, Images, and Media Files Across All Websites. This Is To Ensure All Fonts, Images, and Media Files Load Correctly on Codepen and Exported Files on The User's Device. However, I Still Need to Figure Out Whether to Retain This Feature or Remove It.

### TODO:
* Optimise Export Element Algorithm
* Optimise Code For Performance/Design
* Add Support for Mozilla Firefox
