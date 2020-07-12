# Plebpack

> Webpack configuration for the common people.

## Example

_webpack.config.ts_

```ts
import config, { entry, output } from 'plebpack';
import babel from '@plebpack/babel';

config.use(entry('./src/index.ts'));
config.use(output('./public/[name].js'));
config.use(
  babel({
    presets: ['@babel/preset-env', '@babel/preset-typescript'],
  })
);

export default config;
```
