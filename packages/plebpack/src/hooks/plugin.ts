import { Plugin } from 'webpack';
import { Hook, Plebpack } from '../plebpack';

export function plugin(plugin: Plugin): Hook;
export function plugin(plugin: Plugin, priority: number = 0): Hook {
  return (plebpack: Plebpack): void => {
    plebpack.addPlugin(plugin, priority);
  };
}
