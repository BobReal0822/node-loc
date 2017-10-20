import * as chalk from 'chalk';
import * as program from 'commander';
import * as process from 'process';

import { LocDir } from './directory';
import { LocFile } from './file';
import { Languages } from './languages';
import { getVersion } from './utils';

program
  .version(getVersion())
  .command('file <path>')
  .description('detect a file')
  .action(path => {
    const info = new LocFile(path).getInfo();
    console.log(chalk.default.cyan(`
      path: \t\t${ path }
      language: \t${ info.lang }
      total lines: \t${ String(info.lines.total) }
      code lines: \t${ String(info.lines.code) }
      comment lines: \t${ String(info.lines.comment) }
    `));
  });

program
  .command('dir <pattern>')
  .description('detect a directory with a pattern')
  .action(pattern => {
    const { info, languages } = new LocDir(pattern).getInfo();
    console.log(chalk.default.cyan(`
      \ttotal lines: \t${ String(info.total) }
      \tcode lines: \t${ String(info.code) }
      \tcomment lines: \t${ String(info.comment) }
      \t--------------------${
        Object.keys(languages).map(key => {
          return `\n\t${ key } \t ${ String(languages[key]) }`;
        }).join('')
      }`));
  });

program.parse(process.argv);

export * from './file';
export * from './directory';
export * from './languages';
