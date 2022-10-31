import {convertPercent,isPercent} from './helper.js'

export class AxisCoordinate{
    #coordinateValue
    #coordinate
    #canvasSize
    #isAxisValuePercent
    constructor(value=0,getCanvasSize={}){
        this.#canvasSize = getCanvasSize
        this.setCoordinate = value
    }
    set setCoordinate(coordinate){
        this.#coordinateValue = coordinate
        if(isPercent(coordinate)){
            this.#isAxisValuePercent = true
            this.#coordinate = convertPercent(this.#coordinateValue) * this.#canvasSize()
            return
        }
        this.#coordinate = coordinate
        this.#isAxisValuePercent = false
    }
    get getCoordinate(){
        return Math.round(this.#coordinate)
    }
    //maybe this functions isn't needed
    get getCoordinateValue(){
        return this.#coordinateValue
    }
    get isPercent(){
        return this.#isAxisValuePercent
    }
    updateAxis(canvasSize){
        if(this.#isAxisValuePercent){
           this.#coordinate = convertPercent(this.#coordinateValue) * canvasSize
        }
    }
}
export default AxisCoordinate