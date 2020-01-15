const chromeWebStoreItemProperty = require('chrome-web-store-item-property')
const webpack = require('webpack')
const config = require('../webpack.config')
const chromeStoreId = 'nfhdjopbhlggibjlimhdbogflgmbiahc'

const bumpMinorVersion = (version) => {
  const splitVersion = version.split('.')
  splitVersion[2] = (1 + parseInt(splitVersion[2], 10))
  return splitVersion.join('.')
}

const getChromeVersion = async () => {
  console.log('📞  Getting version from Chrome Webstore...')
  const value = await chromeWebStoreItemProperty(chromeStoreId)

  console.log('🔥  Chrome Webstore version:', value.version)
  return value.version
}

const getNewVersion = async () => {
  if (process.env.NEW_VERSION) {
    return process.env.NEW_VERSION
  }

  const currentChromeVersion = await getChromeVersion()
  return bumpMinorVersion(currentChromeVersion)
}

const start = async () => {
  const newVersion = await getNewVersion()
  console.log('🚀  New version:', newVersion)
  process.env.extension_version = newVersion
  require('./prepare')

  webpack(
    config,
    function (err) {
      if (err) {
        throw err
      }
    }
  )
}

start()
  .then(console.log)
  .catch(console.log)
