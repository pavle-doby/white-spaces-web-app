import { Component, OnInit } from '@angular/core';
import { MAIL_FOR_CLIENTS } from 'src/app/app.config';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent implements OnInit {
  public readonly mail: string = MAIL_FOR_CLIENTS;
  public readonly mailHref: string = `mailto:${this.mail}`;

  constructor() {}

  ngOnInit(): void {}
}
