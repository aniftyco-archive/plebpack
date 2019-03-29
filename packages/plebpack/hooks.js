const {context} = require('./lib/hooks/context');
const {entry} = require('./lib/hooks/entry');
const {loader} = require('./lib/hooks/loader');
const {output} = require('./lib/hooks/output');
const {plugin} = require('./lib/hooks/plugin');

module.exports = {
  context,
  entry,
  loader,
  output,
  plugin,
};
