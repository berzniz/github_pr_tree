// const chromeWebStoreItemProperty = require('chrome-web-store-item-property')
const webpack = require('webpack')
const config = require('../webpack.config')
// const chromeStoreId = 'nfhdjopbhlggibjlimhdbogflgmbiahc'
// const bumpMinorVersion = (version) => {
//   const splitVersion = version.split('.')
//   splitVersion[2] = (1 + parseInt(splitVersion[2], 10))
//   return splitVersion.join('.')
// }

// console.log('📞  Getting version from Chrome Webstore...')
// chromeWebStoreItemProperty(chromeStoreId)
//     .then(value => {
//       console.log('🔥  Chrome Webstore version:', value.version)
//       const newVersion = bumpMinorVersion(value.version)
//       console.log('🚀  New version:', newVersion)
//       process.env.extension_version = newVersion
require('./prepare')

webpack(
            config,
            function (err) {
              if (err) {
                throw err
              }
            }
        )
    // })
    // .catch(err => {
    //   console.error('Failed getting version from Chrome Webstore', err)
    // })
