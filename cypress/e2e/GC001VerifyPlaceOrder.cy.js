///<reference types = "Cypress"/>

describe("Verify place order through storefront", function () { 

  it("Place MT Order By Cheque", function () {    
    // cy.memberLogin(this.data.userName, this.data.password)
    // cy.acceptCookie()     
    // cy.purchaseMembership()    
    // cy.placeOrderByCheque()
    // cy.ErpUserLogin(this.data.adminUserName, this.data.adminPassword)
    // cy.confirmPayment()
    // cy.exitErp()
    // cy.ErpUserLogin(this.data.FinanceUserName, this.data.FinancePassword)
    // cy.confirmPayment()  
    // cy.exitErp()
    cy.memberLogin(this.data.userName, this.data.password)  
    cy.membership()
    cy.upgradeMembership()
    cy.placeOrderByCheque()
    cy.dualConfirmation(this.data.adminUserName,this.data.adminPassword,this.data.FinanceUserName,this.data.FinancePassword)
  })
  
  xit("Place MT Order By H-Dollar", function () {
    cy.memberLogin(this.data.userName, this.data.password)    
    cy.purchaseMembership()
    cy.placeOrderByHDollar(this.data.firstName, this.data.lastName, this.data.hEmail)
    cy.dualConfirmation(this.data.adminUserName,this.data.adminPassword,this.data.FinanceUserName,this.data.FinancePassword) 
  })
})







