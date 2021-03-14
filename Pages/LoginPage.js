import {Selector,t} from 'testcafe'

class LoginPage{
        constructor(){
            this.usernameField = Selector('#user-name')
            this.passwordField = Selector('#password')
            this.loginButton = Selector('#login-button')
            this.errorMessage = Selector('h3[data-test="error"]')
        }
//Epic sadface: Username is required
        async submitLogin(username, password){
            await t 
                .typeText(this.usernameField, username)
                .typeText(this.passwordField, password)           
                .click(this.loginButton)
        }
}


export default new LoginPage()