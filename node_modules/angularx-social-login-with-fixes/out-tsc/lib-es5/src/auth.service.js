/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
/**
 * @record
 */
export function AuthServiceConfigItem() { }
function AuthServiceConfigItem_tsickle_Closure_declarations() {
    /** @type {?} */
    AuthServiceConfigItem.prototype.id;
    /** @type {?} */
    AuthServiceConfigItem.prototype.provider;
}
/**
 * @record
 */
export function LoginOpt() { }
function LoginOpt_tsickle_Closure_declarations() {
    /**
     * Facebook FB.login options: https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11.
     * @type {?|undefined}
     */
    LoginOpt.prototype.auth_type;
    /** @type {?|undefined} */
    LoginOpt.prototype.scope;
    /** @type {?|undefined} */
    LoginOpt.prototype.return_scopes;
    /** @type {?|undefined} */
    LoginOpt.prototype.enable_profile_selector;
    /** @type {?|undefined} */
    LoginOpt.prototype.profile_selector_ids;
    /**
     * Google gapi.auth2.ClientConfig: \
     * https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig.
     * @type {?|undefined}
     */
    LoginOpt.prototype.client_id;
    /** @type {?|undefined} */
    LoginOpt.prototype.cookie_policy;
    /** @type {?|undefined} */
    LoginOpt.prototype.fetch_basic_profile;
    /** @type {?|undefined} */
    LoginOpt.prototype.hosted_domain;
    /** @type {?|undefined} */
    LoginOpt.prototype.openid_realm;
    /** @type {?|undefined} */
    LoginOpt.prototype.ux_mode;
    /** @type {?|undefined} */
    LoginOpt.prototype.redirect_uri;
    /** @type {?|undefined} */
    LoginOpt.prototype.prompt;
}
var AuthServiceConfig = /** @class */ (function () {
    function AuthServiceConfig(providers) {
        this.providers = new Map();
        for (var /** @type {?} */ i = 0; i < providers.length; i++) {
            var /** @type {?} */ element = providers[i];
            this.providers.set(element.id, element.provider);
        }
    }
    return AuthServiceConfig;
}());
export { AuthServiceConfig };
function AuthServiceConfig_tsickle_Closure_declarations() {
    /** @type {?} */
    AuthServiceConfig.prototype.providers;
}
var AuthService = /** @class */ (function () {
    function AuthService(config) {
        var _this = this;
        this._user = null;
        this._authState = new BehaviorSubject(null);
        this._readyState = new BehaviorSubject([]);
        this.providers = config.providers;
        this.providers.forEach(function (provider, key) {
            provider.initialize().then(function () {
                var /** @type {?} */ readyProviders = _this._readyState.getValue();
                readyProviders.push(key);
                _this._readyState.next(readyProviders);
                provider.getLoginStatus().then(function (user) {
                    user.provider = key;
                    _this._user = user;
                    _this._authState.next(user);
                });
            }).catch(function (err) {
                // this._authState.next(null);
            });
        });
    }
    Object.defineProperty(AuthService.prototype, "authState", {
        get: /**
         * @return {?}
         */
        function () {
            return this._authState.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "readyState", {
        /** Provides an array of provider ID's as they become ready */
        get: /**
         * Provides an array of provider ID's as they become ready
         * @return {?}
         */
        function () {
            return this._readyState.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} providerId
     * @param {?=} opt
     * @return {?}
     */
    AuthService.prototype.signIn = /**
     * @param {?} providerId
     * @param {?=} opt
     * @return {?}
     */
    function (providerId, opt) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var /** @type {?} */ providerObject = _this.providers.get(providerId);
            if (providerObject) {
                providerObject.signIn(opt).then(function (user) {
                    user.provider = providerId;
                    resolve(user);
                    _this._user = user;
                    _this._authState.next(user);
                }).catch(function (err) {
                    reject(err);
                });
            }
            else {
                reject(AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
            }
        });
    };
    /**
     * @return {?}
     */
    AuthService.prototype.signOut = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this._user) {
                reject(AuthService.ERR_NOT_LOGGED_IN);
            }
            else {
                var /** @type {?} */ providerId = _this._user.provider;
                var /** @type {?} */ providerObject = _this.providers.get(providerId);
                if (providerObject) {
                    providerObject.signOut().then(function () {
                        resolve();
                        _this._user = null;
                        _this._authState.next(null);
                    }).catch(function (err) {
                        reject(err);
                    });
                }
                else {
                    reject(AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
                }
            }
        });
    };
    AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
    AuthService.ERR_NOT_LOGGED_IN = 'Not logged in';
    AuthService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AuthService.ctorParameters = function () { return [
        { type: AuthServiceConfig, },
    ]; };
    return AuthService;
}());
export { AuthService };
function AuthService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    AuthService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    AuthService.ctorParameters;
    /** @type {?} */
    AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND;
    /** @type {?} */
    AuthService.ERR_NOT_LOGGED_IN;
    /** @type {?} */
    AuthService.prototype.providers;
    /** @type {?} */
    AuthService.prototype._user;
    /** @type {?} */
    AuthService.prototype._authState;
    /** @type {?} */
    AuthService.prototype._readyState;
}
//# sourceMappingURL=auth.service.js.map