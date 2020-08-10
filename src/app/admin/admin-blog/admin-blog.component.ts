import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AdminBlogDataSource, AdminBlogItem } from './admin-blog-datasource';
import { MatDialog } from '@angular/material/dialog';
import { AdminBlogDialogComponent } from './admin-blog-dialog/admin-blog-dialog.component';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss'],
})
export class AdminBlogComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<AdminBlogItem>;
  dataSource: AdminBlogDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'id',
    'topic',
    'creator',
    'date',
    'attachment',
    'viewBlog',
  ];

  constructor(public dialog: MatDialog) {}
  ngOnInit() {
    this.dataSource = new AdminBlogDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  public openDialog(order: any): void {
    const dialogRef = this.dialog.open(AdminBlogDialogComponent, {
      data: order,
      width: '40vw',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
