# Plebpack
> Webpack configuration for the common people.

## Example

*webpack.config.js*
```js
const config = require('plebpack');
const entry = require('@plebpack/entry');
const output = require('@plebpack/output');

config.use(entry('./example/index.js'));
config.use(output('./example/bundle.js'));

module.exports = config;
```
