const config = require('plebpack');
const {entry, output} = require('plebpack/hooks');

config.use(entry('./scripts/index.js'));
config.use(output('./build/[name].js'));

module.exports = config;
