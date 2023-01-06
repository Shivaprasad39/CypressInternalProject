///<reference types = "Cypress"/>
class sfLandingPage
{
    getLoginBtn(){
        return cy.get('.jss24 > .MuiButtonBase-root')
    }
    getAcceptCookiesBtn(){
        return cy.get('#onetrust-accept-btn-handler')
    }
  
}
export default sfLandingPage;


