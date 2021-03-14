import {Selector} from 'testcafe'

class ProductsPage{
    constructor(){
        this.productsTitle = Selector('div.product_label')
        this.shoppingItem = Selector('.btn_primary.btn_inventory')
        this.shoppingItemTitle = Selector('div.inventory_item_name')

    }
}

export default new ProductsPage()