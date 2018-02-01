#!/bin/bash -e

yarn
OUTPUT=extension.zip
NODE_ENV=production yarn build
zip -r $OUTPUT build
