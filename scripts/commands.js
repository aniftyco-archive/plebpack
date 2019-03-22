const {resolve, relative} = require('path');
const {accessSync, watch, unlinkSync, F_OK} = require('fs');
const chalk = require('chalk');
const {
  COLUMNS,
  PACKAGES_DIR,
  SRC_DIR,
  BUILD_DIR,
  getPackages,
  compileFile,
  buildPackage,
  adjustToTerminalWidth,
  exists,
  getTerminalWidth,
} = require('./utils');

const buildCommand = () => {
  process.stdout.write(chalk.magenta('\n Building Packages\n'.toUpperCase()));
  process.stdout.write(` ${Array(COLUMNS - 2).join(chalk.dim('='))} \n`);
  getPackages().forEach(buildPackage);
  process.stdout.write('\n');
};

const watchCommand = () => {
  const files = new Map();
  const COMPILED = chalk.green('COMPILED');
  const FAILED = chalk.red('FAILED');
  const DELETED = chalk.yellow('DELETED');

  buildCommand();

  process.stdout.write(chalk.magenta('\n Watching Packages\n'.toUpperCase()));
  process.stdout.write(` ${Array(COLUMNS - 2).join(chalk.dim('='))} \n`);

  getPackages().forEach((pkg) => {
    try {
      const srcDir = resolve(pkg, SRC_DIR);
      const buildDir = resolve(pkg, BUILD_DIR);

      accessSync(srcDir, F_OK);
      watch(srcDir, {recursive: true}, (event, filename) => {
        const srcFile = resolve(srcDir, filename);
        const buildFile = resolve(buildDir, filename);

        if ((event === 'change' || event === 'rename') && exists(srcFile)) {
          files.set(srcFile, (file) => {
            try {
              compileFile(file);
              process.stdout.write(
                adjustToTerminalWidth(` ${relative(resolve(srcDir, '../..'), file)} \n`, getTerminalWidth(COMPILED) - 2)
              );
              process.stdout.write(` ${COMPILED}\n`);
            } catch (err) {
              process.stderr.write(
                adjustToTerminalWidth(` ${relative(resolve(srcDir, '../..'), file)} \n`, getTerminalWidth(FAILED) - 2)
              );
              process.stderr.write(` ${FAILED}\n`);
              process.stderr.write(` ${Array(COLUMNS - 2).join(chalk.dim('-'))} \n`);
              process.stderr.write(` ${chalk.dim(err.message)}\n`);
              process.stderr.write(` ${Array(COLUMNS - 2).join(chalk.dim('-'))} \n`);
            }
          });
        } else {
          files.set(buildFile, (file) => {
            try {
              process.stdout.write(
                adjustToTerminalWidth(
                  ` ${relative(resolve(srcDir, '../..'), file.replace(BUILD_DIR, SRC_DIR))} \n`,
                  getTerminalWidth(DELETED) - 2
                )
              );
              unlinkSync(file);
              process.stdout.write(` ${DELETED}\n`);
            } catch (e) {
              // unable to delete
            }
          });
        }
      });
    } catch (err) {
      process.stdout.write(
        ` ${chalk.yellow('NOTICE:')} Ignoring ${chalk.green(
          relative(PACKAGES_DIR, pkg)
        )} package due to no ${chalk.blue('src')} folder.\n`
      );
      process.stdout.write(` ${Array(COLUMNS - 2).join(chalk.dim('='))} \n`);
    }
  });

  setInterval(() => {
    files.forEach((handler, file) => handler(file));
    files.clear();
  }, 100);
};

module.exports = {
  build: buildCommand,
  watch: watchCommand,
};
