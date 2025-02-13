import { combineSource } from '../src';
import { describe, expect, it } from 'vitest';
import MagicString from 'magic-string';

function createCombineFile(path: string, code: string) {
  const s = new MagicString(code);
  s.prepend('(function() {\n');
  s.append('\n})();');
  return {
    code: s.toString(),
    map: s.generateMap({ source: path, includeContent: true, file: `${path}.map` }).toString(),
    path,
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
});
