#!/bin/bash

usage() {
    echo "USAGE: update-device.sh <mac> <currentFirmware> <currentVersion> <assignedType> <assignedVersion>" >&2
    echo "Updates the device service with a device" >&2
}

mac=$1
if [ -z "${mac}" ]; then
    echo "Missing device MAC address" >&2
    usage
    exit 1
fi

if [ "${mac}" == "-h" ]; then
    usage
    exit 0
fi

currentFirmware=$2
if [ -z "${currentFirmware}" ]; then
    echo "Missing current firmware type" >&2
    usage
    exit 1
fi

currentVersion=$3
if [ -z "${currentVersion}" ]; then
    echo "Missing current firmware version" >&2
    usage
    exit 1
fi

assignedType=$4
assignedVersion=$5

body=$(ytt \
        --data-value "mac=${mac}" \
        --data-value "currentFirmware=${currentFirmware}" \
        --data-value "currentVersion=${currentVersion}" \
        --data-value "assignedFirmware=${assignedType}" \
        --data-value "assignedVersion=${assignedVersion}" \
        --file test/device-template.yaml \
        --output json \
    )

curl -X POST \
    --verbose \
    --data-ascii ${body} \
    --header "content-type: application/json" \
    "http://localhost:3001/${mac}"
