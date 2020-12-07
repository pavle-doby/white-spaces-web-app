import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
@Component({
  selector: 'app-admin-order-dialog',
  templateUrl: './admin-order-dialog.component.html',
  styleUrls: ['./admin-order-dialog.component.scss'],
})
export class AdminOrderDialogComponent implements OnInit {
  public data: any;
  public $adminEmail: Observable<string>;
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
    private $store: Store<AppState>,
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
    this.$adminEmail = this.$store.select((state) => state.user.user.email);
  }

  ngOnInit(): void {}

  public downloadProject() {
    this.$adminEmail.subscribe((email) => {
      this.adminService.downloadProject(this.data.id, email).subscribe(
        (res) => res,
        (err) => console.error(err)
      );
    });
  }

  public handleSelect(value) {
    this.adminService.editOrder(this.data.id, 0, value).subscribe(
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
