import {RuleSetRule} from 'webpack';
import {IPlebpack} from '../plebpack';

export default (loader: RuleSetRule): Function => (plebpack: IPlebpack): void => {
  plebpack.addLoader(loader);
};
