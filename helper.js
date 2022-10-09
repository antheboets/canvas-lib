export function getFpsString(currentFps = 0,getMaxFps = 0){
    let spacing = ""
    for(let i =0; i + currentFps.toString().length < getMaxFps.toString().length;i++){
        spacing += "a"
    }
    return `${spacing}${currentFps}/${getMaxFps}fps`
}