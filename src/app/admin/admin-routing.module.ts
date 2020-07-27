import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminCustomersComponent } from './admin-customers/admin-customers.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPackagesComponent } from './admin-packages/admin-packages.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'customers',
        component: AdminCustomersComponent,
      },
      {
        path: 'orders',
        component: AdminOrdersComponent,
      },
      {
        path: 'packages',
        component: AdminPackagesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
