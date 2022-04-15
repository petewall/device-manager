# Device Manager

## TODO

* Add integration test to firmware service
* Add cluster def and deploy firmware service and firmware db to the cluster
* Add upload task for bootloader
* Add device service to the pipeline
* Add device manager to the pipeline

## Structure

* Device Service - Remembers devices and their current status
* Firmware Service - Remembers and stores firmware
* Update Service - Provides an update API
* Device Manager - Provides a UI to visualize devices and firmware
