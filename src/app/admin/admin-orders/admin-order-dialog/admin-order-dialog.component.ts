import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-admin-order-dialog',
  templateUrl: './admin-order-dialog.component.html',
  styleUrls: ['./admin-order-dialog.component.scss'],
})
export class AdminOrderDialogComponent implements OnInit {
  public data: any;
  public statusArray: any = [
    { value: 'declined', viewValue: 'Not Accepted' },
    { value: 'approved', viewValue: 'In Progress' },
    { value: 'completed', viewValue: 'Finished' },
    { value: 'new', viewValue: 'New' },
  ];

  public onProjectMock: any = [
    { value: 0, viewValue: 'Natasa Nikolic' },
    { value: 1, viewValue: 'Admin 2' },
  ];
  constructor(
    private dialogRef: MatDialogRef<AdminOrderDialogComponent>,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
  }

  ngOnInit(): void {}

  private reload(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
  }

  public handleSelect(value) {
    this.adminService
      .editOrder(this.data.id, 0, value)
      .pipe(first())
      .subscribe(
        (res) => res,
        (err) => console.error(err)
      );
  }
  public save() {
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }
}
