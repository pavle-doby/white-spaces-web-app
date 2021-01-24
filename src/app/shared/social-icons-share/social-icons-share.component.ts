import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  faFacebook,
  faLinkedin,
  faPinterest,
  faTwitter,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { DOMAIN_URL } from 'src/app/app.config';
import { BlogPath } from 'src/app/blog-page/BlogPath.enum';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';

@Component({
  selector: 'app-social-icons-share',
  templateUrl: './social-icons-share.component.html',
  styleUrls: ['./social-icons-share.component.scss'],
})
export class SocialIconsShareComponent implements OnInit {
  public icons: Record<string, IconDefinition> = {
    facebook: faFacebook,
    pinterest: faPinterest,
    linkedIn: faLinkedin,
    twitter: faTwitter,
    email: faMailBulk,
  };

  @Input() blogId: number = null;

  public url: string;

  constructor() {}

  ngOnInit(): void {
    this.url = this.blogId
      ? `${DOMAIN_URL}/${MainRouterPaths.BLOG}/${BlogPath.DETAILS}?id=${this.blogId}`
      : DOMAIN_URL;
  }
}
