import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AdminCustomersComponent } from './admin-customers.component';

@NgModule({
  declarations: [AdminCustomersComponent],
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  exports: [AdminCustomersComponent],
})
export class AdminCustomersModule {}
