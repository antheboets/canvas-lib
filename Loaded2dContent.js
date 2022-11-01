import Content from './Content.js'
import AxisCoordinate from './AxisCoordinate.js'
import Size from './Size.js'
import getCanvas from './CanvasSingleton.js'

export class Loaded2dContent extends Content {
    constructor(options,loadPromise){
        super()
        this.x = new AxisCoordinate(options.x,()=>{return getCanvas().canvasElement.width})
        this.y = new AxisCoordinate(options.y,()=>{return getCanvas().canvasElement.height})
        this.height = new Size(options.height,options.heightMode,()=>{return getCanvas().canvasElement.height})
        this.width = new Size(options.width,options.widthMode,()=>{return getCanvas().canvasElement.width})
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
}
