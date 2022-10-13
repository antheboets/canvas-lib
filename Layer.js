import ImageContent from "./ImageContent"

export class Layer{
    constructor(){
        this.content = []
        this.currentPos = 0
        this.currentContent = null
    }
    #tick(){
        if(this.currentPos < this.content.length - 1){
            this.currentPos++
            this.currentContent = this.content[this.currentPos]
        }
        else{
            this.currentPos = 0
            this.currentContent = this.content[0]
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
        const internalCallback = ()=>{
            this.#tick()
            window.setTimeout(internalCallback,this.currentContent.GetTimeoutTime())
            
        }
        window.setTimeout(internalCallback,this.currentContent.GetTimeoutTime())
    }
    addImageFromObj(obj){
        this.#addImageContent(obj.path,obj.time)
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
    addImage(settingsObject){

    }
}
export default Layer