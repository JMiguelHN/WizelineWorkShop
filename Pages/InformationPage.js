import {Selector} from 'testcafe'


class InformationPage{
    constructor(){
        this.pageTitle = Selector('div.subheader')
        this.continueButton = Selector('input.btn_primary.cart_button')
        this.cancelButton = Selector('a.cart_cancel_link.btn_secondary')
        this.firstNameFiled = Selector('#first-name')
        this.lastNameFiled = Selector('#last-name')
        this.zipFiled = Selector('#postal-code')
        this.missingInfoError = Selector('h3[data-test="error"]')
    }
}

export default new InformationPage()