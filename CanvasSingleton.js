import Canvas from './Canvas.js'

let canvas = null

export function getCanvas(){
    if(canvas === null){
        canvas = new Canvas()
    }
    return canvas
}
export default getCanvas