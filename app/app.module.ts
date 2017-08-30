import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent }   from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';


import { DashboardModule } from './dashboard/dashboard.module';
import { SidebarModule } from './sidebar/sidebar.module';
//import { FooterModule } from './shared/footer/footer.module';
//import { NavbarModule} from './shared/navbar/navbar.module';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { EstadoIntegracaoService } from './services/estadoIntegracao.service'




@NgModule({
    imports: [
        BrowserModule,
        DashboardModule,
        SidebarModule,
        //NavbarModule,
        //FooterModule,        
        HttpModule,     
        FormsModule,   
        RouterModule.forRoot([])        
    ],
    declarations: [ 
        AppComponent,
        DashboardComponent
        ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},        
        ,EstadoIntegracaoService
        ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
