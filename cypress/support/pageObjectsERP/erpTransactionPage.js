///<reference types = "Cypress"/>
class erpTransactionPage
{
    getTransactionList(){
        return cy.get("a[title='order']")
    }
    getOrderIdField(){
        return cy.get('#orderId')
    }
    getSearchBtn(){
        return cy.contains('Search')
    }
    getViewBtn(){
        return cy.contains('VIEW')
    }
    
   
}
export default erpTransactionPage;


