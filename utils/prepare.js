const fileSystem = require('fs-extra')
const path = require('path')

fileSystem.emptyDirSync(path.join(__dirname, '../build'))

require('./generate_manifest')
