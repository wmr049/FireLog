import { Routes, RouterModule } from '@angular/router';

import { ManagerComponent } from 'app/pages/manager/manager.component';
import { ManagerOrganizationComponent } from 'app/pages/manager/manager-organization/manager-organization.component';
import { ManagerSystemComponent } from 'app/pages/manager/manager-system/manager-system.component';

const routes: Routes = [
    {
        path: '',
        component: ManagerComponent,
        children: [
            { path: 'manager-organization', component: ManagerOrganizationComponent },
            { path: 'manager-system', component: ManagerSystemComponent },
        ],
    },
];

export const routing = RouterModule.forChild(routes);
