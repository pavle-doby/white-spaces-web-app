import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminCustomersComponent } from './admin-customers/admin-customers.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminPackagesComponent } from './admin-packages/admin-packages.component';
import { AdminBlogComponent } from './admin-blog/admin-blog.component';
import { AuthAdminGuard } from '../services/auth-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'customers',
        component: AdminCustomersComponent,
        canActivate: [AuthAdminGuard],
      },
      {
        path: 'orders',
        component: AdminOrdersComponent,
        canActivate: [AuthAdminGuard],
      },
      {
        path: 'packages',
        component: AdminPackagesComponent,
        canActivate: [AuthAdminGuard],
      },
      {
        path: 'blog',
        component: AdminBlogComponent,
        canActivate: [AuthAdminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
