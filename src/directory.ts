import * as Fs from 'fs-extra';
import * as Glob from 'glob';
import * as Globby from 'globby';
import * as _ from 'lodash';
import * as Path from 'path';

import { LangFile, LineInfo } from './file';

const DefaultInfo: LineInfo = {
    total: 0,
    code: 0,
    comment: 0
};

export class LangDirectory {
  private pattern: string;
  private info: LineInfo;
  private files: LangFile[];
  private languages: {
    [key: string]: number;
  };

  constructor(pattern: string) {
    this.pattern = pattern;
    const { files, info, languages } = this.loadInfo();
    this.files = files;
    this.info = info;
    this.languages = languages;

    console.log('this info: ', info);
    console.log('this files: ', files.map(file => file.getInfo()));
    console.log('this langs: ', languages);
  }

  private loadInfo(): {
    files: LangFile[],
    info: LineInfo,
    languages: {
      [key: string]: number;
    }
  } {
      // '!(node_modules|build|coverage)/**/*.+(ts|tsx|html|less|css)'
      const pathes = Glob.sync(this.pattern);
      const files: LangFile[] = [];
      const info: LineInfo = _.cloneDeep(DefaultInfo);
      const languages: {
        [key: string]: number;
      } = {};

      pathes.map(path => {
        if (path) {
          const fullPath = Path.resolve('./', path);
          const file = new LangFile(fullPath);
          const fileLineInfo = file.getInfo().lines;
          const lang = file.getInfo().lang;

          info.total += fileLineInfo.total;
          info.code += fileLineInfo.code;
          info.comment += fileLineInfo.comment;

          languages[lang] = (languages[lang] || 0) + fileLineInfo.code;
          files.push(file);
        }
      });

      return {
        files,
        info,
        languages
      };
  }

  public getPattern(): string {
    return this.pattern;
  }

  public getInfo(): LineInfo {
    return this.info;
  }
}
