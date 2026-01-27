import ImageContent from './ImageContent.js'
import MultiPart2dContent from './MultiPart2dContent.js'
import TextContent from './TextContent.js'
import VideoContent from './VideoContent.js'
import RectangleContent from './RectangleContent.js'

export class Layer{
    #mode
    #timeoutId
    constructor(mode = 'manual'){
        this.content = []
        this.currentPos = 0
        this.currentContent = null
        this.setMode = mode
        this.#timeoutId = null
        this.timerActive = false
        this.loopThroughContent = true
    }
    set setMode(mode){
        switch(mode){
            case 'timer':
                this.#mode = 'timer'
                break
            case 'manual':
                this.#mode = 'manual'
                break
            default:
                this.#mode = 'manual'
                break
        }
    }
    get getMode(){
        return this.#mode
    }
    next(){
        this.#tick(true)
    }
    previous(){
        this.#tick(false)
    }
    #changeContent(newContent){
        if(this.currentContent !== null){
            if(this.#mode === 'timer'){
                this.#stopTimer()
            }
            this.currentContent.stop()
        }
        this.currentContent = newContent
        if(this.#mode === 'timer'){
            this.#startTimer()
        }
        this.currentContent.start()
    }
    setContentPos(pos = 0){
        if(pos === undefined || pos === null){
            return
        }
        if(typeof pos !== 'number'){
            return
        }
        if(pos >= this.content.length){
            return
        }
        this.currentPos = pos
        this.#changeContent(this.content[this.currentPos])
    }
    #tick(tickHiger = true){
        if(tickHiger){
            if(this.currentPos < this.content.length - 1){
                this.currentPos++
                this.#changeContent(this.content[this.currentPos])
            }
            else if(this.loopThroughContent){
                this.currentPos = 0
                this.#changeContent(this.content[0])
            }
        }
        else{
            if(this.currentPos > 0){
                this.currentPos--
                this.#changeContent(this.content[this.currentPos])
            }
            else if(this.loopThroughContent){
                this.currentPos = this.content.length - 1
                this.#changeContent(this.content[0])
            }
        }
    }
    getOnloadPromisesArray(){
        if(item instanceof Loaded2dContent){
            return item.getOnloadPromisesArray
        }
        return null
    }
    getLayer(){
        return this.content
    }
    removeContent(posToRemove){
        /*
        let temp = this.content.splice(posToRemove,1)
        this.#checkPos()
        return temp
        */
    }
    #checkPos(){
        if(this.content.length === 1){
            this.#changeContent(this.content[0])
        }
        if(this.currentContent === null){
            this.#changeContent(this.content[0])
        }
    }
    start(){
        this.#checkPos()
        if(this.#mode === 'timer'){
            this.#startTimer()
        }
        this.currentContent.start()
    }
    #startTimer(){
        if(!this.timerActive){
            const internalCallback = ()=>{
                this.#tick()
                this.#timeoutId = window.setTimeout(internalCallback,this.currentContent.GetTimeoutTime())
            }
            this.#timeoutId = window.setTimeout(internalCallback,this.currentContent.GetTimeoutTime())
            this.timerActive = true
        }
    }
    #stopTimer(){
        if(this.#timeoutId !== null){
            clearTimeout(this.#timeoutId)
            this.timerActive = false
        }
    }
    stop(){
        if(this.#mode === 'timer'){
            this.#stopTimer()
        }
        this.currentContent.stop()
    }
    addContentFormObj(obj){
        switch(obj.contentType){
            case'image':
            newContent = new ImageContent({...obj})
            break
            case 'video':
                newContent = new VideoContent({...obj})
            break
            case 'multi':
                newContent = new MultiPart2dContent({...obj})
            break
            case 'text':
                newContent = new TextContent({...obj})
            break
            case 'rectangle':
                newContent = new RectangleContent({...obj})
            break
            default:
            break
        }
        this.content.push(newContent)
    }
}
export default Layer