const { NODE_ENV, TARGET } = require('./env')
const fileSystem = require('fs')
const path = require('path')
const manifest = require(`../src/manifest.${TARGET}.json`)

// generates the manifest file using the package.json informations
manifest.description = process.env.npm_package_description
manifest.version = process.env.extension_version || process.env.npm_package_version

if (TARGET === 'firefox' && NODE_ENV === 'development') {
  manifest.applications = {
    gecko: {
      id: 'betterpr@example.com',
      strict_min_version: '0.1'
    }
  }
}

fileSystem.writeFileSync(
  path.join(__dirname, `../build/${TARGET}/${NODE_ENV || 'development'}/manifest.json`),
  JSON.stringify(manifest)
)
