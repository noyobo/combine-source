import { CombineFile, combineSource } from '../src';
import { describe, expect, it } from 'vitest';
import MagicString from 'magic-string';

function createCombineFile(path: string, code: string, generateMap = true): CombineFile {
  const s = new MagicString(code);
  s.prepend('(function() {\n');
  s.append('\n})();');
  return {
    code: s.toString(),
    map: generateMap
      ? s.generateMap({ source: path, includeContent: true, file: `${path}.map` }).toString()
      : undefined,
  };
}

describe('combineSource', () => {
  it('should combine files', () => {
    const file1 = createCombineFile('file1.ts', 'console.log("file1")');
    const file2 = createCombineFile('file2.ts', 'console.log("file2")');
    const { code, map } = combineSource([file1, file2]);

    expect(code).toMatchInlineSnapshot(`
      "(function() {
      console.log("file1")
      })();
      (function() {
      console.log("file2")
      })();
      "
    `);
    expect(map).toMatchInlineSnapshot(
      `"{"version":3,"sources":["file1.ts","file2.ts"],"names":[],"mappings":";AAAA;;;ACAA","sourcesContent":["console.log(\\"file1\\")","console.log(\\"file2\\")"]}"`,
    );
  });

  it('should combine files', () => {
    const file1 = createCombineFile('file1.ts', 'console.log("file1")');
    const file2 = createCombineFile('file2.ts', 'console.log("file2")', false);
    const file3 = createCombineFile('file3.ts', 'console.log("file3")');
    const { code, map } = combineSource([file1, file2, file3]);

    expect(code).toMatchInlineSnapshot(`
      "(function() {
      console.log("file1")
      })();
      (function() {
      console.log("file2")
      })();
      (function() {
      console.log("file3")
      })();
      "
    `);
    expect(map).toMatchInlineSnapshot(
      `"{"version":3,"sources":["file1.ts","file3.ts"],"names":[],"mappings":";AAAA;;;;;;ACAA","sourcesContent":["console.log(\\"file1\\")","console.log(\\"file3\\")"]}"`,
    );
  });
});
