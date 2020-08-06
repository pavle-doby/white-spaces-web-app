import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {
  AdminOrdersDataSource,
  AdminOrdersItem,
} from './admin-orders-datasource';
import { MatDialog } from '@angular/material/dialog';
import { AdminOrderDialogComponent } from './admin-order-dialog/admin-order-dialog.component';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<AdminOrdersItem>;
  dataSource: AdminOrdersDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'id',
    'customer',
    'date',
    'orderValue',
    'status',
    'onProject',
    'orderDetails',
  ];
  public data: any;

  constructor(public dialog: MatDialog, private adminService: AdminService) {
    this.adminService.getAllOrders().subscribe((res) => console.log(res));
  }
  ngOnInit() {
    this.dataSource = new AdminOrdersDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  public openDialog(order: any): void {
    const dialogRef = this.dialog.open(AdminOrderDialogComponent, {
      data: order,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
