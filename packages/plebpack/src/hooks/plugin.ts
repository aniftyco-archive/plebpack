import { Plugin } from 'webpack';
import { Plebpack } from '../plebpack';
import { Hook } from '../hook';

export function plugin(plugin: Plugin): Hook;
export function plugin(plugin: Plugin, priority: number = 0): Hook {
  return (plebpack: Plebpack): void => {
    plebpack.addPlugin(plugin, priority);
  };
}
