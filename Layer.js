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
    start(){
        this.#checkPos()
        setInterval(()=>{
            this.#tick()
        }, this.currentContent.time * 1000)
    }
}
export default Layer