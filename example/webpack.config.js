const config = require('plebpack');
const {entry, output} = require('plebpack/hooks');

config.use(entry('app', './scripts/index.js'));
config.use(output('./build/bundle.js'));

module.exports = config;
