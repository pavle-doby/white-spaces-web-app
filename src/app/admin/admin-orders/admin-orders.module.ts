import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrdersComponent } from './admin-orders.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [AdminOrdersComponent],
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  exports: [AdminOrdersComponent],
})
export class AdminOrdersModule {}
