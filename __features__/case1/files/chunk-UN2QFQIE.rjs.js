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