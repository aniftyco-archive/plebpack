const {resolve, dirname, relative, sep: SEPARATOR} = require('path');
const {lstatSync, readdirSync, writeFileSync} = require('fs');
const {sync: glob} = require('glob');
const {sync: mkdirp} = require('mkdirp');
const {transformFileSync: babel} = require('@babel/core');
const chalk = require('chalk');
const prettier = require('prettier');
const stringLength = require('string-length');

const PACKAGES_DIR = resolve(__dirname, '../packages');
const DONE = chalk.reset.green('DONE');
const COLUMNS = process.stdout.columns || 80;
const SRC_DIR = 'src';
const BUILD_DIR = 'lib';

const prettierConfig = {
  ...prettier.resolveConfig.sync(__filename),
  trailingComma: 'none',
  parser: 'babel',
};

const getTerminalWidth = (str) => COLUMNS - stringLength(str);

const getPackages = () =>
  readdirSync(PACKAGES_DIR)
    .map((file) => resolve(PACKAGES_DIR, file))
    .filter((file) => lstatSync(file).isDirectory());

const getPackageName = (file) => relative(PACKAGES_DIR, file).split(SEPARATOR)[0];

const getBuildPath = (file, folder) => {
  const pkgName = getPackageName(file);
  const pkgSrcPath = resolve(PACKAGES_DIR, pkgName, SRC_DIR);
  const pkgBuildPath = resolve(PACKAGES_DIR, pkgName, folder);
  const relativeToSrcPath = relative(pkgSrcPath, file);
  const destPath = resolve(pkgBuildPath, relativeToSrcPath);

  return `${destPath.substr(0, destPath.lastIndexOf('.'))}.js`;
};

const adjustToTerminalWidth = (str, width, char = '.') => {
  const strs = str.match(new RegExp(`(.{1,${width}})`, 'g'));

  let lastString = strs[strs.length - 1];

  if (lastString.length < width) {
    lastString += Array(width - lastString.length).join(chalk.dim(char));
  }

  return strs
    .slice(0, -1)
    .concat(lastString)
    .join('\n');
};

const compileFile = (file) => {
  const destPath = getBuildPath(file, BUILD_DIR);

  mkdirp(dirname(destPath));

  const transformed = babel(file);
  const prettyCode = prettier.format(transformed.code, prettierConfig);

  writeFileSync(destPath, prettyCode);

  return {
    src: relative(PACKAGES_DIR, file),
    dest: relative(PACKAGES_DIR, destPath),
  };
};

const buildPackage = (pkg) => {
  const srcDir = resolve(pkg, SRC_DIR);
  const pattern = resolve(srcDir, '**/*');
  const {name} = require(resolve(pkg, 'package.json'));
  const files = glob(pattern, {nodir: true});

  process.stdout.write(adjustToTerminalWidth(` ${name} \n`, getTerminalWidth(DONE) - 2));

  files.forEach(compileFile);
  process.stdout.write(` ${DONE}\n`);
};

const exists = (filename) => {
  try {
    return lstatSync(filename).isFile();
  } catch (e) {
    // doesn't exist
  }
  return false;
};

module.exports = {
  DONE,
  COLUMNS,
  PACKAGES_DIR,
  SRC_DIR,
  BUILD_DIR,
  prettierConfig,
  getBuildPath,
  getPackageName,
  getPackages,
  buildPackage,
  compileFile,
  adjustToTerminalWidth,
  exists,
  getTerminalWidth,
};
