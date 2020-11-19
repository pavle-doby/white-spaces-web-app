import { Component, OnInit } from '@angular/core';
import { DOMAIN_NAME, MAIL_FOR_CLIENTS } from 'src/app/app.config';

export class PrivacyPolicyDialogData {
  constructor() {}
}

@Component({
  selector: 'app-privacy-policy-dialog',
  templateUrl: './privacy-policy-dialog.component.html',
  styleUrls: ['./privacy-policy-dialog.component.scss'],
})
export class PrivacyPolicyDialogComponent implements OnInit {
  public readonly mail: string = MAIL_FOR_CLIENTS;
  public readonly mailHref: string = `mailto:${this.mail}`;

  public readonly domainName = DOMAIN_NAME;

  constructor() {}

  ngOnInit(): void {}
}
