const {resolve} = require('path');
const config = require('plebpack');
const {context, entry, output, loader, plugin} = require('plebpack/hooks');

config.use(context(resolve(__dirname, 'scripts')));
config.use(entry('app', './index.js'));
config.use(entry('admin', './admin.js'));
config.use(output('./build/[name].[contentHash:8].js'));

module.exports = config;
