import { Plugin } from 'webpack';
import { Plebpack } from '../plebpack';

export default (plugin: Plugin, priority: number = 0): Function => (
  plebpack: Plebpack
): void => {
  plebpack.addPlugin(plugin, priority);
};
