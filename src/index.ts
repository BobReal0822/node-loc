import * as chalk from 'chalk';
import * as program from 'commander';
import * as process from 'process';

import { Detector } from './detector';
import { LangDirectory } from './directory';
import { LangFile } from './file';
import { getVersion } from './utils';

program
  .version(getVersion())
  .option('-f --file <file>', 'Detecte a file.', file => {
    const info = new LangFile(file).getInfo();
    console.log(chalk.default.cyan(`
      path: \t${ file }
      language: \t${ info.lang }
      total lines: \t${ String(info.lines.total) }
      code lines: \t${ String(info.lines.code) }
      comment lines: \t${ String(info.lines.comment) }
    `));
  })
  .option('-d --directory [directory]', 'Detecte a directory.', directory => {
    console.log(`directory in program: `, directory);
    const { info, languages } = new LangDirectory(directory).getInfo();

    console.log(chalk.default.cyan(`
      \ttotal lines: \t${ String(info.total) }
      \tcode lines: \t${ String(info.code) }
      \tcomment lines: \t${ String(info.comment) }
      \t--------------------${
        Object.keys(languages).map(key => {
          return `\n\t${ key } \t ${ String(languages[key]) }`;
        }).join('')
      }`));
  })
  .parse(process.argv);

export * from './file';
export * from './directory';
export * from './detector';
