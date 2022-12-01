import Loaded2dContent from './Loaded2dContent.js'

export class ImageContent extends Loaded2dContent{
    constructor({path}){
        const image = new Image()
        arguments[0].loadPromise = (resolve, reject)=>{
            image.onload = ()=>{
                //add native size
                this.width.setNativeSize = image.width
                this.height.setNativeSize = image.height
                resolve()
            }
        }
        super({...arguments[0]})
        this.image = image
        this.image.src = path
    }
    draw(ctx){
        ctx.drawImage(this.image,this.getXPos,this.getYPos,this.getWidth,this.getHeight)
    }
}
export default ImageContent