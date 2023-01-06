///<reference types = "Cypress"/>
class erpMembersPage
{
    getMemberManagementSytem(){
        return cy.get("a[title='member']")
    }
    getMembersTab(){
        return cy.get("a[href='/en/members']")
    }
    getExitBtn(){
        return cy.contains('EXIT')
    }
   
}
export default erpMembersPage;