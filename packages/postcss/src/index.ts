import { RuleSetRule } from 'webpack';
import { Plebpack } from 'plebpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

type PostCSSOptions = {
  exec?: boolean;
  parser?: Record<string, any> | string;
  syntax?: Record<string, any> | string;
  stringifier?: Record<string, any> | string;
  config?: Record<string, any>;
  plugins?: Function | Function[];
  sourceMap?: boolean | string;
};

export default function postcss(
  options?: PostCSSOptions,
  override?: RuleSetRule
) {
  return (plebpack: Plebpack): void => {
    plebpack.addExtension('.css');

    plebpack.addLoader({
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options,
        },
      ],
      ...override,
    });

    plebpack.addPlugin(new MiniCssExtractPlugin({ filename: `[name].css` }));
  };
}
