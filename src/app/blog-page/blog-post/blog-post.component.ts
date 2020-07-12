import { Component, OnInit, Input } from '@angular/core';
import { BLOG_POST_MAX_TEXT_LENGTH } from './blog-post.config';

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
  constructor() {}

  ngOnInit(): void {}

  public get textPlaceholder(): string {
    return this.text.length <= BLOG_POST_MAX_TEXT_LENGTH
      ? this.text
      : `${this.text.substring(0, BLOG_POST_MAX_TEXT_LENGTH)}...`;
  }
}
