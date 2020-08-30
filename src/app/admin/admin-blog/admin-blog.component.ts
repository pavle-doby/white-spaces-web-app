import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AdminBlogDataSource, AdminBlogItem } from './admin-blog-datasource';
import { MatDialog } from '@angular/material/dialog';
import { AdminBlogDialogComponent } from './admin-blog-dialog/admin-blog-dialog.component';
import { AdminService } from 'src/app/services/admin.service';

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

  constructor(public dialog: MatDialog, private adminService: AdminService) {
    this.adminService.getAllBlogs().subscribe((res) => {
      console.log(res);
      res = [...res];

      const data = res.map((element) => {
        return {
          id: element.id,
          topic: element.additional_data.blog_title,
          creator: '',
          date: element.creation_date,
          attachment: '',
          viewBlog: element.text,
        };
      });

      this.dataSource = new AdminBlogDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });
  }
  ngOnInit() {}

  ngAfterViewInit() {}

  public openDialog(order?: any): void {
    console.log(order);

    const dialogRef = this.dialog.open(AdminBlogDialogComponent, {
      data: order,
      width: '40vw',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.adminService
        .editBlog(order.id, result.html, result.creator, result.title)
        .subscribe((res) => console.log(res));
    });
  }

  public createBlogDialog(): void {
    const dialogRef = this.dialog.open(AdminBlogDialogComponent, {
      data: '',
      width: '40vw',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.adminService
        .postBlog(result.html, result.creator, result.title)
        .subscribe((res) => console.log(res));
    });
  }
}
