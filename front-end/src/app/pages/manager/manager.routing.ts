import { Routes, RouterModule } from '@angular/router';

import { ManagerComponent } from 'app/pages/manager/manager.component';
import { ManagerOrganizationComponent } from 'app/pages/manager/manager-organization/manager-organization.component';

const routes: Routes = [
    {
        path: '',
        component: ManagerComponent,
        children: [
            { path: 'manager-organization', component: ManagerOrganizationComponent },
        ],
    },
];

export const routing = RouterModule.forChild(routes);
