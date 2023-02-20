# Device Manager

The device manager is a series of microservices that manage devices, mainly ESP8266.

## Structure

* bootloader - Provides bootloader firmware that can be loaded on all initial devices
* Device Service - Remembers devices and their current status
* Firmware Service - Remembers and stores firmware
* Update Service - Provides an update API for over the air (OTA) updates
* Device Manager - Provides a UI to visualize devices and firmware

* internal.petewall.net/device
* internal.petewall.net/device/api
* internal.petewall.net/device/update
* internal.petewall.net/device/firmware


## Plan

### Run

* Remove the calls internally, create js files that do the requests and build the page.

### Test

* Start mock servers for device, firmware, and ota services
* Test functions in the js files and ensure the right requests are being called
