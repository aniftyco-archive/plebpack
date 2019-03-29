# Plebpack

> Webpack configuration for the common people.

## Example

_webpack.config.js_

```js
const config = require('plebpack');
const {entry, output} = require('plebpack/hooks');

config.use(entry('./example/index.js'));
config.use(output('./example/[name].js'));

module.exports = config;
```
