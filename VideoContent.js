import Loaded2dContent from "./Loaded2dContent.js"
import {getCanvas} from './CanvasSingleton.js'


export class VideoContent extends Loaded2dContent{
    constructor(options){
        const object = document.createElement('video')
        object.muted = true
        object.autoplay = true
        object.loop = true
        super(options,(resolve, reject)=>{
            object.oncanplay = ()=>{
                this.height.setNativeSize = object.height
                this.width.setNativeSize = object.width
                resolve()
            }
        })
        object.src = options.path
        this.videoContainer = {
            video:object,
            ready:false,
            scale:Infinity
            //scale:Math.min(getCanvas().canvasElement.width / this.getWidth,getCanvas().canvasElement.height / this.getHeight)
        }
        //super(videoContainer,loadPromise,options)
    }
    draw(ctx){
        if(this.videoContainer !== undefined && this.videoContainer.ready){
            ctx.drawImage(this.videoContainer.video,this.getXPos,this.getYPos,this.getWidth,this.getHeight)
        }
    }
    start(){
        this.videoContainer.ready = true
        this.videoContainer.video.play()
    }
    stop(){
        this.videoContainer.pause()
        if(true){
            this.videoContainer.currentTime = 0
        }
    }
}
export default VideoContent