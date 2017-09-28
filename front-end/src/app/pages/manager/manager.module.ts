import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';

import { routing } from './manager.routing';

// components
import { ManagerComponent } from 'app/pages/manager/manager.component';
import { ManagerOrganizationComponent } from 'app/pages/manager/manager-organization/manager-organization.component';
import { ManagerSystemComponent } from 'app/pages/manager/manager-system/manager-system.component';

// services
import { ManagerOrganizationService } from 'app/pages/manager/services/manager-organization.service';
import { ManagerSystemService } from 'app/pages/manager/services/manager-system.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        routing,
        MatTabsModule,
    ],
    declarations: [
        ManagerComponent,
        ManagerOrganizationComponent,
        ManagerSystemComponent
    ],
    providers: [
        ManagerOrganizationService,
        ManagerSystemService,
    ],
})

export class ManagerModule { }

