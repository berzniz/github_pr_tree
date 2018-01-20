#!/bin/bash -e

yarn
OUTPUT=extension.zip
NODE_ENV=production TORII_ENV=production npm run build
zip -r $OUTPUT build
