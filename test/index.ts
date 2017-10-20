/**
 *
 */
import * as Chai from 'chai';
import * as Mocha from 'mocha';
import * as Path from 'path';

import { LocDir } from './../src/directory';
import { LocFile } from './../src/file';
import { Languages } from './../src/languages';

// tslint:disable-next-line
const languageMap = require('language-map');
// tslint:disable-next-line
const lang = require('language-classifier');
// tslint:disable-next-line
import 'source-map-support/register';

const { assert, expect } = Chai;
const should = Chai.should();
const JsPath = Path.join(__dirname, '../..', 'test/data/index.js');

describe('Languages', () => {
  const languange = new Languages();

  describe('.getExtensionMap', () => {
    it('should return equals', () => {
      const map = Languages.getExtensionMap();

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

describe('LocFile', () => {
  console.log('JsPath: ', JsPath);
  const file = new LocFile(JsPath);

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


describe('LocDir', () => {
  const file = new LocDir('!(node_modules|build|coverage)/**/*.+(js|jsx|ts|tsx|html|less|css)');

  describe('.getPath', () => {
    it('should return file path.', () => {
      // file.getPath().should.equal(JsPath);
    });
  });
});
