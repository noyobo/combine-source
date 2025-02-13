import { SourceMapConsumer, SourceMapGenerator, RawSourceMap } from 'source-map-js';

export type CombineFile = {
  code: string;
  map: RawSourceMap;
  path: string;
};

export const combineSource = (files: CombineFile[]) => {
  let combinedCode = '';
  let offset = { line: 0, column: 0 };
  const generator = new SourceMapGenerator();

  files.forEach((file) => {
    const { code, map, path } = file;

    // 使用同步API解析source map
    const consumer = new SourceMapConsumer(map);

    // 合并代码
    combinedCode += code + '\n'; // 新增一行以区分不同文件合并

    // 合并 source map
    consumer.eachMapping((mapping) => {
      generator.addMapping({
        generated: {
          line: mapping.generatedLine + offset.line,
          column: mapping.generatedColumn + (mapping.generatedLine === 1 ? offset.column : 0),
        },
        original:
          mapping.originalLine != null
            ? {
                line: mapping.originalLine,
                column: mapping.originalColumn,
              }
            : null,
        source: mapping.source ? path : null, // 使用文件路径作为源路径
        name: mapping.name,
      });
    });

    // 复制源内容
    consumer.sources.forEach((source) => {
      const content = consumer.sourceContentFor(source);
      if (content) {
        generator.setSourceContent(path, content);
      }
    });

    // 更新偏移量
    offset.line += code.split('\n').length;
    offset.column = 0; // 每个文件合并后起始列重置为0
  });

  return {
    code: combinedCode,
    map: generator.toString(),
  };
};
