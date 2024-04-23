(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-ca529fbc.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/es2017/build/chunk-ca529fbc.js ***!
  \**************************************************************************/
/*! exports provided: createSwipeBackGesture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSwipeBackGesture", function() { return createSwipeBackGesture; });
/* harmony import */ var _ionic_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ionic.core.js */ "./node_modules/@ionic/core/dist/esm/es2017/ionic.core.js");
/* harmony import */ var _chunk_f56eaea8_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-f56eaea8.js */ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-f56eaea8.js");




function createSwipeBackGesture(el, queue, canStartHandler, onStartHandler, onMoveHandler, onEndHandler) {
    const win = el.ownerDocument.defaultView;
    function canStart(detail) {
        return detail.startX <= 50 && canStartHandler();
    }
    function onMove(detail) {
        const delta = detail.deltaX;
        const stepValue = delta / win.innerWidth;
        onMoveHandler(stepValue);
    }
    function onEnd(detail) {
        const delta = detail.deltaX;
        const width = win.innerWidth;
        const stepValue = delta / width;
        const velocity = detail.velocityX;
        const z = width / 2.0;
        const shouldComplete = velocity >= 0 && (velocity > 0.2 || detail.deltaX > z);
        const missing = shouldComplete ? 1 - stepValue : stepValue;
        const missingDistance = missing * width;
        let realDur = 0;
        if (missingDistance > 5) {
            const dur = missingDistance / Math.abs(velocity);
            realDur = Math.min(dur, 300);
        }
        onEndHandler(shouldComplete, stepValue, realDur);
    }
    return Object(_chunk_f56eaea8_js__WEBPACK_IMPORTED_MODULE_1__["createGesture"])({
        el,
        queue,
        gestureName: 'goback-swipe',
        gesturePriority: 40,
        threshold: 10,
        canStart,
        onStart: onStartHandler,
        onMove,
        onEnd
    });
}




/***/ })

}]);
//# sourceMappingURL=6.js.map