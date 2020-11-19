import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-icons',
  templateUrl: './social-icons.component.html',
  styleUrls: ['./social-icons.component.scss'],
})
export class SocialIconsComponent implements OnInit {
  @Input()
  public whiteIcons: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
