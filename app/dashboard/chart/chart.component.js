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
var core_1 = require('@angular/core');
var ng2_charts_1 = require("ng2-charts");
var estadoIntegracao_service_1 = require("../../services/estadoIntegracao.service");
var ChartComponent = (function () {
    function ChartComponent(service) {
        this.service = service;
        this.doughnutChartLabels = [
            'lfgOnlineMatricula',
            'posOnlineMatricula',
            'posOnlineTutor',
            'salaVirtualCalendario',
            'salaVirtualDisciplinas',
            'salaVirtualMatricula',
            'salaVirtualMigracao',
            'sgaPedidosNaoIntegrados',
            'tutorTroca'
        ];
        this.doughnutChartData = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.doughnutChartDataSets = [{
                lables: this.doughnutChartLabels,
                data: this.doughnutChartData
            }];
        this.doughnutChartType = 'bar';
        this.doughnutChartOptions = {
            scales: {
                xAxes: [{
                        gridLines: {
                            lineWidth: 1
                        }
                    }],
                yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: 100,
                            min: 0,
                            stepSize: 10
                        },
                        gridLines: {
                            lineWidth: 0.5
                        }
                    }]
            },
            responsive: true,
            legend: {
                display: false
            }
        };
        this.isDataAvailable = false;
    }
    ChartComponent.prototype.ngOnInit = function () {
        this.carregarEstadoIntegracao();
    };
    ChartComponent.prototype.ngOnChanges = function (changes) {
    };
    ChartComponent.prototype.carregarEstadoIntegracao = function () {
        var _this = this;
        switch (this.fila) {
            case 'LFGOnline':
                this.doughnutChartLabels = [
                    'Matrícula'
                ];
                this.service.getEstadoIntegracao()
                    .subscribe(function (res) {
                    if (res.success) {
                        _this.doughnutChartData = [
                            +res.result.lfgOnlineMatricula
                        ];
                        _this.doughnutChartDataSets =
                            [{
                                    lables: _this.doughnutChartLabels,
                                    data: _this.doughnutChartData
                                }];
                    }
                    else {
                        console.log(res.errors);
                    }
                });
                break;
            case 'POSOnline':
                this.doughnutChartLabels = [
                    'Matrícula',
                    'Tutor',
                    'Troca de Tutor'
                ];
                this.service.getEstadoIntegracao()
                    .subscribe(function (res) {
                    if (res.success) {
                        _this.doughnutChartData = [
                            +res.result.posOnlineMatricula,
                            +res.result.posOnlineTutor,
                            +res.result.tutorTroca
                        ];
                        _this.doughnutChartDataSets =
                            [{
                                    lables: _this.doughnutChartLabels,
                                    data: _this.doughnutChartData
                                }];
                    }
                    else {
                        console.log(res.errors);
                    }
                });
                break;
            case 'SalaVirtual':
                this.doughnutChartLabels = [
                    'Calendário',
                    'Disciplinas',
                    'Matrícula',
                    'Migração'
                ];
                this.service.getEstadoIntegracao()
                    .subscribe(function (res) {
                    if (res.success) {
                        _this.doughnutChartData = [
                            +res.result.salaVirtualCalendario,
                            +res.result.salaVirtualDisciplinas,
                            +res.result.salaVirtualMatricula,
                            +res.result.salaVirtualMigracao
                        ];
                        _this.doughnutChartDataSets =
                            [{
                                    lables: _this.doughnutChartLabels,
                                    data: _this.doughnutChartData
                                }];
                    }
                    else {
                        console.log(res.errors);
                    }
                });
                break;
            case 'Pedidos':
                this.doughnutChartLabels = [
                    'Não Integrados'
                ];
                this.service.getEstadoIntegracao()
                    .subscribe(function (res) {
                    if (res.success) {
                        _this.doughnutChartData = [
                            +res.result.sgaPedidosNaoIntegrados
                        ];
                        _this.doughnutChartDataSets =
                            [{
                                    lables: _this.doughnutChartLabels,
                                    data: _this.doughnutChartData
                                }];
                    }
                    else {
                        console.log(res.errors);
                    }
                });
                break;
            default:
                this.doughnutChartLabels = [
                    'lfgOnlineMatricula',
                    'posOnlineMatricula',
                    'posOnlineTutor',
                    'salaVirtualCalendario',
                    'salaVirtualDisciplinas',
                    'salaVirtualMatricula',
                    'salaVirtualMigracao',
                    'tutorTroca',
                    'sgaPedidosNaoIntegrados'
                ];
                this.service.getEstadoIntegracao()
                    .subscribe(function (res) {
                    if (res.success) {
                        _this.doughnutChartData = [
                            +res.result.lfgOnlineMatricula,
                            +res.result.posOnlineMatricula,
                            +res.result.posOnlineTutor,
                            +res.result.salaVirtualCalendario,
                            +res.result.salaVirtualDisciplinas,
                            +res.result.salaVirtualMatricula,
                            +res.result.salaVirtualMigracao,
                            +res.result.tutorTroca,
                            +res.result.sgaPedidosNaoIntegrados
                        ];
                        _this.doughnutChartDataSets =
                            [{
                                    lables: _this.doughnutChartLabels,
                                    data: _this.doughnutChartData
                                }];
                        _this.doughnutChartDataSets = _this.doughnutChartDataSets.slice();
                    }
                    else {
                        console.log(res.errors);
                    }
                });
                break;
        }
        this.isDataAvailable = true;
    };
    ChartComponent.prototype.chartClicked = function (e) {
        this.carregarEstadoIntegracao();
    };
    __decorate([
        core_1.ViewChild(ng2_charts_1.BaseChartDirective), 
        __metadata('design:type', ng2_charts_1.BaseChartDirective)
    ], ChartComponent.prototype, "chart", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ChartComponent.prototype, "fila", void 0);
    ChartComponent = __decorate([
        core_1.Component({
            selector: 'chart-cmp',
            moduleId: module.id,
            templateUrl: 'chart.component.html'
        }), 
        __metadata('design:paramtypes', [estadoIntegracao_service_1.EstadoIntegracaoService])
    ], ChartComponent);
    return ChartComponent;
}());
exports.ChartComponent = ChartComponent;
//# sourceMappingURL=chart.component.js.map