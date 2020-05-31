import { Component, OnInit } from '@angular/core';
import { FOOTER_MAIN_MESSAGE } from './footer.config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public title: string = FOOTER_MAIN_MESSAGE;
  constructor() {}

  ngOnInit(): void {}
}
