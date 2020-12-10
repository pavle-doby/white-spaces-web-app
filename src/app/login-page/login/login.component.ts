import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { setUser } from 'src/app/store/actions/user.actions';
import { MatDialog } from '@angular/material/dialog';
import { CONFIRMATION_DIALOG_WIDTH } from 'src/app/app.config';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData,
  ConfirmationDialogType,
} from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public email: string;
  public password: string;

  public isEmailValid: boolean = true;
  public isPasswordValid: boolean = true;

  public requiredErorrMessage: string = 'required.';

  public loginReqCount: number = 0;

  public subDialogClosed: Subscription;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly store: Store<AppState>,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    if (this.subDialogClosed) this.subDialogClosed.unsubscribe();
  }

  public areInputsValid(): boolean {
    this.isEmailValid = !!this.email;
    this.isPasswordValid = !!this.password;

    return this.isEmailValid && this.isPasswordValid;
  }

  public logInUser(): void {
    if (!this.areInputsValid()) {
      return;
    }

    this.authService
      .cleanLogin(this.email, this.password)
      .toPromise()
      .then((res) => {
        LocalStorageService.Instance.AuthToken = res.token ?? '';

        this.store.dispatch(setUser({ user: res.user_info }));
        if (!res.user_info.verified) {
          this.dialog.open(ConfirmationDialogComponent, {
            width: CONFIRMATION_DIALOG_WIDTH,
            disableClose: true,
            data: new ConfirmationDialogData({
              titleLabel: 'Registration',
              message: `We’ve sent a verification mail your way.\n Please check your inbox and click on the link we provided\n in order to finish the registration process.`,
              type: ConfirmationDialogType.INFO,
            }),
          });
          return;
        }

        this.router.navigateByUrl(`/${MainRouterPaths.CHECKOUT}`);
      })
      .catch((err) => {
        this.loginReqCount++;
        this.dialog.open(ConfirmationDialogComponent, {
          disableClose: false,
          data: new ConfirmationDialogData({
            titleLabel: 'Error',
            message: err.error,
            type: ConfirmationDialogType.INFO,
          }),
        });
        console.error(err);
      });
  }

  public resetPassword(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: CONFIRMATION_DIALOG_WIDTH,
      data: new ConfirmationDialogData({
        titleLabel: 'Are you sure?',
        message: `If you reset your password, a new password will be sent to your email address.`,
      }),
    });

    this.subDialogClosed = dialogRef.afterClosed().subscribe((IAmSure) => {
      if (!IAmSure) {
        return;
      }

      this.authService
        .resetPassword(this.email)
        .toPromise()
        .then((res) => {
          this.loginReqCount = 0;
          const { message } = res;
          this.dialog.open(ConfirmationDialogComponent, {
            width: CONFIRMATION_DIALOG_WIDTH,
            data: new ConfirmationDialogData({
              titleLabel: 'Information',
              message,
              type: ConfirmationDialogType.INFO,
            }),
          });
        })
        .catch((err) => {
          console.error(err);
          const { error } = err;
          this.dialog.open(ConfirmationDialogComponent, {
            width: CONFIRMATION_DIALOG_WIDTH,
            data: new ConfirmationDialogData({
              titleLabel: 'Error',
              message: error,
              type: ConfirmationDialogType.INFO,
            }),
          });
        });
    });
  }
}
