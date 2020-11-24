import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { isHandset } from '../shared/Utilities';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
})
export class BlogPageComponent implements OnInit {
  public topBlogPosts: any = [];
  public bottomBlogPosts: any = [];
  public ready: boolean = false;

  public isHandset: boolean = isHandset();

  constructor(private window: Window, private adminService: AdminService) {
    this.window.document.body.style.width = 'auto';
    this.adminService.getAllBlogs().subscribe((res) => {
      const data = [...res];
      data.forEach((element, index) => {
        let elementData = {
          id: element.id,
          title: element.additional_data.blog_title,
          text: element.text,
          date: new Date(element.creation_date).toLocaleDateString(),
        };

        if (this.isHandset) {
          this.topBlogPosts = [...this.topBlogPosts, elementData];
          return;
        }

        let orientation = index % 2 === 0;

        if (orientation)
          this.topBlogPosts = [...this.topBlogPosts, elementData];
        else this.bottomBlogPosts = [...this.bottomBlogPosts, elementData];
      });
      this.ready = true;
    });
  }

  ngOnInit(): void {}
}
