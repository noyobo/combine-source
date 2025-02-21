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