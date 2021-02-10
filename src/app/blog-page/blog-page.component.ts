import { Component, HostListener, OnInit } from '@angular/core';
import { throttleTime } from 'rxjs/internal/operators/throttleTime';
import { Subject } from 'rxjs/internal/Subject';
import { SCROLL_BEHAVIOR, SCROLL_SPEED } from '../app.config';
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

  //scroll
  public scrollLeftSub: Subject<void> = new Subject<void>();
  public scrollRightSub: Subject<void> = new Subject<void>();

  private throttleDuration: number = 500; // in ms
  private scrollOffset = 500; // in px

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

  ngOnInit(): void {
    this.scrollRightSub
      .pipe(throttleTime(this.throttleDuration))
      .subscribe(() => {
        this.scrollRight();
      });

    this.scrollLeftSub
      .pipe(throttleTime(this.throttleDuration))
      .subscribe(() => {
        this.scrollLeft();
      });
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'PageDown':
      case 'ArrowDown':
      case 'ArrowRight': {
        this.scrollRightSub.next();
        break;
      }
      case 'PageUp':
      case 'ArrowUp':
      case 'ArrowLeft': {
        this.scrollLeftSub.next();
        break;
      }
      default: {
        break;
      }
    }
  }

  scrollRight(): void {
    window.scrollBy({
      left: this.scrollOffset,
      top: 0,
      behavior: SCROLL_BEHAVIOR,
    });
  }

  scrollLeft(): void {
    window.scrollBy({
      left: -this.scrollOffset,
      top: 0,
      behavior: SCROLL_BEHAVIOR,
    });
  }

  // public onMouseWheel($event: WheelEvent): void {
  //   const x = $event.deltaX || $event.deltaY;
  //   const goRight = x > 0;

  //   if (goRight) {
  //     this.scrollRightSub.next();
  //   } else {
  //     this.scrollLeftSub.next();
  //   }

  //   console.log('scroll blog');
  // }
}
