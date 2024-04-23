(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-f5118fa0.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/es2017/build/chunk-f5118fa0.js ***!
  \**************************************************************************/
/*! exports provided: startHardwareBackButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startHardwareBackButton", function() { return startHardwareBackButton; });
/* harmony import */ var _ionic_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ionic.core.js */ "./node_modules/@ionic/core/dist/esm/es2017/ionic.core.js");


function startHardwareBackButton(win) {
    let busy = false;
    win.document.addEventListener('backbutton', () => {
        if (busy) {
            return;
        }
        const handlers = [];
        const ev = new CustomEvent('ionBackButton', {
            bubbles: false,
            detail: {
                register(priority, handler) {
                    handlers.push({ priority, handler });
                }
            }
        });
        win.document.dispatchEvent(ev);
        if (handlers.length > 0) {
            let selectedPriority = Number.MIN_SAFE_INTEGER;
            let selectedHandler;
            handlers.forEach(({ priority, handler }) => {
                if (priority >= selectedPriority) {
                    selectedPriority = priority;
                    selectedHandler = handler;
                }
            });
            busy = true;
            executeAction(selectedHandler).then(() => busy = false);
        }
    });
}
async function executeAction(handler) {
    try {
        if (handler) {
            const result = handler();
            if (result != null) {
                await result;
            }
        }
    }
    catch (e) {
        console.error(e);
    }
}




/***/ })

}]);
//# sourceMappingURL=7.js.map