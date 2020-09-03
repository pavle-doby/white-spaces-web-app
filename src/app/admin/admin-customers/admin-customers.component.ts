import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {
  AdminCustomersDataSource,
  AdminCustomersItem,
} from './admin-customers-datasource';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.scss'],
})
export class AdminCustomersComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<AdminCustomersItem>;
  dataSource: AdminCustomersDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['customerId', 'customerName', 'email'];

  constructor(private adminService: AdminService) {
    this.adminService.getAllCustomers().subscribe((res) => {
      console.log(res);
      res = [...res];
      const data = res.map((element) => {
        return {
          customerId: element.id,
          customerName: element.first_name + element.last_name,
          email: element.email,
        };
      });

      this.dataSource = new AdminCustomersDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });
  }
  ngOnInit() {}

  ngAfterViewInit() {
    // console.log(this.table.dataSource);
    // this.table.dataSource = this.dataSource;
  }
}
