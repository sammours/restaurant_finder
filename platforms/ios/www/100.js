(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[100],{

/***/ "./node_modules/@ionic/core/dist/esm/es2017/build/oizmyxfb.sc.entry.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/es2017/build/oizmyxfb.sc.entry.js ***!
  \*****************************************************************************/
/*! exports provided: IonSpinner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IonSpinner", function() { return Spinner; });
/* harmony import */ var _ionic_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ionic.core.js */ "./node_modules/@ionic/core/dist/esm/es2017/ionic.core.js");
/* harmony import */ var _chunk_7c632336_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-7c632336.js */ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-7c632336.js");




const spinners = {
    'lines': {
        dur: 1000,
        lines: 12,
        fn: (dur, index, total) => {
            const transform = `rotate(${30 * index + (index < 6 ? 180 : -180)}deg)`;
            const animationDelay = `${(dur * index / total) - dur}ms`;
            return {
                y1: 17,
                y2: 29,
                style: {
                    'transform': transform,
                    'animation-delay': animationDelay,
                }
            };
        }
    },
    'lines-small': {
        dur: 1000,
        lines: 12,
        fn: (dur, index, total) => {
            const transform = `rotate(${30 * index + (index < 6 ? 180 : -180)}deg)`;
            const animationDelay = `${(dur * index / total) - dur}ms`;
            return {
                y1: 12,
                y2: 20,
                style: {
                    'transform': transform,
                    'animation-delay': animationDelay,
                }
            };
        }
    },
    'bubbles': {
        dur: 1000,
        circles: 9,
        fn: (dur, index, total) => {
            const animationDelay = `${(dur * index / total) - dur}ms`;
            const angle = 2 * Math.PI * index / total;
            return {
                r: 5,
                style: {
                    'top': `${9 * Math.sin(angle)}px`,
                    'left': `${9 * Math.cos(angle)}px`,
                    'animation-delay': animationDelay,
                }
            };
        }
    },
    'circles': {
        dur: 1000,
        circles: 8,
        fn: (dur, index, total) => {
            const step = index / total;
            const animationDelay = `${(dur * step) - dur}ms`;
            const angle = 2 * Math.PI * step;
            return {
                r: 5,
                style: {
                    'top': `${9 * Math.sin(angle)}px`,
                    'left': `${9 * Math.cos(angle)}px`,
                    'animation-delay': animationDelay,
                }
            };
        }
    },
    'crescent': {
        dur: 750,
        circles: 1,
        fn: () => {
            return {
                r: 26,
                style: {}
            };
        }
    },
    'dots': {
        dur: 750,
        circles: 3,
        fn: (_, index) => {
            const animationDelay = -(110 * index) + 'ms';
            return {
                r: 6,
                style: {
                    'left': `${9 - (9 * index)}px`,
                    'animation-delay': animationDelay,
                }
            };
        }
    }
};
const SPINNERS = spinners;

class Spinner {
    constructor() {
        this.paused = false;
    }
    getName() {
        const name = this.name || this.config.get('spinner');
        if (name) {
            return name;
        }
        return (this.mode === 'ios') ? 'lines' : 'crescent';
    }
    hostData() {
        return {
            class: Object.assign({}, Object(_chunk_7c632336_js__WEBPACK_IMPORTED_MODULE_1__["c"])(this.color), { [`spinner-${this.getName()}`]: true, 'spinner-paused': !!this.paused || this.config.getBoolean('_testing') })
        };
    }
    render() {
        const name = this.getName();
        const spinner = SPINNERS[name] || SPINNERS['lines'];
        const duration = (typeof this.duration === 'number' && this.duration > 10 ? this.duration : spinner.dur);
        const svgs = [];
        if (spinner.circles !== undefined) {
            for (let i = 0; i < spinner.circles; i++) {
                svgs.push(buildCircle(spinner, duration, i, spinner.circles));
            }
        }
        else if (spinner.lines !== undefined) {
            for (let i = 0; i < spinner.lines; i++) {
                svgs.push(buildLine(spinner, duration, i, spinner.lines));
            }
        }
        return svgs;
    }
    static get is() { return "ion-spinner"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "config": {
            "context": "config"
        },
        "duration": {
            "type": Number,
            "attr": "duration"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "paused": {
            "type": Boolean,
            "attr": "paused"
        }
    }; }
    static get style() { return ".sc-ion-spinner-h{display:inline-block;position:relative;width:28px;height:28px;color:var(--color);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ion-color.sc-ion-spinner-h{color:var(--ion-color-base)}svg.sc-ion-spinner{left:0;top:0;-webkit-transform-origin:center;transform-origin:center;position:absolute;width:100%;height:100%;-webkit-transform:translateZ(0);transform:translateZ(0)}[dir=rtl].sc-ion-spinner-h   svg.sc-ion-spinner, [dir=rtl]   .sc-ion-spinner-h   svg.sc-ion-spinner{right:0;-webkit-transform-origin:calc(100% - center);transform-origin:calc(100% - center)}.spinner-lines.sc-ion-spinner-h   line.sc-ion-spinner, .spinner-lines-small.sc-ion-spinner-h   line.sc-ion-spinner{stroke-width:4px;stroke-linecap:round;stroke:currentColor}.spinner-lines.sc-ion-spinner-h   svg.sc-ion-spinner, .spinner-lines-small.sc-ion-spinner-h   svg.sc-ion-spinner{-webkit-animation:spinner-fade-out 1s linear infinite;animation:spinner-fade-out 1s linear infinite}.spinner-bubbles.sc-ion-spinner-h   svg.sc-ion-spinner{-webkit-animation:spinner-scale-out 1s linear infinite;animation:spinner-scale-out 1s linear infinite;fill:currentColor}.spinner-circles.sc-ion-spinner-h   svg.sc-ion-spinner{-webkit-animation:spinner-fade-out 1s linear infinite;animation:spinner-fade-out 1s linear infinite;fill:currentColor}.spinner-crescent.sc-ion-spinner-h   circle.sc-ion-spinner{fill:transparent;stroke-width:4px;stroke-dasharray:128px;stroke-dashoffset:82px;stroke:currentColor}.spinner-crescent.sc-ion-spinner-h   svg.sc-ion-spinner{-webkit-animation:spinner-rotate 1s linear infinite;animation:spinner-rotate 1s linear infinite}.spinner-dots.sc-ion-spinner-h   circle.sc-ion-spinner{stroke-width:0;fill:currentColor}.spinner-dots.sc-ion-spinner-h   svg.sc-ion-spinner{-webkit-animation:spinner-dots 1s linear infinite;animation:spinner-dots 1s linear infinite}.spinner-paused.sc-ion-spinner-h   svg.sc-ion-spinner{-webkit-animation-play-state:paused;animation-play-state:paused}\@-webkit-keyframes spinner-fade-out{0%{opacity:1}to{opacity:0}}\@keyframes spinner-fade-out{0%{opacity:1}to{opacity:0}}\@-webkit-keyframes spinner-scale-out{0%{-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:scale(0);transform:scale(0)}}\@keyframes spinner-scale-out{0%{-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:scale(0);transform:scale(0)}}\@-webkit-keyframes spinner-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@keyframes spinner-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@-webkit-keyframes spinner-dots{0%{-webkit-transform:scale(1);transform:scale(1);opacity:.9}50%{-webkit-transform:scale(.4);transform:scale(.4);opacity:.3}to{-webkit-transform:scale(1);transform:scale(1);opacity:.9}}\@keyframes spinner-dots{0%{-webkit-transform:scale(1);transform:scale(1);opacity:.9}50%{-webkit-transform:scale(.4);transform:scale(.4);opacity:.3}to{-webkit-transform:scale(1);transform:scale(1);opacity:.9}}"; }
}
function buildCircle(spinner, duration, index, total) {
    const data = spinner.fn(duration, index, total);
    data.style['animation-duration'] = `${duration}ms`;
    return (Object(_ionic_core_js__WEBPACK_IMPORTED_MODULE_0__["h"])("svg", { viewBox: "0 0 64 64", style: data.style },
        Object(_ionic_core_js__WEBPACK_IMPORTED_MODULE_0__["h"])("circle", { transform: "translate(32,32)", r: data.r })));
}
function buildLine(spinner, duration, index, total) {
    const data = spinner.fn(duration, index, total);
    data.style['animation-duration'] = `${duration}ms`;
    return (Object(_ionic_core_js__WEBPACK_IMPORTED_MODULE_0__["h"])("svg", { viewBox: "0 0 64 64", style: data.style },
        Object(_ionic_core_js__WEBPACK_IMPORTED_MODULE_0__["h"])("line", { transform: "translate(32,32)", y1: data.y1, y2: data.y2 })));
}




/***/ })

}]);
//# sourceMappingURL=100.js.map