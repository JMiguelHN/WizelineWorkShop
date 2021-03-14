import {Selector, t} from 'testcafe'

class PageHeader{
    constructor(){
        this.burguerButton = Selector('#react-burger-menu-btn')
        this.logoutButton = Selector('#logout_sidebar_link')
        this.closeBurgerButton = Selector('#react-burger-cross-btn')
        this.shoppingButton = Selector('svg[data-icon="shopping-cart"]')
      
    }

    async menuClicks(menuOption){
        await t
        .click(this.burguerButton)
        .expect(menuOption.exists).ok()
        .click(menuOption)
    }
}

export default new PageHeader()