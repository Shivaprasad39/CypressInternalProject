// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })


//})

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

///<reference types = "Cypress"/>

import sfAccountPage from '../support/pageObjectsSF/sfAccountPage'
import sfCheckOutPage from '../support/pageObjectsSF/sfCheckOutPage'
import sfExtraCardPage from '../support/pageObjectsSF/sfExtraCardPage'
import sfLandingPage from '../support/pageObjectsSF/sfLandingPage'
import sfLoginPage from '../support/pageObjectsSF/sfLoginPage'
import erpLoginPage from '../support/pageObjectsERP/erpLoginPage'
import erpMemberDetailPage from '../support/pageObjectsERP/erpMemberDetailPage'
import erpMembersPage from '../support/pageObjectsERP/erpMembersPage'
import erpOrderDetailsPage from '../support/pageObjectsERP/erpOrderDetailsPage'
import erpTransactionPage from '../support/pageObjectsERP/erpTransactionPage'
import 'cypress-if'

let orderNumber
let loginText
let varName1
const SfAccountPage = new sfAccountPage()
const SfCheckOutPage = new sfCheckOutPage()
const SfExtraCardPage = new sfExtraCardPage()
const SfLandingPage = new sfLandingPage()
const SfLoginPage = new sfLoginPage()
const ErpLoginPage = new erpLoginPage()
const ErpMemberDetailPage = new erpMemberDetailPage()        
const ErpMembersPage = new erpMembersPage()
const ErpOrderDetailsPage = new erpOrderDetailsPage()
const ErpTransactionPage = new erpTransactionPage()

Cypress.Commands.add('memberLogin', (username, password)=>{
  cy.visit(Cypress.env('storefrontUrl')) 
  SfLandingPage.getLoginBtn().click() 
  SfLoginPage.getUserName().type(username)
  SfLoginPage.getPassword().type(password)
  SfLoginPage.getLoginBtn().click()  
  cy.wait(2000)
  // SfLandingPage.getAcceptCookiesBtn().if('visible').click() 
})

Cypress.Commands.add('acceptCookie', ()=>{
  SfLandingPage.getAcceptCookiesBtn().click()
})

Cypress.Commands.add('purchaseMembership',() =>{
  SfAccountPage.getMTOrderType().click()
  SfExtraCardPage.getAddMoreCardsBtn().click()
  SfExtraCardPage.getTierLevelPopup().click()
  SfExtraCardPage.getSelectTierLevel().click() 
  SfExtraCardPage.getNumberOfTierField().type('1')  
  SfExtraCardPage.getAgreementCheckBox().click()
  SfExtraCardPage.getNextBtn().click()
})

Cypress.Commands.add('placeOrderByCheque',() =>{
  SfCheckOutPage.getAgreeDisclaimerCheckBox().check()
  SfCheckOutPage.getAgreeDisclaimerBtn().click()   
  SfCheckOutPage.getPayByChequeBtn().click()
  SfCheckOutPage.getPlaceOrderBtn().click()
  cy.getTextOf(SfCheckOutPage.getOrderNumber())
  cy.setTextValue('setOrderNumber')
})

Cypress.Commands.add('ErpUserLogin',(ErpUserName, ErpUserPassword) =>{
cy.visit(Cypress.env('erpUrl'))  
ErpLoginPage.getUserName().type(ErpUserName)
ErpLoginPage.getPassword().type(ErpUserPassword) 
ErpLoginPage.getLoginBtn().click()
})

Cypress.Commands.add('confirmPayment',() =>{
  ErpTransactionPage.getTransactionList().click()
  const getOrderNumberKey = 'getOrderNumber' 
  cy.getTextValue(getOrderNumberKey)
  cy.typeTextValue(ErpTransactionPage.getOrderIdField())
  ErpTransactionPage.getSearchBtn().click()
  cy.wait(2000)
  ErpTransactionPage.getViewBtn().click()
  ErpOrderDetailsPage.getConfirmPaymentBtn().click()
  ErpOrderDetailsPage.getAgreeConfirmBtn().click()   
})

Cypress.Commands.add('dualConfirmation',(adminUN, adminPwd, FinanceUN, FinancePwd) =>{
  cy.ErpUserLogin(adminUN, adminPwd)
  cy.confirmPayment()
  cy.exitErp()
  cy.ErpUserLogin(FinanceUN, FinancePwd)
  cy.confirmPayment()  
  cy.exitErp() 
  })

Cypress.Commands.add('exitErp',() =>{
ErpMembersPage.getExitBtn().click()
})

//Basic methods or basic customized commands

Cypress.Commands.add('getTextOf',(pageObject) =>{
  pageObject.then(function(varName){
  varName1 = varName.text()
  if(varName1===''){
    cy.wrap(varName).invoke('val').as('getText');
  }
  else{
    cy.wrap(varName).invoke('text').as('getText');
  }  
  })
})

Cypress.Commands.add('setTextValue',(setTextValue) =>{
  cy.get('@getText').then(text => {    
    cy.task(setTextValue, text)
    cy.log("Set Text Value: "+" "+ text);
  })
})

Cypress.Commands.add('getTextValue',(getTextValue) =>{
      cy.task(getTextValue).then((text) => {  
      cy.wrap(text).as('useText')
      cy.log("Get Text Value:"+ text)
  })
})

Cypress.Commands.add('typeTextValue',(pageObject) =>{
  cy.get('@useText').then(text => {    
    pageObject.type(text)
  })
})

///For my reference
// cy.getTextOf(SfLoginPage.getLoginBtn())
// cy.setTextValue('setLoginText')  
// cy.getTextValue('getLoginText')  
// cy.get('@useText').then(text => {    
//   SfLoginPage.getUserName().type(text)
// })


