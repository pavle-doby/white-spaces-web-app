import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { BlogDetails } from 'src/models/BlogDetails.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss'],
})
export class BlogDetailsComponent implements OnInit {
  public $blogDetails: Observable<BlogDetails>;
  public blogDetails: BlogDetails;

  constructor(
    private readonly adminService: AdminService,
    private readonly activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      const { id } = params;
      this.adminService
        .getAllBlogs()
        .toPromise()
        .then((res) => {
          const blog = res.find((b) => b.id === +id);
          this.blogDetails = new BlogDetails({
            id: blog.id,
            title: blog.additional_data.blog_title,
            innterHTML: blog.text,
          });
        })
        .catch(console.error);
    });
  }
}
