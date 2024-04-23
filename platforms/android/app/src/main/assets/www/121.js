(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[121],{

/***/ "./node_modules/@ionic/core/dist/esm/es2017/build/tluindqz.entry.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/es2017/build/tluindqz.entry.js ***!
  \**************************************************************************/
/*! exports provided: IonLoading, IonLoadingController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IonLoading", function() { return Loading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IonLoadingController", function() { return LoadingController; });
/* harmony import */ var _ionic_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ionic.core.js */ "./node_modules/@ionic/core/dist/esm/es2017/ionic.core.js");
/* harmony import */ var _chunk_265f51bc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-265f51bc.js */ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-265f51bc.js");
/* harmony import */ var _chunk_7c632336_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chunk-7c632336.js */ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-7c632336.js");





function iosEnterAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.01, 0.3);
    wrapperAnimation.fromTo('opacity', 0.01, 1)
        .fromTo('scale', 1.1, 1);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

function iosLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.3, 0);
    wrapperAnimation.fromTo('opacity', 0.99, 0)
        .fromTo('scale', 1, 0.9);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

function mdEnterAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.01, 0.32);
    wrapperAnimation.fromTo('opacity', 0.01, 1).fromTo('scale', 1.1, 1);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

function mdLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.loading-wrapper'));
    backdropAnimation.fromTo('opacity', 0.32, 0);
    wrapperAnimation.fromTo('opacity', 0.99, 0).fromTo('scale', 1, 0.9);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

class Loading {
    constructor() {
        this.presented = false;
        this.keyboardClose = true;
        this.duration = 0;
        this.backdropDismiss = false;
        this.showBackdrop = true;
        this.translucent = false;
        this.animated = true;
    }
    componentWillLoad() {
        if (this.spinner === undefined) {
            this.spinner = this.config.get('loadingSpinner', this.config.get('spinner', this.mode === 'ios' ? 'lines' : 'crescent'));
        }
    }
    onBackdropTap() {
        this.dismiss(undefined, _chunk_265f51bc_js__WEBPACK_IMPORTED_MODULE_1__["a"]);
    }
    async present() {
        await Object(_chunk_265f51bc_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, 'loadingEnter', iosEnterAnimation, mdEnterAnimation, undefined);
        if (this.duration > 0) {
            this.durationTimeout = setTimeout(() => this.dismiss(), this.duration + 10);
        }
    }
    dismiss(data, role) {
        if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
        }
        return Object(_chunk_265f51bc_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this, data, role, 'loadingLeave', iosLeaveAnimation, mdLeaveAnimation);
    }
    onDidDismiss() {
        return Object(_chunk_265f51bc_js__WEBPACK_IMPORTED_MODULE_1__["e"])(this.el, 'ionLoadingDidDismiss');
    }
    onWillDismiss() {
        return Object(_chunk_265f51bc_js__WEBPACK_IMPORTED_MODULE_1__["e"])(this.el, 'ionLoadingWillDismiss');
    }
    hostData() {
        return {
            style: {
                zIndex: 40000 + this.overlayIndex
            },
            class: Object.assign({}, Object(_chunk_7c632336_js__WEBPACK_IMPORTED_MODULE_2__["a"])(this.cssClass), { 'loading-translucent': this.translucent })
        };
    }
    render() {
        return [
            Object(_ionic_core_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-backdrop", { visible: this.showBackdrop, tappable: this.backdropDismiss }),
            Object(_ionic_core_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "loading-wrapper", role: "dialog" },
                this.spinner && (Object(_ionic_core_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "loading-spinner" },
                    Object(_ionic_core_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-spinner", { name: this.spinner }))),
                this.message && Object(_ionic_core_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "loading-content" }, this.message))
        ];
    }
    static get is() { return "ion-loading"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "animated": {
            "type": Boolean,
            "attr": "animated"
        },
        "backdropDismiss": {
            "type": Boolean,
            "attr": "backdrop-dismiss"
        },
        "config": {
            "context": "config"
        },
        "cssClass": {
            "type": String,
            "attr": "css-class"
        },
        "dismiss": {
            "method": true
        },
        "duration": {
            "type": Number,
            "attr": "duration"
        },
        "el": {
            "elementRef": true
        },
        "enterAnimation": {
            "type": "Any",
            "attr": "enter-animation"
        },
        "keyboardClose": {
            "type": Boolean,
            "attr": "keyboard-close"
        },
        "leaveAnimation": {
            "type": "Any",
            "attr": "leave-animation"
        },
        "message": {
            "type": String,
            "attr": "message"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "onDidDismiss": {
            "method": true
        },
        "onWillDismiss": {
            "method": true
        },
        "overlayIndex": {
            "type": Number,
            "attr": "overlay-index"
        },
        "present": {
            "method": true
        },
        "showBackdrop": {
            "type": Boolean,
            "attr": "show-backdrop"
        },
        "spinner": {
            "type": String,
            "attr": "spinner",
            "mutable": true
        },
        "translucent": {
            "type": Boolean,
            "attr": "translucent"
        }
    }; }
    static get events() { return [{
            "name": "ionLoadingDidPresent",
            "method": "didPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionLoadingWillPresent",
            "method": "willPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionLoadingWillDismiss",
            "method": "willDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionLoadingDidDismiss",
            "method": "didDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "ionBackdropTap",
            "method": "onBackdropTap"
        }]; }
    static get style() { return ".sc-ion-loading-ios-h{--min-width:auto;--width:auto;--min-height:auto;--height:auto;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;font-family:var(--ion-font-family,inherit);contain:strict;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1000}.overlay-hidden.sc-ion-loading-ios-h{display:none}.loading-wrapper.sc-ion-loading-ios{display:-ms-flexbox;display:flex;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);opacity:0;z-index:10}.spinner-bubbles.sc-ion-loading-ios, .spinner-circles.sc-ion-loading-ios, .spinner-crescent.sc-ion-loading-ios, .spinner-dots.sc-ion-loading-ios, .spinner-lines.sc-ion-loading-ios, .spinner-lines-small.sc-ion-loading-ios{color:var(--spinner-color)}.sc-ion-loading-ios-h{--background:var(--ion-color-step-50,#f2f2f2);--max-width:270px;--max-height:90%;--spinner-color:var(--ion-color-step-600,#666);color:var(--ion-text-color,#000);font-size:14px}.loading-wrapper.sc-ion-loading-ios{border-radius:8px;padding-left:34px;padding-right:34px;padding-top:24px;padding-bottom:24px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.loading-wrapper.sc-ion-loading-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:34px;padding-inline-start:34px;-webkit-padding-end:34px;padding-inline-end:34px}}.loading-translucent.sc-ion-loading-ios-h   .loading-wrapper.sc-ion-loading-ios{background-color:rgba(var(--ion-background-color-rgb,255,255,255),.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}.loading-content.sc-ion-loading-ios{font-weight:700}.loading-spinner.sc-ion-loading-ios + .loading-content.sc-ion-loading-ios{margin-left:16px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.loading-spinner.sc-ion-loading-ios + .loading-content.sc-ion-loading-ios{margin-left:unset;-webkit-margin-start:16px;margin-inline-start:16px}}"; }
    static get styleMode() { return "ios"; }
}

class LoadingController {
    create(opts) {
        return Object(_chunk_265f51bc_js__WEBPACK_IMPORTED_MODULE_1__["f"])(this.doc.createElement('ion-loading'), opts);
    }
    dismiss(data, role, id) {
        return Object(_chunk_265f51bc_js__WEBPACK_IMPORTED_MODULE_1__["g"])(this.doc, data, role, 'ion-loading', id);
    }
    async getTop() {
        return Object(_chunk_265f51bc_js__WEBPACK_IMPORTED_MODULE_1__["h"])(this.doc, 'ion-loading');
    }
    static get is() { return "ion-loading-controller"; }
    static get properties() { return {
        "create": {
            "method": true
        },
        "dismiss": {
            "method": true
        },
        "doc": {
            "context": "document"
        },
        "getTop": {
            "method": true
        }
    }; }
}




/***/ })

}]);
//# sourceMappingURL=121.js.map