export function loadAllFirmware() {
  $('.firmware.column>.dimmer').addClass('active')
  clearAllFirmware()
  $.get('/api/firmware', (data) => {
    const firmwareList = JSON.parse(data)
    firmwareList.forEach((item) => {
      const template = $('#firmwareRow').clone()
      $(template).child('.firmwareType').text(item.type)
      $(template).child('.firmwareVersion').text(item.version)
      $(template).child('.downloadCount').text('Unknown')
      $(template).child('.downloadFirmware').click(() => {downloadFirmware(item.type, item.version)})
      $(template).child('.deleteFirmware').click(() => {deleteFirmware(item.type, item.version)})
      $('.firmware.table>tbody').append(template)
    })
    $('.firmware.column>.dimmer').removeClass('active')
  })
}

function clearAllFirmware() {
  $('.firmware.table>tbody').empty()
}

function deleteFirmware(firmwareType, firmwareVersion) {
  alert(`deleting ${firmwareType} ${firmwareVersion}`)
}

function downloadFirmware(firmwareType, firmwareVersion) {
  alert(`downloading ${firmwareType} ${firmwareVersion}`)
}
