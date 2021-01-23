import { Component, Input, OnInit } from '@angular/core';
import { DOMAIN_URL } from 'src/app/app.config';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';

@Component({
  selector: 'app-social-icons-share',
  templateUrl: './social-icons-share.component.html',
  styleUrls: ['./social-icons-share.component.scss'],
})
export class SocialIconsShareComponent implements OnInit {
  @Input() whiteIcons: boolean = false;
  @Input() blogId: number = null;

  public readonly url = this.blogId
    ? `${DOMAIN_URL}/${MainRouterPaths.BLOG}?id=${this.blogId}`
    : DOMAIN_URL;

  constructor() {}

  ngOnInit(): void {}
}
