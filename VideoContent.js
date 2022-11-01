import Content from "./Content.js"
import {getCanvas} from './CanvasSingleton.js'


export class VideoContainer extends Content{
    constructor(options){
        const object = document.createElement('video')
        object.muted = true
        object.autoplay = true
        object.loop = true
        const loadPromise = new Promise((resolve, reject)=>{
            object.oncanplay = ()=>{
                this.height.setNativeSize = object.height
                this.width.setNativeSize = object.width
                resolve()
            }
        })
        object.src = options.path
        const videoContainer = {video:this.object,ready:false,scale:Math.min(getCanvas().canvasElement.width / this.getWidth,getCanvas().canvasElement.height / this.getHeight)}
        super(videoContainer,loadPromise,options)
    }
    draw(ctx){
        if(this.videoContainer !== undefined && this.videoContainer.ready){
            ctx.drawImage(this.contentObj.video,this.getXPos,this.getYPos,this.getWidth,this.getHeight)
        }
    }
}
export default VideoContainer