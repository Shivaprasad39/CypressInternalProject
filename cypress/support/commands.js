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

let tierValExtraCard
let membershipNumValExtraCard
Cypress.Commands.add('purchaseMembership',() =>{
  SfAccountPage.getMTOrderType().click()
  SfExtraCardPage.getAddMoreCardsBtn().click()
  SfExtraCardPage.getTierLevelPopup().click()
  SfExtraCardPage.getSelectTierLevel().click()
  SfExtraCardPage.getSelectTierLevel().then(function(tierExtraCard){
    tierValExtraCard = tierExtraCard.text()
    cy.log("tierValExtraCard: "+ tierValExtraCard)
  })
  SfExtraCardPage.getNumberOfTierField().type('2').invoke('val').then(function(membershipNumExtraCard){
    membershipNumValExtraCard = membershipNumExtraCard
    cy.log("membershipNumValExtraCard: "+ membershipNumValExtraCard)
  }) 
  SfExtraCardPage.getAgreementCheckBox().click()
  SfExtraCardPage.getNextBtn().click()
})

let membershipNumValUpgrade
Cypress.Commands.add('upgradeMembership', ()=>{
  cy.contains('UPGRADE').click()
  cy.get('table > tbody > tr').each(row=>{
    cy.wrap(row).within(()=>{
      cy.get('td').each(col=>{            
           if(col.text() == membershipNumValMembership){
           membershipNumValUpgrade = col.text()
           cy.log("membershipNumValUpgrade: "+ membershipNumValUpgrade)
           cy.get('td:nth-child(5)').click()        
          }   
      })     
    })
  })
  cy.get('li[data-value= "5"]').click()
  cy.contains("Next").click()
  SfExtraCardPage.getAgreementCheckBox().click()
  SfExtraCardPage.getNextBtn().click()
})

let membershipNumValMembership
Cypress.Commands.add('membership', ()=>{
  cy.get('div:nth-child(13)').contains('MEMBERSHIP').click()
  cy.get('tbody > tr > td:nth-child(1)').then(function(membershipNumMembership){
    membershipNumValMembership = membershipNumMembership.text()
    cy.log("membershipNumValMembership: "+ membershipNumValMembership)
  })
  cy.contains('ACCOUNT').click()
})

let orderNumberValCheckOut
let tierValCheckOut
let membershipNumValCheckOut
let tierCostValCheckOut
let gFashionPercValCheckOut
let annualFeeValCheckOut
let membershipCreditValCheckOut
let totalCostValCheckOut
Cypress.Commands.add('placeOrderByCheque',() =>{
  SfCheckOutPage.getAgreeDisclaimerCheckBox().check()
  SfCheckOutPage.getAgreeDisclaimerBtn().click()
  cy.get('div:nth-child(1)>p:nth-child(1)~p').then(function(tierCheckOut){
    let tierCheckOutSplit = tierCheckOut.text().split(" ")
    tierValCheckOut = tierCheckOutSplit[2]
    cy.log("tierValCheckOut: "+ tierValCheckOut)
  })
  cy.get('div:nth-child(1)>p:nth-child(1)~p').then(function(membershipNumCheckOut){
    let membershipNumCheckOutSplit = membershipNumCheckOut.text().split(" ")
    membershipNumValCheckOut = membershipNumCheckOutSplit[5].slice(0,1)
    cy.log("membershipNumValCheckOut: "+ membershipNumValCheckOut)
  })
  cy.get('div:nth-child(1)>p:nth-child(3)').then(function(tierCostCheckOut){
    let tierCostCheckOutSplit = tierCostCheckOut.text().split(" ")
    tierCostValCheckOut = tierCostCheckOutSplit[0].slice(1)
    cy.log("tierCostValCheckOut: "+ tierCostValCheckOut)
    // expect(tierValExtraCard).to.equal(tierValCheckOut)
    // expect(membershipNumValExtraCard).to.equal(membershipNumValCheckOut)
  })
  cy.get('div:nth-child(1)>p:nth-child(5)').then(function(gFashionPercCheckOut){
    let gFashionPercCheckOutSplit = gFashionPercCheckOut.text().split(" ")
    gFashionPercValCheckOut = gFashionPercCheckOutSplit[0].slice(0,2)
    cy.log("gFashionPercValCheckOut: "+ gFashionPercValCheckOut)
  })
  cy.get('div:nth-child(1)>p:nth-child(8)').then(function(annualFeeCheckOut){
    let annualFeeCheckOutSplit = annualFeeCheckOut.text().split(" ")
    annualFeeValCheckOut = annualFeeCheckOutSplit[3].slice(2)
    cy.log("annualFeeValCheckOut: "+ annualFeeValCheckOut)
  })
  cy.get('div:nth-child(1)>p:nth-child(10)').then(function(membershipCreditCheckOut){
    let membershipCreditCheckOutSplit = membershipCreditCheckOut.text().split(" ")
    membershipCreditValCheckOut = membershipCreditCheckOutSplit[0].slice(1)
    cy.log("membershipCreditValCheckOut: "+ membershipCreditValCheckOut)
  })
  cy.get('div:nth-child(2)>p:nth-child(1)').then(function(totalCostCheckOut){
    let totalCostCheckOutSplit = totalCostCheckOut.text().split(" ")
    totalCostValCheckOut = totalCostCheckOutSplit[1].slice(1)
    cy.log("totalCostValCheckOut: "+ totalCostValCheckOut)
      cy.then(function(){
      for(let i = tierValExtraCard; i<=tierValExtraCard; i++){
        // if(tierCostValCheckOut == tierValExtraCard){
        expect(parseToNumber(tierCostValCheckOut)).to.equal(parseToNumber(tierValExtraCard)*parseToNumber(membershipNumValExtraCard)*10000) 
        cy.log(parseToNumber(tierValExtraCard)+" "+"test") 
        // }
      }
    })      
  })
  SfCheckOutPage.getPayByChequeBtn().click()
  SfCheckOutPage.getChequePlaceOrderBtn().click()
  SfCheckOutPage.getOrderNumber().then(function(orderNumberCheckOut){
    orderNumberValCheckOut = orderNumberCheckOut.text()
    cy.log("orderNumberValCheckOut:"+" "+orderNumberValCheckOut)
  })
})

Cypress.Commands.add('placeOrderByHDollar',(firstName, lastName, hEmail ) =>{
  SfCheckOutPage.getAgreeDisclaimerCheckBox().check()
  SfCheckOutPage.getAgreeDisclaimerBtn().click()   
  SfCheckOutPage.getPayByHDollarBtn().click()
  SfCheckOutPage.getFirstNameField().type(firstName)
  SfCheckOutPage.getLastNameField().type(lastName)
  SfCheckOutPage.getHimalayaEmailField().type(hEmail)
  SfCheckOutPage.getHDollarCheckBox().check()
  SfCheckOutPage.getHDollarPlaceOrderBtn().click() 
  SfCheckOutPage.getOrderNumber().then(function(orderNumberCheckOut){
    orderNumberValCheckOut = orderNumberCheckOut.text()
    cy.log("orderNumberValCheckOut:"+" "+orderNumberValCheckOut)
  })  
})

Cypress.Commands.add('ErpUserLogin',(ErpUserName, ErpUserPassword) =>{
cy.visit(Cypress.env('erpUrl'))  
ErpLoginPage.getUserName().type(ErpUserName)
ErpLoginPage.getPassword().type(ErpUserPassword) 
ErpLoginPage.getLoginBtn().click()
})

let tierValOrderDetail
Cypress.Commands.add('confirmPayment',() =>{
  ErpTransactionPage.getTransactionList().click()  
  ErpTransactionPage.getOrderIdField().type(orderNumberValCheckOut)
  ErpTransactionPage.getSearchBtn().click()
  cy.wait(2000)
  ErpTransactionPage.getViewBtn().click()
  cy.get('td>div>p').then(function(tierOrderDetail){
    let tierOrderDetailSplit = tierOrderDetail.text().split(" ")
    tierValOrderDetail = tierOrderDetailSplit[1]
    cy.log("tierOrderDetailVal: "+ tierValOrderDetail)
    expect(tierValCheckOut).to.equal(tierValOrderDetail)
  })
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

function parseToNumber(str) {
  return parseFloat(str.split(',').join(''));
}

///For my reference
// cy.getTextOf(SfLoginPage.getLoginBtn())
// cy.setTextValue('setLoginText')  
// cy.getTextValue('getLoginText')  
// cy.get('@useText').then(text => {    
//   SfLoginPage.getUserName().type(text)
// })


