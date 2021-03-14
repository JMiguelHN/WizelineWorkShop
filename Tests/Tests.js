import LoginPage from '../Pages/LoginPage'
import ProductsPage from '../Pages/ProductsPage'
import PageHeader from '../Pages/PageHeader'
import CartPage from '../Pages/CartPage'
import InformationPage from '../Pages/InformationPage'
import OverviewPage from '../Pages/OverviewPage'
import OrderCompletedPage from '../Pages/OrderCompletedPage'
import {CREDENTIALS, SHIPPING} from '../Data/Constatnts'


fixture (`Login feature testing`)
.page `https://www.saucedemo.com`
.beforeEach(async t => {
   // await t.LoginPage.submitLogin(CREDENTIALS.VALID_USERNAME.USERNAME1, CREDENTIALS.VALID_USERNAME.PASSWORD)
})

test('Login with valid user', async t => {

    await LoginPage.submitLogin(CREDENTIALS.VALID_USERNAME.USERNAME1, CREDENTIALS.VALID_USERNAME.PASSWORD)

    await t.expect(ProductsPage.productsTitle.exists).ok()

})

test('Login with invalid user', async t => {
    await LoginPage.submitLogin(CREDENTIALS.INVALID_USERNAME.USERNAME, CREDENTIALS.INVALID_USERNAME.PASSWORD)

    await t.expect(LoginPage.errorMessage.exists).ok()

})

test('Logout from products page', async t => {
    await LoginPage.submitLogin(CREDENTIALS.VALID_USERNAME.USERNAME1, CREDENTIALS.VALID_USERNAME.PASSWORD)
    

    await PageHeader.menuClicks(PageHeader.logoutButton)

    await t.expect(LoginPage.usernameField.exists).ok()

})

test('Navigate to shopping cart', async t => {

    await LoginPage.submitLogin(CREDENTIALS.VALID_USERNAME.USERNAME1, CREDENTIALS.VALID_USERNAME.PASSWORD)

    await t.expect(ProductsPage.productsTitle.exists).ok()

    await t.click(PageHeader.shoppingButton)

    await t.expect(CartPage.pageTitle.exists).ok()

})

test('Adding 1 item', async t => {

    await LoginPage.submitLogin(CREDENTIALS.VALID_USERNAME.USERNAME1, CREDENTIALS.VALID_USERNAME.PASSWORD)
     
    await t
    .expect(ProductsPage.productsTitle.exists).ok()

    let item = await ProductsPage.shoppingItemTitle.nth(0).innerText
    await t.click(ProductsPage.shoppingItem.nth(0))

    await t.click(PageHeader.shoppingButton)

    await t.expect(CartPage.shoppingItemTitle.nth(0).innerText).eql(item)

})

test('Adding multimple items item', async t => {

    await LoginPage.submitLogin(CREDENTIALS.VALID_USERNAME.USERNAME1, CREDENTIALS.VALID_USERNAME.PASSWORD)
     
    await t
    .expect(ProductsPage.productsTitle.exists).ok()

    let items = []

    for(let i = 0; i < 4; i++){
        await t.click(ProductsPage.shoppingItem.nth(0))
        items.push(await ProductsPage.shoppingItemTitle.nth(i).innerText)
    }

    await t.click(PageHeader.shoppingButton)

    for (let i =0; i < items.length; i++){
        //console.log("[DEBUG] value of elelemtn in page" ,await CartPage.shoppingItemTitle.nth(i).innerText)
        //console.log("[DEBUG] value of elelemtn in array" , items[i])
        await t.expect(CartPage.shoppingItemTitle.nth(i).innerText).eql(items[i])
    }

})

test('Validate mail info missing', async t => {

    await LoginPage.submitLogin(CREDENTIALS.VALID_USERNAME.USERNAME1, CREDENTIALS.VALID_USERNAME.PASSWORD)

    await t.expect(ProductsPage.productsTitle.exists).ok()
    
    let item = await ProductsPage.shoppingItemTitle.nth(0).innerText
    await t.click(ProductsPage.shoppingItem.nth(0))

    
    await t.click(PageHeader.shoppingButton)

    await t.expect(CartPage.pageTitle.exists).ok()
        .expect(CartPage.shoppingItemTitle.nth(0).innerText).eql(item)
        .click(CartPage.checkoutButton)
    
    await t
        .expect(InformationPage.pageTitle.exists).ok()
        .click(InformationPage.continueButton)
        .expect(InformationPage.missingInfoError.exists).ok()

})

test('Fill user information', async t => {

    await LoginPage.submitLogin(CREDENTIALS.VALID_USERNAME.USERNAME1, CREDENTIALS.VALID_USERNAME.PASSWORD)

    await t.expect(ProductsPage.productsTitle.exists).ok()
    
    let item = await ProductsPage.shoppingItemTitle.nth(0).innerText
    await t.click(ProductsPage.shoppingItem.nth(0))

    
    await t.click(PageHeader.shoppingButton)

    await t.expect(CartPage.pageTitle.exists).ok()
        .expect(CartPage.shoppingItemTitle.nth(0).innerText).eql(item)
        .click(CartPage.checkoutButton)
    
    await t
        .expect(InformationPage.pageTitle.exists).ok()
        .typeText(InformationPage.firstNameFiled, SHIPPING.SHIPPING_INFORMATION.FIRSTNAME)
        .typeText(InformationPage.lastNameFiled, SHIPPING.SHIPPING_INFORMATION.LASTNAME)
        .typeText(InformationPage.zipFiled, SHIPPING.SHIPPING_INFORMATION.ZIP)
        .click(InformationPage.continueButton)

    await t.expect(OverviewPage.pageTitle.exists).ok()

})

test('Final order items', async t => {

    await LoginPage.submitLogin(CREDENTIALS.VALID_USERNAME.USERNAME1, CREDENTIALS.VALID_USERNAME.PASSWORD)
     
    await t
    .expect(ProductsPage.productsTitle.exists).ok()

    let items = []

    for(let i = 0; i < 4; i++){
        await t.click(ProductsPage.shoppingItem.nth(0))
        items.push(await ProductsPage.shoppingItemTitle.nth(i).innerText)
    }

    await t.click(PageHeader.shoppingButton)

    await t.expect(CartPage.pageTitle.exists).ok()

    for (let i =0; i < items.length; i++){
        //console.log("[DEBUG] value of elelemtn in page" ,await CartPage.shoppingItemTitle.nth(i).innerText)
        //console.log("[DEBUG] value of elelemtn in array" , items[i])
        await t.expect(CartPage.shoppingItemTitle.nth(i).innerText).eql(items[i])
    }
    await t.click(CartPage.checkoutButton)
    
    await t
        .expect(InformationPage.pageTitle.exists).ok()
        .typeText(InformationPage.firstNameFiled, SHIPPING.SHIPPING_INFORMATION.FIRSTNAME)
        .typeText(InformationPage.lastNameFiled, SHIPPING.SHIPPING_INFORMATION.LASTNAME)
        .typeText(InformationPage.zipFiled, SHIPPING.SHIPPING_INFORMATION.ZIP)
        .click(InformationPage.continueButton)

    await t.expect(OverviewPage.pageTitle.exists).ok()

    for (let i =0; i < items.length; i++){
        //console.log("[DEBUG] value of elelemtn in overview" ,await OverviewPage.shoppingItemTitle.nth(i).innerText)
        //console.log("[DEBUG] value of elelemtn in array" , items[i])
        await t.expect(CartPage.shoppingItemTitle.nth(i).innerText).eql(items[i])
    }

})

test('Complete a purchase', async t => {

    await LoginPage.submitLogin(CREDENTIALS.VALID_USERNAME.USERNAME1, CREDENTIALS.VALID_USERNAME.PASSWORD)
     
    await t
    .expect(ProductsPage.productsTitle.exists).ok()

    let items = []

    for(let i = 0; i < 4; i++){
        await t.click(ProductsPage.shoppingItem.nth(0))
        items.push(await ProductsPage.shoppingItemTitle.nth(i).innerText)
    }

    await t.click(PageHeader.shoppingButton)

    await t.expect(CartPage.pageTitle.exists).ok()

    for (let i =0; i < items.length; i++){
        //console.log("[DEBUG] value of elelemtn in page" ,await CartPage.shoppingItemTitle.nth(i).innerText)
        //console.log("[DEBUG] value of elelemtn in array" , items[i])
        await t.expect(CartPage.shoppingItemTitle.nth(i).innerText).eql(items[i])
    }
    await t.click(CartPage.checkoutButton)
    
    await t
        .expect(InformationPage.pageTitle.exists).ok()
        .typeText(InformationPage.firstNameFiled, SHIPPING.SHIPPING_INFORMATION.FIRSTNAME)
        .typeText(InformationPage.lastNameFiled, SHIPPING.SHIPPING_INFORMATION.LASTNAME)
        .typeText(InformationPage.zipFiled, SHIPPING.SHIPPING_INFORMATION.ZIP)
        .click(InformationPage.continueButton)

    await t.expect(OverviewPage.pageTitle.exists).ok()

    for (let i =0; i < items.length; i++){
        //console.log("[DEBUG] value of elelemtn in overview" ,await OverviewPage.shoppingItemTitle.nth(i).innerText)
        //console.log("[DEBUG] value of elelemtn in array" , items[i])
        await t.expect(CartPage.shoppingItemTitle.nth(i).innerText).eql(items[i])
    }

    await t.click(OverviewPage.finishButton)

    await t.expect(OrderCompletedPage.confirmationMessage.exists).ok()


})
