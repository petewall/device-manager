#!/bin/bash

usage() {
    echo "USAGE: add-firmware.sh <type> <version>" >&2
    echo "Adds a sample firmware to the test firmware service" >&2
}

firmwareType=$1
if [ -z "${firmwareType}" ]; then
    echo "Missing firmware type" >&2
    usage
    exit 1
fi

if [ "${firmwareType}" == "-h" ]; then
    usage
    exit 0
fi

firmwareVersion=$2
if [ -z "${firmwareVersion}" ]; then
    echo "Missing firmware version" >&2
    usage
    exit 1
fi

curl -X PUT \
    --data-binary "this is the data for ${firmwareType} ${firmwareVersion}" \
    --header "content-type: application/octet-stream" \
    "http://localhost:3002/${firmwareType}/${firmwareVersion}"
