///<reference types = "Cypress"/>
class sfExtraCardPage
{
    getAddMoreCardsBtn(){
        return cy.contains('Add more cards')
    }
    getTierLevelPopup(){
        return cy.get("div[aria-haspopup='listbox']")
    }
    getSelectTierLevel(){
        return cy.get("li[role='option'][data-value='1']")
    }
    getNumberOfTierField(){
        return cy.get("input[name = 'cardInfo[0].num']")
    }
    getAgreementCheckBox(){
        return cy.get("input[name='agreement']")
    }
    getNextBtn(){
        return cy.contains('Next Step')
    }
   
}
export default sfExtraCardPage;


