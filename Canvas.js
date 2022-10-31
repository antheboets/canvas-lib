import Layer from './Layer.js'
import getCanvas from './CanvasSingleton.js'
import {getTypeOfFileFromPath,formatFraction,mergeTwoObjects,convertPercent} from './helper.js'
import {ContentFactory} from './Factory.js'

function getDebugString(name = "",value=""){
    return `${name}: ${value}`
}

//rework so it is a class methode of Canvas
function animationLoop(){
    //check if the animation loop needs to be stoped
    if(!getCanvas().startAnimationtest){
        return
    }
    //calc elapsed time since last loop
    getCanvas().now = Date.now()
    getCanvas().elapsed = getCanvas().now - getCanvas().then
    getCanvas().elapsedFrameCount++
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
            //loop through all layers
            getCanvas().layers.forEach(layer => {
                //draw content from each layer
                layer.currentContent.draw(getCanvas().ctx,getCanvas().canvasElement.width,getCanvas().canvasElement.height)
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
            getCanvas().ctx.fillStyle  = "rgba(190,190,190,0.8)"
            getCanvas().ctx.fillRect(10,10,200,130)
            getCanvas().ctx.strokeStyle = "black"
            getCanvas().ctx.fillStyle  = "black"
            getCanvas().ctx.fillText(getDebugString("Fps",formatFraction(currentFps,getCanvas().fps)),20,30)
            getCanvas().ctx.fillText(getDebugString("Start time",`${sinceStart/1000}sec`),20,50)
            getCanvas().ctx.fillText(getDebugString("Drawn frame count",`${getCanvas().frameCount}`),20,70)
            getCanvas().ctx.fillText(getDebugString("Total frame count",`${getCanvas().elapsedFrameCount}`),20,90)
            getCanvas().ctx.fillText(getDebugString("Elapsed",`${getCanvas().elapsed}`),20,110)
            getCanvas().ctx.fillText(getDebugString("Then",`${ getCanvas().then}`),20,130)
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
        this.elapsedFrameCount = 0
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
            this.#canvasSizeUpdate()
            //request new frame
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
    createLayer(layerData = null){
        const newLayer = new Layer()
        let validInput = true
        let foundValidType = false
        if(layerData === undefined){
            validInput = false
        }
        if(layerData === null && validInput){
            validInput = false
        }
        if(Array.isArray(layerData) && typeof layerData === 'object'){
            foundValidType = true
        }
        else if(typeof layerData === 'object'){
            foundValidType = true
        }
        else if(typeof layerData === 'string'){
            foundValidType = true
        }
        if(validInput && foundValidType){
            this.#addObjectToLayer(newLayer,layerData)
        }
        this.#addLayer(newLayer)
    }
    #addObjectToLayer(layerObj, layerData){
        //check if data is string, obj or list. List can contain strings or objs
        if(Array.isArray(layerData) && typeof layerData === 'object'){
            if(layerData.length !== 0){
                layerData.forEach((content)=>{
                    //obj
                    if(typeof content === 'object'){
                        content.contentType = getTypeOfFileFromPath(content.path)
                        layerObj.addContentFormObj(mergeTwoObjects(ContentFactory(),content))
                    }
                    //string
                    else if(typeof content === 'string' || content instanceof String){
                        layerObj.addContentFormObj(mergeTwoObjects(ContentFactory(),{path:content,contentType:getTypeOfFileFromPath(content)}))
                    }
                })
            }
        }
        //check for layer config object
        //obj
        if(typeof layerData === 'object'){
            let contentType
            if(layerData.contentType !== undefined){
                contentType = layerData.contentType
            }
            else{
                contentType = getTypeOfFileFromPath(layerData.path)
            }
            layerObj.addContentFormObj(mergeTwoObjects(ContentFactory(),{path:layerData.path,contentType:contentType,timer:layerData.timer}))
        }
        //string
        if(typeof layerData === 'string' || layerData instanceof String){
            //check file type
            layerObj.addContentFormObj(mergeTwoObjects(ContentFactory(),{path:layerData,contentType:getTypeOfFileFromPath(layerData)}))
        }
    }
    removeLayerContent(layer,content){
        this.layers[layer].removeLayerContent(content)
    }
    stop(){
        this.startAnimationtest = false
        this.layers.forEach((layer)=>{
            layer.stop()
        })
    }
    async startAsync(){
        await this.#waitTillLoadedAsync()
        this.videoContainer.ready = true
        this.videoContainer.video.play()
        this.layers.forEach((layer)=>{
            layer.start()
        })
        this.then = Date.now()
        this.frameCount = 0
        this.elapsedFrameCount = 0
        this.startTime = this.then
        this.startAnimationtest = true
        //
        animationLoop()
    }
    #canvasSizeUpdate(){
        this.layers.forEach((layer)=>{
            layer.content.forEach((content)=>{
                if(content.height.isPercent){
                    content.height.updateSize(this.canvasElement.height)
                }
                if(content.width.isPercent){
                    content.width.updateSize(this.canvasElement.width)
                }
                if(content.x.isPercent){
                    content.x.updateAxis(this.canvasElement.width)
                }
                if(content.y.isPercent){
                    content.y.updateAxis(this.canvasElement.height)
                }
            })
        })
    }
}
export default Canvas