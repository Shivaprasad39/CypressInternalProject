///<reference types = "Cypress"/>
class sfAccountPage
{
    getMTOrderType(){
        return cy.contains('PURCHASE MEMBERSHIP')
    }
   
}
export default sfAccountPage;


