# Plebpack

> Webpack configuration for the common people.

## Example

_webpack.config.ts_

```ts
import config, { entry, output } from 'plebpack';

config.use(entry('./example/index.js'));
config.use(output('./example/[name].js'));

export default config;
```
