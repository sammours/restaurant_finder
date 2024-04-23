(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-2a112823.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/es2017/build/chunk-2a112823.js ***!
  \**************************************************************************/
/*! exports provided: startFocusVisible */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startFocusVisible", function() { return startFocusVisible; });
/* harmony import */ var _ionic_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ionic.core.js */ "./node_modules/@ionic/core/dist/esm/es2017/ionic.core.js");


const ION_FOCUSED = 'ion-focused';
const ION_FOCUSABLE = 'ion-focusable';
const FOCUS_KEYS = ['Tab', 'ArrowDown', 'Space', 'Escape', ' ', 'Shift', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp'];
function startFocusVisible(doc) {
    let currentFocus = [];
    let keyboardMode = true;
    function setFocus(elements) {
        currentFocus.forEach(el => el.classList.remove(ION_FOCUSED));
        elements.forEach(el => el.classList.add(ION_FOCUSED));
        currentFocus = elements;
    }
    doc.addEventListener('keydown', ev => {
        keyboardMode = FOCUS_KEYS.includes(ev.key);
        if (!keyboardMode) {
            setFocus([]);
        }
    });
    const pointerDown = () => {
        keyboardMode = false;
        setFocus([]);
    };
    doc.addEventListener('focusin', ev => {
        if (keyboardMode && ev.composedPath) {
            const toFocus = ev.composedPath().filter((el) => {
                if (el.classList) {
                    return el.classList.contains(ION_FOCUSABLE);
                }
                return false;
            });
            setFocus(toFocus);
        }
    });
    doc.addEventListener('focusout', () => {
        if (doc.activeElement === doc.body) {
            setFocus([]);
        }
    });
    doc.addEventListener('touchstart', pointerDown);
    doc.addEventListener('mousedown', pointerDown);
}




/***/ })

}]);
//# sourceMappingURL=2.js.map