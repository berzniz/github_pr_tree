const fileSystem = require('fs-extra')
const path = require('path')
const { NODE_ENV, TARGET } = require('./env')

fileSystem.emptyDirSync(path.resolve(__dirname, '..', 'build', TARGET, NODE_ENV))

require('./generate_manifest')
