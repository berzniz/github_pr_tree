#!/bin/bash -e

ENV=production
OUTPUT_TARGET=firefox
OUTPUT_FOLDER=./build/$OUTPUT_TARGET/$ENV
OUTPUT_FILE=$OUTPUT_TARGET.zip

yarn
yarn test-ci
NODE_ENV=production yarn build-$OUTPUT_TARGET
cd $OUTPUT_FOLDER
zip -r ../../../$OUTPUT_FILE ./*
cd -
