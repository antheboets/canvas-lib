import ImageContent from "./ImageContent"

export class Layer{
    constructor(mode = 'manual'){
        this.content = []
        this.currentPos = 0
        this.currentContent = null
        mode(mode)
    }
    set mode(mode){
        switch(mode){
            case 'timer':
                return 'timer'
            case 'manual':
                return 'manual'
            default:
                return 'manual'
        }
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
        if(mode === 'timer'){
            const internalCallback = ()=>{
                this.#tick()
                let test = this.currentContent.GetTimeoutTime()
                console.log(this.currentContent,test)
                window.setTimeout(internalCallback,test)
                
            }
            const testTimedeletemij = this.currentContent.GetTimeoutTime()
            console.log(this.currentContent,testTimedeletemij)
            window.setTimeout(internalCallback,testTimedeletemij)
        }
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