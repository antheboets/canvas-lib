import Loaded2dContent from "./Loaded2dContent.js"

export class VideoContent extends Loaded2dContent{
    constructor({path}){
        const object = document.createElement('video')
        object.muted = true
        object.autoplay = true
        object.loop = true
        arguments[0].loadPromise = (resolve, reject)=>{
            object.oncanplay = ()=>{
                this.height.setNativeSize = object.height
                this.width.setNativeSize = object.width
                resolve()
            }
        }
        super({...arguments[0]})
        object.src = path
        this.videoContainer = {
            video:object,
            ready:false,
            scale:Infinity
            //scale:Math.min(getCanvas().canvasElement.width / this.getWidth,getCanvas().canvasElement.height / this.getHeight)
        }
        //super(videoContainer,loadPromise,options)
    }
    draw(ctx){
        //only draw if loaded and ready
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