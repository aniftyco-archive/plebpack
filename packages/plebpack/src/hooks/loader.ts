import { RuleSetRule } from 'webpack';
import { Plebpack } from '../plebpack';

export default (loader: RuleSetRule): Function => (
  plebpack: Plebpack
): void => {
  plebpack.addLoader(loader);
};
