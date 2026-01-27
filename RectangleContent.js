import TwoDContent from "./TwoDContent";

export class TextContent extends TwoDContent{
    constructor({color="black"}){
        super({...arguments[0]})
        this.color = color
    }
    draw(ctx){
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color
        ctx.fillRect(this.getXPos,this.getYPos,this.getWidth,this.getHeight)
    }
    drawMulti(ctx,x,y){
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color
        ctx.fillRect(x + this.getXPos,y + this.getYPos,this.getWidth,this.getHeight)
    }
}

export default TextContent