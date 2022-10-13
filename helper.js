export function formatFraction(current = 0,max = 0,spacingChar = " "){
    let spacing = ""
    for(let i =0; i + current.toString().length < max.toString().length;i++){
        spacing += spacingChar
    }
    return `${spacing}${current}/${max}fps`
}