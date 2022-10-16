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
        case 'mp3':
            return 'audio'
        case 'png':
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