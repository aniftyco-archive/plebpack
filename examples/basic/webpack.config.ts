import config, { entry, output } from 'plebpack';
import babel from '@plebpack/babel';
import postcss from '@plebpack/postcss';
import * as tailwind from 'tailwindcss';

config.use(entry('./src/index.tsx'));
config.use(output('./public/[name].js'));
config.use(
  babel({
    presets: [
      '@babel/preset-env',
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
  })
);
config.use(
  postcss(
    {
      plugins: [tailwind('tailwind.config.ts')],
    },
    { exclude: /node_modules\/!(tailwindcss)/ }
  )
);

export default config;
