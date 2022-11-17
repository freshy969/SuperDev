## SuperDev

A Swiss Army Toolbox for Web Designers and Developers.
List of Free Feature below -

```
1. Text Editor
2. Page Ruler
3. Color Picker
4. Color Palette
5. Page Guideline
6. Page Highlight
7. Move Element
8. Delete Element
9. Export Element
10. Clear All Cache
```

## Screenshots

<p align="center">
  <img src="https://github.com/twoabd/SuperDev/blob/main/screenshots/1.png">
</p>

## Install From Chrome Store

```
[SuperDev - Chrome Web Store](https://chrome.google.com/webstore/detail/superdev/jlkikimlceonbmfjieipbonnglnlchhl)
```

## Or Build and Run

```
pnpm install && pnpm run build
pnpm run move && pnpm run copy && pnpm run remove && pnpm run renameCSS && pnpm run renameHTML
browserify ./src/js/cs.js | terser -c -f ascii_only > ./build/js/cs.js
browserify ./src/js/bg.js | terser -c -f ascii_only > ./build/js/bg.js
```

```
Now Enable Developer Mode in Chrome Extension and Load Unpacked Extension from build folder.
```

## TODO:

```
Fix Re-Render Issue on Moving Popup
Optimise Export Element Algorithm
Optimise Code For Performance
Optimise Code For Design Patterns
CSP Form-Action Issue While Exporting to Codepen
CORS Issue (Image, Fonts, Media) On Codepen
```
