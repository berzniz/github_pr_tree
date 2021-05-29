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

# Build and archive safari extension

cd ./Better\ Pull-Request/
rm -rf ./build
xcodebuild -project "Better Pull-Request.xcodeproj" -scheme "Better Pull-Request" archive -archivePath "build/Better Pull-Request.xcarchive"
xcodebuild -exportArchive -archivePath "build/Better Pull-Request.xcarchive" -exportPath "Better Pull-Request.app" -exportOptionsPlist exportOptions.plist
cd ..

# cd $OUTPUT_FOLDER
# zip -r ../../../$OUTPUT_FILE ./*
# cd -

