import { RuleSetRule } from 'webpack';
import { Hook, Plebpack } from '../plebpack';

export function loader(loader: RuleSetRule): Hook {
  return (plebpack: Plebpack): void => {
    plebpack.addLoader(loader);
  };
}
