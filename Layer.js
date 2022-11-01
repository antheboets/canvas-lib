import ImageContent from './ImageContent.js'
import VideoContent from './VideoContent.js'

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
        if(this.#mode === 'timer'){
            this.#stopTimer()
        }
        this.currentPos = pos
        this.currentContent = this.content[this.currentPos]
        if(this.#mode === 'timer'){
            this.#startTimer()
        }
    }
    #tick(tickHiger = true){
        if(tickHiger){
            if(this.currentPos < this.content.length - 1){
                this.currentPos++
                this.currentContent = this.content[this.currentPos]
            }
            else if(this.loopThroughContent){
                this.currentPos = 0
                this.currentContent = this.content[0]
            }
        }
        else{
            if(this.currentPos > 0){
                this.currentPos--
                this.currentContent = this.content[this.currentPos]
            }
            else if(this.loopThroughContent){
                this.currentPos = this.content.length - 1
                this.currentContent = this.content[0]
            }
        }
    }
    getOnloadPromisesArray(){
        return this.content.map((item)=>{return item.getOnloadPromisesArray})
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
            this.currentContent = this.content[0]
        }
        if(this.currentContent === null){
            this.currentContent = this.content[0]
        }
    }
    start(){
        this.#checkPos()
        if(this.#mode === 'timer'){
            this.#startTimer()
        }
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
    }
    addContentFormObj(obj){
        switch(obj.contentType){
            case'image':
                this.#addImageContent(obj)
            break
            case 'video':
                this.#addVideoContent(obj)
            break
            default:
            break
        }
    }
    #addImageContent(obj){
        const image = new Image()
        image.src = obj.path
        let loadedPromise = new Promise((resolve, reject)=>{
            image.onload = ()=>{
                //add native size
                newContent.width.setNativeSize = image.width
                newContent.height.setNativeSize  = image.height
                resolve()
            }
        })
        const newContent = new ImageContent(image,loadedPromise,obj)
        if(Number.isInteger(obj.time)){
            newContent.timeoutNumber = obj.time
        }
        if(obj.time instanceof Function){
            newContent.timeoutFunc = obj.time
        }
        this.content.push(newContent)
    }
    #addVideoContent(obj){
        const newContent = new VideoContent(obj)
        if(Number.isInteger(obj.time)){
            newContent.timeoutNumber = obj.time
        }
        if(obj.time instanceof Function){
            newContent.timeoutFunc = obj.time
        }
        this.content.push(newContent)
    }
}
export default Layer