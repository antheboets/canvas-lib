import Loaded2dContent from './Loaded2dContent.js'

export class ImageContent extends Loaded2dContent{
    constructor(obj){
        const image = new Image()
        super(obj,(resolve, reject)=>{
            image.onload = ()=>{
                //add native size
                this.width.setNativeSize = image.width
                this.height.setNativeSize = image.height
                resolve()
            }
        })
        this.image = image
        this.image.src = obj.path
    }
    draw(ctx){
        ctx.drawImage(this.image,this.getXPos,this.getYPos,this.getWidth,this.getHeight)
    }
}
export default ImageContent