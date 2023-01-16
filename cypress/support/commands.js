const firmwareServiceHost = 'localhost:3002'

Cypress.Commands.add('addFirmware', (firmwareType, firmwareVersion) => {
  cy.request({
    url: `http://${firmwareServiceHost}/${firmwareType}/${firmwareVersion}`,
    method: 'PUT',
    body: new ArrayBuffer(32),
    headers: {
      'content-type': 'application/octet-stream'
    }
  })
})

Cypress.Commands.add('deleteFirmware', (firmwareType, firmwareVersion) => {
  cy.request({
    url: `http://${firmwareServiceHost}/${firmwareType}/${firmwareVersion}`,
    method: 'DELETE',
  })
})
