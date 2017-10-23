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

const onlineFile = 'https://raw.githubusercontent.com/ephoton/github-loc/master/README.md';
const testData = `WyFbbnBtIHZlcnNpb25dKGh0dHBzOi8vYmFkZ2UuZnVyeS5pby9qcy9ub2Rl\nLWxvYy5zdmcpXShod
HRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9ub2Rl\nLWxvYykKWyFbQnVpbGQgU3RhdHVzXShodHRwczovL3RyYXZpcy
1jaS5vcmcv\nZXBob3Rvbi9ub2RlLWxvYy5zdmc/YnJhbmNoPW1hc3RlcildKGh0dHBzOi8v\ndHJhdmlzLWNpLm9yZy9lcG
hvdG9uL25vZGUtbG9jKQpbIVtDb3ZlcmFnZSBT\ndGF0dXNdKGh0dHBzOi8vY292ZXJhbGxzLmlvL3JlcG9zL2dpdGh1Yi9lc
Ghv\ndG9uL25vZGUtbG9jL2JhZGdlLnN2Zz9icmFuY2g9bWFzdGVyKV0oaHR0cHM6\nLy9jb3ZlcmFsbHMuaW8vZ2l0aHViL
2VwaG90b24vbm9kZS1sb2M/YnJhbmNo\nPW1hc3RlcikKCiMgbm9kZS1sb2MK8J+SuyBDb3VudHMgdGhlIG51bWJlciBv\nZ
iBsaW5lcyBvZiBjb2RlLCB3cml0dGVuIGluIFR5cGVTY3JpcHQuCgojIyBQ\ncmVyZXF1aXNpdGVzCi0gTm9kZS5qcyA2Kwo
KIyMgSW5zdGFsbApgYGBiYXNo\nCm5wbSBpbnN0YWxsIG5vZGUtbG9jCmBgYApvciAKYGBgCnlhcm4gYWRkIG5v\nZGUtbG9j
CmBgYAoKIyMgVXNhZ2UKWW91IGNhbiB1c2Ugbm9kZS1jbG9jIGlu\nIHlvdSB0ZXJuaW1hbCwgb3IgYXMgYSBucG0gcGFja2F
nZSBpbiB5b3VyIHBy\nb2plY3RzLgoKIyMjIENvbW1hbmQgbGluZSBtb2RlCgpTdXBwb3J0IENMT0Mg\nb2YgYSBmaWxlIG9
yIGRpcmVjdG9yeS4KCiMjIyMgMS4gYSBmaWxlCmBgYGJh\nc2gKIyBsb2MgZmlsZSA8cGF0aD4KbG9jIGZpbGUgc3JjL2luZ
GV4LnRzCmBg\nYAohW2xvYyBmaWxlIDxwYXRoPl0oaHR0cHM6Ly91c2VyLWltYWdlcy5naXRo\ndWJ1c2VyY29udGVudC5jb2
0vMzczOTIyMS8zMTgzODY5Ny05ZmRlYzExNC1i\nNWEzLTExZTctODkwZS03OTU0NDRiYzk0MDAucG5nKQoKIyMjIyAyLiBhI
GRp\ncmVjdG9yeQpgYGBiYXNoCiMgbG9jIGRpciA8cGF0dGVybj4KbG9jIGRpciAq\nKi8qLnRzCmBgYAohW2xvYyBkaXIgP
HBhdHRlcm4+XShodHRwczovL3VzZXIt\naW1hZ2VzLmdpdGh1YnVzZXJjb250ZW50LmNvbS8zNzM5MjIxLzMxODM4Njk1\n
LTlmOTRhMzQwLWI1YTMtMTFlNy05MTRhLTkxNjI5ZDJjZmE5Zi5wbmcpCgoj\nIyMgVGhpcmQtcGFydHkgbW9kZShpbiBUeXB
lU2NyaXB0KQoKYGBgCmltcG9y\ndCB7IExvY0ZpbGUsIExvY0RpciB9IGZyb20gJ25vZGUtbG9jJzsKCi8vIGZv\nciBhIGZp
bGUuCmNvbnN0IGZpbGUgPSBuZXcgTG9jRmlsZShmaWxlUGF0aCk7\nCmNvbnN0IHsgaW5mbyB9ID0gZmlsZS5nZXRJbmZvKCk
7CgovLyAgZm9yIGEg\nZGlyZWN0b3J5Lgpjb25zdCBkaXIgPSBuZXcgTG9jRGlyKHBhdHRlcm4pOwpj\nb25zdCB7IGluZm8g
fSA9IGRpci5nZXRJbmZvKCk7CmBgYAoKIyMjIEZlYXR1\ncmVzCi0gU3VwcG9ydCBib3RoIGNvbW1hbmQgbGluZSBtb2RlIGF
uZCB0aGly\nZC1wYXJ0eSBwYWNrYWdlIG1vZGUuCi0gV3JpdHRlbiBpbiBUeXBlU2NyaXB0\nIHdpdGggY29tcGxldGUgZGV
maW5lIHR5cGVzLgoKIyMgTGljZW5zZQpNSVQg\nTGljZW5zZS4K\n`;

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

  describe('.getContentInfo', () => {
    it('should return file info.', () => {
      console.log('file info: ', LocFile.getFileInfoByContent('README.md', testData));
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
