import { Component, OnInit } from '@angular/core';
import { FOOTER_MAIN_MESSAGE } from './footer.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public title: string = FOOTER_MAIN_MESSAGE;
  public showScrollMessage: boolean = false;
  constructor(private router: Router) {
    this.showScrollMessage = this.router.url === '/';
  }

  ngOnInit(): void {}
}
