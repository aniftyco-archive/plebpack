import {Plugin} from 'webpack';
import {IPlebpack} from '../plebpack';

export default (plugin: Plugin, priority: number = 0): Function => (plebpack: IPlebpack): void => {
  plebpack.addPlugin(plugin, priority);
};
