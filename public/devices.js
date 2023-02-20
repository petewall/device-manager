export function loadAllDevice() {
  $('.device.column>.dimmer').addClass('active')
  clearAllDevices()
  $.get('/api/device', (data) => {
    const deviceList = JSON.parse(data)
    deviceList.forEach((item) => {
      const template = $('#deviceRow').clone()
      $(template).child('.deviceName').value(item.name)
      $(template).child('.deviceMAC').text(item.mac)
      $(template).child('.lastUpdate').text('Unknown')
      $(template).child('.currentVersion').text(`${item.firmware} ${item.version}`)
      $('.device.table>tbody').append(template)
    })

    $('.device.column>.dimmer').removeClass('active')
  })
}

function clearAllDevices() {
  $('.device.table>tbody').empty()
}
