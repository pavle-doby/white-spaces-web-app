import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { BREAKING_POINT_PX } from 'src/app/app.config';
import { GlobalService } from 'src/app/services/global.service';
import { ContactDTO } from 'src/models/ContactDTO.model';
import { getClientWidthPX } from '../Utilities';

@Component({
  selector: 'app-side-card-contact',
  templateUrl: './side-card-contact.component.html',
  styleUrls: ['./side-card-contact.component.scss'],
})
export class SideCardContactComponent implements OnInit, OnDestroy {
  public isHandset: boolean;

  public name: string = '';
  public city: string = '';
  public mail: string = '';
  public phone: string = '';
  public text: string = '';

  public isNameValid: boolean = true;
  public isCityValid: boolean = true;
  public isMailValid: boolean = true;
  public isPhoneValid: boolean = true;
  public isTextValid: boolean = true;

  public $isNameValid: Subject<boolean>;
  public $isCityValid: Subject<boolean>;
  public $isMailValid: Subject<boolean>;
  public $isPhoneValid: Subject<boolean>;
  public $isTextValid: Subject<boolean>;

  public subisNameValid: Subscription;
  public subisCityValid: Subscription;
  public subisMailValid: Subscription;
  public subisPhoneValid: Subscription;
  public subisTextValid: Subscription;

  constructor(private readonly GlobalService: GlobalService) {
    this.$isNameValid = new Subject();
    this.$isCityValid = new Subject();
    this.$isMailValid = new Subject();
    this.$isPhoneValid = new Subject();
    this.$isTextValid = new Subject();
  }

  ngOnInit(): void {
    this.isHandset = BREAKING_POINT_PX > getClientWidthPX();

    this.subisNameValid = this.$isNameValid.subscribe(() => {
      this.isNameValid = !!this.name;
    });
    this.subisCityValid = this.$isCityValid.subscribe(() => {
      this.isCityValid = !!this.city;
    });
    this.subisMailValid = this.$isMailValid.subscribe(() => {
      this.isMailValid = !!this.mail;
    });
    this.subisPhoneValid = this.$isPhoneValid.subscribe(() => {
      this.isPhoneValid = !!this.phone;
    });
    this.subisTextValid = this.$isTextValid.subscribe(() => {
      this.isTextValid = !!this.text;
    });
  }

  ngOnDestroy(): void {
    this.subisNameValid.unsubscribe();
    this.subisCityValid.unsubscribe();
    this.subisMailValid.unsubscribe();
    this.subisPhoneValid.unsubscribe();
    this.subisTextValid.unsubscribe();
  }

  public get isFormValid(): boolean {
    this.isNameValid = !!this.name;
    this.isCityValid = !!this.city;
    this.isMailValid = !!this.mail;
    this.isPhoneValid = !!this.phone;
    this.isTextValid = !!this.text;

    return (
      this.isNameValid &&
      this.isCityValid &&
      this.isMailValid &&
      this.isPhoneValid &&
      this.isTextValid
    );
  }

  public send(): void {
    if (!this.isFormValid) {
      alert('All inputs are required.');
      return;
    }

    this.GlobalService.sendContactForm(
      new ContactDTO({
        name: this.name,
        message: this.text,
        city: this.city,
        mail: this.mail,
        phone: this.phone,
      })
    )
      .toPromise()
      .then((res) => {
        alert('Thank you for contacting us!');
      })
      .catch((err) => {
        console.error(err);
        alert(
          `Upss... \n${err.message}. \nBut we are working on it! So try again soon. :D`
        );
      });
  }
}
