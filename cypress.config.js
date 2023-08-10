const { defineConfig } = require("cypress");
// import './commands'

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    defaultCommandTimeout: 60000,
    pageLoadTimeout: 1000000,
    watchForFileChanges: false,
    viewportHeight: 1080,
    env: {
      storefrontUrl: "https://www-sg.gclubdev.net/en/",
      erpUrl: "https://erp-sg.gclubdev.net/en/"
      },
    viewportWidth: 1920,    
    setupNodeEvents(on, config) {
      let orderNumber
      let ErpUrl
      let loginText
      let password
      let tierLevel
      let noOfTiers
      // implement node event listeners here
      on('task', {
        setOrderNumber: (getOrderNumber) => {
          return (orderNumber = getOrderNumber);
        },
        getOrderNumber: () => {
          return orderNumber;
        }})
        on('task', {
        setTierLevel: (getTierLevel) => {
          return (tierLevel = getTierLevel);
        },
        getLoginText: () => {
          return tierLevel;
        },
        setNoOfTiers: (getNoOfTiers) => {
          return (noOfTiers = getNoOfTiers);
        },
        getPassword: () => {
          return noOfTiers;
        }
      })
      // cy.task('setOrderNumber', orderNumber)
      // cy.task('getOrderNumber')
    },
  },
});
