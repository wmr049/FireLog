import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { MonitorComponent } from './monitor/monitor.component';
import { EstadoIntegracaoService } from '../services/estadoIntegracao.service';
import { ChartComponent } from "./chart/chart.component";
import { PedidosComponent } from "./pedidos/pedidos.component";

export const MODULE_ROUTES: Route[] =[
    { path: 'dashboard', component: HomeComponent },
    { path: 'monitor', component: MonitorComponent },
    { path: 'pedidos', component: PedidosComponent },
    { path: 'chart', component: ChartComponent },
    { path: '', redirectTo: 'monitor', pathMatch: 'full' }
]

export const MODULE_COMPONENTS = [
    HomeComponent,
    MonitorComponent,
    PedidosComponent,
    ChartComponent
]
