import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminCustomersComponent } from './admin-customers/admin-customers.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPackagesComponent } from './admin-packages/admin-packages.component';
import { AdminBlogComponent } from './admin-blog/admin-blog.component';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'customers',
        component: AdminCustomersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'packages',
        component: AdminPackagesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'blog',
        component: AdminBlogComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
