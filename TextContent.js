import TwoDContent from "./TwoDContent";

export class TextContent extends TwoDContent{
    constructor({text="",font="",size="12px",color="black"}){
        super({...arguments[0]})
        this.text = text
        this.font = font
        this.size = size
        this.color = color
    }
    draw(ctx){
        ctx.font = this.size + " " + this.font
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color
        ctx.fillText(this.text,this.getXPos,this.getYPos)
    }
    drawMulti(ctx,x,y){
        ctx.font = this.size + " " + this.font
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color
        ctx.fillText(this.text, x + this.getXPos,y + this.getYPos)
    }
}

export default TextContent