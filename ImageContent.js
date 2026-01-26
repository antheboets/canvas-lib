import Loaded2dContent from './Loaded2dContent.js'

export class ImageContent extends Loaded2dContent{
    constructor({path}){
        const image = new Image()
        //console.log(arguments[0])
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
        //this.image.style.transform = "rotate(90deg)";
    }
    draw(ctx){
        ctx.drawImage(this.image,this.getXPos,this.getYPos,this.getWidth,this.getHeight)
    }
    drawMulti(ctx,x,y){
        ctx.drawImage(this.image,x + this.getXPos,y + this.getYPos,this.getWidth,this.getHeight)
    }
}
export default ImageContent