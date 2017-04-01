import { Deflate } from 'zlib';
import { encode } from 'punycode';
import * as buffer from 'buffer';
/**
 * 
 */

import * as Fs from 'fs';
import * as Path from 'path';

const languageMap = require('language-map');
const lang = require('language-classifier');

// const VerderPathConfig = {
//   extensions: Path.join(__dirname, '../vender', 'extensions.json')
// };

// Fs.writeFileSync(VerderPathConfig.extensions, JSON.stringify(extensions, null, 2));

interface ExtensionsTypes {
  [key: string]: string;
};

export interface FileOptions {
  sync?: boolean;
}

export interface DetectorOptions {

}

export interface DetectedFileInfo {
  fileType: string;
  fileSize: number;
  totalLine: number;
  lines: {
    [key: string]: number
  }
}

const DefaultDetectorOptions: DetectorOptions = {

};

const DefaultDatectedFileInfo: DetectedFileInfo = {
  fileType: '',
  fileSize: 0,
  totalLine: 0,
  lines: {}
};

/**
 * language detector
 * 
 * @export
 * @class LanguageDetector
 */
export class LanguageDetector {
  private static extensionMap: {
    [key: string]: string;
  } = {};

  private options: DetectorOptions;

  constructor(options?: DetectorOptions) {
    return new LanguageDetector();
  };

  /**
   * get language extension map from 'language-map'
   * 
   * @private
   * @static
   * @returns {extensionsTypes} 
   * 
   * @memberOf LanguageDetector
   */
  private static getLanguageExtensionMap(): ExtensionsTypes {
    let extensions: ExtensionsTypes = {};

    Object.keys(languageMap).map(language => {
      let languageMode = languageMap[language],
        languageExtensions = languageMode && languageMode.extensions || [];

      languageExtensions.map((extension: string) => {
        extensions[extension.toLowerCase()] = language.toLowerCase();
      });
    });

    return extensions;
  }

  /**
   * get language type by filePath
   * 
   * @static
   * @param {string} filePath 
   * @returns {string} 
   * 
   * @memberOf LanguageDetector
   */
  public static getFileType(filePath: string): string {
    let fileExtension = '.' + filePath.split('.').pop();

    if (!Object.keys(this.extensionMap).length) {
      this.extensionMap = this.getLanguageExtensionMap();
    }

    // console.log("in detect: \n", fileExtension, '\n');
    return fileExtension ? (this.extensionMap[fileExtension] || '') : '';
  }

  /**
   * get language type by code snippet
   * 
   * @static
   * @param {string} codeSnippet 
   * @returns 
   * 
   * @memberOf LanguageDetector
   */
  public static classify(codeSnippet: string) {
    return codeSnippet ? lang(codeSnippet) : '';
  }

  /**
   * get file info by file path
   * 
   * @static
   * @param {string} filePath 
   * @param {fileOptionsInfo} [options] 
   * @returns 
   * 
   * @memberOf LanguageDetector
   */
  public static getFileInfo(filePath: string, options?: FileOptions): DetectedFileInfo {
    let fileInfo: DetectedFileInfo = Object.assign({}, DefaultDatectedFileInfo);
    let fileStat: Fs.Stats;
    let fileData: string;
    let lines: string[];

    try {
      fileStat = Fs.statSync(filePath);
      fileData = Fs.readFileSync(filePath, 'utf-8');
    } catch (err) {
      throw new Error('read file failed.');
    }

    lines = fileData.split(/\n/);
    fileInfo.fileSize = fileStat && fileStat.size || 0;
    fileInfo.totalLine = lines && lines.length || 0;
    fileInfo.fileType = this.getFileType(filePath);

    lines.map((line, index) => {
      let languageType: string = this.classify(line);

      if (!fileInfo.lines[languageType]) {
        fileInfo.lines[languageType] = 1;
      } else {
        fileInfo.lines[languageType] ++;
      }
    });

    return fileInfo;
  }
};
