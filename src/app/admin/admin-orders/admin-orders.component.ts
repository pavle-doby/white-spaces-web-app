import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AdminOrdersDataSource } from './admin-orders-datasource';
import { MatDialog } from '@angular/material/dialog';
import { AdminOrderDialogComponent } from './admin-order-dialog/admin-order-dialog.component';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
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

  constructor(
    public dialog: MatDialog,
    private adminService: AdminService,
    private router: Router
  ) {
    forkJoin({
      orders: this.adminService.getAllOrders(),
      customers: this.adminService.getAllCustomers(),
    }).subscribe((res) => {
      const customers = res.customers;
      const orders = res.orders;
      console.log(orders);

      const data = orders.map((element) => {
        return {
          id: element.id,
          customer: this.mapIdToEmail(element.user_id, customers),
          customerName: this.getFullName(
            element.additional_data.first_name,
            element.additional_data.last_name
          ),
          packageNames: this.getPackageNames(element.line_items),
          date: new Date(element.datetime).toLocaleString(),
          orderValue: '€' + this.getOrderValue(element.line_items),
          status: element.state,
          onProject: '',
          orderDetails: element.line_items,
        };
      });
      this.dataSource = new AdminOrdersDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });
  }
  ngOnInit() {}

  ngAfterViewInit() {}

  private getFullName(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`;
  }
  private mapIdToEmail(id: number, customers: any[]): string {
    const data = customers.find((customer) => customer.id === id);
    return data.email;
  }

  private getPackageNames(lineItems: any[]): string {
    return lineItems
      .map((element) => element.product.name)
      .reduce((prev, curr) => `${prev}, ${curr}`);
  }

  private getOrderValue(items: any[]): number {
    return items.length > 1
      ? items.map((element) => element.price).reduce((acc, curr) => acc + curr)
      : items[0].price;
  }

  public openDialog(order: any): void {
    const dialogRef = this.dialog.open(AdminOrderDialogComponent, {
      data: order,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.reload('/admin/orders');
    });
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('/', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }
}
