import {convertPercent,isPercent} from './helper.js'

export class Size{
    #isSizeValuePercent
    #canvasSize
    #sizeMode
    #nativeValue
    #size
    #sizeValue
    constructor(size=0,mode="manual",canvasSize={}){
        this.#nativeValue = 0
        this.#canvasSize = canvasSize
        this.setMode = mode
        this.setSize = size
    }
    get getMode(){
        return this.#sizeMode
    }
    set setMode(mode){
        switch(mode){
            case "manual":
                this.#sizeMode = "manual"
                break
            case "canvasSize":
                //this.useCanvasHeight = true
                this.#sizeMode = "canvasSize"
                this.setSize = this.#canvasSize()
                break
            case "native":
                this.#sizeMode = "native"
                this.setSize = this.#nativeValue
                break
            default:
                this.#sizeMode = "manual"
                break
        }
        /*
        if(this.useCanvasWidth && this.#heightMode !== "canvasSize"){
            this.useCanvasHeight = false
        }
        */
        //this.#heightMode = this.#sizeMode(heightMode)
    }
    set setNativeSize(nativeSize){
        this.#nativeValue = nativeSize
        if(this.#sizeMode === "native"){
            this.setSize = this.#sizeValue
        }
    }
    //maybe not needed
    get getNativeSize(){
        return this.#nativeValue
    }
    set setSize(size){
        this.#sizeValue = size
        switch(this.#sizeMode){
            case "manual":
                if(isPercent(size)){
                    this.#size = convertPercent(size) * this.#nativeValue
                    this.#isSizeValuePercent = true
                    break
                }
                this.#size = size
                this.#isSizeValuePercent = false
                break
            case "canvasSize":
                this.#isSizeValuePercent = true
                if(isPercent(size)){
                    this.#size = convertPercent(size) * this.#canvasSize()
                    break
                }
                this.#size = this.#canvasSize()
                break
            case "native":
                if(isPercent(size)){
                    this.#size = convertPercent(size) * this.#nativeValue
                    this.#isSizeValuePercent = true
                    break
                }
                this.#size = this.#nativeValue
                this.#isSizeValuePercent = false
                break
            default:
                break
        }
    }
    get getSize(){
        return Math.round(this.#size)
    }
    get getSizeValue(){
        return this.#sizeValue
    }
    get getSizeMode(){
        return this.#sizeMode
    }
    get isPercent(){
        return this.#isSizeValuePercent
    }
    updateSize(canvasSize){
        if(isPercent(this.#sizeValue)){
            this.#size = convertPercent(this.#sizeValue) * canvasSize
            return
        }
        this.#size = canvasSize
    }
}
export default Size