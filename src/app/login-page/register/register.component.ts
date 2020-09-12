import { Component, OnInit } from '@angular/core';
import { UserVM } from 'src/models/User.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';
import { AuthService } from 'src/app/services/auth.service';

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
  public isPasswordValid$: Subject<string> = new Subject();

  public isFirstNameValid: boolean = true;
  public isLastNameValid: boolean = true;
  public isEmailValid: boolean = true;
  public isPasswordValid: boolean = true;
  public isRepeatPasswordValid: boolean = true;
  public arePasswordsSame: boolean = true;

  public requiredErorrMessage: string = 'required.';
  public passwordErrorMEssage: string = 'Your passwords are not same.';

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
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

    this.isPasswordValid$
      .pipe(debounceTime(debunceTimeMs), distinctUntilChanged())
      .subscribe(() => {
        const { password } = this.userVM;
        this.isPasswordValid = !!password;
      });

    this.repeatPassword$
      .pipe(debounceTime(debunceTimeMs))
      .subscribe((repeatPassword) => {
        console.log(this.repeatPassword);

        this.isPasswordValid = !!this.userVM.password;
        this.isRepeatPasswordValid = !!this.repeatPassword;
        this.arePasswordsSame = repeatPassword === this.userVM.password;
      });
  }

  public isFormValid(): boolean {
    const { first_name, last_name, email, password } = this.userVM;
    this.isFirstNameValid = !!first_name;
    this.isLastNameValid = !!last_name;
    this.isEmailValid = !!email;
    this.isPasswordValid = !!password;
    this.isRepeatPasswordValid = !!this.repeatPassword;

    return (
      this.isFirstNameValid &&
      this.isLastNameValid &&
      this.isEmailValid &&
      this.isPasswordValid &&
      this.repeatPassword &&
      this.arePasswordsSame
    );
  }

  public submitRegistration(): void {
    if (!this.isFormValid()) {
      return;
    }
    console.log(this.userVM);

    this.authService
      .registerUser(this.userVM)
      .toPromise()
      .then(() => {
        this.router.navigateByUrl(`/${MainRouterPaths.LOGIN}?login=1`);
      })
      .catch((err) => {
        console.error({ err });
      });
  }
}
