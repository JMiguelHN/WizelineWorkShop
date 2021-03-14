import {Selector, t} from 'testcafe'

class OverviewPage{
    constructor(){
        this.pageTitle = Selector('div.subheader')
        this.shoppingItemTitle = Selector('div.inventory_item_name')
        this.finishButton = Selector('a.btn_action.cart_button')

    }
}

export default new OverviewPage()