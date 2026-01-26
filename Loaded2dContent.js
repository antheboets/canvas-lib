import TwoDContent from './TwoDContent.js'

export class Loaded2dContent extends TwoDContent {
    constructor({loadPromise}){
        super({...arguments[0]})
        this.loadedPromise = new Promise(loadPromise)
    }
}
export default Loaded2dContent