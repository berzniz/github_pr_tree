#!/bin/bash -e

yarn
yarn test-ci
OUTPUT=extension.zip
NODE_ENV=production yarn build
zip -r $OUTPUT build
