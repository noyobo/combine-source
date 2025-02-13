
# combine-source

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]

## Overview

`combine-source` is a TypeScript library designed to combine multiple source files and their corresponding source maps into a single file and source map. This is particularly useful for bundling JavaScript/TypeScript projects where maintaining accurate source maps is crucial for debugging.

## Features

- Combine multiple source files into one.
- Merge source maps to maintain accurate mappings.
- Supports both CommonJS and ES Module formats.

## Installation

To install the dependencies, use `yarn`:

```sh
yarn install combine-source
```

Or use `npm`:

```sh
npm install combine-source
```

## Usage

Here's an example of how to use the `combineSource` function:

```typescript
import { combineSource, CombineFile } from 'combine-source';

const files: CombineFile[] = [
  {
    code: 'console.log("File 1");',
    map: { /* source map object for file 1 */ },
    path: 'file1.js',
  },
  {
    code: 'console.log("File 2");',
    map: { /* source map object for file 2 */ },
    path: 'file2.js',
  },
];

const result = combineSource(files);

console.log(result.code); // Combined code
console.log(result.map);  // Combined source map
```

## Scripts

- `test`: Run tests using Vitest.
- `build`: Build the project using `tsup`.
- `prepublishOnly`: Build the project before publishing.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Contact

For any questions or issues, please open an issue on this repository.



[build-img]:https://github.com/noyobo/combine-source/actions/workflows/ci.yml/badge.svg
[build-url]:https://github.com/noyobo/combine-source/actions/workflows/ci.yml
[downloads-img]:https://img.shields.io/npm/dt/combine-source
[downloads-url]:https://www.npmtrends.com/combine-source
[npm-img]:https://img.shields.io/npm/v/combine-source
[npm-url]:https://www.npmjs.com/package/combine-source
[issues-img]:https://img.shields.io/github/issues/noyobo/combine-source
[issues-url]:https://github.com/noyobo/combine-source/issues
[codecov-img]:https://codecov.io/gh/noyobo/combine-source/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/noyobo/combine-source
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/
