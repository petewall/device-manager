context('Firmware page', () => {
  describe('Basic page structure', () => {
    it('has all the ', () => {
      cy.visit('http://localhost:3000/#/firmware')
      cy.get('table#firmware-table').should('be.visible')
    })
  })
})
