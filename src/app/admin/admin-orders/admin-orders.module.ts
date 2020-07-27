import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrdersComponent } from './admin-orders.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { StatusTableModule } from 'src/app/shared/status-table/status-table.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminOrderDialogModule } from './admin-order-dialog/admin-order-dialog.module';
@NgModule({
  declarations: [AdminOrdersComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    StatusTableModule,
    MatDialogModule,
    AdminOrderDialogModule,
  ],
  exports: [AdminOrdersComponent],
})
export class AdminOrdersModule {}
