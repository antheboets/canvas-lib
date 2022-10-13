export function getTypeOfFileFromPath(path){
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