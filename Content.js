import getCanvas from './CanvasSingleton.js'
import {convertPercent} from './helper.js'
import AxisCoordinate from './AxisCoordinate.js'
import Size from './Size.js'

const DefaultTimeoutTime = (2 * 1000) + 978

export class Content{
    /*
    #height
    #width
    #widthMode
    #heightMode
    #nativeHeight
    #nativeWidth
    */
    /*
    #xPos
    #xPercent
    #yPos
    #yPercent
    */
    constructor(obj,loadedPromise,options){
        this.contentObj = obj
        this.loadedPromise = loadedPromise
        this.timeoutFunc = null
        this.timeoutNumber = 0
        this.x = new AxisCoordinate(options.x,()=>{return getCanvas().canvasElement.width})
        this.y = new AxisCoordinate(options.y,()=>{return getCanvas().canvasElement.height})
        this.height = new Size(options.height,options.heightMode,()=>{return getCanvas().canvasElement.height})
        this.width = new Size(options.width,options.widthMode,()=>{return getCanvas().canvasElement.width})
        /*
        this.setXPercent = false
        this.setYPercent = false
        this.setXPos = options.x
        this.setYPos = options.y
        */
        /*
        this.useCanvasHeight = false
        this.useCanvasWidth = false
        this.setNativeWidth = 0
        this.setMativeHeight = 0
        this.setHeightMode = options.heightMode
        this.setWidthMode = options.widthMode
        this.setHeight = options.height
        this.setWidth = options.width
        */
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
}
export default Content