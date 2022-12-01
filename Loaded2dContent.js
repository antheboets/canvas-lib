import Content from './Content.js'
import AxisCoordinate from './AxisCoordinate.js'
import Size from './Size.js'
import getCanvas from './CanvasSingleton.js'

export class Loaded2dContent extends Content {
    constructor({x,y,height,heightMode,width,widthMode,loadPromise}){
        super({...arguments[0]})
        this.x = new AxisCoordinate(x,()=>{return getCanvas().canvasElement.width})
        this.y = new AxisCoordinate(y,()=>{return getCanvas().canvasElement.height})
        this.height = new Size(height,heightMode,()=>{return getCanvas().canvasElement.height})
        this.width = new Size(width,widthMode,()=>{return getCanvas().canvasElement.width})
        this.loadedPromise = new Promise(loadPromise)
    }
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
    }
    get getXPos(){
        return this.x.getCoordinate
    }
    set setYPos(yPos){
        this.y.setCoordinate(yPos)
    }
    get getYPos(){
        return this.y.getCoordinate
    }
    isClicked(clickX,clickY){
        let leftUnderX = this.getXPos + this.getWidth
        let leftUnderY = this.getYPos + this.getHeight
        if(this.getXPos < clickX && clickX < leftUnderX && this.getYPos < clickY && clickY < leftUnderY){
            return true
        }
        return false
    }
}
export default Loaded2dContent