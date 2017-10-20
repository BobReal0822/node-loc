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
    console.log(`file in program: ${ file }`);

    const lang = new LangFile(file);
    console.log('file info: ', lang.getInfo().lines);
  })
  .option('-d --directory [directory]', 'Detecte a directory.', directory => {
    console.log(`directory in program: `, directory);
    const lang = new LangDirectory(directory);

    console.log('directory info: ', lang.getInfo());
  })
  // .option('-p --pattern [pattern]', 'File glob pattern for detecting a directory', pattern => {
  //   console.log(`pattern in program: `, pattern);

  //   const lang = new LangDirectory(pattern);

  //   console.log('directory info: ', lang.getInfo());
  // })
  .parse(process.argv);

export * from './file';
export * from './directory';
export * from './detector';
