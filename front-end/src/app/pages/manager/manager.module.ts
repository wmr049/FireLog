import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';

import { routing } from './manager.routing';

// components
import { ManagerComponent } from 'app/pages/manager/manager.component';
import { ManagerOrganizationComponent } from 'app/pages/manager/manager-organization/manager-organization.component';
import { ManagerSystemComponent } from 'app/pages/manager/manager-system/manager-system.component';

// services
import { ManagerOrganizationService } from 'app/pages/manager/services/manager-organization.service';
import { ManagerSystemService } from 'app/pages/manager/services/manager-system.service';
import { ManagerSystemChartService } from 'app/pages/manager/services/manager-system-chart.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        routing,
        MatTabsModule,
        ChartsModule,
    ],
    declarations: [
        ManagerComponent,
        ManagerOrganizationComponent,
        ManagerSystemComponent,

    ],
    providers: [
        ManagerOrganizationService,
        ManagerSystemService,
        ManagerSystemChartService,
    ],
})

export class ManagerModule { }

