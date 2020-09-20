import { Component, OnInit } from '@angular/core';
import { UserVM } from 'src/models/User.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';
import { AuthService } from 'src/app/services/auth.service';
import { CONFIRMATION_DIALOG_WIDTH, LoginParam } from 'src/app/app.config';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData,
  ConfirmationDialogType,
} from 'src/app/shared/dialogs/confirmation-dialog/confirmation-dialog.component';

const debunceTimeMs = 333;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public userVM: UserVM;
  public repeatPassword: string;

  public repeatPassword$: Subject<string> = new Subject();
  public isFormValid$: Subject<string> = new Subject();

  public isFirstNameValid$: Subject<string> = new Subject();
  public isLastNameValid$: Subject<string> = new Subject();
  public isEmailValid$: Subject<string> = new Subject();
  public isAddressValid$: Subject<string> = new Subject();
  public isPasswordValid$: Subject<string> = new Subject();

  public isFirstNameValid: boolean = true;
  public isLastNameValid: boolean = true;
  public isEmailValid: boolean = true;
  public isAddressValid: boolean = true;
  public isPasswordValid: boolean = true;
  public isRepeatPasswordValid: boolean = true;
  public arePasswordsSame: boolean = true;

  public requiredErorrMessage: string = 'required.';
  public passwordErrorMEssage: string = 'Your passwords are not same.';

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly dialog: MatDialog
  ) {
    this.userVM = new UserVM({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      country: '',
      city: '',
      phone_number: '',
      address: '',
    });
  }

  ngOnInit(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: CONFIRMATION_DIALOG_WIDTH,
      disableClose: false,
      data: new ConfirmationDialogData({
        titleLabel: 'Notice',
        message: `Please note that at this point \n we only work on apartment renovation projects.\n Unfortunatelly at this moment any other type\n of project will be denied and fuly refunded.`,
        type: ConfirmationDialogType.INFO,
      }),
    });

    this.isFirstNameValid$
      .pipe(debounceTime(debunceTimeMs), distinctUntilChanged())
      .subscribe(() => {
        const { first_name } = this.userVM;
        this.isFirstNameValid = !!first_name;
      });

    this.isLastNameValid$
      .pipe(debounceTime(debunceTimeMs), distinctUntilChanged())
      .subscribe(() => {
        const { last_name } = this.userVM;
        this.isLastNameValid = !!last_name;
      });

    this.isEmailValid$
      .pipe(debounceTime(debunceTimeMs), distinctUntilChanged())
      .subscribe(() => {
        const { email } = this.userVM;
        this.isEmailValid = !!email;
      });

    this.isAddressValid$.pipe(debounceTime(debunceTimeMs)).subscribe(() => {
      const { address } = this.userVM;
      this.isAddressValid = !!address;
    });

    this.isPasswordValid$
      .pipe(debounceTime(debunceTimeMs), distinctUntilChanged())
      .subscribe(() => {
        const { password } = this.userVM;
        this.isPasswordValid = !!password;
      });

    this.repeatPassword$
      .pipe(debounceTime(debunceTimeMs))
      .subscribe((repeatPassword) => {
        this.isPasswordValid = !!this.userVM.password;
        this.isRepeatPasswordValid = !!this.repeatPassword;
        this.arePasswordsSame = repeatPassword === this.userVM.password;
      });
  }

  public isFormValid(): boolean {
    const { first_name, last_name, email, address, password } = this.userVM;
    this.isFirstNameValid = !!first_name;
    this.isLastNameValid = !!last_name;
    this.isEmailValid = !!email;
    this.isAddressValid = !!address;
    this.isPasswordValid = !!password;
    this.isRepeatPasswordValid = !!this.repeatPassword;

    return (
      this.isFirstNameValid &&
      this.isLastNameValid &&
      this.isEmailValid &&
      this.isAddressValid &&
      this.isPasswordValid &&
      this.repeatPassword &&
      this.arePasswordsSame
    );
  }

  public submitRegistration(): void {
    if (!this.isFormValid()) {
      return;
    }
    this.authService
      .registerUser(this.userVM)
      .toPromise()
      .then((res) => {
        this.router.navigateByUrl(
          `/${MainRouterPaths.LOGIN}?login=${LoginParam.LOGIN}`
        );
        this.dialog.open(ConfirmationDialogComponent, {
          width: CONFIRMATION_DIALOG_WIDTH,
          disableClose: false,
          data: new ConfirmationDialogData({
            titleLabel: 'Registration',
            message: `We’ve sent a verification mail your way.\n Please check your inbox and click on the link we provided\n in order to finish the registration process.`,
            type: ConfirmationDialogType.INFO,
          }),
        });
      })
      .catch((err) => {
        console.error({ err });
        alert(err.message);
      });
  }
}
