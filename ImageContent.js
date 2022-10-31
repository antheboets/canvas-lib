import Content from './Content.js'

export class ImageContent extends Content{
    constructor(url,loadedPromise,obj){
        super(url,loadedPromise,obj)  
    }
    draw(ctx){
        ctx.drawImage(this.contentObj,this.getXPos,this.getYPos,this.getWidth,this.getHeight)
    }
}
export default ImageContent