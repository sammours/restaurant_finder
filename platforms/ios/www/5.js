(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-75ece731.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/es2017/build/chunk-75ece731.js ***!
  \**************************************************************************/
/*! exports provided: startStatusTap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startStatusTap", function() { return startStatusTap; });
/* harmony import */ var _ionic_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ionic.core.js */ "./node_modules/@ionic/core/dist/esm/es2017/ionic.core.js");


function startStatusTap(win, queue) {
    win.addEventListener('statusTap', () => {
        queue.read(() => {
            const width = win.innerWidth;
            const height = win.innerHeight;
            const el = win.document.elementFromPoint(width / 2, height / 2);
            if (!el) {
                return;
            }
            const contentEl = el.closest('ion-content');
            if (contentEl) {
                contentEl.componentOnReady().then(() => {
                    queue.write(() => contentEl.scrollToTop(300));
                });
            }
        });
    });
}




/***/ })

}]);
//# sourceMappingURL=5.js.map