///<reference types = "Cypress"/>
class erpLoginPageTest
{
    getUserName(){
        return cy.get("#account")
    }
    getPassword(){
        return cy.get("#password")
    }
    getLoginBtn(){
        return cy.get('.MuiButton-label')
    }
    getLoginBtn(){
        return cy.get('.MuiButton-label')
    }
}
export default erpLoginPageTest;


