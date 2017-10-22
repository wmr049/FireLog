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
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { NbAuthResult } from '../services/auth.service';
import { NbAbstractAuthProvider } from './abstract-auth.provider';
import { getDeepFromObject } from '../helpers';
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
var NbEmailPassAuthProvider = (function (_super) {
    __extends(NbEmailPassAuthProvider, _super);
    function NbEmailPassAuthProvider(http, route) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.route = route;
        _this.defaultConfig = {
            baseEndpoint: 'http://localhost:3000/',
            login: {
                alwaysFail: false,
                rememberMe: true,
                endpoint: 'api/v1/users/authenticate',
                method: 'post',
                redirect: {
                    success: '/',
                    failure: null,
                },
                defaultErrors: ['A combinação de login / e-mail não está correta, tente novamente.'],
                defaultMessages: ['Você foi logado com sucesso.'],
            },
            register: {
                alwaysFail: false,
                rememberMe: true,
                endpoint: 'api/v1/users',
                method: 'post',
                redirect: {
                    success: '/',
                    failure: null,
                },
                defaultErrors: ['Alguma coisa deu errado. Por favor tente outra vez.'],
                defaultMessages: ['Você foi registrado com sucesso.'],
            },
            logout: {
                alwaysFail: false,
                endpoint: 'api/v1/users',
                method: 'delete',
                redirect: {
                    success: '/',
                    failure: null,
                },
                defaultErrors: ['Alguma coisa deu errado. Por favor tente outra vez.'],
                defaultMessages: ['Você foi desconectado com sucesso.'],
            },
            requestPass: {
                endpoint: '/api/auth/request-pass',
                method: 'post',
                redirect: {
                    success: '/',
                    failure: null,
                },
                defaultErrors: ['Alguma coisa deu errado. Por favor tente outra vez.'],
                defaultMessages: ['As instruções de reiniciar a senha foram enviadas para o seu email.'],
            },
            resetPass: {
                endpoint: '/api/auth/reset-pass',
                method: 'put',
                redirect: {
                    success: '/',
                    failure: null,
                },
                resetPasswordTokenKey: 'reset_password_token',
                defaultErrors: ['Alguma coisa deu errado. Por favor tente outra vez.'],
                defaultMessages: ['Sua senha foi alterada com sucesso.'],
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


            localStorage.setItem('eio.token', res.body.data.token);
            localStorage.setItem('eio.user', JSON.stringify(res.body.data.user));

            return res;
        })
            .map(function (res) {
            return new NbAuthResult(true, res, _this.getConfigValue('login.redirect.success'), [], _this.getConfigValue('messages.getter')('login', res), _this.getConfigValue('token.getter')('login', res));
        })
            .catch(function (res) {
            var errors = [];
            if (res instanceof HttpErrorResponse) {
                errors = _this.getConfigValue('errors.getter')('login', res);
            }
            else {
                errors.push('Algo deu errado.');
            }
            return Observable.of(new NbAuthResult(false, res, _this.getConfigValue('login.redirect.failure'), errors));
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
            if (res instanceof HttpErrorResponse) {
                errors = _this.getConfigValue('errors.getter')('register', res);
            }
            else {
                errors.push('Algo deu errado.');
            }
            return Observable.of(new NbAuthResult(false, res, _this.getConfigValue('register.redirect.failure'), errors));
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
            if (res instanceof HttpErrorResponse) {
                errors = _this.getConfigValue('errors.getter')('requestPass', res);
            }
            else {
                errors.push('Algo deu errado.');
            }
            return Observable.of(new NbAuthResult(false, res, _this.getConfigValue('requestPass.redirect.failure'), errors));
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
            if (res instanceof HttpErrorResponse) {
                errors = _this.getConfigValue('errors.getter')('resetPass', res);
            }
            else {
                errors.push('Algo deu errado.');
            }
            return Observable.of(new NbAuthResult(false, res, _this.getConfigValue('resetPass.redirect.failure'), errors));
        });
    };
    NbEmailPassAuthProvider.prototype.logout = function () {
        var _this = this;
        var method = this.getConfigValue('logout.method');
        var url = this.getActionEndpoint('logout');
        return Observable.of({})
            .switchMap(function (res) {
            if (!url) {
                return Observable.of(res);
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
            if (res instanceof HttpErrorResponse) {
                errors = _this.getConfigValue('errors.getter')('logout', res);
            }
            else {
                errors.push('Algo deu errado.');
            }
            return Observable.of(new NbAuthResult(false, res, _this.getConfigValue('logout.redirect.failure'), errors));
        });
    };
    NbEmailPassAuthProvider.prototype.getActionEndpoint = function (action) {
        var actionEndpoint = this.getConfigValue(action + ".endpoint");
        var baseEndpoint = this.getConfigValue('baseEndpoint');
        return baseEndpoint + actionEndpoint;
    };
    return NbEmailPassAuthProvider;
}(NbAbstractAuthProvider));
NbEmailPassAuthProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpClient, ActivatedRoute])
], NbEmailPassAuthProvider);
export { NbEmailPassAuthProvider };
//# sourceMappingURL=email-pass-auth.provider.js.map
