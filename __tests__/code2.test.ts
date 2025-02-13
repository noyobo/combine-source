import { combineSource } from '../src';
import { describe, expect, it } from 'vitest';
import { RawSourceMap } from 'source-map-js';

describe('combineSource after map', () => {
  it('should combine source', () => {
    const map: RawSourceMap = {
      version: '3',
      sources: ['../app/shared/index.js'],
      sourceRoot: 'miniapp-88/app',
      sourcesContent: [
        '/**\n' +
          ' * 用于测试共享模块, 在普通分包下的引入拆分 chunk 的问题\n' +
          ' */\n' +
          '\n' +
          'let count = 0\n' +
          '\n' +
          'export const sayHello = () => {\n' +
          "    console.log('Hello, I am shared module', count)\n" +
          '}\n' +
          '\n' +
          'export const plus = () => {\n' +
          '    count++\n' +
          "    console.log('count:', count)\n" +
          '}\n' +
          '\n' +
          'export default {\n' +
          '    sayHello,\n' +
          '    plus,\n' +
          '}',
      ],
      names: [],
      mappings:
        ';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAAA,IAII,OAES,UAIA,MAKN;AAfP,IAAA,cAAA,MAAA;IAAA,uBAAA;QAII,QAAQ;QAEC,WAAW,MAAM;YAC1B,QAAQ,GAAA,CAAI,6BAA6B,KAAK;QAClD;QAEa,OAAO,MAAM;YACtB;YACA,QAAQ,GAAA,CAAI,UAAU,KAAK;QAC/B;QAEO,iBAAQ;sBACX;kBACA;QACJ;IAAA;AAAA',
    };

    const code = `!function($$setCurrentPath, define, require) {function __originPromise(){return Promise};define("chunk-W5ZQG4WM.js", function (require, module, exports, ty,Promise,global,window,top,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,Worker,atob,btoa,process ){ 'use strict'; if ('function' !== typeof Promise || 'function' !== typeof Promise.resolve) {process = btoa;btoa = atob;atob = Worker;Worker = webkit;webkit = WebSocket;WebSocket = XMLHttpRequest;XMLHttpRequest = fetch;fetch = prompt;prompt = confirm;confirm = alert;alert = screen;screen = Caches;Caches = history;history = localStorage;localStorage = navigator;navigator = location;location = self;self = frames;frames = document;document = top;top = window;window = global;global = Promise ;Promise = __originPromise();}; var wx = ty;
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
    __async: function() {
        return __async;
    },
    __commonJS: function() {
        return __commonJS;
    },
    __esm: function() {
        return __esm;
    },
    __toCommonJS: function() {
        return __toCommonJS;
    },
    init_shared: function() {
        return init_shared;
    },
    shared_default: function() {
        return shared_default;
    }
});
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = function(fn, res) {
    return function __init() {
        return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    };
};
var __commonJS = function(cb, mod) {
    return function __require() {
        return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = {
            exports: {}
        }).exports, mod), mod.exports;
    };
};
var __copyProps = function(to, from, except, desc) {
    if (from && (typeof from === "undefined" ? "undefined" : _type_of(from)) === "object" || typeof from === "function") {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            var _loop = function() {
                var key = _step.value;
                if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
                    get: function() {
                        return from[key];
                    },
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                });
            };
            for(var _iterator = __getOwnPropNames(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return to;
};
var __toCommonJS = function(mod) {
    return __copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
};
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
// app/shared/index.js
var count, sayHello, plus, shared_default;
var init_shared = __esm({
    "app/shared/index.js": function() {
        count = 0;
        sayHello = function() {
            console.log("Hello, I am shared module", count);
        };
        plus = function() {
            count++;
            console.log("count:", count);
        };
        shared_default = {
            sayHello: sayHello,
            plus: plus
        };
    }
});

}, 2);}(function $$setCurrentPath(v){__currentPath__ = v}, define, require);`;

    const result = combineSource([
      {
        code,
        map,
      },
    ]);

    expect(result.map).toMatchSnapshot();
  });
});
