import fse from 'fs-extra';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { combineSource } from '../../src';

describe('case1', () => {
  it('should work', async () => {
    const files = await fse
      .readdir(join(__dirname, 'files'))
      .then((files) => files.filter((file) => !file.startsWith('.')).map((file) => join(__dirname, 'files', file)));

    const combineFiles = [];
    for (const file of files) {
      if (file.endsWith('.js')) {
        const code = await fse.readFile(file, 'utf-8');
        const map = await fse.readFile(`${file}.map`, 'utf-8');
        combineFiles.push({ code: code.trim(), map: map });
      }
    }

    const result = combineSource(combineFiles);

    expect(result.code).toMatchInlineSnapshot(`
      "(function(setAppCode,defineRenderScript,requireRenderScript){defineRenderScript("chunk-K76GHVCF.rjs.js", function (require, module, exports, context,global,window,top,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,Worker,atob,btoa,process ){ 'use strict'; var getCanvasById = context.getCanvasById; var getSystemInfo = context.getSystemInfo; var getBoundingClientRectById = context.getBoundingClientRectById; var createWorker = context.createWorker;/* offset line */ Object.defineProperty(exports, "__esModule", {
          value: true
      });
      Object.defineProperty(exports, "__async", {
          enumerable: true,
          get: function() {
              return __async;
          }
      });
      var __async = function(__this, __arguments, generator) {
          return new Promise(function(resolve, reject) {
              var fulfilled = function(value) {
                  try {
                      step(generator.next(value));
                  } catch (e) {
                      reject(e);
                  }
              };
              var rejected = function(value) {
                  try {
                      step(generator.throw(value));
                  } catch (e) {
                      reject(e);
                  }
              };
              var step = function(x) {
                  return x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
              };
              step((generator = generator.apply(__this, __arguments)).next());
          });
      };
      }, 1);})(function setAppCode(k, v) { __appCode__[k] = v},defineRenderScript,requireRenderScript);
      //# sourceMappingURL=/chunk-K76GHVCF.rjs.js.map?distDir=miniprogram
      (function(setAppCode,defineRenderScript,requireRenderScript){defineRenderScript("chunk-UN2QFQIE.rjs.js", function (require, module, exports, context,global,window,top,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,Worker,atob,btoa,process ){ 'use strict'; var getCanvasById = context.getCanvasById; var getSystemInfo = context.getSystemInfo; var getBoundingClientRectById = context.getBoundingClientRectById; var createWorker = context.createWorker;/* offset line */ // app/shared/rjs-common.js
      Object.defineProperty(exports, "__esModule", {
          value: true
      });
      function _export(target, all) {
          for(var name in all)Object.defineProperty(target, name, {
              enumerable: true,
              get: all[name]
          });
      }
      _export(exports, {
          increment: function() {
              return increment;
          },
          sayHello: function() {
              return sayHello;
          }
      });
      var count = 0;
      function increment() {
          count++;
      }
      function sayHello() {
          console.warn("rjs-common", count);
      }
      }, 1);})(function setAppCode(k, v) { __appCode__[k] = v},defineRenderScript,requireRenderScript);
      //# sourceMappingURL=/chunk-UN2QFQIE.rjs.js.map?distDir=miniprogram
      (function(setAppCode,defineRenderScript,requireRenderScript){DEFINE_ID = "p-6a29ee7020.rjs.js";
      defineRenderScript(DEFINE_ID, function (require, module, exports, context,global,window,top,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,Worker,atob,btoa,process ){ 'use strict'; var getCanvasById = context.getCanvasById; var getSystemInfo = context.getSystemInfo; var getBoundingClientRectById = context.getBoundingClientRectById; var createWorker = context.createWorker;/* offset line */ Object.defineProperty(exports, "__esModule", {
          value: true
      });
      Object.defineProperty(exports, "default", {
          enumerable: true,
          get: function() {
              return tab1_default2;
          }
      });
      var _chunkUN2QFQIErjs = require("./chunk-UN2QFQIE.rjs.js");
      require("./chunk-K76GHVCF.rjs.js");
      // app/pages/tab1/index.rjs
      var tab1_default = Render({
          init: function init() {
              console.log("tab1 init");
              (0, _chunkUN2QFQIErjs.increment)();
              (0, _chunkUN2QFQIErjs.sayHello)();
          }
      });
      // rjs:/Users/noyobo/TuYaMiniProject/miniapp-88/app/pages/tab1/index.rjs
      function tab1_default2(opts) {
          var uuid = opts.uuid;
          var hash = opts.hash;
          var shortPath = opts.shortPath || "";
          var viewRender = new tab1_default(opts);
          var viewRender_methods = Object.keys(viewRender).filter(function(f) {
              return f !== "callMethod" && "function" === typeof viewRender[f];
          });
          viewRender_methods.forEach(function(method) {
              ViewJSBridge.subscribe(hash + ":" + uuid + ":" + method, function(params, callback) {
                  var args = params.args;
                  var isAsync = params.isAsync;
                  try {
                      var result = viewRender[method].apply(viewRender, args);
                      if (isAsync) {
                          result.then(function(result2) {
                              callback({
                                  result: result2
                              });
                          }, function(err) {
                              callback({
                                  error: {
                                      message: err.message,
                                      stack: err.stack,
                                      reason: err.reason
                                  }
                              });
                          });
                      }
                  } catch (e) {
                      var errorMessage = JSON.stringify(e, Object.getOwnPropertyNames(e));
                      var msg = '[Render Script] Apply "' + method + '" method captured an error in "' + shortPath + '.rjs".';
                      console.error(msg);
                      console.error(e);
                      if (isAsync) {
                          callback({
                              error: {
                                  message: e.message,
                                  stack: e.stack,
                                  reason: e.reason
                              }
                          });
                      }
                      ViewJSBridge.publish("business-view-error", {
                          type: "rjs-method-error",
                          shortPath: shortPath,
                          message: msg,
                          error: errorMessage
                      });
                  }
              });
          });
      }
      }, 1);setAppCode('page://p-6a29ee7020.rjs', requireRenderScript(DEFINE_ID).default);
      })(function setAppCode(k, v) { __appCode__[k] = v},defineRenderScript,requireRenderScript);
      //# sourceMappingURL=/p-6a29ee7020.rjs.js.map?distDir=miniprogram
      "
    `);
    expect(result.map).toMatchInlineSnapshot(`"{"version":3,"sources":["/Users/noyobo/TuYaMiniProject/app/shared/rjs-common.js","/Users/noyobo/TuYaMiniProject/app/pages/tab1/index.rjs","/Users/noyobo/TuYaMiniProject/miniapp-88/app/rjs:/Users/noyobo/TuYaMiniProject/miniapp-88/app/pages/tab1/index.rjs"],"names":["tab1_default","result"],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAAA,IAAI,QAAQ;AAEL,SAAS,YAAY;IAC1B;AACF;AAEO,SAAS,WAAW;IACzB,QAAQ,IAAA,CAAK,cAAc,KAAK;AAClC;;;;;;;;;;;;;;;;ACNA,IAAO,eAAQ,OAAO;mBACpB,OAAO;QACL,QAAQ,GAAA,CAAI,WAAW;QACvB,IAAA,2BAAA,CAAU;QACV,IAAA,0BAAA,CAAS;IACX;AACF,CAAC;;ACPc,SAARA,cAAiB,IAAA,EAAM;IAC5B,IAAI,OAAO,KAAK,IAAA;IAChB,IAAI,OAAO,KAAK,IAAA;IAChB,IAAI,YAAY,KAAK,SAAA,IAAa;IAClC,IAAI,aAAa,IAAI,aAAW,IAAI;IAEpC,IAAI,qBAAqB,OAAO,IAAA,CAAK,UAAU,EAAE,MAAA,CAAO,SAAS,CAAA,EAAE;QACjE,OAAO,MAAM,gBAAgB,eAAe,OAAO,UAAA,CAAW,CAAC,CAAA;IACjE,CAAC;IACD,mBAAmB,OAAA,CAAQ,SAAU,MAAA,EAAQ;QAC3C,aAAa,SAAA,CAAU,OAAO,MAAM,OAAO,MAAM,QAAQ,SAAS,MAAA,EAAQ,QAAA,EAAU;YAClF,IAAI,OAAO,OAAO,IAAA;YAClB,IAAI,UAAU,OAAO,OAAA;YACrB,IAAI;gBACF,IAAI,SAAS,UAAA,CAAW,MAAM,CAAA,CAAE,KAAA,CAAM,YAAY,IAAI;gBACtD,IAAI,SAAS;oBACX,OAAO,IAAA,CACL,SAAUC,OAAAA,EAAQ;wBAAC,SAAS;4BAAC,QAAAA;wBAAM,CAAC;oBAAC,GACrC,SAAU,GAAA,EAAK;wBACb,SAAS;4BAAC,OAAO;gCAAC,SAAS,IAAI,OAAA;gCAAS,OAAO,IAAI,KAAA;gCAAO,QAAQ,IAAI,MAAA;4BAAM;wBAAC,CAAC;oBAChF;gBAEJ;YACF,EAAA,OAAS,GAAG;gBACV,IAAI,eAAe,KAAK,SAAA,CAAU,GAAG,OAAO,mBAAA,CAAoB,CAAC,CAAC;gBAClE,IAAI,MAAM,4BAA4B,SAAS,oCAAoC,YAAY;gBAC/F,QAAQ,KAAA,CAAM,GAAG;gBACjB,QAAQ,KAAA,CAAM,CAAC;gBACf,IAAI,SAAS;oBACX,SAAS;wBAAC,OAAO;4BAAC,SAAS,EAAE,OAAA;4BAAS,OAAO,EAAE,KAAA;4BAAO,QAAQ,EAAE,MAAA;wBAAM;oBAAC,CAAC;gBAC1E;gBACA,aAAa,OAAA,CAAQ,uBAAuB;oBAC1C,MAAM;+BACN;oBACA,SAAS;oBACT,OAAO;gBACT,CAAC;YACH;QACF,CAAC;IACH,CAAC;AACH","sourcesContent":["let count = 0\\n\\nexport function increment() {\\n  count++\\n}\\n\\nexport function sayHello() {\\n  console.warn('rjs-common', count)\\n}\\n","import { increment, sayHello } from '../../shared/rjs-common'\\n\\nexport default Render({\\n  init() {\\n    console.log('tab1 init')\\n    increment()\\n    sayHello()\\n  },\\n})\\n","import ViewRender from '/Users/noyobo/TuYaMiniProject/miniapp-88/app/pages/tab1/index.rjs'\\nexport default function(opts) {\\n  var uuid = opts.uuid;\\n  var hash = opts.hash;\\n  var shortPath = opts.shortPath || \\"\\";\\n  var viewRender = new ViewRender(opts);\\n  // callMethod 是内置的方法，不需要订阅，由基础库 Render 函数决定\\n  var viewRender_methods = Object.keys(viewRender).filter(function(f){\\n    return f !== 'callMethod' && 'function' === typeof viewRender[f];\\n  });\\n  viewRender_methods.forEach(function (method) {\\n    ViewJSBridge.subscribe(hash + \\":\\" + uuid + \\":\\" + method, function(params, callback) {\\n      var args = params.args;\\n      var isAsync = params.isAsync;\\n      try {\\n        var result = viewRender[method].apply(viewRender, args);\\n        if (isAsync) {\\n          result.then(\\n            function (result) {callback({result})}, \\n            function (err) {\\n              callback({error: {message: err.message, stack: err.stack, reason: err.reason}})\\n            }\\n          );\\n        }\\n      } catch (e) {\\n        var errorMessage = JSON.stringify(e, Object.getOwnPropertyNames(e));\\n        var msg = '[Render Script] Apply \\"' + method + '\\" method captured an error in \\"' + shortPath + '.rjs\\".';\\n        console.error(msg);\\n        console.error(e);\\n        if (isAsync) {\\n          callback({error: {message: e.message, stack: e.stack, reason: e.reason}});\\n        }\\n        ViewJSBridge.publish('business-view-error', {\\n          type: 'rjs-method-error',\\n          shortPath: shortPath,\\n          message: msg,\\n          error: errorMessage,\\n        })\\n      }\\n    });\\n  });\\n};"]}"`);
  });
});
