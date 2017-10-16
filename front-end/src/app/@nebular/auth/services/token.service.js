var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { NB_AUTH_OPTIONS_TOKEN, NB_AUTH_TOKEN_WRAPPER_TOKEN } from '../auth.options';
import { deepExtend, getDeepFromObject, urlBase64Decode } from '../helpers';
var NbAuthSimpleToken = (function () {
    function NbAuthSimpleToken() {
        this.token = '';
    }
    NbAuthSimpleToken.prototype.setValue = function (token) {
        this.token = token;
    };
    NbAuthSimpleToken.prototype.getValue = function () {
        return this.token;
    };
    return NbAuthSimpleToken;
}());
NbAuthSimpleToken = __decorate([
    Injectable()
], NbAuthSimpleToken);
export { NbAuthSimpleToken };
var NbAuthJWTToken = (function (_super) {
    __extends(NbAuthJWTToken, _super);
    function NbAuthJWTToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbAuthJWTToken.prototype.getPayload = function () {
        var parts = this.token.split('.');
        if (parts.length !== 3) {
            throw new Error("The token " + this.token + " is not valid JWT token and must consist of three parts.");
        }
        var decoded = urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error("The token " + this.token + " is not valid JWT token and cannot be decoded.");
        }
        return JSON.parse(decoded);
    };
    NbAuthJWTToken.prototype.getTokenExpDate = function () {
        var decoded = this.getPayload();
        if (!decoded.hasOwnProperty('exp')) {
            return null;
        }
        var date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    };
    return NbAuthJWTToken;
}(NbAuthSimpleToken));
NbAuthJWTToken = __decorate([
    Injectable()
], NbAuthJWTToken);
export { NbAuthJWTToken };
var NbTokenService = (function () {
    function NbTokenService(options, tokenWrapper) {
        var _this = this;
        this.options = options;
        this.tokenWrapper = tokenWrapper;
        this.defaultConfig = {
            token: {
                key: 'auth_app_token',
                getter: function () {
                    var tokenValue = localStorage.getItem(_this.getConfigValue('token.key'));
                    _this.tokenWrapper.setValue(tokenValue);
                    return Observable.of(_this.tokenWrapper);
                },
                setter: function (token) {
                    var raw = token instanceof NbAuthSimpleToken ? token.getValue() : token;
                    localStorage.setItem(_this.getConfigValue('token.key'), raw);
                    return Observable.of(null);
                },
                deleter: function () {
                    localStorage.removeItem(_this.getConfigValue('token.key'));
                    return Observable.of(null);
                },
            },
        };
        this.config = {};
        this.token$ = new BehaviorSubject(null);
        this.setConfig(options);
        this.get().subscribe(function (token) { return _this.publishToken(token); });
    }
    NbTokenService.prototype.setConfig = function (config) {
        this.config = deepExtend({}, this.defaultConfig, config);
    };
    NbTokenService.prototype.getConfigValue = function (key) {
        return getDeepFromObject(this.config, key, null);
    };
    NbTokenService.prototype.set = function (rawToken) {
        var _this = this;
        return this.getConfigValue('token.setter')(rawToken)
            .switchMap(function (_) { return _this.get(); })
            .do(function (token) {
            _this.publishToken(token);
        });
    };
    NbTokenService.prototype.get = function () {
        return this.getConfigValue('token.getter')();
    };
    NbTokenService.prototype.tokenChange = function () {
        return this.token$.publish().refCount();
    };
    NbTokenService.prototype.clear = function () {
        this.publishToken(null);
        return this.getConfigValue('token.deleter')();
    };
    NbTokenService.prototype.publishToken = function (token) {
        this.token$.next(token);
    };
    return NbTokenService;
}());
NbTokenService = __decorate([
    Injectable(),
    __param(0, Inject(NB_AUTH_OPTIONS_TOKEN)),
    __param(1, Inject(NB_AUTH_TOKEN_WRAPPER_TOKEN)),
    __metadata("design:paramtypes", [Object, NbAuthSimpleToken])
], NbTokenService);
export { NbTokenService };
//# sourceMappingURL=token.service.js.map