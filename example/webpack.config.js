const {resolve} = require('path');
const config = require('plebpack');
const {context, entry, output} = require('plebpack/hooks');

config.use(context(resolve(__dirname, 'scripts')));
config.use(entry('./index.js'));
config.use(output('./build/[name].js'));

module.exports = config;
