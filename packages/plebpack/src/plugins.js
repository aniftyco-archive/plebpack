import {resolve, dirname, basename} from 'path';

export const entry = (path) => (plebpack) => {
  plebpack.config.entry = path;
};

export const output = (path) => (plebpack) => {
  plebpack.config.output = {
    path: dirname(resolve(path)),
    filename: basename(path),
  };
};
