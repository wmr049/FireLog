
import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseChartDirective } from "ng2-charts";
import { EstadoIntegracaoService } from "../../services/estadoIntegracao.service";


@Component({
    selector: 'chart-cmp',
    moduleId: module.id,
    templateUrl: 'chart.component.html'
})

export class ChartComponent implements OnInit, OnChanges {

    @ViewChild(BaseChartDirective) public chart: BaseChartDirective;

    @Input() public fila: string;

    public doughnutChartLabels: string[] = [
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

    public doughnutChartData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    public doughnutChartDataSets =
    [{
        lables: this.doughnutChartLabels,
        data: this.doughnutChartData
    }];

    public doughnutChartType: string = 'bar';
    
    private doughnutChartOptions: any = {
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
    }
    public isDataAvailable: boolean = false;

    constructor(private service: EstadoIntegracaoService) {

    }

    ngOnInit(): void {
        this.carregarEstadoIntegracao();
    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    private carregarEstadoIntegracao(): void {

        switch (this.fila) {
			case 'LFGOnline':

                this.doughnutChartLabels = [
                    'Matrícula'                    
                ];

                this.service.getEstadoIntegracao()
                    .subscribe((res) => {
                        if (res.success) {

                            this.doughnutChartData = [
                                +res.result.lfgOnlineMatricula                                
                            ];

                            this.doughnutChartDataSets =
                                [{
                                    lables: this.doughnutChartLabels,
                                    data: this.doughnutChartData
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
                    .subscribe((res) => {
                        if (res.success) {

                            this.doughnutChartData = [                                
                                +res.result.posOnlineMatricula,
                                +res.result.posOnlineTutor,
                                +res.result.tutorTroca
                            ];

                            this.doughnutChartDataSets =
                                [{
                                    lables: this.doughnutChartLabels,
                                    data: this.doughnutChartData
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
                    .subscribe((res) => {
                        if (res.success) {

                            this.doughnutChartData = [
                                +res.result.salaVirtualCalendario,
                                +res.result.salaVirtualDisciplinas,
                                +res.result.salaVirtualMatricula,
                                +res.result.salaVirtualMigracao
                            ];

                            this.doughnutChartDataSets =
                                [{
                                    lables: this.doughnutChartLabels,
                                    data: this.doughnutChartData
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
                    .subscribe((res) => {
                        if (res.success) {

                            this.doughnutChartData = [
                                +res.result.sgaPedidosNaoIntegrados
                            ];

                            this.doughnutChartDataSets =
                                [{
                                    lables: this.doughnutChartLabels,
                                    data: this.doughnutChartData
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
                    .subscribe((res) => {
                        if (res.success) {

                            this.doughnutChartData = [
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

                            this.doughnutChartDataSets =
                                [{
                                    lables: this.doughnutChartLabels,
                                    data: this.doughnutChartData
                                }];

                            this.doughnutChartDataSets = this.doughnutChartDataSets.slice();
                        }
                        else {
                            console.log(res.errors);
                        }
                    });

                break;
        }

        this.isDataAvailable = true;
    }

    public chartClicked(e: any): void {
        this.carregarEstadoIntegracao();
    }
}