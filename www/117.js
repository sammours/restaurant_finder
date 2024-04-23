(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[117],{

/***/ "./node_modules/@ionic/core/dist/esm/es2017/build/t547wlk7.entry.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/es2017/build/t547wlk7.entry.js ***!
  \**************************************************************************/
/*! exports provided: IonBackdrop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IonBackdrop", function() { return Backdrop; });
/* harmony import */ var _ionic_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ionic.core.js */ "./node_modules/@ionic/core/dist/esm/es2017/ionic.core.js");
/* harmony import */ var _chunk_6d7d2f8c_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-6d7d2f8c.js */ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-6d7d2f8c.js");
/* harmony import */ var _chunk_f56eaea8_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chunk-f56eaea8.js */ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-f56eaea8.js");





class Backdrop {
    constructor() {
        this.lastClick = -10000;
        this.blocker = _chunk_f56eaea8_js__WEBPACK_IMPORTED_MODULE_2__["GESTURE_CONTROLLER"].createBlocker({
            disableScroll: true
        });
        this.visible = true;
        this.tappable = true;
        this.stopPropagation = true;
    }
    componentDidLoad() {
        if (this.stopPropagation) {
            this.blocker.block();
        }
    }
    componentDidUnload() {
        this.blocker.destroy();
    }
    onTouchStart(ev) {
        this.lastClick = Object(_chunk_6d7d2f8c_js__WEBPACK_IMPORTED_MODULE_1__["b"])(ev);
        this.emitTap(ev);
    }
    onMouseDown(ev) {
        if (this.lastClick < Object(_chunk_6d7d2f8c_js__WEBPACK_IMPORTED_MODULE_1__["b"])(ev) - 2500) {
            this.emitTap(ev);
        }
    }
    emitTap(ev) {
        if (this.stopPropagation) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        if (this.tappable) {
            this.ionBackdropTap.emit();
        }
    }
    hostData() {
        return {
            tabindex: '-1',
            class: {
                'backdrop-hide': !this.visible,
                'backdrop-no-tappable': !this.tappable,
            }
        };
    }
    static get is() { return "ion-backdrop"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "doc": {
            "context": "document"
        },
        "stopPropagation": {
            "type": Boolean,
            "attr": "stop-propagation"
        },
        "tappable": {
            "type": Boolean,
            "attr": "tappable"
        },
        "visible": {
            "type": Boolean,
            "attr": "visible"
        }
    }; }
    static get events() { return [{
            "name": "ionBackdropTap",
            "method": "ionBackdropTap",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "touchstart",
            "method": "onTouchStart",
            "capture": true
        }, {
            "name": "click",
            "method": "onMouseDown",
            "capture": true
        }, {
            "name": "mousedown",
            "method": "onMouseDown",
            "capture": true
        }]; }
    static get style() { return ":host{left:0;right:0;top:0;bottom:0;display:block;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);contain:strict;cursor:pointer;opacity:.01;-ms-touch-action:none;touch-action:none;z-index:2}:host(.backdrop-hide){background:transparent}:host(.backdrop-no-tappable){cursor:auto}:host{background-color:var(--ion-backdrop-color,#000)}"; }
    static get styleMode() { return "md"; }
}




/***/ })

}]);
//# sourceMappingURL=117.js.map