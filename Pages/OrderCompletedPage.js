import {Selector} from 'testcafe'
class OrderCompletedPage{
    constructor(){
        this.confirmationMessage = Selector('h2.complete-header')
    }

}

export default new OrderCompletedPage()