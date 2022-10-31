import getCanvas from './CanvasSingleton.js'
import {convertPercent} from './helper.js'
import AxisCoordinate from './AxisCoordinate.js'
import Size from './Size.js'

const DefaultTimeoutTime = (2 * 1000) + 978

export class Content{
    constructor(obj,loadedPromise){
        this.contentObj = obj
        this.loadedPromise = loadedPromise
        this.timeoutFunc = null
        this.timeoutNumber = 0
        this.xPos = 0
        this.yPos = 0
        this.height = 0
        this.width = 0
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