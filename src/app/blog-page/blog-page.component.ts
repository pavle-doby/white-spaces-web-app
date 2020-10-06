import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
})
export class BlogPageComponent implements OnInit {
  public topBlogPosts: any = [];
  public bottomBlogPosts: any = [];
  public ready: boolean = false;
  constructor(private window: Window, private adminService: AdminService) {
    this.window.document.body.style.width = 'auto';
    this.adminService.getAllBlogs().subscribe((res) => {
      console.log(res);

      const data = [...res];
      data.forEach((element, index) => {
        let elementData = {
          id: element.id,
          title: element.additional_data.blog_title,
          text: element.text,
          date: new Date(element.creation_date).toLocaleDateString(),
        };
        let orientation = index % 2 === 0;
        if (orientation)
          this.topBlogPosts = [...this.topBlogPosts, elementData];
        else this.bottomBlogPosts = [...this.bottomBlogPosts, elementData];
      });
      this.ready = true;
      console.log(this.topBlogPosts, this.bottomBlogPosts);
    });
  }

  ngOnInit(): void {}
}
