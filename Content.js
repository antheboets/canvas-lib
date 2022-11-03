const DefaultTimeoutTime = (2 * 1000) + 978

export class Content{
    constructor(){
        this.timeoutFunc = null
        this.timeoutNumber = 0
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
    start(){}
    stop(){}
    draw(ctx){}
}
export default Content