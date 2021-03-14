import {Selector} from 'testcafe'


class CartPage{
    constructor(){
        this.pageTitle = Selector('div.subheader')
        this.checkoutButton = Selector('a.btn_action.checkout_button')
        this.shoppingItemTitle = Selector('div.inventory_item_name')
    }
}

export default new CartPage()