import { Component, OnInit } from "@angular/core";
import { EstadoIntegracaoService } from "../../services/estadoIntegracao.service";
import { Observable } from "rxjs/Observable";
import  { TimerObservable }  from  "rxjs/observable/TimerObservable";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'monitor-cmp',
    moduleId: module.id,
    templateUrl: 'monitor.component.html',

})

export class MonitorComponent implements OnInit {
    
    private subscription: Subscription;

    public totalLFGOnline: number = 0;
	public totalPOSOnline: number = 0;
    public totalSalaVirtual: number = 0;
    public totalPedidos: number = 0;

    constructor(private service: EstadoIntegracaoService) {

    }

    ngOnInit(): void {
        
        let timer = TimerObservable.create(1000, 60000);
    
        this.subscription = timer.subscribe(t => {        
            this.carregarEstadoIntegracao();
        }); 

    }

    private carregarEstadoIntegracao(): void {

        this.service.getEstadoIntegracao()
            .subscribe((res) => {
                if (res.success) {

                    this.totalLFGOnline = (res.result.lfgOnlineMatricula);
					this.totalPOSOnline = (res.result.posOnlineMatricula + res.result.posOnlineTutor);
                    this.totalSalaVirtual = (res.result.salaVirtualCalendario + res.result.salaVirtualDisciplinas + res.result.salaVirtualMatricula + res.result.salaVirtualMigracao + res.result.tutorTroca);
                    this.totalPedidos = (+res.result.sgaPedidosNaoIntegrados);

                }
                else {
                    console.log(res.errors);
                }
            });

    }
}

