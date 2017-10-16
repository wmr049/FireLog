/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
/**
 * Service to control the global page spinner.
 */
var NbSpinnerService = (function () {
    function NbSpinnerService() {
        this.loaders = [];
        this.selector = 'nb-global-spinner';
    }
    /**
     * Appends new loader to the list of loader to be completed before
     * spinner will be hidden
     * @param method Promise<any>
     */
    NbSpinnerService.prototype.registerLoader = function (method) {
        this.loaders.push(method);
    };
    /**
     * Clears the list of loader
     */
    NbSpinnerService.prototype.clear = function () {
        this.loaders = [];
    };
    /**
     * Start the loader process, show spinnder and execute loaders
     */
    NbSpinnerService.prototype.load = function () {
        this.showSpinner();
        this.executeAll();
    };
    NbSpinnerService.prototype.executeAll = function (done) {
        var _this = this;
        if (done === void 0) { done = function () { }; }
        Promise.all(this.loaders).then(function (values) {
            _this.hideSpinner();
            done.call(null, values);
        })
            .catch(function (error) {
            // TODO: Promise.reject
            console.error(error);
        });
    };
    // TODO is there any better way of doing this?
    NbSpinnerService.prototype.showSpinner = function () {
        var el = this.getSpinnerElement();
        if (el) {
            el.style['display'] = 'block';
        }
    };
    NbSpinnerService.prototype.hideSpinner = function () {
        var el = this.getSpinnerElement();
        if (el) {
            el.style['display'] = 'none';
        }
    };
    NbSpinnerService.prototype.getSpinnerElement = function () {
        return document.getElementById(this.selector);
    };
    return NbSpinnerService;
}());
NbSpinnerService = __decorate([
    Injectable()
], NbSpinnerService);
export { NbSpinnerService };
//# sourceMappingURL=spinner.service.js.map