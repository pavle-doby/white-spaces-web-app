import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  BLOG_POST_MAX_TEXT_LENGTH,
  BLOG_POST_MAX_TEXT_LENGTH_HANDSET,
} from './blog-post.config';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { MEDIA_QUERY_WIDTH } from 'src/app/app.config';
import { isHandset } from 'src/app/shared/Utilities';
import { BlogPath } from '../BlogPath.enum';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent implements OnInit, OnDestroy {
  @Input() id: number;
  @Input() title: string = 'test';
  @Input() text: string = '';
  @Input() date: string = '';

  matcher: MediaQueryList;
  isMobile: boolean = false;

  public url: string;

  private $subOpenDialog: Subscription;

  constructor(
    private readonly window: Window,
    public readonly dialog: MatDialog,
    private readonly mediaMatcher: MediaMatcher
  ) {
    this.matcher = this.mediaMatcher.matchMedia(MEDIA_QUERY_WIDTH);
    this.matcher.addListener((event) => {
      this.isMobile = event.matches;
    });
  }

  ngOnInit(): void {
    this.url = `/${MainRouterPaths.BLOG}/${BlogPath.DETAILS}?id=${this.id}`;
  }

  ngOnDestroy(): void {
    if (this.$subOpenDialog) this.$subOpenDialog.unsubscribe();
  }

  public get textPlaceholder(): string {
    let textDiv = document.createElement('div');
    textDiv.innerHTML = this.text;
    let plainText = textDiv.innerText;
    textDiv = null;

    const maxLength = isHandset()
      ? BLOG_POST_MAX_TEXT_LENGTH_HANDSET
      : BLOG_POST_MAX_TEXT_LENGTH;

    return plainText.length <= maxLength
      ? plainText
      : `${plainText.substring(0, maxLength)}...`;
  }
}
