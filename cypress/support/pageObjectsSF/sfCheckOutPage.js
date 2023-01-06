///<reference types = "Cypress"/>
class sfCheckOutPage
{
    getAgreeDisclaimerCheckBox(){
        return cy.get("input[name='checkedA']")
    }
    getAgreeDisclaimerBtn(){
        return cy.contains('Agree Disclaimer')
    }
    getPayByChequeBtn(){
        return cy.contains('Pay by cheque')
    }
    getPlaceOrderBtn(){
        return cy.contains('Place order')
    }
    getOrderNumber(){
        return cy.get("a[href='/en/account']~p:nth-child(5)")
    }
      
}
export default sfCheckOutPage;


