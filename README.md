# Canvas lib
This library adds a wrapper around the HTML canvas for easier use of adding image and video layers in the web browser.
## Installation
```sh
npm install antheboets/canvas-lib
```
You can also add the dev version which may have more features but can be less stable.
```sh
npm install antheboets/canvas-lib:dev
```
After installing the module you can import it into JavaScript.
```javascript
import {getCanvas} from 'canvaslib'
```
## How to use
Initialize the canvas object.
```javascript
const canvas = getCanvas()
```
Add content.
```javascript
//importing module
import {getCanvas,BackgroundVideo} from 'canvaslib'
//getten default background video object
const video = BackgroundVideo()
//setting path of the content
video.path = "./background.mp4"
//adding background video first
canvas.createLayer(video)
//adding first layer with images
canvas.createLayer(["./layer1.png","./layer2.png","./layer3.png"])
//adding second layer with images
canvas.createLayer(["./layer11.png","./layer12.png"])
```
Starting the animation after waiting till all the content has loaded.
```javascript
await canvas.startAsync()
```
There is a demo project [canvas-lib-demo](https://github.com/antheboets/html-canvas-lib-demo), that you can use to see how the module works. To use this module you need a JavaScript bundler. You can find more information in the demo project on how to use it.