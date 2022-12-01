const DefaultTimeoutTime = (2 * 1000) + 978

export class Content{
    static clickableManager
    #clickable
    constructor({click,clickAction=()=>{}}){
        this.timeoutFunc = null
        this.timeoutNumber = 0
        if(click){
            this.setClickable = true
            this.clickaction = clickAction
        }
        else{
            this.#clickable = false
            this.clickaction = clickAction
        }
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
    click(){
        if(this.#clickable){
            return this.clickaction()
        }
    }
    isClicked(clickX,clickY){
        return false
    }
    start(){}
    stop(){}
    draw(ctx){}
}
export default Content