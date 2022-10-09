import Layer from './Layer.js'

class Content{
    constructor(obj,time,loadedPromise){
        this.contentObj = obj
        this.time = time
        this.loadedPromise = loadedPromise
    }
}

export class ImageLayer extends Layer{
    constructor(){
        super()
    }
    addLayerItem(uri,time){
        const image = new Image()
        image.src = uri
        let loadedPromise = new Promise((resolve, reject)=>{
            image.onload = ()=>{
                resolve()
            }
        })
        this.content.push(new Content(image,time,loadedPromise))
        //this.#checkPos()
    }
}
export default ImageLayer