"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var estadoIntegracao_service_1 = require("../../services/estadoIntegracao.service");
var TimerObservable_1 = require("rxjs/observable/TimerObservable");
var MonitorComponent = (function () {
    function MonitorComponent(service) {
        this.service = service;
        this.totalLFGOnline = 0;
        this.totalPOSOnline = 0;
        this.totalSalaVirtual = 0;
        this.totalPedidos = 0;
    }
    MonitorComponent.prototype.ngOnInit = function () {
        var _this = this;
        var timer = TimerObservable_1.TimerObservable.create(1000, 60000);
        this.subscription = timer.subscribe(function (t) {
            _this.carregarEstadoIntegracao();
        });
    };
    MonitorComponent.prototype.carregarEstadoIntegracao = function () {
        var _this = this;
        this.service.getEstadoIntegracao()
            .subscribe(function (res) {
            if (res.success) {
                _this.totalLFGOnline = (res.result.lfgOnlineMatricula);
                _this.totalPOSOnline = (res.result.posOnlineMatricula + res.result.posOnlineTutor);
                _this.totalSalaVirtual = (res.result.salaVirtualCalendario + res.result.salaVirtualDisciplinas + res.result.salaVirtualMatricula + res.result.salaVirtualMigracao + res.result.tutorTroca);
                _this.totalPedidos = (+res.result.sgaPedidosNaoIntegrados);
            }
            else {
                console.log(res.errors);
            }
        });
    };
    MonitorComponent = __decorate([
        core_1.Component({
            selector: 'monitor-cmp',
            moduleId: module.id,
            templateUrl: 'monitor.component.html',
        }), 
        __metadata('design:paramtypes', [estadoIntegracao_service_1.EstadoIntegracaoService])
    ], MonitorComponent);
    return MonitorComponent;
}());
exports.MonitorComponent = MonitorComponent;
//# sourceMappingURL=monitor.component.js.map