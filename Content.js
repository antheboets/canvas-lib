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
       this.height.setSize = height
    }
    get getHeight(){
        return this.height.getSize
    }
    set setWidth(width){
       this.width.setSize = width
    }
    get getWidth(){
        return this.width.getSize
    }
    set setHeightMode(heightMode){
        this.height.setMode = heightMode
    }
    get getHeightMode(){
        return this.height.getMode
    }
    set setWidthMode(widthMode){
        this.width.setMode = widthMode
    }
    get getWidthMode(){
        return this.width.getMode
    }
    get getNativeHeight(){
        return this.height.getNativeSize
    }
    get getNativeWidth(){
        return this.width.getNativeSize
    }
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