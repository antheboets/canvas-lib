//config/template
export function ContentFactory(){
    return {
        contentType:"",
        path:"",
        x:0,
        y:0,
        height:0,
        heightMode:"canvasSize",
        width:0,
        widthMode:"canvasSize",
        time:0
    }
}
//config/template
export function LayerFactory(){
    return {
        mode:"",
        conten:[]
    }
}
export function BackgroundVideo(){
    return{
        contentType:"video",
        path:"",
        x:0,
        y:0,
        height:0,
        heightMode:"canvasSize",
        width:0,
        widthMode:"canvasSize",
        time:0,
        loop:true,
        autoplay:true,
        muted:true
    }
}
export function Video(){
    return{
        contentType:"video",
        path:"",
        x:0,
        y:0,
        height:0,
        heightMode:"canvasSize",
        width:0,
        widthMode:"canvasSize",
        time:0,
        loop:true,
        autoplay:true,
        muted:true
    }
}