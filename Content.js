import getCanvas from './CanvasSingleton.js'
import {convertPercent} from './helper.js'
import AxisCoordinate from './AxisCoordinate.js'
import Size from './Size.js'

const DefaultTimeoutTime = (2 * 1000) + 978

export class Content{
    constructor(obj,loadedPromise,options){
        this.contentObj = obj
        this.loadedPromise = loadedPromise
        this.timeoutFunc = null
        this.timeoutNumber = 0
        this.x = new AxisCoordinate(options.x,()=>{return getCanvas().canvasElement.width})
        this.y = new AxisCoordinate(options.y,()=>{return getCanvas().canvasElement.height})
        this.height = new Size(options.height,options.heightMode,()=>{return getCanvas().canvasElement.height})
        this.width = new Size(options.width,options.widthMode,()=>{return getCanvas().canvasElement.width})
    }
    GetTimeoutTime(){
        if(this.timeoutFunc !== null){
            const timeoutFuncValue = this.timeoutFunc()
            if(Number.isInteger(timeoutFuncValue)){
                return timeoutFuncValue
            }
        }
        if(Number.isInteger(this.timeoutNumber) && this.timeoutNumber !== 0){
            return this.timeoutNumber
        }
        return DefaultTimeoutTime
    }
    draw(ctx,canvasWidth = 0,canvasHeight = 0){}
    set setHeight(height){
        /*
        let factor = 1
        if(this.#isPercent(height)){
            factor = convertPercent(height)
        }
        switch(this.getHeightMode){
            case "manual":
                if(this.#isPercent(height)){
                    this.#height = Math.round(factor * this.#nativeHeight)
                }
                else{
                    this.#height = height
                }
                break
            case "canvasSize":
                this.#height = getCanvas().canvasElement.height
                break
            case "native":
                this.#height = Math.round(factor * this.#nativeHeight)
                break
            default:
                break
        }
        */
       this.height.setSize = height
    }
    get getHeight(){
        return this.height.getSize
    }
    set setWidth(width){
        /*
        let factor = 1
        if(this.#isPercent(width)){
            factor = convertPercent(width)
        }
        switch(this.getWidthMode){
            case "manual":
                if(this.#isPercent(width)){
                    this.#width = Math.round(factor * this.#nativeWidth)
                }
                else{
                    this.#width = width
                }
                break
            case "canvasSize":
                this.#width = getCanvas().canvasElement.width
                break
            case "native":
                this.#width = Math.round(factor * this.#nativeWidth)
                break
            default:
                break
        }
        */
       this.width.setSize = width
    }
    get getWidth(){
        return this.width.getSize
    }
    set setHeightMode(heightMode){
        /*
        switch(heightMode){
            case "manual":
                this.#heightMode = "manual"
                break
            case "canvasSize":
                this.useCanvasHeight = true
                this.#heightMode = "canvasSize"
                this.#height = getCanvas().canvasElement.height
                break
            case "native":
                this.#heightMode = "native"
                this.#height = this.#nativeHeight
                break
            default:
                this.#heightMode = "manual"
                break
        }
        if(this.useCanvasWidth && this.#heightMode !== "canvasSize"){
            this.useCanvasHeight = false
        }
        */
        this.height.setMode = heightMode
    }
    get getHeightMode(){
        return this.height.getMode
    }
    set setWidthMode(widthMode){
        /*
        switch(widthMode){
            case "manual":
                this.#widthMode = "manual"
                break
            case "canvasSize":
                this.useCanvasWidth = true
                this.#widthMode = "canvasSize"
                this.#width = getCanvas().canvasElement.width
                break
            case "native":
                this.#widthMode = "native"
                this.#width = this.#nativeWidth
                break
            default:
                this.#widthMode = "manual"
                break
        }
        if(this.useCanvasWidth && this.#widthMode !== "canvasSize"){
            this.useCanvasWidth = false
        }
        */
        //this.#widthMode = this.#sizeMode(widthMode)
        this.width.setMode = widthMode
    }
    get getWidthMode(){
        return this.width.getMode
    }
    /*
    #sizeMode(mode = ""){
        switch(mode){
            case "manual":
                return "manual"
            case "canvasSize":
                return "canvasSize"
            case "native":
                return "native"
            default:
                return "manual"
        }
    }
    */
    get getNativeHeight(){
        return this.height.getNativeSize
    }
    /*
    set setNativeHeight(nativeHeight){
        if(this.#heightMode === "native"){
            this.#height = nativeHeight
        }
        this.#nativeHeight = nativeHeight
    }
    */
    get getNativeWidth(){
        return this.width.getNativeSize
    }
    /*
    set setNativeWidth(nativeWidth){
        if(this.#widthMode === "native"){
            this.#width = nativeWidth
        }
        this.#nativeWidth = nativeWidth
    }
    */
   /*
    #isPercent(value){
        if(value === undefined || value === null){
            return false
        }
        if(typeof value !== 'string'){
            return false
        }
        if(value.slice(-1) !== '%'){
            return false
        }
        let number = Number(value.slice(0,value.length -1))
        if(number === NaN){
            return false
        }
        return true
    }
    */
    set setXPos(xPos){
        this.x.setCoordinate(xPos)
        /*
        if(this.#isPercent(xPos)){
            console.log("test1")
            this.#xPos = Math.round(convertPercent(xPos) * getCanvas().canvasElement.width)
            this.#xPercent = true
        }
        else{
            console.log("test2")
            this.#xPos = xPos
            this.#xPercent = false
        }
        */
    }
    get getXPos(){
        return this.x.getCoordinate
    }
    set setYPos(yPos){
        this.y.setCoordinate(yPos)
        /*
        if(this.#isPercent(yPos)){
            this.#yPos = Math.round(convertPercent(yPos) * getCanvas().canvasElement.height)
            this.#yPercent = true
        }
        else{
            this.#yPos = yPos
            this.#yPercent = false
        }
        */
    }
    get getYPos(){
        return this.y.getCoordinate
    }
    /*
    set setXPercent(xPercent){
        this.#xPercent = xPercent
    }
    get getXPercent(){
        return this.#xPercent
    }
    set setYPercent(yPercent){
        this.#yPercent = yPercent
    }
    get getYPercent(){
        return this.#yPercent
    }
    */
}
export default Content