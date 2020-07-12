import config, { entry, output } from 'plebpack';

config.use(entry('./src/index.js'));
config.use(output('./public/[name].js'));

export default config;
