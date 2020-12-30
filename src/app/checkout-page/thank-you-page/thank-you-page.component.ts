import { Component, OnInit } from '@angular/core';
import { isHandset } from 'src/app/shared/Utilities';

@Component({
  selector: 'app-thank-you-page',
  templateUrl: './thank-you-page.component.html',
  styleUrls: ['./thank-you-page.component.scss'],
})
export class ThankYouPageComponent implements OnInit {
  public isHandset: boolean = isHandset();
  constructor() {}

  ngOnInit(): void {}
}
