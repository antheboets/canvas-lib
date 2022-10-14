import ImageContent from "./ImageContent"

export class Layer{
    #mode
    #timeoutId
    constructor(mode = 'manual'){
        this.content = []
        this.currentPos = 0
        this.currentContent = null
        this.setMode = mode
        this.#timeoutId = null
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
        if(pos < this.content.length - 1 ){
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
            else{
                this.currentPos = 0
                this.currentContent = this.content[0]
            }
        }
        else{
            if(this.currentPos > 0){
                this.currentPos--
                this.currentContent = this.content[this.currentPos]
            }
            else{
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
    //https://stackoverflow.com/questions/1280263/changing-the-interval-of-setinterval-while-its-running
    start(){
        this.#checkPos()
        if(this.#mode === 'timer'){
            this.#startTimer()
        }
    }
    #startTimer(){
        const internalCallback = ()=>{
            this.#tick()
            this.#timeoutId = window.setTimeout(internalCallback,this.currentContent.GetTimeoutTime())
            
        }
        this.#timeoutId = window.setTimeout(internalCallback,this.currentContent.GetTimeoutTime())
    }
    #stopTimer(){
        clearTimeout(this.#timeoutId)
    }
    stop(){
        if(this.#mode === 'timer'){
            this.#stopTimer()
        }
    }
    addContentFormObj(obj){
        if(true){
            this.#addImageContent()
        }
        else if(true){
            this.#addVideoCOntent()
        }
    }
    #addImageContent(uri,time){
        const image = new Image()
        image.src = uri
        let loadedPromise = new Promise((resolve, reject)=>{
            image.onload = ()=>{
                resolve()
            }
        })
        const newContent = new ImageContent(image,loadedPromise)
        if(Number.isInteger(time)){
            newContent.timeoutNumber = time
        }
        if(time instanceof Function){
            newContent.timeoutFunc = time
        }
        this.content.push(newContent)
        //this.#checkPos()
    }
    #addVideoContent(){

    }
}
export default Layer