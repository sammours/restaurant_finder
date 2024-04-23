(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[52],{

/***/ "./node_modules/@ionic/core/dist/esm/es2017/build/dlyuptke.sc.entry.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/es2017/build/dlyuptke.sc.entry.js ***!
  \*****************************************************************************/
/*! exports provided: IonModal, IonModalController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IonModal", function() { return Modal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IonModalController", function() { return ModalController; });
/* harmony import */ var _ionic_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ionic.core.js */ "./node_modules/@ionic/core/dist/esm/es2017/ionic.core.js");
/* harmony import */ var _chunk_265f51bc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-265f51bc.js */ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-265f51bc.js");
/* harmony import */ var _chunk_7c632336_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chunk-7c632336.js */ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-7c632336.js");
/* harmony import */ var _chunk_99929188_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chunk-99929188.js */ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-99929188.js");
/* harmony import */ var _chunk_90d954cd_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./chunk-90d954cd.js */ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-90d954cd.js");
/* harmony import */ var _chunk_e89a7020_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chunk-e89a7020.js */ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-e89a7020.js");








function iosEnterAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));
    wrapperAnimation.beforeStyles({ 'opacity': 1 })
        .fromTo('translateY', '100%', '0%');
    backdropAnimation.fromTo('opacity', 0.01, 0.4);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(0.36,0.66,0.04,1)')
        .duration(400)
        .beforeAddClass('show-modal')
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

function iosLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    const wrapperEl = baseEl.querySelector('.modal-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    const wrapperElRect = wrapperEl.getBoundingClientRect();
    wrapperAnimation.beforeStyles({ 'opacity': 1 })
        .fromTo('translateY', '0%', `${baseEl.ownerDocument.defaultView.innerHeight - wrapperElRect.top}px`);
    backdropAnimation.fromTo('opacity', 0.4, 0.0);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-out')
        .duration(250)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

function mdEnterAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));
    wrapperAnimation
        .fromTo('opacity', 0.01, 1)
        .fromTo('translateY', '40px', '0px');
    backdropAnimation.fromTo('opacity', 0.01, 0.32);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(0.36,0.66,0.04,1)')
        .duration(280)
        .beforeAddClass('show-modal')
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

function mdLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    const wrapperEl = baseEl.querySelector('.modal-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    wrapperAnimation
        .fromTo('opacity', 0.99, 0)
        .fromTo('translateY', '0px', '40px');
    backdropAnimation.fromTo('opacity', 0.32, 0.0);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(0.47,0,0.745,0.715)')
        .duration(200)
        .add(backdropAnimation)
        .add(wrapperAnimation));
}

class Modal {
    constructor() {
        this.presented = false;
        this.keyboardClose = true;
        this.backdropDismiss = true;
        this.showBackdrop = true;
        this.animated = true;
    }
    onDismiss(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.dismiss();
    }
    onBackdropTap() {
        this.dismiss(undefined, _chunk_265f51bc_js__WEBPACK_IMPORTED_MODULE_1__["a"]);
    }
    lifecycle(modalEvent) {
        const el = this.usersElement;
        const name = LIFECYCLE_MAP[modalEvent.type];
        if (el && name) {
            const ev = new CustomEvent(name, {
                bubbles: false,
                cancelable: false,
                detail: modalEvent.detail
            });
            el.dispatchEvent(ev);
        }
    }
    async present() {
        if (this.presented) {
            return;
        }
        const container = this.el.querySelector(`.modal-wrapper`);
        if (!container) {
            throw new Error('container is undefined');
        }
        const componentProps = Object.assign({}, this.componentProps, { modal: this.el });
        this.usersElement = await Object(_chunk_99929188_js__WEBPACK_IMPORTED_MODULE_3__["a"])(this.delegate, container, this.component, ['ion-page'], componentProps);
        await Object(_chunk_e89a7020_js__WEBPACK_IMPORTED_MODULE_5__["a"])(this.usersElement);
        return Object(_chunk_265f51bc_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this, 'modalEnter', iosEnterAnimation, mdEnterAnimation);
    }
    async dismiss(data, role) {
        const dismissed = await Object(_chunk_265f51bc_js__WEBPACK_IMPORTED_MODULE_1__["d"])(this, data, role, 'modalLeave', iosLeaveAnimation, mdLeaveAnimation);
        if (dismissed) {
            await Object(_chunk_99929188_js__WEBPACK_IMPORTED_MODULE_3__["b"])(this.delegate, this.usersElement);
        }
        return dismissed;
    }
    onDidDismiss() {
        return Object(_chunk_265f51bc_js__WEBPACK_IMPORTED_MODULE_1__["e"])(this.el, 'ionModalDidDismiss');
    }
    onWillDismiss() {
        return Object(_chunk_265f51bc_js__WEBPACK_IMPORTED_MODULE_1__["e"])(this.el, 'ionModalWillDismiss');
    }
    hostData() {
        return {
            'no-router': true,
            'aria-modal': 'true',
            class: Object.assign({}, Object(_chunk_7c632336_js__WEBPACK_IMPORTED_MODULE_2__["e"])(this.mode, 'modal'), Object(_chunk_7c632336_js__WEBPACK_IMPORTED_MODULE_2__["a"])(this.cssClass)),
            style: {
                zIndex: 20000 + this.overlayIndex,
            }
        };
    }
    render() {
        const dialogClasses = Object(_chunk_7c632336_js__WEBPACK_IMPORTED_MODULE_2__["e"])(this.mode, 'modal-wrapper');
        return [
            Object(_ionic_core_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-backdrop", { visible: this.showBackdrop, tappable: this.backdropDismiss }),
            Object(_ionic_core_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { role: "dialog", class: dialogClasses })
        ];
    }
    static get is() { return "ion-modal"; }
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
        "component": {
            "type": String,
            "attr": "component"
        },
        "componentProps": {
            "type": "Any",
            "attr": "component-props"
        },
        "config": {
            "context": "config"
        },
        "cssClass": {
            "type": String,
            "attr": "css-class"
        },
        "delegate": {
            "type": "Any",
            "attr": "delegate"
        },
        "dismiss": {
            "method": true
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
        }
    }; }
    static get events() { return [{
            "name": "ionModalDidPresent",
            "method": "didPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionModalWillPresent",
            "method": "willPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionModalWillDismiss",
            "method": "willDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionModalDidDismiss",
            "method": "didDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "ionDismiss",
            "method": "onDismiss"
        }, {
            "name": "ionBackdropTap",
            "method": "onBackdropTap"
        }, {
            "name": "ionModalDidPresent",
            "method": "lifecycle"
        }, {
            "name": "ionModalWillPresent",
            "method": "lifecycle"
        }, {
            "name": "ionModalWillDismiss",
            "method": "lifecycle"
        }, {
            "name": "ionModalDidDismiss",
            "method": "lifecycle"
        }]; }
    static get style() { return ".sc-ion-modal-md-h{--width:100%;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--overflow:hidden;--border-radius:0;--border-width:0;--border-style:none;--border-color:transparent;--background:var(--ion-background-color,#fff);--box-shadow:none;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;contain:strict}.overlay-hidden.sc-ion-modal-md-h{display:none}.modal-wrapper.sc-ion-modal-md{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:var(--overflow);z-index:10}\@media only screen and (min-width:768px) and (min-height:600px){.sc-ion-modal-md-h{--width:600px;--height:500px;--ion-safe-area-top:0px;--ion-safe-area-bottom:0px;--ion-safe-area-right:0px;--ion-safe-area-left:0px}}\@media only screen and (min-width:768px) and (min-height:768px){.sc-ion-modal-md-h{--width:600px;--height:600px}}\@media only screen and (min-width:768px) and (min-height:600px){.sc-ion-modal-md-h{--border-radius:2px;--box-shadow:0 28px 48px rgba(0,0,0,0.4)}}.modal-wrapper.sc-ion-modal-md{-webkit-transform:translate3d(0,40px,0);transform:translate3d(0,40px,0);opacity:.01}"; }
    static get styleMode() { return "md"; }
}
const LIFECYCLE_MAP = {
    'ionModalDidPresent': 'ionViewDidEnter',
    'ionModalWillPresent': 'ionViewWillEnter',
    'ionModalWillDismiss': 'ionViewWillLeave',
    'ionModalDidDismiss': 'ionViewDidLeave',
};

class ModalController {
    create(opts) {
        return Object(_chunk_265f51bc_js__WEBPACK_IMPORTED_MODULE_1__["f"])(this.doc.createElement('ion-modal'), opts);
    }
    dismiss(data, role, id) {
        return Object(_chunk_265f51bc_js__WEBPACK_IMPORTED_MODULE_1__["g"])(this.doc, data, role, 'ion-modal', id);
    }
    async getTop() {
        return Object(_chunk_265f51bc_js__WEBPACK_IMPORTED_MODULE_1__["h"])(this.doc, 'ion-modal');
    }
    static get is() { return "ion-modal-controller"; }
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
//# sourceMappingURL=52.js.map