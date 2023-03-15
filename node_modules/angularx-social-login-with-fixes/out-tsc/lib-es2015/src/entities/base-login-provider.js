/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { BehaviorSubject } from 'rxjs';
/**
 * @abstract
 */
export class BaseLoginProvider {
    constructor() {
        this._readyState = new BehaviorSubject(false);
    }
    /**
     * @return {?}
     */
    onReady() {
        return new Promise((resolve, reject) => {
            this._readyState.subscribe((isReady) => {
                if (isReady) {
                    resolve();
                }
            });
        });
    }
    /**
     * @param {?} id
     * @param {?} src
     * @param {?} onload
     * @param {?=} async
     * @param {?=} inner_text_content
     * @return {?}
     */
    loadScript(id, src, onload, async = true, inner_text_content = '') {
        if (document.getElementById(id)) {
            return;
        }
        let /** @type {?} */ signInJS = document.createElement('script');
        signInJS.async = async;
        signInJS.src = src;
        signInJS.onload = onload;
        signInJS.text = inner_text_content; // LinkedIn
        document.head.appendChild(signInJS);
    }
}
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