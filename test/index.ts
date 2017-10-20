/**
 *
 */
import * as Chai from 'chai';
import * as Mocha from 'mocha';
import * as Path from 'path';
// tslint:disable-next-line
import 'source-map-support/register';

import { Detector } from './../src/detector';
import { LangDirectory } from './../src/directory';
import { LangFile } from './../src/file';

// tslint:disable-next-line
const languageMap = require('language-map');
// tslint:disable-next-line
const lang = require('language-classifier');
const { assert, expect } = Chai;
const should = Chai.should();

const JsPath = Path.join(__dirname, '../..', 'test/data/index.js');

describe('Detector', () => {
  const detector = new Detector();

  describe('.getExtensionMap', () => {
    it('should return equals', () => {
      const map = Detector.getExtensionMap();

      // console.log('-------- in map: \n', map);c
      map['.js'].should.equal('javascript');
      map['.jsx'].should.equal('jsx');
      // map['.ts'].should.equal('typescript');
      // map['.tsx'].should.equal('tsx');
      map['.js'].should.equal('javascript');
      map['.cpp'].should.equal('c++');
    });
  });
});

describe('LangFile', () => {
  console.log('JsPath: ', JsPath);
  const file = new LangFile(JsPath);

  describe('.getPath', () => {
    it('should return file path.', () => {
      file.getPath().should.equal(JsPath);
    });
  });

  describe('.getInfo', () => {
    it('should return file info.', () => {
      console.log('file info: ', file.getInfo());
    });
  });
});


describe('LangDirectory', () => {
  const file = new LangDirectory('!(node_modules|build|coverage)/**/*.+(js|jsx|ts|tsx|html|less|css)');

  describe('.getPath', () => {
    it('should return file path.', () => {
      // file.getPath().should.equal(JsPath);
    });
  });
});
