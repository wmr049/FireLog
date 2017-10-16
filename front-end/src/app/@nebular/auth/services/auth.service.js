var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable, Optional, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { NbTokenService } from './token.service';
import { NB_AUTH_PROVIDERS_TOKEN } from '../auth.options';
var NbAuthResult = (function () {
    // TODO pass arguments in options object
    function NbAuthResult(success, response, redirect, errors, messages, token) {
        this.success = success;
        this.response = response;
        this.redirect = redirect;
        this.errors = [];
        this.messages = [];
        this.errors = this.errors.concat([errors]);
        if (errors instanceof Array) {
            this.errors = errors;
        }
        this.messages = this.messages.concat([messages]);
        if (messages instanceof Array) {
            this.messages = messages;
        }
        this.token = token;
    }
    NbAuthResult.prototype.getResponse = function () {
        return this.response;
    };
    NbAuthResult.prototype.getTokenValue = function () {
        return this.token;
    };
    NbAuthResult.prototype.replaceToken = function (token) {
        this.token = token;
    };
    NbAuthResult.prototype.getRedirect = function () {
        return this.redirect;
    };
    NbAuthResult.prototype.getErrors = function () {
        return this.errors.filter(function (val) { return !!val; });
    };
    NbAuthResult.prototype.getMessages = function () {
        return this.messages.filter(function (val) { return !!val; });
    };
    NbAuthResult.prototype.isSuccess = function () {
        return this.success;
    };
    NbAuthResult.prototype.isFailure = function () {
        return !this.success;
    };
    return NbAuthResult;
}());
export { NbAuthResult };
var NbAuthService = (function () {
    function NbAuthService(tokenService, injector, providers) {
        if (providers === void 0) { providers = {}; }
        this.tokenService = tokenService;
        this.injector = injector;
        this.providers = providers;
    }
    /**
     * Retrieves current authenticated token stored
     * @returns {Observable<any>}
     */
    NbAuthService.prototype.getToken = function () {
        return this.tokenService.get();
    };
    /**
     * Returns true if auth token is presented in the token storage
     * // TODO: check exp date for JWT token
     * @returns {Observable<any>}
     */
    NbAuthService.prototype.isAuthenticated = function () {
        return this.getToken().map(function (token) { return token && token.getValue(); });
    };
    /**
     * Returns tokens stream
     * @returns {Observable<any>}
     */
    NbAuthService.prototype.onTokenChange = function () {
        return this.tokenService.tokenChange();
    };
    /**
     * Returns authentication status stream
     *  // TODO: check exp date for JWT token
     * @returns {Observable<any>}
     */
    NbAuthService.prototype.onAuthenticationChange = function () {
        return this.onTokenChange().map(function (token) { return !!token; });
    };
    /**
     * Authenticates with the selected provider
     * Stores received token in the token storage
     *
     * Example:
     * authenticate('email', {email: 'email@example.com', password: 'test'})
     *
     * @param provider
     * @param data
     * @returns {Observable<NbAuthResult>}
     */
    NbAuthService.prototype.authenticate = function (provider, data) {
        var _this = this;
        return this.getProvider(provider).authenticate(data)
            .switchMap(function (result) {
            if (result.isSuccess() && result.getTokenValue()) {
                return _this.tokenService.set(result.getTokenValue())
                    .switchMap(function (_) { return _this.tokenService.get(); })
                    .map(function (token) {
                    result.replaceToken(token);
                    return result;
                });
            }
            return Observable.of(result);
        });
    };
    /**
     * Registers with the selected provider
     * Stores received token in the token storage
     *
     * Example:
     * register('email', {email: 'email@example.com', name: 'Some Name', password: 'test'})
     *
     * @param provider
     * @param data
     * @returns {Observable<NbAuthResult>}
     */
    NbAuthService.prototype.register = function (provider, data) {
        var _this = this;
        return this.getProvider(provider).register(data)
            .switchMap(function (result) {
            if (result.isSuccess() && result.getTokenValue()) {
                return _this.tokenService.set(result.getTokenValue())
                    .switchMap(function (_) { return _this.tokenService.get(); })
                    .map(function (token) {
                    result.replaceToken(token);
                    return result;
                });
            }
            return Observable.of(result);
        });
    };
    /**
     * Sign outs with the selected provider
     * Removes token from the token storage
     *
     * Example:
     * logout('email')
     *
     * @param provider
     * @returns {Observable<NbAuthResult>}
     */
    NbAuthService.prototype.logout = function (provider) {
        var _this = this;
        return this.getProvider(provider).logout()
            .do(function (result) {
            if (result.isSuccess()) {
                _this.tokenService.clear().subscribe(function () { });
            }
        });
    };
    /**
     * Sends forgot password request to the selected provider
     *
     * Example:
     * requestPassword('email', {email: 'email@example.com'})
     *
     * @param provider
     * @param data
     * @returns {Observable<NbAuthResult>}
     */
    NbAuthService.prototype.requestPassword = function (provider, data) {
        return this.getProvider(provider).requestPassword(data);
    };
    /**
     * Tries to reset password with the selected provider
     *
     * Example:
     * resetPassword('email', {newPassword: 'test'})
     *
     * @param provider
     * @param data
     * @returns {Observable<NbAuthResult>}
     */
    NbAuthService.prototype.resetPassword = function (provider, data) {
        return this.getProvider(provider).resetPassword(data);
    };
    NbAuthService.prototype.getProvider = function (provider) {
        if (!this.providers[provider]) {
            throw new TypeError("Nb auth provider '" + provider + "' is not registered");
        }
        return this.injector.get(this.providers[provider].service);
    };
    return NbAuthService;
}());
NbAuthService = __decorate([
    Injectable(),
    __param(2, Optional()), __param(2, Inject(NB_AUTH_PROVIDERS_TOKEN)),
    __metadata("design:paramtypes", [NbTokenService,
        Injector, Object])
], NbAuthService);
export { NbAuthService };
//# sourceMappingURL=auth.service.js.map