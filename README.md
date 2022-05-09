# Device Manager

## TODO

* Add integration tests back to the tests
* Add cluster def and deploy device service, firmware service, and ota service, and associated databases to the cluster
* Add upload task for bootloader

## Structure

* Device Service - Remembers devices and their current status
* Firmware Service - Remembers and stores firmware
* Update Service - Provides an update API
* Device Manager - Provides a UI to visualize devices and firmware
