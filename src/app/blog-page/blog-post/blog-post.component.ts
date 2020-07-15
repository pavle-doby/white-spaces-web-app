import { Component, OnInit, Input } from '@angular/core';
import { BLOG_POST_MAX_TEXT_LENGTH } from './blog-post.config';
import { MatDialog } from '@angular/material/dialog';
import { BlogDialogComponent } from '../blog-dialog/blog-dialog.component';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent implements OnInit {
  @Input() title: string = 'test';
  @Input() text: string =
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam recusandae dolores libero perspiciatis iusto quod quasi optio repudiandae aspernatur fugiat necessitatibus velit nobis, autem facilis.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam recusandae dolores libero perspiciatis iusto quod quasi optio repudiandae aspernatur fugiat necessitatibus velit nobis, autem facilis.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam recusandae dolores libero perspiciatis iusto quod quasi optio repudiandae aspernatur fugiat necessitatibus velit nobis, autem facilis.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam recusandae dolores libero perspiciatis iusto quod quasi optio repudiandae aspernatur fugiat necessitatibus velit nobis, autem facilis.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam recusandae dolores libero perspiciatis iusto quod quasi optio repudiandae aspernatur fugiat necessitatibus velit nobis, autem facilis.';
  @Input() attachment: string = '';
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  public get textPlaceholder(): string {
    return this.text.length <= BLOG_POST_MAX_TEXT_LENGTH
      ? this.text
      : `${this.text.substring(0, BLOG_POST_MAX_TEXT_LENGTH)}...`;
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(BlogDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
