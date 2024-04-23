(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[138],{

/***/ "./node_modules/@ionic/core/dist/esm/es2017/build/v4kjbbp8.sc.entry.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/es2017/build/v4kjbbp8.sc.entry.js ***!
  \*****************************************************************************/
/*! exports provided: IonImg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IonImg", function() { return Img; });
/* harmony import */ var _ionic_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ionic.core.js */ "./node_modules/@ionic/core/dist/esm/es2017/ionic.core.js");


class Img {
    constructor() {
        this.onError = () => {
            this.ionError.emit();
        };
    }
    srcChanged() {
        this.addIO();
    }
    componentDidLoad() {
        this.addIO();
    }
    addIO() {
        if (this.src === undefined) {
            return;
        }
        if ('IntersectionObserver' in window) {
            this.removeIO();
            this.io = new IntersectionObserver(data => {
                if (data[0].isIntersecting) {
                    this.load();
                    this.removeIO();
                }
            });
            this.io.observe(this.el);
        }
        else {
            setTimeout(() => this.load(), 200);
        }
    }
    load() {
        this.loadError = this.onError;
        this.loadSrc = this.src;
        this.ionImgDidLoad.emit();
    }
    removeIO() {
        if (this.io) {
            this.io.disconnect();
            this.io = undefined;
        }
    }
    render() {
        return (Object(_ionic_core_js__WEBPACK_IMPORTED_MODULE_0__["h"])("img", { src: this.loadSrc, alt: this.alt, decoding: "async", onError: this.loadError }));
    }
    static get is() { return "ion-img"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "alt": {
            "type": String,
            "attr": "alt"
        },
        "el": {
            "elementRef": true
        },
        "loadError": {
            "state": true
        },
        "loadSrc": {
            "state": true
        },
        "src": {
            "type": String,
            "attr": "src",
            "watchCallbacks": ["srcChanged"]
        }
    }; }
    static get events() { return [{
            "name": "ionImgDidLoad",
            "method": "ionImgDidLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionError",
            "method": "ionError",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ".sc-ion-img-h{-o-object-fit:contain;object-fit:contain}.sc-ion-img-h, img.sc-ion-img{display:block}img.sc-ion-img{width:100%;height:100%;-o-object-fit:inherit;object-fit:inherit;-o-object-position:inherit;object-position:inherit}"; }
}




/***/ })

}]);
//# sourceMappingURL=138.js.map