///<reference types = "Cypress"/>
class sfLoginPage
{
    getUserName(){
        return cy.get('#email')
    }
    getPassword(){
        return cy.get('#password')
    }
    getLoginBtn(){
        return cy.contains('Sign In')
    }
   
}
export default sfLoginPage;


