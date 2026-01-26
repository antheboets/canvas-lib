import TwoDContent from "./TwoDContent";

export class TextContent extends TwoDContent{
    constructor({color="black"}){
        super({...arguments[0]})
        this.color = color
    }
    draw(ctx){
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color
        ctx.fillRect(this.PosX,this.PosX,this.width,this.height)
    }
    drawMulti(ctx,x,y){
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color
        ctx.fillRect(x + this.PosX,y + this.PosX,this.width,this.height)
    }
}

export default TextContent