import { Plebpack } from 'plebpack';
import { TransformOptions as BabelOptions } from '@babel/core';

export default function babel(options?: BabelOptions) {
  return (plebpack: Plebpack): void => {
    plebpack.addLoader({
      test: /\.(m?js|tsx?)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options,
      },
    });
  };
}
