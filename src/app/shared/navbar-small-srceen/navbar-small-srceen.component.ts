import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';
import { Router } from '@angular/router';
import { LinkText } from 'src/models/LinkText.model';
import { BREAKING_POINT_PX } from 'src/app/app.config';
import { getClientWidthPX } from '../Utilities';

@Component({
  selector: 'app-navbar-small-srceen',
  templateUrl: './navbar-small-srceen.component.html',
  styleUrls: ['./navbar-small-srceen.component.scss'],
})
export class NavbarSmallSrceenComponent implements OnInit {
  public homeLink: string = `/${MainRouterPaths.HOME}`;
  public packagesLink: string = `/${MainRouterPaths.PACKAGES}`;
  public fqasLink: string = `/${MainRouterPaths.FQAS}`;
  public blogLink: string = `/${MainRouterPaths.BLOG}`;
  public aboutLink: string = `/${MainRouterPaths.ABOUT}`;
  public contactLink: string = `/${MainRouterPaths.CONTACT}`;

  public linkAndTextList: LinkText[] = [
    new LinkText({ link: this.homeLink, text: 'Home' }),
    new LinkText({ link: this.packagesLink, text: 'Packages' }),
    new LinkText({ link: this.fqasLink, text: `FAQ'S` }),
    new LinkText({ link: this.blogLink, text: 'Blog' }),
    new LinkText({ link: this.aboutLink, text: 'About' }),
    new LinkText({ link: this.contactLink, text: 'Contact' }),
  ];

  public isHandset: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.isHandset = BREAKING_POINT_PX > getClientWidthPX();
  }

  public navigateByUrl(link: string): void {
    this.router.navigateByUrl(link);
  }
}
