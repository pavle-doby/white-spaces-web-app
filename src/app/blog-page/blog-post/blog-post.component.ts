import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BLOG_POST_MAX_TEXT_LENGTH } from './blog-post.config';
import { MatDialog } from '@angular/material/dialog';
import { BlogDialogComponent } from '../blog-dialog/blog-dialog.component';
import { Subscription } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { MEDIA_QUERY_WIDTH } from 'src/app/app.config';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent implements OnInit, OnDestroy {
  @Input() title: string = 'test';
  @Input() text: string = '';
  @Input() date: string = '';
  matcher: MediaQueryList;
  isMobile: boolean = false;

  private $subOpenDialog: Subscription;

  constructor(
    private window: Window,
    public dialog: MatDialog,
    private mediaMatcher: MediaMatcher
  ) {
    this.matcher = this.mediaMatcher.matchMedia(MEDIA_QUERY_WIDTH);
    this.matcher.addListener((event) => {
      this.isMobile = event.matches;
      console.log(event.matches);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.$subOpenDialog) this.$subOpenDialog.unsubscribe();
  }

  public get textPlaceholder(): string {
    let textDiv = document.createElement('div');
    textDiv.innerHTML = this.text;
    let plainText = textDiv.innerText;
    textDiv = null;

    return plainText.length <= BLOG_POST_MAX_TEXT_LENGTH
      ? plainText
      : `${plainText.substring(0, BLOG_POST_MAX_TEXT_LENGTH)}...`;
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(BlogDialogComponent, {
      data: { title: this.title, text: this.text },
    });

    this.$subOpenDialog = dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
