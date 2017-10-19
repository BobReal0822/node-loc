import * as chalk from 'chalk';
import * as program from 'commander';
import * as process from 'process';

// import { Detector } from './detector';
import { getVersion } from './utils';

program
  .version(getVersion())
  .option('-f --file <file>', 'Detecte a file.', file => {
    console.log(`file in program: ${ file }`);
  })
  .option('-d --directory [directory]', 'Detecte a directory.', directory => {
    console.log(`directory in program: `, directory);
  })
  .parse(process.argv);
