"use strict";
var home_component_1 = require('./home/home.component');
var monitor_component_1 = require('./monitor/monitor.component');
var chart_component_1 = require("./chart/chart.component");
var pedidos_component_1 = require("./pedidos/pedidos.component");
exports.MODULE_ROUTES = [
    { path: 'dashboard', component: home_component_1.HomeComponent },
    { path: 'monitor', component: monitor_component_1.MonitorComponent },
    { path: 'pedidos', component: pedidos_component_1.PedidosComponent },
    { path: 'chart', component: chart_component_1.ChartComponent },
    { path: '', redirectTo: 'monitor', pathMatch: 'full' }
];
exports.MODULE_COMPONENTS = [
    home_component_1.HomeComponent,
    monitor_component_1.MonitorComponent,
    pedidos_component_1.PedidosComponent,
    chart_component_1.ChartComponent
];
//# sourceMappingURL=dashboard.routes.js.map