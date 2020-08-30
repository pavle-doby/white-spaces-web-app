import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<AdminCustomersItem>;
  dataSource: MatTableDataSource<any>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'customerId',
    'customerName',
    'dateOfRegistration',
    'email',
  ];

  constructor(private adminService: AdminService) {
    this.adminService.getAllCustomers().subscribe((res) => {
      console.log(res);
      res = [...res];
      this.dataSource = new MatTableDataSource(
        res.map((element) => {
          return {
            customerId: element.id,
            customerName: element.first_name + element.last_name,
            dateOfRegistration: '',
            email: element.email,
          };
        })
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  ngOnInit() {}

  ngAfterViewInit() {
    // console.log(this.table.dataSource);
    // this.table.dataSource = this.dataSource;
  }
}
