/**
 * 
 */
import * as Path from 'path';
import * as assert from 'assert';
import { LanguageDetector } from './../src/';

const languageMap = require('language-map');
const lang = require('language-classifier');

const JsPath = Path.join(__dirname, '../..', 'data/test1.cpp');

describe('Test node-language-detect', () => {
  describe('javascipt', () => {
    it('should return javascipt: ', () => {
        console.log('JsPath: ', JsPath);
        console.log('-----: ', LanguageDetector.getFileType(JsPath));
        console.log("___________get file info: ", LanguageDetector.getFileInfo(JsPath));
    });
  });
});

describe('Test node-language-classifier', () => {
  describe('javascipt', () => {
    it('should return javascipt: ', () => {
        console.log('-----: ',lang('var a = 2;'));
    });
  });

  describe('c++', () => {
    it('should return c++: ', () => {
        console.log('-----: ', lang('let a = [];'));
    });
  });
});
