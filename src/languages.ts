import * as buffer from 'buffer';
import { encode } from 'punycode';
import { Deflate } from 'zlib';

import * as Fs from 'fs';
import * as Path from 'path';

import { ExtensionJustify } from './utils';

// tslint:disable-next-line
const languageMap = require('language-map');
// tslint:disable-next-line
const lang = require('language-classifier');

interface ExtensionsTypes {
  [key: string]: string;
}

export interface DetectorOptions {
}

/**
 * detecte program language through file extension
 *
 * @export
 * @class LanguageDetector
 */
export class Languages {
  static extensionMap: {
    [key: string]: string;
  } = {};
  private options: DetectorOptions;

  /**
   * Creates an instance of Detector.
   * @param {DetectorOptions} [options]
   * @memberof Detector
   */
  constructor(options?: DetectorOptions) {
    Languages.extensionMap = this.loadExtensionMap();
  }

  /**
   * load language before detecting
   *
   * @private
   * @returns
   * @memberof Detector
   */
  private loadExtensionMap() {
    const extensions: ExtensionsTypes = {};

    Object.keys(languageMap).map(language => {
      const languageMode = languageMap[language];
      const languageExtensions = languageMode && languageMode.extensions || [];

      languageExtensions.map((extension: string) => {
        extensions[extension.toLowerCase()] = language.toLowerCase();
      });
    });

    return Object.assign({}, extensions, ExtensionJustify);
  }

  /**
   * get language type by code snippet
   *
   * @param {string} codeSnippet
   * @returns
   *
   * @memberOf LanguageDetector
   */
  public static classify(codeSnippet: string) {
    return codeSnippet ? lang(codeSnippet) : '';
  }

  /**
   * return extension map
   *
   * @returns
   * @memberof Detector
   */
  public static getExtensionMap() {
    return Languages.extensionMap;
  }
}
