[![npm version](https://badge.fury.io/js/node-loc.svg)](https://www.npmjs.com/package/node-loc)
[![Build Status](https://travis-ci.org/ephoton/node-loc.svg?branch=master)](https://travis-ci.org/ephoton/node-loc)
[![Coverage Status](https://coveralls.io/repos/github/ephoton/node-loc/badge.svg?branch=master)](https://coveralls.io/github/ephoton/node-loc?branch=master)

# node-loc
💻 Counts the number of lines of code, written in TypeScript.

## Prerequisites
- Node.js 6+

## Install
```bash
npm install node-loc
```
or 
```
yarn add node-loc
```

## Usage
You can use node-cloc in you ternimal, or as a npm package in your projects.

### Command line mode

Support CLOC of a file or directory.

#### 1. a file
```bash
# loc file <path>
loc file src/index.ts
```
![loc file <path>](https://user-images.githubusercontent.com/3739221/31838697-9fdec114-b5a3-11e7-890e-795444bc9400.png)

#### 2. a directory
```bash
# loc dir <pattern>
loc dir **/*.ts
```
![loc dir <pattern>](https://user-images.githubusercontent.com/3739221/31838695-9f94a340-b5a3-11e7-914a-91629d2cfa9f.png)

### Third-party mode(in TypeScript)

```
import { LocFile, LocDir } from 'node-loc';

// for a file.
const file = new LocFile(filePath);
const { info } = file.getInfo();

//  for a directory.
const dir = new LocDir(pattern);
const { info } = dir.getInfo();
```

### Features
- Support both command line mode and third-party package mode.
- Written in TypeScript with complete define types.

## License
MIT License.
