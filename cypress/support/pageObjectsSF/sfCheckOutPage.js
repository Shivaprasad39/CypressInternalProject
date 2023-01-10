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
    getChequePlaceOrderBtn(){
        return cy.contains('Place order')
    }
    getPayByHDollarBtn(){
        return cy.contains("PAY WITH H DOLLAR")
    }
    getFirstNameField(){
        return cy.get('#firstName')
    }
    getLastNameField(){
        return cy.get('#lastName')
    }
    getHimalayaEmailField(){
        return cy.get('#helogin')
    }
    getHDollarCheckBox(){
        return cy.get('input[name="agreement"]')
    }
    getHDollarPlaceOrderBtn(){
        return cy.get('button[type="submit"]:nth-child(1)')
    }
    getOrderNumber(){
        return cy.get("a[href='/en/account']~p:nth-child(5)")
    }
      
}
export default sfCheckOutPage;


