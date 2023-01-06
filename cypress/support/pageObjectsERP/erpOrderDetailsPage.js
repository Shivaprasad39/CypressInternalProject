///<reference types = "Cypress"/>
class erpOrderDetailsPage
{
    getConfirmPaymentBtn(){
        return cy.contains('Confirm payment')
    }
    getAgreeConfirmBtn(){
        return cy.get("div[role='dialog']").find('button').contains('Confirm')
    }
   
}
export default erpOrderDetailsPage;


