const config = require('plebpack');
const {entry, output} = require('plebpack/lib/plugins');

config.use([entry('./scripts/index.js'), output('./build/bundle.js')]);

module.exports = config;
