import Content from "./Content.js"

export class VideoContainer extends Content{
    constructor(url,loadedPromise){
        super(url,loadedPromise)
    }
    draw(ctx,canvasWidth = 0,canvasHeight = 0){
        ctx.drawImage(this.contentObj,0,0,canvasWidth,canvasHeight)
    }
}
export default VideoContainer