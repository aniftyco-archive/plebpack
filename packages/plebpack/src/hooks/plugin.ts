import {IPlebpack} from '../plebpack';

export default (plugin: any, priority: number = 0): Function => (plebpack: IPlebpack): void => {
  plebpack.addPlugin(plugin, priority);
};
