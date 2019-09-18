import config, {entry, output} from 'plebpack';

config.use(entry('./src/index.js'));
config.use(output('./dist/[name].js'));

export default config;
