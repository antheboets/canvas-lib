//import ImageLayer from './imageLayer.js'
import Layer from './Layer.js'
import getCanvas from './CanvasSingleton.js'
import {getTypeOfFileFromPath} from './helper.js'

//rework so it is a class methode of Canvas
function animationLoop(){
    //check if the animation loop needs to be stoped
    if(!getCanvas().startAnimationtest){
        return
    }
    //calc elapsed time since last loop
    getCanvas().now = Date.now()
    getCanvas().elapsed = getCanvas().now - getCanvas().then
    //if enough time has elapsed draw the next frame
    if(getCanvas().elapsed > getCanvas().fpsInterval){
        //get ready for next frame by setting then = now, also adjust for fpsInterval not being multiple of
        getCanvas().then = getCanvas().now - (getCanvas().elapsed % getCanvas().fpsInterval)
         //clear canvas. not always needed but may fix bad pixels form previous video so clear to be safe
        getCanvas().ctx.clearRect(0,0,getCanvas().canvasElement.width,getCanvas().canvasElement.height)
        //only draw if loaded and ready
        if(getCanvas().videoContainer !== undefined && getCanvas().videoContainer.ready){
            //background video
            getCanvas().ctx.drawImage(getCanvas().videoContainer.video,0,0,getCanvas().canvasElement.width,getCanvas().canvasElement.height)
            //layers
            getCanvas().layers.forEach(layer => {
                //image layers
                layer.currentContent.draw(getCanvas().ctx,getCanvas().canvasElement.width,getCanvas().canvasElement.height)
                /*
                if(layer.constructor.name === "ImageLayer"){
                    //add more attributes
                    getCanvas().ctx.drawImage(layer.currentContent.contentObj,0,0,getCanvas().canvasElement.width,getCanvas().canvasElement.height)
                }
                */
                /*
                else if(layer.constructor.name === ""){
                }
                */
            })
        }
        if(getCanvas().drawFps){
            let sinceStart = getCanvas().now - getCanvas().startTime
            //console.log(getCanvas().now, getCanvas().startTime, getCanvas().frameCount)
            //console.log(sinceStart)
            let currentFps = Math.round(1000 / (sinceStart / ++getCanvas().frameCount) * 100) / 100
            //draw pfs on canvas
            getCanvas().ctx.font = "16px Arial"
            getCanvas().ctx.strokeStyle = "grey"
            getCanvas().ctx.fillStyle  = "grey"
            getCanvas().ctx.fillRect(10,10,90,30)
            //console.log(`${currentFps}/${getCanvas().fps}fps`)
            getCanvas().ctx.strokeStyle = "black"
            getCanvas().ctx.fillStyle  = "black"
            getCanvas().ctx.fillText(`${currentFps}/${getCanvas().fps}fps`,20,30)
        }
    }
    window.requestAnimationFrame(animationLoop)
}

export class Canvas{
    constructor(){
        this.layers = []
        this.backgroundVideoLoadedPromise = null
        this.backgroundVideo = document.createElement('video')
        this.backgroundVideo.muted = true
        this.backgroundVideo.autoplay = true
        this.backgroundVideo.loop = true
        this.now = 0
        this.fps = 60
        this.fpsInterval = 1000 / this.fps
        this.then = 0
        this.startTime = 0
        this.elapsed = 0
        this.drawFps = false
        this.frameCount = 0
        this.startAnimationtest = false
        this.canvasElement = document.createElement("canvas")
        this.canvasElement.width = window.innerWidth
        this.canvasElement.height = window.innerHeight
        this.ctx = this.canvasElement.getContext("2d")
        this.videoContainer = {video:this.backgroundVideo,ready:false,scale:Math.min(this.canvasElement.width / this.backgroundVideo.width,this.canvasElement.height / this.backgroundVideo.height)}
        document.body.appendChild(this.canvasElement)
        window.addEventListener('resize',()=>{
            this.canvasElement.height = window.innerHeight
            this.canvasElement.width = window.innerWidth
        })
    }
    async #waitTillLoadedAsync(){
        const promiseList = this.layers.map(layer => {
            return Promise.all(layer.getOnloadPromisesArray())
        })
        promiseList.push(this.backgroundVideoLoadedPromise)
        await Promise.all(promiseList)
    }
    setBackgroundVideo(contentPath){
        //check if path has content
        this.backgroundVideoLoadedPromise = new Promise((resolve, reject)=>{
            this.backgroundVideo.oncanplay = ()=>{
                resolve()
            }
        })
        this.backgroundVideo.src = contentPath
    }
    //
    getLayer(pos){
        if(pos === undefined || pos === null){
            return null
        }
        if(typeof pos !== 'number'){
            return null
        }
        if(this.layers.length <= pos){
            return null
        }
        return this.layers[pos]
    }
    //
    getLayers(){
        return this.layers.map((layer)=>{return layer.getLayer()})
    }
    #addLayer(layer){
        this.layers.push(layer)
    }
    addLayerFromList(listOfLayers){
        const newLayer = new Layer()
        //check for valid input
        //check if string, obj, list of obj, string
        if(Array.isArray(listOfLayers)){
            if(listOfLayers.length !== 0){
                
                listOfLayers.forEach((content)=>{
                    newLayer.addImageFromObj(content)
                })
                
                /*
                if(typeof listOfLayers[0] === 'string' || listOfLayers[0] instanceof String){
                    const newLayer = new ImageLayer()
                    listOfLayers.forEach(element => {
                        newLayer.addLayerItem(element,timeInterval)
                    })
                    this.#addLayer(newLayer)
                }
                //[{path:"./image1.png",timeInterval: 30},{path:"./image2.png",timeInterval: 60}]
                else if(Object.keys(listOfLayers[0]).includes("path") && Object.keys(listOfLayers[0]).includes("timeInterval")){
                    const newLayer = new ImageLayer()
                    listOfLayers.forEach(element => {
                        newLayer.addLayerItem(element.path,element.timeInterval)
                    })
                    this.#addLayer(newLayer)
                }
                */
            }
        }
        this.#addLayer(newLayer)
    }
    addNewLayer(){
        this.#addLayer(new Layer())
    }
    removeLayerContent(layer,content){
        this.layers[layer].removeLayerContent(content)
    }
    stop(){
        this.startAnimationtest = false
    }
    async startAsync(){
        await this.#waitTillLoadedAsync()
        this.videoContainer.ready = true
        this.videoContainer.video.play()
        this.layers.forEach((layer)=>{
            layer.start()
        })
        this.then = Date.now()
        this.startTime = this.then
        this.startAnimationtest = true
        //
        animationLoop()
    }
    //doesnt work 'maximum call stack size exceeded'
    #animationLoop(){
        //check if the animation loop needs to be stoped
        if(!this.startAnimationtest){
            return
        }
        //calc elapsed time since last loop
        this.now = Date.now()
        this.elapsed = this.now - this.then
        //if enough time has elapsed draw the next frame
        console.log(this.elapsed > this.fpsInterval)
        if(this.elapsed > this.fpsInterval){
            //get ready for next frame by setting then = now, also adjust for fpsInterval not being multiple of
            this.then = this.now - (this.elapsed % this.fpsInterval)
             //clear canvas. not always needed but may fix bad pixels form previous video so clear to be safe
            this.ctx.clearRect(0,0,this.canvasElement.width,this.canvasElement.height)
            //only draw if loaded and ready
            if(this.videoContainer !== undefined && this.videoContainer.ready){
                //background video
                this.ctx.drawImage(this.videoContainer.video,0,0,this.canvasElement.width,this.canvasElement.height)
                //layers
                this.layers.forEach(layer => {
                    //image layers
                    if(layer.constructor.name === "ImageLayer"){
                        //add more attributes
                        this.ctx.drawImage(layer.currentContent.contentObj,0,0,this.canvasElement.width,this.canvasElement.height)
                    }
                    /*
                    else if(layer.constructor.name === ""){
                    }
                    */
                })
            }
        }
        /*
        if(this.drawFps){
            //draw pfs on canvas
        }
        */
        requestAnimationFrame(animationLoop)
    }
}
export default Canvas