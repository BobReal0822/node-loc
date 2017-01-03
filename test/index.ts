/**
 * 
 */
import * as Path from 'path';
import * as assert from 'assert';
import { LanguageDetector } from './../src/';

let languageMap = require('language-map');

const JsPath = Path.join(__dirname, '../..', 'data/test1.cpp');

describe('Test node-language-detect', () => {
  describe('javascipt', () => {
    it('should return javascipt: ', () => {
        console.log('JsPath: ', JsPath);
        console.log('-----: ', LanguageDetector.detect(JsPath));
    });
  });
});

