import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginModule } from './admin-login/admin-login.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AdminOrdersModule } from './admin-orders/admin-orders.module';
import { AdminCustomersModule } from './admin-customers/admin-customers.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AdminComponent, AdminDashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminLoginModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AdminOrdersModule,
    AdminCustomersModule,
    FlexLayoutModule,
    MatButtonModule,
  ],
  exports: [AdminComponent],
})
export class AdminModule {}
