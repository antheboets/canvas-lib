import ImageContent from "./ImageContent"
import VideoContent from "./VideoContent"
import TextContent from "./TextContent"
import TwoDContent from "./TwoDContent"
import RectangleContent from "./RectangleContent"

export class MultiPart2dContent extends TwoDContent{
    constructor({listOfContent}){
        super({...arguments[0]})
        this.contentList = []
        listOfContent.forEach((e)=>{
            this.addContentFormObj(e)
        })
    }
    draw(ctx){
        this.contentList.forEach((e)=> {
            e.drawMulti(ctx,this.getXPos, this.getYPos)
        })
    }
    drawMulti(ctx,x,y){
        this.contentList.forEach((e)=> {
            e.drawMulti(ctx,x + this.getXPos,y + this.getYPos)
        })
    }
    addContent(content){
        contentList.push(content)
    }
    addContentFormObj(obj){
        switch(obj.contentType){
            case'image':
                this.#addImageContent(obj)
            break
            case 'video':
                this.#addVideoContent(obj)
            break
            case 'multi':
                this.#addMultiContent(obj)
            break
            case 'text':
                this.#addTextContent(obj)
            break
            case 'rectangle':
                this.#addRectangleContent(obj)
            break
            default:
            break
        }
    }
    #addImageContent(obj){
        const newContent = new ImageContent({...obj})
        if(Number.isInteger(obj.time)){
            newContent.timeoutNumber = obj.time
        }
        if(obj.time instanceof Function){
            newContent.timeoutFunc = obj.time
        }
        this.contentList.push(newContent)
    }
    #addMultiContent(obj){
        const newContent = new MultiPart2dContent({...obj})
        if(Number.isInteger(obj.time)){
            newContent.timeoutNumber = obj.time
        }
        if(obj.time instanceof Function){
            newContent.timeoutFunc = obj.time
        }
        this.contentList.push(newContent)
    }
    #addTextContent(obj){
        const newContent = new TextContent({...obj})
        if(Number.isInteger(obj.time)){
            newContent.timeoutNumber = obj.time
        }
        if(obj.time instanceof Function){
            newContent.timeoutFunc = obj.time
        }
        this.contentList.push(newContent)
    }
    #addVideoContent(obj){
        const newContent = new VideoContent({...obj})
        
        if(Number.isInteger(obj.time)){
            newContent.timeoutNumber = obj.time
        }
        if(obj.time instanceof Function){
            newContent.timeoutFunc = obj.time
        }
        this.contentList.push(newContent)
    }
    #addRectangleContent(obj){
        const newContent = new RectangleContent({...obj})
        if(Number.isInteger(obj.time)){
            newContent.timeoutNumber = obj.time
        }
        if(obj.time instanceof Function){
            newContent.timeoutFunc = obj.time
        }
        this.contentList.push(newContent)
    }
}

export default MultiPart2dContent