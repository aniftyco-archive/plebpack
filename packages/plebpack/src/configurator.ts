import {Plebpack} from './plebpack';

export class Configurator {
  constructor(protected config: Plebpack, protected env: string, protected options: object) {}

  public build(): object {
    return {
      mode: this.env || 'development',
    };
  }
}
