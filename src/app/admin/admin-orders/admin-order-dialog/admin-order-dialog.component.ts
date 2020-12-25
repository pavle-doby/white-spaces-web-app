import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import HttpStatusCode from 'src/models/HttpStatusCode';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MSG_ACTION_SUCCESSFUL,
  MSG_ACTION_UNSUCCSSFUL,
} from 'src/app/app.config';
import {
  fileToPrsentableImage,
  getExtension,
  isNotPresentableFile,
} from 'src/app/shared/Utilities';

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

  public floorPlanList: string[] = [];

  constructor(
    private readonly dialogRef: MatDialogRef<AdminOrderDialogComponent>,
    private readonly $store: Store<AppState>,
    private readonly adminService: AdminService,
    private readonly snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
    this.$adminEmail = this.$store.select((state) => state.user.user.email);

    this.floorPlanList = this.data.orderDetails
      .map((order) => order.additional_data.floor_plan)
      .map((fpList: string[]) => fpList ?? [])
      .flat(1)
      .map((fileName) => fileToPrsentableImage(fileName));
  }

  ngOnInit(): void {}

  public downloadProject() {
    this.$adminEmail.subscribe((email) => {
      this.adminService
        .downloadProject(this.data.id, email)
        .toPromise()
        .then((res) => {
          this.snackBar.open(MSG_ACTION_SUCCESSFUL, 'Close', {
            duration: 3000,
          });
        })
        .catch((err) => {
          if (err.status === HttpStatusCode.OK) {
            this.snackBar.open(MSG_ACTION_SUCCESSFUL, 'Close', {
              duration: 3000,
            });
            return;
          }
          console.error(err);
          this.snackBar.open(MSG_ACTION_UNSUCCSSFUL, 'Close', {
            duration: 3000,
          });
        });
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
