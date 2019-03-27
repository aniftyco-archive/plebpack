const program = require('commander');
const commands = require('./commands');

program.version('1.0.0', '-v, --version');

program
  .command('build')
  .description('build all of the jemini packages')
  .option('-w, --watch', 'watch files and rebuild')
  .option('-t, --types', 'build types')
  .action(({watch = false, types = false}) => {
    if (types) {
      return commands.ts();
    }

    if (watch) {
      return commands.watch();
    }

    return commands.build();
  });

program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
