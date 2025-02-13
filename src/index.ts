import { RawSourceMap, SourceMapConsumer, SourceMapGenerator } from 'source-map-js';

export type CombineFile = {
  code: string;
  map: RawSourceMap | string | undefined;
};

function isValidSourceMap(map: RawSourceMap | string | undefined): map is RawSourceMap {
  return 'object' === typeof map && map != null && 'version' in map && 'sources' in map && 'mappings' in map;
}

function createEmptySourceMap(): RawSourceMap {
  return {
    version: '3',
    sources: [],
    names: [],
    mappings: '',
  };
}

function normalizeSourceMap(map: RawSourceMap | string | undefined): RawSourceMap {
  if (isValidSourceMap(map)) {
    return map;
  } else if ('string' === typeof map) {
    return normalizeSourceMap(JSON.parse(map));
  } else if (map == null) {
    return createEmptySourceMap();
  } else {
    throw new Error('Invalid source map');
  }
}

export const combineSource = (files: CombineFile[]) => {
  let combinedCode = '';
  let offset = { line: 0, column: 0 };
  const generator = new SourceMapGenerator();

  files.forEach((file) => {
    const { code, map } = file;

    const consumer = new SourceMapConsumer(normalizeSourceMap(map));

    combinedCode += code + '\n';

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
        source: mapping.source,
        name: mapping.name,
      });
    });

    // 复制源内容
    consumer.sources.forEach((source) => {
      const content = consumer.sourceContentFor(source);
      if (content) {
        generator.setSourceContent(source, content);
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
