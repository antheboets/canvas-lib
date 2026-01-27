export function getTypeOfFileFromPath(path=""){
    if(path === undefined || path === null){
        return 'none'
    }
    if(typeof path !== 'string'){
        return 'none'
    }
    switch(path.split('.').pop().toLowerCase()){
        case 'mp4':
            return 'video'
        case 'webm':
            return 'video'
        case 'mp3':
            return 'audio'
        case 'png':
            return 'image'
        case 'jpg':
            return 'image'
        default:
            return 'none'
    }
}
export function formatFraction(current = 0,max = 0,spacingChar = " "){
    let spacing = ""
    for(let i =0; i + current.toString().length < max.toString().length;i++){
        spacing += spacingChar
    }
    return `${spacing}${current}/${max}fps`
}
//https://attacomsian.com/blog/javascript-merge-objects
export function mergeTwoObjects(obj1,obj2){
    return {...obj1,...obj2}
}
export function convertPercent(percent = "100%"){
    if(percent === undefined || percent === null){
        return 1
    }
    if(typeof percent !== 'string'){
        return 1
    }
    if(percent.slice(-1) !== '%'){
        return 1
    }
    let number = Number(percent.slice(0,percent.length -1))
    if(isNaN(number)){
        return 1
    }
    return number / 100
}
export function isPercent(value){
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