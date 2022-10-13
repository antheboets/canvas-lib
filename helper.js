export function getTypeOfFileFromPath(path=""){
    if(path === undefined || path === null){
        return 'none'
    }
    if(typeof path === 'string'){
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