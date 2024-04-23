(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[48],{

/***/ "./node_modules/@ionic/core/dist/esm/es2017/build/coytbtgb.sc.entry.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/es2017/build/coytbtgb.sc.entry.js ***!
  \*****************************************************************************/
/*! exports provided: IonText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IonText", function() { return Text; });
/* harmony import */ var _ionic_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ionic.core.js */ "./node_modules/@ionic/core/dist/esm/es2017/ionic.core.js");
/* harmony import */ var _chunk_7c632336_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-7c632336.js */ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-7c632336.js");




class Text {
    hostData() {
        return {
            class: Object(_chunk_7c632336_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this.color)
        };
    }
    render() {
        return Object(_ionic_core_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null);
    }
    static get is() { return "ion-text"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        }
    }; }
    static get style() { return ".ion-color.sc-ion-text-h{color:var(--ion-color-base)}"; }
}




/***/ })

}]);
//# sourceMappingURL=48.js.map