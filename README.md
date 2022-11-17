### SuperDev

A Swiss Army Toolbox for Web Designers and Developers.
List of Free Feature below -

```
📍 Text Editor - Edit Any Website's Text Easily
📍 Page Ruler - Measure Distance Between Two Points
📍 Color Picker - Pick Site Colors, Even From Images in RGB/Hex
📍 Color Palette - Website's Colors Palette In RGB/Hex
📍 Page Guideline - Check Alignments In Real-time With Guidelines 
📍 Page Highlight - Highlight Page Elements With Different Colors
📍 Move Element - Move Any Element Within The Page
📍 Delete Element - Delete Any Element From The Page
📍 Export Element - Export HTML + CSS of Any Page Element
📍 Clear All Cache - Clear Cache/Cookie/LocalStorage
```

### Screenshots

<p align="center">
  <img src="https://github.com/twoabd/SuperDev/blob/main/screenshots/1.png">
</p>

### Install From Chrome Store

[SuperDev - Chrome Web Store](https://chrome.google.com/webstore/detail/superdev/jlkikimlceonbmfjieipbonnglnlchhl)


### Or Build and Run

```
pnpm install && pnpm run build
pnpm run move && pnpm run copy && pnpm run remove && pnpm run renameCSS && pnpm run renameHTML
browserify ./src/js/cs.js | terser -c -f ascii_only > ./build/js/cs.js
browserify ./src/js/bg.js | terser -c -f ascii_only > ./build/js/bg.js
```

```
Now Enable Developer Mode in Chrome Extension and Load Unpacked Extension from build folder.
```

### TODO:

```
Fix Re-Render Issue on Moving Popup
Optimise Export Element Algorithm
Optimise Code For Performance
Optimise Code For Design Patterns
CSP Form-Action Issue While Exporting to Codepen
CORS Issue (Image, Fonts, Media) On Codepen
```
