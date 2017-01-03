/**
 * 
 */

import * as Fs from 'fs';
import * as Path from 'path';

let languageMap = require('language-map');

// const VerderPathConfig = {
//   extensions: Path.join(__dirname, '../vender', 'extensions.json')
// };

// Fs.writeFileSync(VerderPathConfig.extensions, JSON.stringify(extensions, null, 2));

export class LanguageDetector {
  private static extensionMap: {
    [key: string]: string;
  } = {};

  constructor() {
    return new LanguageDetector();
  };

  public static detect(filePath: string): string {
    let fileExtension = '.' + filePath.split('.').pop();

    if (!Object.keys(this.extensionMap).length) {
      this.extensionMap = getLanguageExtensionMap();
    }

    // console.log("in detect: \n", fileExtension, '\n');
    return fileExtension ? (this.extensionMap[fileExtension] || '') : '';
  }
};


function getLanguageExtensionMap(): {
  [key: string]: string;
} {
  let extensions: {
    [key: string]: string;
  } = {};

  Object.keys(languageMap).map(language => {
    let languageMode = languageMap[language],
      languageExtensions = languageMode && languageMode.extensions || [];

    languageExtensions.map((extension: string) => {
      extensions[extension.toLowerCase()] = language.toLowerCase();
    });
  });

  return extensions;
};
