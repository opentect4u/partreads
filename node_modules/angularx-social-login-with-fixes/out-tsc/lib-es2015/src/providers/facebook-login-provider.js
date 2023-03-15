/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/user';
export class FacebookLoginProvider extends BaseLoginProvider {
    /**
     * @param {?} clientId
     * @param {?=} opt
     * @param {?=} locale
     * @param {?=} fields
     * @param {?=} version
     */
    constructor(clientId, opt = { scope: 'email,public_profile' }, locale = 'en_US', fields = 'name,email,picture,first_name,last_name', version = 'v2.9') {
        super();
        this.clientId = clientId;
        this.opt = opt;
        this.locale = locale;
        this.fields = fields;
        this.version = version;
    }
    /**
     * @return {?}
     */
    initialize() {
        return new Promise((resolve, reject) => {
            this.loadScript(FacebookLoginProvider.PROVIDER_ID, `//connect.facebook.net/${this.locale}/sdk.js`, () => {
                FB.init({
                    appId: this.clientId,
                    autoLogAppEvents: true,
                    cookie: true,
                    xfbml: true,
                    version: this.version
                });
                // FB.AppEvents.logPageView(); #FIX for #18
                this._readyState.next(true);
                resolve();
            });
        });
    }
    /**
     * @return {?}
     */
    getLoginStatus() {
        return new Promise((resolve, reject) => {
            this.onReady().then(() => {
                FB.getLoginStatus((response) => {
                    if (response.status === 'connected') {
                        let /** @type {?} */ authResponse = response.authResponse;
                        FB.api(`/me?fields=${this.fields}`, (fbUser) => {
                            let /** @type {?} */ user = new SocialUser();
                            user.id = fbUser.id;
                            user.name = fbUser.name;
                            user.email = fbUser.email;
                            user.photoUrl = 'https://graph.facebook.com/' + fbUser.id + '/picture?type=normal';
                            user.firstName = fbUser.first_name;
                            user.lastName = fbUser.last_name;
                            user.authToken = authResponse.accessToken;
                            user.facebook = fbUser;
                            resolve(user);
                        });
                    }
                });
            });
        });
    }
    /**
     * @param {?=} opt
     * @return {?}
     */
    signIn(opt) {
        return new Promise((resolve, reject) => {
            this.onReady().then(() => {
                FB.login((response) => {
                    if (response.authResponse) {
                        let /** @type {?} */ authResponse = response.authResponse;
                        FB.api(`/me?fields=${this.fields}`, (fbUser) => {
                            let /** @type {?} */ user = new SocialUser();
                            user.id = fbUser.id;
                            user.name = fbUser.name;
                            user.email = fbUser.email;
                            user.photoUrl = 'https://graph.facebook.com/' + fbUser.id + '/picture?type=normal';
                            user.firstName = fbUser.first_name;
                            user.lastName = fbUser.last_name;
                            user.authToken = authResponse.accessToken;
                            user.facebook = fbUser;
                            resolve(user);
                        });
                    }
                    else {
                        reject('User cancelled login or did not fully authorize.');
                    }
                }, this.opt);
            });
        });
    }
    /**
     * @return {?}
     */
    signOut() {
        return new Promise((resolve, reject) => {
            this.onReady().then(() => {
                FB.logout((response) => {
                    resolve();
                });
            });
        });
    }
}
FacebookLoginProvider.PROVIDER_ID = 'FACEBOOK';
function FacebookLoginProvider_tsickle_Closure_declarations() {
    /** @type {?} */
    FacebookLoginProvider.PROVIDER_ID;
    /** @type {?} */
    FacebookLoginProvider.prototype.clientId;
    /** @type {?} */
    FacebookLoginProvider.prototype.opt;
    /** @type {?} */
    FacebookLoginProvider.prototype.locale;
    /** @type {?} */
    FacebookLoginProvider.prototype.fields;
    /** @type {?} */
    FacebookLoginProvider.prototype.version;
}
//# sourceMappingURL=facebook-login-provider.js.map