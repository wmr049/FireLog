(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/router'), require('@angular/forms'), require('@angular/common/http'), require('app/@nebular/theme'), require('rxjs/Observable'), require('rxjs/add/operator/switchMap'), require('rxjs/add/operator/map'), require('rxjs/add/operator/do'), require('rxjs/BehaviorSubject'), require('rxjs/add/observable/of'), require('rxjs/add/operator/catch')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', '@angular/router', '@angular/forms', '@angular/common/http', 'app/@nebular/theme', 'rxjs/Observable', 'rxjs/add/operator/switchMap', 'rxjs/add/operator/map', 'rxjs/add/operator/do', 'rxjs/BehaviorSubject', 'rxjs/add/observable/of', 'rxjs/add/operator/catch'], factory) :
	(factory((global.nb = global.nb || {}, global.nb.auth = global.nb.auth || {}),global.ng.core,global.ng.common,global.ng.router,global.ng.forms,global.ng.common.http,global.nb.theme,global.Rx,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx));
}(this, (function (exports,_angular_core,_angular_common,_angular_router,_angular_forms,_angular_common_http,_nebular_theme,rxjs_Observable,rxjs_add_operator_switchMap,rxjs_add_operator_map,rxjs_add_operator_do,rxjs_BehaviorSubject) { 'use strict';

var defaultSettings = {
    forms: {
        login: {
            redirectDelay: 500,
            provider: 'email',
            rememberMe: true,
            showMessages: {
                success: true,
                error: true,
            },
        },
        register: {
            redirectDelay: 500,
            provider: 'email',
            showMessages: {
                success: true,
                error: true,
            },
            terms: true,
        },
        requestPassword: {
            redirectDelay: 500,
            provider: 'email',
            showMessages: {
                success: true,
                error: true,
            },
        },
        resetPassword: {
            redirectDelay: 500,
            provider: 'email',
            showMessages: {
                success: true,
                error: true,
            },
        },
        logout: {
            redirectDelay: 500,
            provider: 'email',
        },
        validation: {
            password: {
                required: true,
                minLength: 4,
                maxLength: 50,
            },
            email: {
                required: true,
            },
            fullName: {
                required: false,
                minLength: 4,
                maxLength: 50,
            },
        },
    },
};
var NB_AUTH_OPTIONS_TOKEN = new _angular_core.InjectionToken('Nebular Auth Options');
var NB_AUTH_USER_OPTIONS_TOKEN = new _angular_core.InjectionToken('Nebular User Auth Options');
var NB_AUTH_PROVIDERS_TOKEN = new _angular_core.InjectionToken('Nebular Auth Providers');
var NB_AUTH_TOKEN_WRAPPER_TOKEN = new _angular_core.InjectionToken('Nebular Auth Token');
var NB_AUTH_INTERCEPTOR_HEADER = new _angular_core.InjectionToken('Nebular Simple Interceptor Header');

/**
 * Extending object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   deepExtend({}, yourObj_1, [yourObj_N]);
 */
/**
 * Extending object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   deepExtend({}, yourObj_1, [yourObj_N]);
 */ var deepExtend = function () {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    if (arguments.length < 1 || typeof arguments[0] !== 'object') {
        return false;
    }
    if (arguments.length < 2) {
        return arguments[0];
    }
    var target = arguments[0];
    // convert arguments to array and cut off target object
    var args = Array.prototype.slice.call(arguments, 1);
    var val, src;
    args.forEach(function (obj) {
        // skip argument if it is array or isn't object
        if (typeof obj !== 'object' || Array.isArray(obj)) {
            return;
        }
        Object.keys(obj).forEach(function (key) {
            src = target[key]; // source value
            val = obj[key]; // new value
            // recursion prevention
            if (val === target) {
                return;
                /**
                 * if new value isn't object then just overwrite by new value
                 * instead of extending.
                 */
            }
            else if (typeof val !== 'object' || val === null) {
                target[key] = val;
                return;
                // just clone arrays (and recursive clone objects inside)
            }
            else if (Array.isArray(val)) {
                target[key] = deepCloneArray(val);
                return;
                // custom cloning and overwrite for specific objects
            }
            else if (isSpecificValue(val)) {
                target[key] = cloneSpecificValue(val);
                return;
                // overwrite by new value if source isn't object or array
            }
            else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
                target[key] = deepExtend({}, val);
                return;
                // source value and new value is objects both, extending...
            }
            else {
                target[key] = deepExtend(src, val);
                return;
            }
        });
    });
    return target;
};
function isSpecificValue(val) {
    return (val instanceof Date
        || val instanceof RegExp) ? true : false;
}
function cloneSpecificValue(val) {
    if (val instanceof Date) {
        return new Date(val.getTime());
    }
    else if (val instanceof RegExp) {
        return new RegExp(val);
    }
    else {
        throw new Error('cloneSpecificValue: Unexpected situation');
    }
}
/**
 * Recursive cloning array.
 */
function deepCloneArray(arr) {
    var clone = [];
    arr.forEach(function (item, index) {
        if (typeof item === 'object' && item !== null) {
            if (Array.isArray(item)) {
                clone[index] = deepCloneArray(item);
            }
            else if (isSpecificValue(item)) {
                clone[index] = cloneSpecificValue(item);
            }
            else {
                clone[index] = deepExtend({}, item);
            }
        }
        else {
            clone[index] = item;
        }
    });
    return clone;
}
// getDeepFromObject({result: {data: 1}}, 'result.data', 2); // returns 1
function getDeepFromObject(object, name, defaultValue) {
    if (object === void 0) { object = {}; }
    var keys = name.split('.');
    // clone the object
    var level = deepExtend({}, object || {});
    keys.forEach(function (k) {
        if (level && typeof level[k] !== 'undefined') {
            level = level[k];
        }
        else {
            level = undefined;
        }
    });
    return typeof level === 'undefined' ? defaultValue : level;
}
function urlBase64Decode(str) {
    var output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
        case 0: {
            break;
        }
        case 2: {
            output += '==';
            break;
        }
        case 3: {
            output += '=';
            break;
        }
        default: {
            throw new Error('Illegal base64url string!');
        }
    }
    return b64DecodeUnicode(output);
}
function b64decode(str) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var output = '';
    str = String(str).replace(/=+$/, '');
    if (str.length % 4 === 1) {
        throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (
    // initialize result and counters
    var bc = 0, bs = void 0, buffer = void 0, idx = 0; 
    // get next character
    buffer = str.charAt(idx++); 
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
        // try to find character in table (0-63, not found => -1)
        buffer = chars.indexOf(buffer);
    }
    return output;
}
// https://developer.mozilla.org/en/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(b64decode(str), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

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
var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$1 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.NbAuthSimpleToken = (function () {
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
exports.NbAuthSimpleToken = __decorate$2([
    _angular_core.Injectable()
], exports.NbAuthSimpleToken);
exports.NbAuthJWTToken = (function (_super) {
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
}(exports.NbAuthSimpleToken));
exports.NbAuthJWTToken = __decorate$2([
    _angular_core.Injectable()
], exports.NbAuthJWTToken);
exports.NbTokenService = (function () {
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
                    return rxjs_Observable.Observable.of(_this.tokenWrapper);
                },
                setter: function (token) {
                    var raw = token instanceof exports.NbAuthSimpleToken ? token.getValue() : token;
                    localStorage.setItem(_this.getConfigValue('token.key'), raw);
                    return rxjs_Observable.Observable.of(null);
                },
                deleter: function () {
                    localStorage.removeItem(_this.getConfigValue('token.key'));
                    return rxjs_Observable.Observable.of(null);
                },
            },
        };
        this.config = {};
        this.token$ = new rxjs_BehaviorSubject.BehaviorSubject(null);
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
exports.NbTokenService = __decorate$2([
    _angular_core.Injectable(),
    __param$1(0, _angular_core.Inject(NB_AUTH_OPTIONS_TOKEN)),
    __param$1(1, _angular_core.Inject(NB_AUTH_TOKEN_WRAPPER_TOKEN)),
    __metadata$1("design:paramtypes", [Object, exports.NbAuthSimpleToken])
], exports.NbTokenService);

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
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
exports.NbAuthService = (function () {
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
            return rxjs_Observable.Observable.of(result);
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
            return rxjs_Observable.Observable.of(result);
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
exports.NbAuthService = __decorate$1([
    _angular_core.Injectable(),
    __param(2, _angular_core.Optional()), __param(2, _angular_core.Inject(NB_AUTH_PROVIDERS_TOKEN)),
    __metadata("design:paramtypes", [exports.NbTokenService,
        _angular_core.Injector, Object])
], exports.NbAuthService);

var NbAbstractAuthProvider = (function () {
    function NbAbstractAuthProvider() {
        this.defaultConfig = {};
        this.config = {};
    }
    NbAbstractAuthProvider.prototype.setConfig = function (config) {
        this.config = deepExtend({}, this.defaultConfig, config);
    };
    NbAbstractAuthProvider.prototype.getConfigValue = function (key) {
        return getDeepFromObject(this.config, key, null);
    };
    NbAbstractAuthProvider.prototype.createFailResponse = function (data) {
        return new _angular_common_http.HttpResponse({ body: {}, status: 401 });
    };
    NbAbstractAuthProvider.prototype.createSuccessResponse = function (data) {
        return new _angular_common_http.HttpResponse({ body: {}, status: 200 });
    };
    NbAbstractAuthProvider.prototype.getJsonSafe = function (res) {
        return res.body;
    };
    return NbAbstractAuthProvider;
}());

var __extends$1 = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$3 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.NbDummyAuthProvider = (function (_super) {
    __extends$1(NbDummyAuthProvider, _super);
    function NbDummyAuthProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultConfig = {
            delay: 1000,
        };
        return _this;
    }
    NbDummyAuthProvider.prototype.authenticate = function (data) {
        return rxjs_Observable.Observable.of(this.createDummyResult(data))
            .delay(this.getConfigValue('delay'));
    };
    NbDummyAuthProvider.prototype.register = function (data) {
        return rxjs_Observable.Observable.of(this.createDummyResult(data))
            .delay(this.getConfigValue('delay'));
    };
    NbDummyAuthProvider.prototype.requestPassword = function (data) {
        return rxjs_Observable.Observable.of(this.createDummyResult(data))
            .delay(this.getConfigValue('delay'));
    };
    NbDummyAuthProvider.prototype.resetPassword = function (data) {
        return rxjs_Observable.Observable.of(this.createDummyResult(data))
            .delay(this.getConfigValue('delay'));
    };
    NbDummyAuthProvider.prototype.logout = function (data) {
        return rxjs_Observable.Observable.of(this.createDummyResult(data))
            .delay(this.getConfigValue('delay'));
    };
    NbDummyAuthProvider.prototype.createDummyResult = function (data) {
        if (this.getConfigValue('alwaysFail')) {
            return new NbAuthResult(false, this.createFailResponse(data), null, ['Something went wrong.']);
        }
        return new NbAuthResult(true, this.createSuccessResponse(data), '/', ['Successfully logged in.']);
    };
    return NbDummyAuthProvider;
}(NbAbstractAuthProvider));
exports.NbDummyAuthProvider = __decorate$3([
    _angular_core.Injectable()
], exports.NbDummyAuthProvider);

var __extends$2 = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$4 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * The most common authentication provider.
 * The following options are available (with default values):
 *
 *
 *
 * @example
 *
 * Default settings object:
 * ```
 * {
 *  baseEndpoint: '',
 *  login: {
 *    alwaysFail: false,
 *    rememberMe: true,
 *    endpoint: '/api/auth/login',
 *    method: 'post',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    defaultErrors: ['Login/Email combination is not correct, please try again.'],
 *    defaultMessages: ['You have been successfully logged in.'],
 *  },
 *  register: {
 *    alwaysFail: false,
 *    rememberMe: true,
 *    endpoint: '/api/auth/register',
 *    method: 'post',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['You have been successfully registered.'],
 *  },
 *  logout: {
 *    alwaysFail: false,
 *    endpoint: '/api/auth/logout',
 *    method: 'delete',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['You have been successfully logged out.'],
 *  },
 *  requestPass: {
 *    endpoint: '/api/auth/request-pass',
 *    method: 'post',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['Reset password instructions have been sent to your email.'],
 *  },
 *  resetPass: {
 *    endpoint: '/api/auth/reset-pass',
 *    method: 'put',
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *    resetPasswordTokenKey: 'reset_password_token',
 *    defaultErrors: ['Something went wrong, please try again.'],
 *    defaultMessages: ['Your password has been successfully changed.'],
 *  },
 *  token: {
 *    key: 'data.token',
 *    getter: (module: string, res: HttpResponse<Object>) => getDeepFromObject(res.body,
 *      this.getConfigValue('token.key')),
 *  },
 *  errors: {
 *    key: 'data.errors',
 *    getter: (module: string, res: HttpErrorResponse) => getDeepFromObject(res.error,
 *      this.getConfigValue('errors.key'),
 *      this.getConfigValue(`${module}.defaultErrors`)),
 *  },
 *  messages: {
 *    key: 'data.messages',
 *    getter: (module: string, res: HttpResponse<Object>) => getDeepFromObject(res.body,
 *      this.getConfigValue('messages.key'),
 *      this.getConfigValue(`${module}.defaultMessages`)),
 *  },
 *}
 * ```
 */
exports.NbEmailPassAuthProvider = (function (_super) {
    __extends$2(NbEmailPassAuthProvider, _super);
    function NbEmailPassAuthProvider(http, route) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.route = route;
        _this.defaultConfig = {
            baseEndpoint: '',
            login: {
                alwaysFail: false,
                rememberMe: true,
                endpoint: '/api/auth/login',
                method: 'post',
                redirect: {
                    success: '/',
                    failure: null,
                },
                defaultErrors: ['Login/Email combination is not correct, please try again.'],
                defaultMessages: ['You have been successfully logged in.'],
            },
            register: {
                alwaysFail: false,
                rememberMe: true,
                endpoint: '/api/auth/register',
                method: 'post',
                redirect: {
                    success: '/',
                    failure: null,
                },
                defaultErrors: ['Something went wrong, please try again.'],
                defaultMessages: ['You have been successfully registered.'],
            },
            logout: {
                alwaysFail: false,
                endpoint: '/api/auth/logout',
                method: 'delete',
                redirect: {
                    success: '/',
                    failure: null,
                },
                defaultErrors: ['Something went wrong, please try again.'],
                defaultMessages: ['You have been successfully logged out.'],
            },
            requestPass: {
                endpoint: '/api/auth/request-pass',
                method: 'post',
                redirect: {
                    success: '/',
                    failure: null,
                },
                defaultErrors: ['Something went wrong, please try again.'],
                defaultMessages: ['Reset password instructions have been sent to your email.'],
            },
            resetPass: {
                endpoint: '/api/auth/reset-pass',
                method: 'put',
                redirect: {
                    success: '/',
                    failure: null,
                },
                resetPasswordTokenKey: 'reset_password_token',
                defaultErrors: ['Something went wrong, please try again.'],
                defaultMessages: ['Your password has been successfully changed.'],
            },
            token: {
                key: 'data.token',
                getter: function (module, res) { return getDeepFromObject(res.body, _this.getConfigValue('token.key')); },
            },
            errors: {
                key: 'data.errors',
                getter: function (module, res) { return getDeepFromObject(res.error, _this.getConfigValue('errors.key'), _this.getConfigValue(module + ".defaultErrors")); },
            },
            messages: {
                key: 'data.messages',
                getter: function (module, res) { return getDeepFromObject(res.body, _this.getConfigValue('messages.key'), _this.getConfigValue(module + ".defaultMessages")); },
            },
        };
        return _this;
    }
    NbEmailPassAuthProvider.prototype.authenticate = function (data) {
        var _this = this;
        var method = this.getConfigValue('login.method');
        var url = this.getActionEndpoint('login');
        return this.http.request(method, url, { body: data, observe: 'response' })
            .map(function (res) {
            if (_this.getConfigValue('login.alwaysFail')) {
                throw _this.createFailResponse(data);
            }
            return res;
        })
            .map(function (res) {
            return new NbAuthResult(true, res, _this.getConfigValue('login.redirect.success'), [], _this.getConfigValue('messages.getter')('login', res), _this.getConfigValue('token.getter')('login', res));
        })
            .catch(function (res) {
            var errors = [];
            if (res instanceof _angular_common_http.HttpErrorResponse) {
                errors = _this.getConfigValue('errors.getter')('login', res);
            }
            else {
                errors.push('Something went wrong.');
            }
            return rxjs_Observable.Observable.of(new NbAuthResult(false, res, _this.getConfigValue('login.redirect.failure'), errors));
        });
    };
    NbEmailPassAuthProvider.prototype.register = function (data) {
        var _this = this;
        var method = this.getConfigValue('register.method');
        var url = this.getActionEndpoint('register');
        return this.http.request(method, url, { body: data, observe: 'response' })
            .map(function (res) {
            if (_this.getConfigValue('register.alwaysFail')) {
                throw _this.createFailResponse(data);
            }
            return res;
        })
            .map(function (res) {
            return new NbAuthResult(true, res, _this.getConfigValue('register.redirect.success'), [], _this.getConfigValue('messages.getter')('register', res), _this.getConfigValue('token.getter')('register', res));
        })
            .catch(function (res) {
            var errors = [];
            if (res instanceof _angular_common_http.HttpErrorResponse) {
                errors = _this.getConfigValue('errors.getter')('register', res);
            }
            else {
                errors.push('Something went wrong.');
            }
            return rxjs_Observable.Observable.of(new NbAuthResult(false, res, _this.getConfigValue('register.redirect.failure'), errors));
        });
    };
    NbEmailPassAuthProvider.prototype.requestPassword = function (data) {
        var _this = this;
        var method = this.getConfigValue('requestPass.method');
        var url = this.getActionEndpoint('requestPass');
        return this.http.request(method, url, { body: data, observe: 'response' })
            .map(function (res) {
            if (_this.getConfigValue('requestPass.alwaysFail')) {
                throw _this.createFailResponse();
            }
            return res;
        })
            .map(function (res) {
            return new NbAuthResult(true, res, _this.getConfigValue('requestPass.redirect.success'), [], _this.getConfigValue('messages.getter')('requestPass', res));
        })
            .catch(function (res) {
            var errors = [];
            if (res instanceof _angular_common_http.HttpErrorResponse) {
                errors = _this.getConfigValue('errors.getter')('requestPass', res);
            }
            else {
                errors.push('Something went wrong.');
            }
            return rxjs_Observable.Observable.of(new NbAuthResult(false, res, _this.getConfigValue('requestPass.redirect.failure'), errors));
        });
    };
    NbEmailPassAuthProvider.prototype.resetPassword = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        var tokenKey = this.getConfigValue('resetPass.resetPasswordTokenKey');
        data[tokenKey] = this.route.snapshot.queryParams[tokenKey];
        var method = this.getConfigValue('resetPass.method');
        var url = this.getActionEndpoint('resetPass');
        return this.http.request(method, url, { body: data, observe: 'response' })
            .map(function (res) {
            if (_this.getConfigValue('resetPass.alwaysFail')) {
                throw _this.createFailResponse();
            }
            return res;
        })
            .map(function (res) {
            return new NbAuthResult(true, res, _this.getConfigValue('resetPass.redirect.success'), [], _this.getConfigValue('messages.getter')('resetPass', res));
        })
            .catch(function (res) {
            var errors = [];
            if (res instanceof _angular_common_http.HttpErrorResponse) {
                errors = _this.getConfigValue('errors.getter')('resetPass', res);
            }
            else {
                errors.push('Something went wrong.');
            }
            return rxjs_Observable.Observable.of(new NbAuthResult(false, res, _this.getConfigValue('resetPass.redirect.failure'), errors));
        });
    };
    NbEmailPassAuthProvider.prototype.logout = function () {
        var _this = this;
        var method = this.getConfigValue('logout.method');
        var url = this.getActionEndpoint('logout');
        return rxjs_Observable.Observable.of({})
            .switchMap(function (res) {
            if (!url) {
                return rxjs_Observable.Observable.of(res);
            }
            return _this.http.request(method, url, { observe: 'response' });
        })
            .map(function (res) {
            if (_this.getConfigValue('logout.alwaysFail')) {
                throw _this.createFailResponse();
            }
            return res;
        })
            .map(function (res) {
            return new NbAuthResult(true, res, _this.getConfigValue('logout.redirect.success'), [], _this.getConfigValue('messages.getter')('logout', res));
        })
            .catch(function (res) {
            var errors = [];
            if (res instanceof _angular_common_http.HttpErrorResponse) {
                errors = _this.getConfigValue('errors.getter')('logout', res);
            }
            else {
                errors.push('Something went wrong.');
            }
            return rxjs_Observable.Observable.of(new NbAuthResult(false, res, _this.getConfigValue('logout.redirect.failure'), errors));
        });
    };
    NbEmailPassAuthProvider.prototype.getActionEndpoint = function (action) {
        var actionEndpoint = this.getConfigValue(action + ".endpoint");
        var baseEndpoint = this.getConfigValue('baseEndpoint');
        return baseEndpoint + actionEndpoint;
    };
    return NbEmailPassAuthProvider;
}(NbAbstractAuthProvider));
exports.NbEmailPassAuthProvider = __decorate$4([
    _angular_core.Injectable(),
    __metadata$2("design:paramtypes", [_angular_common_http.HttpClient, _angular_router.ActivatedRoute])
], exports.NbEmailPassAuthProvider);

var __decorate$5 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$3 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
exports.NbAuthComponent = (function () {
    // showcase of how to use the onAuthenticationChange method
    function NbAuthComponent(auth) {
        var _this = this;
        this.auth = auth;
        this.authenticated = false;
        this.token = '';
        this.subscription = auth.onAuthenticationChange()
            .subscribe(function (authenticated) {
            _this.authenticated = authenticated;
        });
    }
    NbAuthComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return NbAuthComponent;
}());
exports.NbAuthComponent = __decorate$5([
    _angular_core.Component({
        selector: 'nb-auth',
        styles: [":host /deep/ nb-layout .layout .layout-container .content .columns nb-layout-column{padding:2.5rem}:host /deep/ nb-card{height:calc(100vh - 2 * 2.5rem)}:host /deep/ nb-card{margin:0}:host /deep/ nb-card-body{display:flex;align-items:center;justify-content:center}@media (max-width: 550px){:host /deep/ /deep/ nb-layout .layout .layout-container .content .columns nb-layout-column{padding:0}:host /deep/ nb-card{border-radius:0;height:100vh}} "],
        template: "\n    <nb-layout>\n      <nb-layout-column>\n        <nb-card>\n          <nb-card-body>\n            <div class=\"col-xl-4 col-lg-6 col-md-8 col-sm-12\">\n              <router-outlet></router-outlet>\n            </div>\n          </nb-card-body>\n        </nb-card>\n      </nb-layout-column>\n    </nb-layout>\n  ",
    }),
    __metadata$3("design:paramtypes", [exports.NbAuthService])
], exports.NbAuthComponent);

var __decorate$6 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.NbAuthBlockComponent = (function () {
    function NbAuthBlockComponent() {
    }
    return NbAuthBlockComponent;
}());
exports.NbAuthBlockComponent = __decorate$6([
    _angular_core.Component({
        selector: 'nb-auth-block',
        styles: ["@media (max-width: 550px){:host /deep/ .accept-group{font-size:12px;padding:0}}:host /deep/ form{width:100%}:host /deep/ .alert{text-align:center}:host /deep/ .title{margin-bottom:0.75rem;text-align:center}:host /deep/ .sub-title{margin-bottom:2rem;text-align:center}:host /deep/ .checkbox{display:flex;justify-content:space-between;margin-bottom:10px;font-weight:normal}:host /deep/ .form-group.accept-group{display:flex;justify-content:space-between;margin:2rem 0}:host /deep/ .form-group.accept-group .forgot-password{line-height:2}:host /deep/ .links{text-align:center;margin-top:1.75rem}:host /deep/ .links .socials{margin:1.5rem 0 2.5rem}:host /deep/ .links .socials a{font-size:2rem;margin:0 1rem;text-decoration:none} "],
        template: "\n    <ng-content></ng-content>\n  ",
    })
], exports.NbAuthBlockComponent);

var __decorate$7 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$4 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$2 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
exports.NbLoginComponent = (function () {
    function NbLoginComponent(service, config, router) {
        if (config === void 0) { config = {}; }
        this.service = service;
        this.config = config;
        this.router = router;
        this.redirectDelay = 0;
        this.showMessages = {};
        this.provider = '';
        this.errors = [];
        this.messages = [];
        this.user = {};
        this.submitted = false;
        this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
        this.showMessages = this.getConfigValue('forms.login.showMessages');
        this.provider = this.getConfigValue('forms.login.provider');
    }
    NbLoginComponent.prototype.login = function () {
        var _this = this;
        this.errors = this.messages = [];
        this.submitted = true;
        this.service.authenticate(this.provider, this.user).subscribe(function (result) {
            _this.submitted = false;
            if (result.isSuccess()) {
                _this.messages = result.getMessages();
            }
            else {
                _this.errors = result.getErrors();
            }
            var redirect = result.getRedirect();
            if (redirect) {
                setTimeout(function () {
                    return _this.router.navigateByUrl(redirect);
                }, _this.redirectDelay);
            }
        });
    };
    NbLoginComponent.prototype.getConfigValue = function (key) {
        return getDeepFromObject(this.config, key, null);
    };
    return NbLoginComponent;
}());
exports.NbLoginComponent = __decorate$7([
    _angular_core.Component({
        selector: 'nb-login',
        template: "\n    <nb-auth-block>\n      <h2 class=\"title\">Sign In</h2>\n      <small class=\"form-text sub-title\">Hello! Sign in with your username or email</small>\n\n      <form (ngSubmit)=\"login()\" #form=\"ngForm\" autocomplete=\"nope\">\n\n        <div *ngIf=\"showMessages.error && errors && errors.length > 0 && !submitted\"\n             class=\"alert alert-danger\" role=\"alert\">\n          <div><strong>Oh snap!</strong></div>\n          <div *ngFor=\"let error of errors\">{{ error }}</div>\n        </div>\n\n        <div *ngIf=\"showMessages.success && messages && messages.length > 0 && !submitted\"\n             class=\"alert alert-success\" role=\"alert\">\n          <div><strong>Hooray!</strong></div>\n          <div *ngFor=\"let message of messages\">{{ message }}</div>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-email\" class=\"sr-only\">Email address</label>\n          <input name=\"email\" [(ngModel)]=\"user.email\" id=\"input-email\" pattern=\".+\\@.+\\..+\"\n                 class=\"form-control\" placeholder=\"Email address\" #email=\"ngModel\"\n                 [class.form-control-danger]=\"email.invalid && email.touched\" autofocus\n                 [required]=\"getConfigValue('forms.validation.email.required')\">\n          <small class=\"form-text error\" *ngIf=\"email.invalid && email.touched && email.errors?.required\">\n            Email is required!\n          </small>\n          <small class=\"form-text error\"\n                 *ngIf=\"email.invalid && email.touched && email.errors?.pattern\">\n            Email should be the real one!\n          </small>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-password\" class=\"sr-only\">Password</label>\n          <input name=\"password\" [(ngModel)]=\"user.password\" type=\"password\" id=\"input-password\"\n                 class=\"form-control\" placeholder=\"Password\" #password=\"ngModel\"\n                 [class.form-control-danger]=\"password.invalid && password.touched\"\n                 [required]=\"getConfigValue('forms.validation.password.required')\"\n                 [minlength]=\"getConfigValue('forms.validation.password.minLength')\"\n                 [maxlength]=\"getConfigValue('forms.validation.password.maxLength')\">\n          <small class=\"form-text error\" *ngIf=\"password.invalid && password.touched && password.errors?.required\">\n            Password is required!\n          </small>\n          <small\n            class=\"form-text error\"\n            *ngIf=\"password.invalid && password.touched && (password.errors?.minlength || password.errors?.maxlength)\">\n            Password should contains\n            from {{ getConfigValue('forms.validation.password.minLength') }}\n            to {{ getConfigValue('forms.validation.password.maxLength') }}\n            characters\n          </small>\n        </div>\n\n        <div class=\"form-group accept-group col-sm-12\">\n          <nb-checkbox name=\"rememberMe\" [(ngModel)]=\"user.rememberMe\">Remember me</nb-checkbox>\n          <a class=\"forgot-password\" routerLink=\"../request-password\">Forgot Password?</a>\n        </div>\n\n        <button [disabled]=\"submitted || !form.valid\" class=\"btn btn-block btn-hero-success\"\n                [class.btn-pulse]=\"submitted\">\n          Sign In\n        </button>\n      </form>\n\n      <div class=\"links\">\n        <small class=\"form-text\">Or connect with:</small>\n\n        <div class=\"socials\">\n          <a href=\"https://github.com/akveo\" target=\"_blank\" class=\"socicon-github\"></a>\n          <a href=\"https://www.facebook.com/akveo/\" target=\"_blank\" class=\"socicon-facebook\"></a>\n          <a href=\"https://twitter.com/akveo_inc\" target=\"_blank\" class=\"socicon-twitter\"></a>\n        </div>\n\n        <small class=\"form-text\">\n          Don't have an account? <a routerLink=\"../register\"><strong>Sign Up</strong></a>\n        </small>\n      </div>\n    </nb-auth-block>\n  ",
    }),
    __param$2(1, _angular_core.Inject(NB_AUTH_OPTIONS_TOKEN)),
    __metadata$4("design:paramtypes", [exports.NbAuthService, Object, _angular_router.Router])
], exports.NbLoginComponent);

var __decorate$8 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$5 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$3 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
exports.NbRegisterComponent = (function () {
    function NbRegisterComponent(service, config, router) {
        if (config === void 0) { config = {}; }
        this.service = service;
        this.config = config;
        this.router = router;
        this.redirectDelay = 0;
        this.showMessages = {};
        this.provider = '';
        this.submitted = false;
        this.errors = [];
        this.messages = [];
        this.user = {};
        this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
        this.showMessages = this.getConfigValue('forms.register.showMessages');
        this.provider = this.getConfigValue('forms.register.provider');
    }
    NbRegisterComponent.prototype.register = function () {
        var _this = this;
        this.errors = this.messages = [];
        this.submitted = true;
        this.service.register(this.provider, this.user).subscribe(function (result) {
            _this.submitted = false;
            if (result.isSuccess()) {
                _this.messages = result.getMessages();
            }
            else {
                _this.errors = result.getErrors();
            }
            var redirect = result.getRedirect();
            if (redirect) {
                setTimeout(function () {
                    return _this.router.navigateByUrl(redirect);
                }, _this.redirectDelay);
            }
        });
    };
    NbRegisterComponent.prototype.getConfigValue = function (key) {
        return getDeepFromObject(this.config, key, null);
    };
    return NbRegisterComponent;
}());
exports.NbRegisterComponent = __decorate$8([
    _angular_core.Component({
        selector: 'nb-register',
        styles: [":host .title{margin-bottom:2rem} "],
        template: "\n    <nb-auth-block>\n      <h2 class=\"title\">Sign Up</h2>\n      <form (ngSubmit)=\"register()\" #form=\"ngForm\">\n\n        <div *ngIf=\"showMessages.error && errors && errors.length > 0 && !submitted\"\n             class=\"alert alert-danger\" role=\"alert\">\n          <div><strong>Oh snap!</strong></div>\n          <div *ngFor=\"let error of errors\">{{ error }}</div>\n        </div>\n        <div *ngIf=\"showMessages.success && messages && messages.length > 0 && !submitted\"\n             class=\"alert alert-success\" role=\"alert\">\n          <div><strong>Hooray!</strong></div>\n          <div *ngFor=\"let message of messages\">{{ message }}</div>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-name\" class=\"sr-only\">Full name</label>\n          <input name=\"fullName\" [(ngModel)]=\"user.fullName\" id=\"input-name\" #fullName=\"ngModel\"\n                 class=\"form-control\" placeholder=\"Full name\"\n                 [class.form-control-danger]=\"fullName.invalid && fullName.touched\"\n                 [required]=\"getConfigValue('forms.validation.fullName.required')\"\n                 [minlength]=\"getConfigValue('forms.validation.fullName.minLength')\"\n                 [maxlength]=\"getConfigValue('forms.validation.fullName.maxLength')\"\n                 autofocus>\n          <small class=\"form-text error\" *ngIf=\"fullName.invalid && fullName.touched && fullName.errors?.required\">\n            Full name is required!\n          </small>\n          <small\n            class=\"form-text error\"\n            *ngIf=\"fullName.invalid && fullName.touched && (fullName.errors?.minlength || fullName.errors?.maxlength)\">\n            Full name should contains\n            from {{getConfigValue('forms.validation.password.minLength')}}\n            to {{getConfigValue('forms.validation.password.maxLength')}}\n            characters\n          </small>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-email\" class=\"sr-only\">Email address</label>\n          <input name=\"email\" [(ngModel)]=\"user.email\" id=\"input-email\" #email=\"ngModel\"\n                 class=\"form-control\" placeholder=\"Email address\" pattern=\".+\\@.+\\..+\"\n                 [class.form-control-danger]=\"email.invalid && email.touched\"\n                 [required]=\"getConfigValue('forms.validation.email.required')\">\n          <small class=\"form-text error\" *ngIf=\"email.invalid && email.touched && email.errors?.required\">\n            Email is required!\n          </small>\n          <small class=\"form-text error\"\n                 *ngIf=\"email.invalid && email.touched && email.errors?.pattern\">\n            Email should be the real one!\n          </small>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-password\" class=\"sr-only\">Password</label>\n          <input name=\"password\" [(ngModel)]=\"user.password\" type=\"password\" id=\"input-password\"\n                 class=\"form-control\" placeholder=\"Password\" #password=\"ngModel\"\n                 [class.form-control-danger]=\"password.invalid && password.touched\"\n                 [required]=\"getConfigValue('forms.validation.password.required')\"\n                 [minlength]=\"getConfigValue('forms.validation.password.minLength')\"\n                 [maxlength]=\"getConfigValue('forms.validation.password.maxLength')\">\n          <small class=\"form-text error\" *ngIf=\"password.invalid && password.touched && password.errors?.required\">\n            Password is required!\n          </small>\n          <small\n            class=\"form-text error\"\n            *ngIf=\"password.invalid && password.touched && (password.errors?.minlength || password.errors?.maxlength)\">\n            Password should contains\n            from {{ getConfigValue('forms.validation.password.minLength') }}\n            to {{ getConfigValue('forms.validation.password.maxLength') }}\n            characters\n          </small>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-re-password\" class=\"sr-only\">Repeat password</label>\n          <input\n            name=\"rePass\" [(ngModel)]=\"user.confirmPassword\" type=\"password\" id=\"input-re-password\"\n            class=\"form-control\" placeholder=\"Confirm Password\" #rePass=\"ngModel\"\n            [class.form-control-danger]=\"(rePass.invalid || password.value != rePass.value) && rePass.touched\"\n            [required]=\"getConfigValue('forms.validation.password.required')\">\n          <small class=\"form-text error\"\n                 *ngIf=\"rePass.invalid && rePass.touched && rePass.errors?.required\">\n            Password confirmation is required!\n          </small>\n          <small\n            class=\"form-text error\"\n            *ngIf=\"rePass.touched && password.value != rePass.value && !rePass.errors?.required\">\n            Password does not match the confirm password.\n          </small>\n        </div>\n\n        <div class=\"form-group accept-group col-sm-12\" *ngIf=\"getConfigValue('forms.register.terms')\">\n          <nb-checkbox name=\"terms\" [(ngModel)]=\"user.terms\" [required]=\"getConfigValue('forms.register.terms')\">\n            Agree to <a href=\"#\" target=\"_blank\"><strong>Terms & Conditions</strong></a>\n          </nb-checkbox>\n        </div>\n\n        <button [disabled]=\"submitted || !form.valid\" class=\"btn btn-block btn-hero-success\"\n                [class.btn-pulse]=\"submitted\">\n          Register\n        </button>\n      </form>\n\n      <div class=\"links\">\n        <small class=\"form-text\">\n          Already have an account? <a routerLink=\"../login\"><strong>Sign in</strong></a>\n        </small>\n      </div>\n    </nb-auth-block>\n  ",
    }),
    __param$3(1, _angular_core.Inject(NB_AUTH_OPTIONS_TOKEN)),
    __metadata$5("design:paramtypes", [exports.NbAuthService, Object, _angular_router.Router])
], exports.NbRegisterComponent);

var __decorate$9 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$6 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
exports.NbLogoutComponent = (function () {
    function NbLogoutComponent(service, router) {
        this.service = service;
        this.router = router;
        this.redirectDelay = 1500;
    }
    NbLogoutComponent.prototype.ngOnInit = function () {
        this.logout('email');
    };
    NbLogoutComponent.prototype.logout = function (provider) {
        var _this = this;
        this.service.logout(provider).subscribe(function (result) {
            var redirect = result.getRedirect();
            if (redirect) {
                setTimeout(function () {
                    return _this.router.navigateByUrl(redirect);
                }, _this.redirectDelay);
            }
        });
    };
    return NbLogoutComponent;
}());
exports.NbLogoutComponent = __decorate$9([
    _angular_core.Component({
        selector: 'nb-logout',
        template: "\n    <div>Saindo, por favor espere...</div>\n  ",
    }),
    __metadata$6("design:paramtypes", [exports.NbAuthService,
        _angular_router.Router])
], exports.NbLogoutComponent);

var __decorate$10 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$7 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$4 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
exports.NbRequestPasswordComponent = (function () {
    function NbRequestPasswordComponent(service, config, router) {
        if (config === void 0) { config = {}; }
        this.service = service;
        this.config = config;
        this.router = router;
        this.redirectDelay = 0;
        this.showMessages = {};
        this.provider = '';
        this.submitted = false;
        this.errors = [];
        this.messages = [];
        this.user = {};
        this.redirectDelay = this.getConfigValue('forms.requestPassword.redirectDelay');
        this.showMessages = this.getConfigValue('forms.requestPassword.showMessages');
        this.provider = this.getConfigValue('forms.requestPassword.provider');
    }
    NbRequestPasswordComponent.prototype.requestPass = function () {
        var _this = this;
        this.errors = this.messages = [];
        this.submitted = true;
        this.service.requestPassword(this.provider, this.user).subscribe(function (result) {
            _this.submitted = false;
            if (result.isSuccess()) {
                _this.messages = result.getMessages();
            }
            else {
                _this.errors = result.getErrors();
            }
            var redirect = result.getRedirect();
            if (redirect) {
                setTimeout(function () {
                    return _this.router.navigateByUrl(redirect);
                }, _this.redirectDelay);
            }
        });
    };
    NbRequestPasswordComponent.prototype.getConfigValue = function (key) {
        return getDeepFromObject(this.config, key, null);
    };
    return NbRequestPasswordComponent;
}());
exports.NbRequestPasswordComponent = __decorate$10([
    _angular_core.Component({
        selector: 'nb-request-password-page',
        styles: [":host .links{display:flex;justify-content:space-between}:host .form-group:last-of-type{margin-bottom:3rem} "],
        template: "\n    <nb-auth-block>\n      <h2 class=\"title\">Forgot Password</h2>\n      <small class=\"form-text sub-title\">Enter your email adress and we\u2019ll send a like to reset your password</small>\n      <form (ngSubmit)=\"requestPass()\" #requestPassForm=\"ngForm\">\n\n        <div *ngIf=\"showMessages.error && errors && errors.length > 0 && !submitted\"\n             class=\"alert alert-danger\" role=\"alert\">\n          <div><strong>Oh snap!</strong></div>\n          <div *ngFor=\"let error of errors\">{{ error }}</div>\n        </div>\n        <div *ngIf=\"showMessages.success && messages && messages.length > 0 && !submitted\"\n             class=\"alert alert-success\" role=\"alert\">\n          <div><strong>Hooray!</strong></div>\n          <div *ngFor=\"let message of messages\">{{ message }}</div>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-email\" class=\"sr-only\">Enter your email address</label>\n          <input name=\"email\" [(ngModel)]=\"user.email\" id=\"input-email\" #email=\"ngModel\"\n                 class=\"form-control\" placeholder=\"Email address\" pattern=\".+\\@.+\\..+\"\n                 [class.form-control-danger]=\"email.invalid && email.touched\"\n                 [required]=\"getConfigValue('forms.validation.email.required')\"\n                 autofocus>\n          <small class=\"form-text error\" *ngIf=\"email.invalid && email.touched && email.errors?.required\">\n            Email is required!\n          </small>\n          <small class=\"form-text error\"\n                 *ngIf=\"email.invalid && email.touched && email.errors?.pattern\">\n            Email should be the real one!\n          </small>\n        </div>\n\n        <button [disabled]=\"submitted || !requestPassForm.form.valid\" class=\"btn btn-hero-success btn-block\"\n                [class.btn-pulse]=\"submitted\">\n          Request password\n        </button>\n      </form>\n\n      <div class=\"links col-sm-12\">\n        <small class=\"form-text\">\n          Already have an account? <a routerLink=\"../login\"><strong>Sign In</strong></a>\n        </small>\n        <small class=\"form-text\">\n          <a routerLink=\"../register\"><strong>Sign Up</strong></a>\n        </small>\n      </div>\n    </nb-auth-block>\n  ",
    }),
    __param$4(1, _angular_core.Inject(NB_AUTH_OPTIONS_TOKEN)),
    __metadata$7("design:paramtypes", [exports.NbAuthService, Object, _angular_router.Router])
], exports.NbRequestPasswordComponent);

var __decorate$11 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$8 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$5 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
exports.NbResetPasswordComponent = (function () {
    function NbResetPasswordComponent(service, config, router) {
        if (config === void 0) { config = {}; }
        this.service = service;
        this.config = config;
        this.router = router;
        this.redirectDelay = 0;
        this.showMessages = {};
        this.provider = '';
        this.submitted = false;
        this.errors = [];
        this.messages = [];
        this.user = {};
        this.redirectDelay = this.getConfigValue('forms.resetPassword.redirectDelay');
        this.showMessages = this.getConfigValue('forms.resetPassword.showMessages');
        this.provider = this.getConfigValue('forms.resetPassword.provider');
    }
    NbResetPasswordComponent.prototype.resetPass = function () {
        var _this = this;
        this.errors = this.messages = [];
        this.submitted = true;
        this.service.resetPassword(this.provider, this.user).subscribe(function (result) {
            _this.submitted = false;
            if (result.isSuccess()) {
                _this.messages = result.getMessages();
            }
            else {
                _this.errors = result.getErrors();
            }
            var redirect = result.getRedirect();
            if (redirect) {
                setTimeout(function () {
                    return _this.router.navigateByUrl(redirect);
                }, _this.redirectDelay);
            }
        });
    };
    NbResetPasswordComponent.prototype.getConfigValue = function (key) {
        return getDeepFromObject(this.config, key, null);
    };
    return NbResetPasswordComponent;
}());
exports.NbResetPasswordComponent = __decorate$11([
    _angular_core.Component({
        selector: 'nb-reset-password-page',
        styles: [":host .links{display:flex;justify-content:space-between}:host .form-group:last-of-type{margin-bottom:3rem} "],
        template: "\n    <nb-auth-block>\n      <h2 class=\"title\">Change password</h2>\n      <small class=\"form-text sub-title\">Please enter a new password</small>\n      <form (ngSubmit)=\"resetPass()\" #resetPassForm=\"ngForm\">\n\n        <div *ngIf=\"errors && errors.length > 0 && !submitted\" class=\"alert alert-danger\" role=\"alert\">\n          <div><strong>Oh snap!</strong></div>\n          <div *ngFor=\"let error of errors\">{{ error }}</div>\n        </div>\n        <div *ngIf=\"messages && messages.length > 0 && !submitted\" class=\"alert alert-success\" role=\"alert\">\n          <div><strong>Hooray!</strong></div>\n          <div *ngFor=\"let message of messages\">{{ message }}</div>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-password\" class=\"sr-only\">New Password</label>\n          <input name=\"password\" [(ngModel)]=\"user.password\" type=\"password\" id=\"input-password\"\n                 class=\"form-control form-control-lg first\" placeholder=\"New Password\" #password=\"ngModel\"\n                 [class.form-control-danger]=\"password.invalid && password.touched\"\n                 [required]=\"getConfigValue('forms.validation.password.required')\"\n                 [minlength]=\"getConfigValue('forms.validation.password.minLength')\"\n                 [maxlength]=\"getConfigValue('forms.validation.password.maxLength')\"\n                 autofocus>\n          <small class=\"form-text error\" *ngIf=\"password.invalid && password.touched && password.errors?.required\">\n            Password is required!\n          </small>\n          <small\n            class=\"form-text error\"\n            *ngIf=\"password.invalid && password.touched && (password.errors?.minlength || password.errors?.maxlength)\">\n            Password should contains\n            from {{getConfigValue('forms.validation.password.minLength')}}\n            to {{getConfigValue('forms.validation.password.maxLength')}}\n            characters\n          </small>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"input-re-password\" class=\"sr-only\">Confirm Password</label>\n          <input\n            name=\"rePass\" [(ngModel)]=\"user.confirmPassword\" type=\"password\" id=\"input-re-password\"\n            class=\"form-control form-control-lg last\" placeholder=\"Confirm Password\" #rePass=\"ngModel\"\n            [class.form-control-danger]=\"(rePass.invalid || password.value != rePass.value) && rePass.touched\"\n            [required]=\"getConfigValue('forms.validation.password.required')\">\n          <small class=\"form-text error\"\n                 *ngIf=\"rePass.invalid && rePass.touched && rePass.errors?.required\">\n            Password confirmation is required!\n          </small>\n          <small\n            class=\"form-text error\"\n            *ngIf=\"rePass.touched && password.value != rePass.value && !rePass.errors?.required\">\n            Password does not match the confirm password.\n          </small>\n        </div>\n\n        <button [disabled]=\"submitted || !resetPassForm.form.valid\" class=\"btn btn-hero-success btn-block\"\n                [class.btn-pulse]=\"submitted\">\n          Change password\n        </button>\n      </form>\n\n      <div class=\"links col-sm-12\">\n        <small class=\"form-text\">\n          Already have an account? <a routerLink=\"../login\"><strong>Sign In</strong></a>\n        </small>\n        <small class=\"form-text\">\n          <a routerLink=\"../register\"><strong>Sign Up</strong></a>\n        </small>\n      </div>\n    </nb-auth-block>\n  ",
    }),
    __param$5(1, _angular_core.Inject(NB_AUTH_OPTIONS_TOKEN)),
    __metadata$8("design:paramtypes", [exports.NbAuthService, Object, _angular_router.Router])
], exports.NbResetPasswordComponent);

var routes = [
    {
        path: 'auth',
        component: exports.NbAuthComponent,
        children: [
            {
                path: '',
                component: exports.NbLoginComponent,
            },
            {
                path: 'login',
                component: exports.NbLoginComponent,
            },
            {
                path: 'register',
                component: exports.NbRegisterComponent,
            },
            {
                path: 'logout',
                component: exports.NbLogoutComponent,
            },
            {
                path: 'request-password',
                component: exports.NbRequestPasswordComponent,
            },
            {
                path: 'reset-password',
                component: exports.NbResetPasswordComponent,
            },
        ],
    },
];

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function nbAuthServiceFactory(config, tokenService, injector) {
    var providers = config.providers || {};
    for (var key in providers) {
        if (providers.hasOwnProperty(key)) {
            var provider = providers[key];
            var object = injector.get(provider.service);
            object.setConfig(provider.config || {});
        }
    }
    return new exports.NbAuthService(tokenService, injector, providers);
}
function nbOptionsFactory(options) {
    return deepExtend(defaultSettings, options);
}
exports.NbAuthModule = NbAuthModule_1 = (function () {
    function NbAuthModule() {
    }
    NbAuthModule.forRoot = function (nbAuthOptions) {
        return {
            ngModule: NbAuthModule_1,
            providers: [
                { provide: NB_AUTH_USER_OPTIONS_TOKEN, useValue: nbAuthOptions },
                { provide: NB_AUTH_OPTIONS_TOKEN, useFactory: nbOptionsFactory, deps: [NB_AUTH_USER_OPTIONS_TOKEN] },
                { provide: NB_AUTH_PROVIDERS_TOKEN, useValue: {} },
                { provide: NB_AUTH_TOKEN_WRAPPER_TOKEN, useClass: exports.NbAuthSimpleToken },
                { provide: NB_AUTH_INTERCEPTOR_HEADER, useValue: 'Authorization' },
                {
                    provide: exports.NbAuthService,
                    useFactory: nbAuthServiceFactory,
                    deps: [NB_AUTH_OPTIONS_TOKEN, exports.NbTokenService, _angular_core.Injector],
                },
                exports.NbTokenService,
                exports.NbDummyAuthProvider,
                exports.NbEmailPassAuthProvider,
            ],
        };
    };
    return NbAuthModule;
}());
exports.NbAuthModule = NbAuthModule_1 = __decorate([
    _angular_core.NgModule({
        imports: [
            _angular_common.CommonModule,
            _nebular_theme.NbLayoutModule,
            _nebular_theme.NbCardModule,
            _nebular_theme.NbCheckboxModule,
            _angular_router.RouterModule.forChild(routes),
            _angular_forms.FormsModule,
            _angular_common_http.HttpClientModule,
        ],
        declarations: [
            exports.NbAuthComponent,
            exports.NbAuthBlockComponent,
            exports.NbLoginComponent,
            exports.NbRegisterComponent,
            exports.NbRequestPasswordComponent,
            exports.NbResetPasswordComponent,
            exports.NbLogoutComponent,
        ],
        exports: [
            exports.NbAuthComponent,
            exports.NbAuthBlockComponent,
            exports.NbLoginComponent,
            exports.NbRegisterComponent,
            exports.NbRequestPasswordComponent,
            exports.NbResetPasswordComponent,
            exports.NbLogoutComponent,
        ],
    })
], exports.NbAuthModule);
var NbAuthModule_1;

var __decorate$12 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$9 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.NbAuthJWTInterceptor = (function () {
    function NbAuthJWTInterceptor(injector) {
        this.injector = injector;
    }
    NbAuthJWTInterceptor.prototype.intercept = function (req, next) {
        return this.authService.getToken()
            .switchMap(function (token) {
            if (token) {
                var JWT = "Bearer " + token.getValue();
                req = req.clone({
                    setHeaders: {
                        Authorization: JWT,
                    },
                });
            }
            return next.handle(req);
        });
    };
    Object.defineProperty(NbAuthJWTInterceptor.prototype, "authService", {
        get: function () {
            return this.injector.get(exports.NbAuthService);
        },
        enumerable: true,
        configurable: true
    });
    return NbAuthJWTInterceptor;
}());
exports.NbAuthJWTInterceptor = __decorate$12([
    _angular_core.Injectable(),
    __metadata$9("design:paramtypes", [_angular_core.Injector])
], exports.NbAuthJWTInterceptor);

var __decorate$13 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$10 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$6 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.NbAuthSimpleInterceptor = (function () {
    function NbAuthSimpleInterceptor(injector, headerName) {
        if (headerName === void 0) { headerName = 'Authorization'; }
        this.injector = injector;
        this.headerName = headerName;
    }
    NbAuthSimpleInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        return this.authService.getToken()
            .switchMap(function (token) {
            if (token && token.getValue()) {
                req = req.clone({
                    setHeaders: (_a = {},
                        _a[_this.headerName] = token.getValue(),
                        _a),
                });
            }
            return next.handle(req);
            var _a;
        });
    };
    Object.defineProperty(NbAuthSimpleInterceptor.prototype, "authService", {
        get: function () {
            return this.injector.get(exports.NbAuthService);
        },
        enumerable: true,
        configurable: true
    });
    return NbAuthSimpleInterceptor;
}());
exports.NbAuthSimpleInterceptor = __decorate$13([
    _angular_core.Injectable(),
    __param$6(1, _angular_core.Inject(NB_AUTH_INTERCEPTOR_HEADER)),
    __metadata$10("design:paramtypes", [_angular_core.Injector, String])
], exports.NbAuthSimpleInterceptor);

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

exports.defaultSettings = defaultSettings;
exports.NB_AUTH_OPTIONS_TOKEN = NB_AUTH_OPTIONS_TOKEN;
exports.NB_AUTH_USER_OPTIONS_TOKEN = NB_AUTH_USER_OPTIONS_TOKEN;
exports.NB_AUTH_PROVIDERS_TOKEN = NB_AUTH_PROVIDERS_TOKEN;
exports.NB_AUTH_TOKEN_WRAPPER_TOKEN = NB_AUTH_TOKEN_WRAPPER_TOKEN;
exports.NB_AUTH_INTERCEPTOR_HEADER = NB_AUTH_INTERCEPTOR_HEADER;
exports.nbAuthServiceFactory = nbAuthServiceFactory;
exports.nbOptionsFactory = nbOptionsFactory;
exports.NbAuthResult = NbAuthResult;
exports.NbAbstractAuthProvider = NbAbstractAuthProvider;

Object.defineProperty(exports, '__esModule', { value: true });

})));
