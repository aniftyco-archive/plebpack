import { RuleSetRule } from 'webpack';
import { Plebpack } from '../plebpack';
import { Hook } from '../hook';

export function loader(loader: RuleSetRule): Hook {
  return (plebpack: Plebpack): void => {
    plebpack.addLoader(loader);
  };
}
