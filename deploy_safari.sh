#!/bin/bash -e

ENV=production
OUTPUT_TARGET=safari
OUTPUT_FOLDER=./build/$OUTPUT_TARGET/$ENV
OUTPUT_FILE=$OUTPUT_TARGET.zip

rm -f ./$OUTPUT_FILE

yarn
yarn test-ci
NODE_ENV=production yarn build-$OUTPUT_TARGET

# copy resources files into xcode project
cp -r $OUTPUT_FOLDER/* Better\ Pull-Request/Better\ Pull-Request\ Extension/Resources

cd $OUTPUT_FOLDER
zip -r ../../../$OUTPUT_FILE ./*
cd -

