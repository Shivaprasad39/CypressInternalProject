///<reference types = "Cypress"/>
// import erpLoginPage from '../support/pageObjectsERP/erpLoginPage'
// import erpMembersPage from '../support/pageObjectsERP/erpMembersPage'

describe("Gclubs Place Order", function(){
    before(function(){
      cy.fixture('gclubsTestData').then(function(data){
        this.data = data
      })
    })
    
    it("ERP Login", function(){
        // const ErpLoginPage = new erpLoginPage()
        // const ErpMembersPage = new erpMembersPage()
        cy.visit("https://erp-dev.gclubdev.net/en/")
        cy.ERPLogin("admin", "admin123")        
        ErpMembersPage.getMemberManagementSytem().click()
        ErpMembersPage.getMembersTab().click()
        cy.get("#mui-component-select-status").click()
        cy.get("li[data-value='active']").click()
        cy.get("#firstName").type("Shiva")
        cy.contains("search").click()
        cy.pause()
        cy.wait(2000)
        cy.contains("VIEW").click()
        cy.contains("Create order").click()
        cy.get("p + div > div > input").eq(1).type(1)
        cy.contains("Next").click()
        cy.get("input[type = 'checkbox']").check()
        cy.contains("Next").click()
        cy.contains("Next").click()
        cy.get("input[value = 'Cheque']").check()
        cy.contains("Submit").click()



        
    })
    
    
}) 