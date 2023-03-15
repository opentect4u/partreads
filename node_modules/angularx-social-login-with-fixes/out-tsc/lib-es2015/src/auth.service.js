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
export class AuthServiceConfig {
    /**
     * @param {?} providers
     */
    constructor(providers) {
        this.providers = new Map();
        for (let /** @type {?} */ i = 0; i < providers.length; i++) {
            let /** @type {?} */ element = providers[i];
            this.providers.set(element.id, element.provider);
        }
    }
}
function AuthServiceConfig_tsickle_Closure_declarations() {
    /** @type {?} */
    AuthServiceConfig.prototype.providers;
}
export class AuthService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this._user = null;
        this._authState = new BehaviorSubject(null);
        this._readyState = new BehaviorSubject([]);
        this.providers = config.providers;
        this.providers.forEach((provider, key) => {
            provider.initialize().then(() => {
                let /** @type {?} */ readyProviders = this._readyState.getValue();
                readyProviders.push(key);
                this._readyState.next(readyProviders);
                provider.getLoginStatus().then((user) => {
                    user.provider = key;
                    this._user = user;
                    this._authState.next(user);
                });
            }).catch((err) => {
                // this._authState.next(null);
            });
        });
    }
    /**
     * @return {?}
     */
    get authState() {
        return this._authState.asObservable();
    }
    /**
     * Provides an array of provider ID's as they become ready
     * @return {?}
     */
    get readyState() {
        return this._readyState.asObservable();
    }
    /**
     * @param {?} providerId
     * @param {?=} opt
     * @return {?}
     */
    signIn(providerId, opt) {
        return new Promise((resolve, reject) => {
            let /** @type {?} */ providerObject = this.providers.get(providerId);
            if (providerObject) {
                providerObject.signIn(opt).then((user) => {
                    user.provider = providerId;
                    resolve(user);
                    this._user = user;
                    this._authState.next(user);
                }).catch(err => {
                    reject(err);
                });
            }
            else {
                reject(AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
            }
        });
    }
    /**
     * @return {?}
     */
    signOut() {
        return new Promise((resolve, reject) => {
            if (!this._user) {
                reject(AuthService.ERR_NOT_LOGGED_IN);
            }
            else {
                let /** @type {?} */ providerId = this._user.provider;
                let /** @type {?} */ providerObject = this.providers.get(providerId);
                if (providerObject) {
                    providerObject.signOut().then(() => {
                        resolve();
                        this._user = null;
                        this._authState.next(null);
                    }).catch((err) => {
                        reject(err);
                    });
                }
                else {
                    reject(AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
                }
            }
        });
    }
}
AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
AuthService.ERR_NOT_LOGGED_IN = 'Not logged in';
AuthService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AuthService.ctorParameters = () => [
    { type: AuthServiceConfig, },
];
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