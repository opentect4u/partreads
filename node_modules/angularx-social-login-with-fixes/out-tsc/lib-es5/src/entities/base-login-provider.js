/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { BehaviorSubject } from 'rxjs';
/**
 * @abstract
 */
var /**
 * @abstract
 */
BaseLoginProvider = /** @class */ (function () {
    function BaseLoginProvider() {
        this._readyState = new BehaviorSubject(false);
    }
    /**
     * @return {?}
     */
    BaseLoginProvider.prototype.onReady = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._readyState.subscribe(function (isReady) {
                if (isReady) {
                    resolve();
                }
            });
        });
    };
    /**
     * @param {?} id
     * @param {?} src
     * @param {?} onload
     * @param {?=} async
     * @param {?=} inner_text_content
     * @return {?}
     */
    BaseLoginProvider.prototype.loadScript = /**
     * @param {?} id
     * @param {?} src
     * @param {?} onload
     * @param {?=} async
     * @param {?=} inner_text_content
     * @return {?}
     */
    function (id, src, onload, async, inner_text_content) {
        if (async === void 0) { async = true; }
        if (inner_text_content === void 0) { inner_text_content = ''; }
        if (document.getElementById(id)) {
            return;
        }
        var /** @type {?} */ signInJS = document.createElement('script');
        signInJS.async = async;
        signInJS.src = src;
        signInJS.onload = onload;
        signInJS.text = inner_text_content; // LinkedIn
        document.head.appendChild(signInJS);
    };
    return BaseLoginProvider;
}());
/**
 * @abstract
 */
export { BaseLoginProvider };
function BaseLoginProvider_tsickle_Closure_declarations() {
    /** @type {?} */
    BaseLoginProvider.prototype._readyState;
    /**
     * @abstract
     * @return {?}
     */
    BaseLoginProvider.prototype.initialize = function () { };
    /**
     * @abstract
     * @return {?}
     */
    BaseLoginProvider.prototype.getLoginStatus = function () { };
    /**
     * @abstract
     * @return {?}
     */
    BaseLoginProvider.prototype.signIn = function () { };
    /**
     * @abstract
     * @return {?}
     */
    BaseLoginProvider.prototype.signOut = function () { };
}
//# sourceMappingURL=base-login-provider.js.map