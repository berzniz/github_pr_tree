#!/bin/bash -e

ENV=production
OUTPUT_TARGET=firefox
OUTPUT_FOLDER=./build/$OUTPUT_TARGET/$ENV
OUTPUT_FILE=$OUTPUT_TARGET.zip

rm -f ./$OUTPUT_FILE

yarn
yarn test-ci
NODE_ENV=production yarn build-$OUTPUT_TARGET
cd $OUTPUT_FOLDER
zip -r ../../../$OUTPUT_FILE ./*
cd -

VERSION=`cat $OUTPUT_FOLDER/manifest.json | json version`
zip -r firefox_source_$VERSION.zip src utils ./.babelrc package.json README.md webpack.config.js yarn.lock

echo ""
echo "Upload: https://addons.mozilla.org/en-US/developers/addons"
