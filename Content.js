const DefaultTimeoutTime = (2 * 1000) + 978

export class Content{
    static clickableManager
    #clickable
    static draggableManager
    #draggable
    #isBeeingDragged
    constructor({clickable=false,clickAction=()=>{},draggable=false,dragAction=()=>{}}){
        this.timeoutFunc = null
        this.timeoutNumber = 0
        if(clickable){
            this.setClickable = true   
        }
        else{
            this.#clickable = false
        }
        this.clickAction = clickAction
        if(draggable){
            this.setDraggable = true   
        }
        else{
            this.#draggable = false
        }
        this.dragAction = dragAction
        this.#isBeeingDragged = false
        /*
        if(Number.isInteger(obj.time)){
            this.timeoutNumber = obj.time
        }
        if(obj.time instanceof Function){
            this.timeoutFunc = obj.time
        }
        */
    }
    GetTimeoutTime(){
        if(this.timeoutFunc !== null){
            const timeoutFuncValue = this.timeoutFunc()
            if(Number.isInteger(timeoutFuncValue)){
                return timeoutFuncValue
            }
        }
        if(Number.isInteger(this.timeoutNumber) && this.timeoutNumber !== 0){
            return this.timeoutNumber
        }
        return DefaultTimeoutTime
    }
    get getClickable(){
        return this.#clickable
    }
    set setClickable(clickable){
        if(clickable){
            this.#clickable = clickable
            Content.clickableManager.addToList(this)
        }
        else if(!clickable){
            this.#clickable = clickable
            Content.clickableManager.removeFromList(this)
        }
    }
    get getDraggable(){
        return this.#draggable
    }
    set setDraggable(draggable){
        if(draggable){
            this.#draggable = draggable
            Content.draggableManager.addToList(this)
        }
        else if(!draggable){
            this.#draggable = draggable
            Content.draggableManager.removeFromList(this)
        }
    }
    get getIsBeeingDragged(){
        return this.#isBeeingDragged
    }
    set setIsBeeingDragged(isBeeingDragged){
        this.#isBeeingDragged = isBeeingDragged
    }
    click(){
        if(this.#clickable){
            return this.clickAction()
        }
    }
    isClicked(clickX,clickY){
        return false
    }
    isBeeingDraged(x,y){
        return false
    }
    dragged(){
        if(this.#clickable){
            return this.clickAction()
        }
    }
    dragStart(){
        this.setIsBeeingDragged = true
    }
    dragStop(){
        this.setIsBeeingDragged = false
    }
    start(){}
    stop(){}
    draw(ctx){}
}
export default Content