const deviceManagerHost = 'localhost:3000'

context('Firmware page', () => {
  before('seed some firmware', () => {
    cy.deleteFirmware('bootstrap', '1.2.3')
    cy.addFirmware('bootstrap', '1.2.3')
    cy.deleteFirmware('bootstrap', '2.0.0')
    cy.addFirmware('bootstrap', '2.0.0')
    cy.deleteFirmware('lightswitch', '1.0')
    cy.addFirmware('lightswitch', '1.0')
  })

  describe('Basic page structure', () => {
    it('shows the firmware table', () => {
      cy.visit(`http://${deviceManagerHost}/#/firmware`)
      cy.get('table#firmware-table').should('be.visible')
    })
  })

  describe('deleting firmware', () => {
    it('removes the firmware', () => {
      // click the delete button on lightswtich 1.0
    })
  })
})
