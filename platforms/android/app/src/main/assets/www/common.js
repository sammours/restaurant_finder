(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-265f51bc.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/es2017/build/chunk-265f51bc.js ***!
  \**************************************************************************/
/*! exports provided: a, b, c, d, e, f, g, h */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BACKDROP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isCancel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return present; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return dismiss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return eventMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return createOverlay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return dismissOverlay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return getOverlay; });
/* harmony import */ var _ionic_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ionic.core.js */ "./node_modules/@ionic/core/dist/esm/es2017/ionic.core.js");


let lastId = 0;
function createOverlay(element, opts) {
    const doc = element.ownerDocument;
    connectListeners(doc);
    Object.assign(element, opts);
    element.classList.add('overlay-hidden');
    const overlayIndex = lastId++;
    element.overlayIndex = overlayIndex;
    if (!element.hasAttribute('id')) {
        element.id = `ion-overlay-${overlayIndex}`;
    }
    getAppRoot(doc).appendChild(element);
    return element.componentOnReady();
}
function connectListeners(doc) {
    if (lastId === 0) {
        lastId = 1;
        doc.addEventListener('focusin', ev => {
            const lastOverlay = getOverlay(doc);
            if (lastOverlay && lastOverlay.backdropDismiss && !isDescendant(lastOverlay, ev.target)) {
                const firstInput = lastOverlay.querySelector('input,button');
                if (firstInput) {
                    firstInput.focus();
                }
            }
        });
        doc.addEventListener('ionBackButton', ev => {
            const lastOverlay = getOverlay(doc);
            if (lastOverlay && lastOverlay.backdropDismiss) {
                ev.detail.register(100, () => {
                    return lastOverlay.dismiss(undefined, BACKDROP);
                });
            }
        });
        doc.addEventListener('keyup', ev => {
            if (ev.key === 'Escape') {
                const lastOverlay = getOverlay(doc);
                if (lastOverlay && lastOverlay.backdropDismiss) {
                    lastOverlay.dismiss(undefined, BACKDROP);
                }
            }
        });
    }
}
function dismissOverlay(doc, data, role, overlayTag, id) {
    const overlay = getOverlay(doc, overlayTag, id);
    if (!overlay) {
        return Promise.reject('overlay does not exist');
    }
    return overlay.dismiss(data, role);
}
function getOverlays(doc, overlayTag) {
    const overlays = Array.from(getAppRoot(doc).children).filter(c => c.overlayIndex > 0);
    if (overlayTag === undefined) {
        return overlays;
    }
    overlayTag = overlayTag.toUpperCase();
    return overlays.filter(c => c.tagName === overlayTag);
}
function getOverlay(doc, overlayTag, id) {
    const overlays = getOverlays(doc, overlayTag);
    return (id === undefined)
        ? overlays[overlays.length - 1]
        : overlays.find(o => o.id === id);
}
async function present(overlay, name, iosEnterAnimation, mdEnterAnimation, opts) {
    if (overlay.presented) {
        return;
    }
    overlay.presented = true;
    overlay.willPresent.emit();
    const animationBuilder = (overlay.enterAnimation)
        ? overlay.enterAnimation
        : overlay.config.get(name, overlay.mode === 'ios' ? iosEnterAnimation : mdEnterAnimation);
    const completed = await overlayAnimation(overlay, animationBuilder, overlay.el, opts);
    if (completed) {
        overlay.didPresent.emit();
    }
}
async function dismiss(overlay, data, role, name, iosLeaveAnimation, mdLeaveAnimation, opts) {
    if (!overlay.presented) {
        return false;
    }
    overlay.presented = false;
    try {
        overlay.willDismiss.emit({ data, role });
        const animationBuilder = (overlay.leaveAnimation)
            ? overlay.leaveAnimation
            : overlay.config.get(name, overlay.mode === 'ios' ? iosLeaveAnimation : mdLeaveAnimation);
        await overlayAnimation(overlay, animationBuilder, overlay.el, opts);
        overlay.didDismiss.emit({ data, role });
    }
    catch (err) {
        console.error(err);
    }
    overlay.el.remove();
    return true;
}
function getAppRoot(doc) {
    return doc.querySelector('ion-app') || doc.body;
}
async function overlayAnimation(overlay, animationBuilder, baseEl, opts) {
    if (overlay.animation) {
        overlay.animation.destroy();
        overlay.animation = undefined;
        return false;
    }
    baseEl.classList.remove('overlay-hidden');
    const aniRoot = baseEl.shadowRoot || overlay.el;
    const animation = overlay.animation = await __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ./chunk-816d48a8.js */ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-816d48a8.js")).then(mod => mod.create(animationBuilder, aniRoot, opts));
    overlay.animation = animation;
    if (!overlay.animated || !overlay.config.getBoolean('animated', true)) {
        animation.duration(0);
    }
    if (overlay.keyboardClose) {
        animation.beforeAddWrite(() => {
            const activeElement = baseEl.ownerDocument.activeElement;
            if (activeElement && activeElement.matches('input, ion-input, ion-textarea')) {
                activeElement.blur();
            }
        });
    }
    await animation.playAsync();
    const hasCompleted = animation.hasCompleted;
    animation.destroy();
    overlay.animation = undefined;
    return hasCompleted;
}
function eventMethod(element, eventName) {
    let resolve;
    const promise = new Promise(r => resolve = r);
    onceEvent(element, eventName, (event) => {
        resolve(event.detail);
    });
    return promise;
}
function onceEvent(element, eventName, callback) {
    const handler = (ev) => {
        element.removeEventListener(eventName, handler);
        callback(ev);
    };
    element.addEventListener(eventName, handler);
}
function isCancel(role) {
    return role === 'cancel' || role === BACKDROP;
}
function isDescendant(parent, child) {
    while (child) {
        if (child === parent) {
            return true;
        }
        child = child.parentElement;
    }
    return false;
}
const BACKDROP = 'backdrop';




/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-6d7d2f8c.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/es2017/build/chunk-6d7d2f8c.js ***!
  \**************************************************************************/
/*! exports provided: a, b, c, d, e, f, g, h, i, j, k */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return rIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return now; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hasShadowDom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return findItemLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return renderHiddenInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return debounceEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return isEndSide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return assert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return debounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return pointerCoord; });
/* harmony import */ var _ionic_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ionic.core.js */ "./node_modules/@ionic/core/dist/esm/es2017/ionic.core.js");


function rIC(callback) {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback);
    }
    else {
        setTimeout(callback, 32);
    }
}
function hasShadowDom(el) {
    return !!el.shadowRoot && !!el.attachShadow;
}
function findItemLabel(componentEl) {
    const itemEl = componentEl.closest('ion-item');
    if (itemEl) {
        return itemEl.querySelector('ion-label');
    }
    return null;
}
function renderHiddenInput(always, container, name, value, disabled) {
    if (always || hasShadowDom(container)) {
        let input = container.querySelector('input.aux-input');
        if (!input) {
            input = container.ownerDocument.createElement('input');
            input.type = 'hidden';
            input.classList.add('aux-input');
            container.appendChild(input);
        }
        input.disabled = disabled;
        input.name = name;
        input.value = value || '';
    }
}
function clamp(min, n, max) {
    return Math.max(min, Math.min(n, max));
}
function assert(actual, reason) {
    if (!actual) {
        const message = 'ASSERT: ' + reason;
        console.error(message);
        debugger;
        throw new Error(message);
    }
}
function now(ev) {
    return ev.timeStamp || Date.now();
}
function pointerCoord(ev) {
    if (ev) {
        const changedTouches = ev.changedTouches;
        if (changedTouches && changedTouches.length > 0) {
            const touch = changedTouches[0];
            return { x: touch.clientX, y: touch.clientY };
        }
        if (ev.pageX !== undefined) {
            return { x: ev.pageX, y: ev.pageY };
        }
    }
    return { x: 0, y: 0 };
}
function isEndSide(win, side) {
    const isRTL = win.document.dir === 'rtl';
    switch (side) {
        case 'start': return isRTL;
        case 'end': return !isRTL;
        default:
            throw new Error(`"${side}" is not a valid value for [side]. Use "start" or "end" instead.`);
    }
}
function debounceEvent(event, wait) {
    const original = event._original || event;
    return {
        _original: event,
        emit: debounce(original.emit.bind(original), wait)
    };
}
function debounce(func, wait = 0) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(func, wait, ...args);
    };
}




/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-7c632336.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/es2017/build/chunk-7c632336.js ***!
  \**************************************************************************/
/*! exports provided: a, b, c, d, e */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getClassMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return openURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createColorClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return hostContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return createThemedClasses; });
/* harmony import */ var _ionic_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ionic.core.js */ "./node_modules/@ionic/core/dist/esm/es2017/ionic.core.js");


function hostContext(selector, el) {
    return el.closest(selector) !== null;
}
function createColorClasses(color) {
    return (typeof color === 'string' && color.length > 0) ? {
        'ion-color': true,
        [`ion-color-${color}`]: true
    } : undefined;
}
function createThemedClasses(mode, name) {
    return {
        [name]: true,
        [`${name}-${mode}`]: mode !== undefined
    };
}
function getClassList(classes) {
    if (classes !== undefined) {
        const array = Array.isArray(classes) ? classes : classes.split(' ');
        return array
            .filter(c => c != null)
            .map(c => c.trim())
            .filter(c => c !== '');
    }
    return [];
}
function getClassMap(classes) {
    const map = {};
    getClassList(classes).forEach(c => map[c] = true);
    return map;
}
const SCHEME = /^[a-z][a-z0-9+\-.]*:/;
async function openURL(win, url, ev, direction) {
    if (url != null && url[0] !== '#' && !SCHEME.test(url)) {
        const router = win.document.querySelector('ion-router');
        if (router) {
            if (ev != null) {
                ev.preventDefault();
            }
            await router.componentOnReady();
            return router.push(url, direction);
        }
    }
    return false;
}




/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-81780b86.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/es2017/build/chunk-81780b86.js ***!
  \**************************************************************************/
/*! exports provided: a, b, c, d */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hapticSelectionChanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hapticSelectionStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hapticSelectionEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return hapticSelection; });
/* harmony import */ var _ionic_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ionic.core.js */ "./node_modules/@ionic/core/dist/esm/es2017/ionic.core.js");


function hapticSelection() {
    const engine = window.TapticEngine;
    if (engine) {
        engine.selection();
    }
}
function hapticSelectionStart() {
    const engine = window.TapticEngine;
    if (engine) {
        engine.gestureSelectionStart();
    }
}
function hapticSelectionChanged() {
    const engine = window.TapticEngine;
    if (engine) {
        engine.gestureSelectionChanged();
    }
}
function hapticSelectionEnd() {
    const engine = window.TapticEngine;
    if (engine) {
        engine.gestureSelectionEnd();
    }
}




/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-90d954cd.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/es2017/build/chunk-90d954cd.js ***!
  \**************************************************************************/
/*! exports provided: a, b, c, d, e */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LIFECYCLE_WILL_LEAVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LIFECYCLE_WILL_ENTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return LIFECYCLE_DID_ENTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return LIFECYCLE_DID_LEAVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return LIFECYCLE_WILL_UNLOAD; });
/* harmony import */ var _ionic_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ionic.core.js */ "./node_modules/@ionic/core/dist/esm/es2017/ionic.core.js");


const LIFECYCLE_WILL_ENTER = 'ionViewWillEnter';
const LIFECYCLE_DID_ENTER = 'ionViewDidEnter';
const LIFECYCLE_WILL_LEAVE = 'ionViewWillLeave';
const LIFECYCLE_DID_LEAVE = 'ionViewDidLeave';
const LIFECYCLE_WILL_UNLOAD = 'ionViewWillUnload';




/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-99929188.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/es2017/build/chunk-99929188.js ***!
  \**************************************************************************/
/*! exports provided: a, b */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return attachComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return detachComponent; });
/* harmony import */ var _ionic_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ionic.core.js */ "./node_modules/@ionic/core/dist/esm/es2017/ionic.core.js");


async function attachComponent(delegate, container, component, cssClasses, componentProps) {
    if (delegate) {
        return delegate.attachViewToDom(container, component, componentProps, cssClasses);
    }
    if (typeof component !== 'string' && !(component instanceof HTMLElement)) {
        throw new Error('framework delegate is missing');
    }
    const el = (typeof component === 'string')
        ? container.ownerDocument && container.ownerDocument.createElement(component)
        : component;
    if (cssClasses) {
        cssClasses.forEach(c => el.classList.add(c));
    }
    if (componentProps) {
        Object.assign(el, componentProps);
    }
    container.appendChild(el);
    if (el.componentOnReady) {
        await el.componentOnReady();
    }
    return el;
}
function detachComponent(delegate, element) {
    if (element) {
        if (delegate) {
            const container = element.parentElement;
            return delegate.removeViewFromDom(container, element);
        }
        element.remove();
    }
    return Promise.resolve();
}




/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-e89a7020.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/es2017/build/chunk-e89a7020.js ***!
  \**************************************************************************/
/*! exports provided: a, b, c, d */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return deepReady; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return lifecycle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return transition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return setPageHidden; });
/* harmony import */ var _ionic_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ionic.core.js */ "./node_modules/@ionic/core/dist/esm/es2017/ionic.core.js");
/* harmony import */ var _chunk_90d954cd_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk-90d954cd.js */ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-90d954cd.js");




const iosTransitionAnimation = () => __webpack_require__.e(/*! import() */ 45).then(__webpack_require__.bind(null, /*! ./chunk-8cdfc1ff.js */ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-8cdfc1ff.js"));
const mdTransitionAnimation = () => __webpack_require__.e(/*! import() */ 46).then(__webpack_require__.bind(null, /*! ./chunk-f2d9e763.js */ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-f2d9e763.js"));
function transition(opts) {
    return new Promise((resolve, reject) => {
        opts.queue.write(() => {
            beforeTransition(opts);
            runTransition(opts).then(result => {
                if (result.animation) {
                    result.animation.destroy();
                }
                afterTransition(opts);
                resolve(result);
            }, error => {
                afterTransition(opts);
                reject(error);
            });
        });
    });
}
function beforeTransition(opts) {
    const enteringEl = opts.enteringEl;
    const leavingEl = opts.leavingEl;
    setZIndex(enteringEl, leavingEl, opts.direction);
    if (opts.showGoBack) {
        enteringEl.classList.add('can-go-back');
    }
    else {
        enteringEl.classList.remove('can-go-back');
    }
    setPageHidden(enteringEl, false);
    if (leavingEl) {
        setPageHidden(leavingEl, false);
    }
}
async function runTransition(opts) {
    const animationBuilder = await getAnimationBuilder(opts);
    const ani = (animationBuilder)
        ? animation(animationBuilder, opts)
        : noAnimation(opts);
    return ani;
}
function afterTransition(opts) {
    const enteringEl = opts.enteringEl;
    const leavingEl = opts.leavingEl;
    enteringEl.classList.remove('ion-page-invisible');
    if (leavingEl !== undefined) {
        leavingEl.classList.remove('ion-page-invisible');
    }
}
async function getAnimationBuilder(opts) {
    if (!opts.leavingEl || !opts.animated || opts.duration === 0) {
        return undefined;
    }
    if (opts.animationBuilder) {
        return opts.animationBuilder;
    }
    const builder = (opts.mode === 'ios')
        ? (await iosTransitionAnimation()).iosTransitionAnimation
        : (await mdTransitionAnimation()).mdTransitionAnimation;
    return builder;
}
async function animation(animationBuilder, opts) {
    await waitForReady(opts, true);
    const trans = await __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ./chunk-816d48a8.js */ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-816d48a8.js")).then(mod => mod.create(animationBuilder, opts.baseEl, opts));
    fireWillEvents(opts.enteringEl, opts.leavingEl);
    await playTransition(trans, opts);
    if (opts.progressCallback) {
        opts.progressCallback(undefined);
    }
    if (trans.hasCompleted) {
        fireDidEvents(opts.enteringEl, opts.leavingEl);
    }
    return {
        hasCompleted: trans.hasCompleted,
        animation: trans
    };
}
async function noAnimation(opts) {
    const enteringEl = opts.enteringEl;
    const leavingEl = opts.leavingEl;
    await waitForReady(opts, false);
    fireWillEvents(enteringEl, leavingEl);
    fireDidEvents(enteringEl, leavingEl);
    return {
        hasCompleted: true
    };
}
async function waitForReady(opts, defaultDeep) {
    const deep = opts.deepWait !== undefined ? opts.deepWait : defaultDeep;
    const promises = deep ? [
        deepReady(opts.enteringEl),
        deepReady(opts.leavingEl),
    ] : [
        shallowReady(opts.enteringEl),
        shallowReady(opts.leavingEl),
    ];
    await Promise.all(promises);
    await notifyViewReady(opts.viewIsReady, opts.enteringEl);
}
async function notifyViewReady(viewIsReady, enteringEl) {
    if (viewIsReady) {
        await viewIsReady(enteringEl);
    }
}
function playTransition(trans, opts) {
    const progressCallback = opts.progressCallback;
    const promise = new Promise(resolve => trans.onFinish(resolve));
    if (progressCallback) {
        trans.progressStart();
        progressCallback(trans);
    }
    else {
        trans.play();
    }
    return promise;
}
function fireWillEvents(enteringEl, leavingEl) {
    lifecycle(leavingEl, _chunk_90d954cd_js__WEBPACK_IMPORTED_MODULE_1__["a"]);
    lifecycle(enteringEl, _chunk_90d954cd_js__WEBPACK_IMPORTED_MODULE_1__["b"]);
}
function fireDidEvents(enteringEl, leavingEl) {
    lifecycle(enteringEl, _chunk_90d954cd_js__WEBPACK_IMPORTED_MODULE_1__["c"]);
    lifecycle(leavingEl, _chunk_90d954cd_js__WEBPACK_IMPORTED_MODULE_1__["d"]);
}
function lifecycle(el, eventName) {
    if (el) {
        const ev = new CustomEvent(eventName, {
            bubbles: false,
            cancelable: false,
        });
        el.dispatchEvent(ev);
    }
}
function shallowReady(el) {
    if (el && el.componentOnReady) {
        return el.componentOnReady();
    }
    return Promise.resolve();
}
async function deepReady(el) {
    const element = el;
    if (element) {
        if (element.componentOnReady != null) {
            const stencilEl = await element.componentOnReady();
            if (stencilEl != null) {
                return;
            }
        }
        await Promise.all(Array.from(element.children).map(deepReady));
    }
}
function setPageHidden(el, hidden) {
    if (hidden) {
        el.setAttribute('aria-hidden', 'true');
        el.classList.add('ion-page-hidden');
    }
    else {
        el.hidden = false;
        el.removeAttribute('aria-hidden');
        el.classList.remove('ion-page-hidden');
    }
}
function setZIndex(enteringEl, leavingEl, direction) {
    if (enteringEl !== undefined) {
        enteringEl.style.zIndex = (direction === 'back')
            ? '99'
            : '101';
    }
    if (leavingEl !== undefined) {
        leavingEl.style.zIndex = '100';
    }
}




/***/ }),

/***/ "./node_modules/@ionic/core/dist/esm/es2017/build/chunk-f54563a4.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/es2017/build/chunk-f54563a4.js ***!
  \**************************************************************************/
/*! exports provided: a, b, c, d, e */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isPlatform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getPlatforms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return setupPlatforms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return testUserAgent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return PLATFORMS_MAP; });
/* harmony import */ var _ionic_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ionic.core.js */ "./node_modules/@ionic/core/dist/esm/es2017/ionic.core.js");


const getPlatforms = (win) => setupPlatforms(win);
const isPlatform = (win, platform) => getPlatforms(win).includes(platform);
const setupPlatforms = (win) => {
    win.Ionic = win.Ionic || {};
    let platforms = win.Ionic.platforms;
    if (platforms == null) {
        platforms = win.Ionic.platforms = detectPlatforms(win);
        platforms.forEach(p => win.document.documentElement.classList.add(`plt-${p}`));
    }
    return platforms;
};
const isMobileWeb = (win) => isMobile(win) && !isHybrid(win);
const detectPlatforms = (win) => Object.keys(PLATFORMS_MAP).filter(p => PLATFORMS_MAP[p](win));
const isIpad = (win) => testUserAgent(win, /iPad/i);
const isIphone = (win) => testUserAgent(win, /iPhone/i);
const isIOS = (win) => testUserAgent(win, /iPad|iPhone|iPod/i);
const isAndroid = (win) => testUserAgent(win, /android|sink/i);
const isAndroidTablet = (win) => {
    return isAndroid(win) && !testUserAgent(win, /mobile/i);
};
const isPhablet = (win) => {
    const width = win.innerWidth;
    const height = win.innerHeight;
    const smallest = Math.min(width, height);
    const largest = Math.max(width, height);
    return (smallest > 390 && smallest < 520) &&
        (largest > 620 && largest < 800);
};
const isTablet = (win) => {
    const width = win.innerWidth;
    const height = win.innerHeight;
    const smallest = Math.min(width, height);
    const largest = Math.max(width, height);
    return (isIpad(win) ||
        isAndroidTablet(win) ||
        ((smallest > 460 && smallest < 820) &&
            (largest > 780 && largest < 1400)));
};
const isMobile = (win) => matchMedia(win, '(any-pointer:coarse)');
const isDesktop = (win) => !isMobile(win);
const isHybrid = (win) => isCordova(win) || isCapacitorNative(win);
const isCordova = (win) => !!(win['cordova'] || win['phonegap'] || win['PhoneGap']);
const isCapacitorNative = (win) => {
    const capacitor = win['Capacitor'];
    return !!(capacitor && capacitor.isNative);
};
const isElectron = (win) => testUserAgent(win, /electron/);
const isPWA = (win) => win.matchMedia ? (win.matchMedia('(display-mode: standalone)').matches || win.navigator.standalone) : false;
const testUserAgent = (win, expr) => win.navigator && win.navigator.userAgent ? expr.test(win.navigator.userAgent) : false;
const matchMedia = (win, query) => win.matchMedia ? win.matchMedia(query).matches : false;
const PLATFORMS_MAP = {
    'ipad': isIpad,
    'iphone': isIphone,
    'ios': isIOS,
    'android': isAndroid,
    'phablet': isPhablet,
    'tablet': isTablet,
    'cordova': isCordova,
    'capacitor': isCapacitorNative,
    'electron': isElectron,
    'pwa': isPWA,
    'mobile': isMobile,
    'mobileweb': isMobileWeb,
    'desktop': isDesktop,
    'hybrid': isHybrid
};




/***/ }),

/***/ "./src/app/models/restaurant.model.ts":
/*!********************************************!*\
  !*** ./src/app/models/restaurant.model.ts ***!
  \********************************************/
/*! exports provided: Restaurant */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Restaurant", function() { return Restaurant; });
class Restaurant {
}


/***/ }),

/***/ "./src/app/services/base.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/base.service.ts ***!
  \******************************************/
/*! exports provided: BaseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseService", function() { return BaseService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");



let BaseService = class BaseService {
    constructor() {
        this.baseUrl = 'http://localhost:44405';
        this.clientId = '50e8d2e0-c8d3-4282-91a4-93df1c005eac';
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    }
};
BaseService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], BaseService);



/***/ }),

/***/ "./src/app/services/favourite.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/favourite.service.ts ***!
  \***********************************************/
/*! exports provided: FavouriteService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FavouriteService", function() { return FavouriteService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base.service */ "./src/app/services/base.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");





let FavouriteService = class FavouriteService extends _base_service__WEBPACK_IMPORTED_MODULE_2__["BaseService"] {
    constructor(http) {
        super();
        this.http = http;
    }
    getAll() {
        return this.http.get(`${this.baseUrl}/api/Favourite?clientId=${this.clientId}`).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((res) => res));
    }
    add(favourite) {
        favourite.clientId = this.clientId;
        return this.http.post(`${this.baseUrl}/api/Favourite`, favourite, { headers: this.headers }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((res) => res));
    }
    delete(id) {
        return this.http.delete(`${this.baseUrl}/api/Favourite?id=${id}&clientId=${this.clientId}`).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((res) => res));
    }
};
FavouriteService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
], FavouriteService);



/***/ }),

/***/ "./src/app/services/restaurant.service.ts":
/*!************************************************!*\
  !*** ./src/app/services/restaurant.service.ts ***!
  \************************************************/
/*! exports provided: RestaurantService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RestaurantService", function() { return RestaurantService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base.service */ "./src/app/services/base.service.ts");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "./node_modules/@ionic-native/geolocation/ngx/index.js");






let RestaurantService = class RestaurantService extends _base_service__WEBPACK_IMPORTED_MODULE_4__["BaseService"] {
    constructor(http, geolocation) {
        super();
        this.http = http;
        this.geolocation = geolocation;
        this.coords = {
            latitude: 0,
            longitude: 0
        };
        geolocation.getCurrentPosition().then((resp) => {
            this.coords = resp.coords;
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }
    getAll() {
        return this.http.get(`${this.baseUrl}/api/Restaurant?lat=${this.coords.latitude}&lng=${this.coords.longitude}`).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((res) => res));
    }
    getById(id) {
        return this.http.get(`${this.baseUrl}/api/Restaurant/${id}`).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((res) => res));
    }
};
RestaurantService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_5__["Geolocation"]])
], RestaurantService);



/***/ })

}]);
//# sourceMappingURL=common.js.map