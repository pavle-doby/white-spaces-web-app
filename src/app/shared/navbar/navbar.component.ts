import { Component, OnInit } from '@angular/core';
import {
  NavbarButtons,
  NavbarButtonsArray,
  NavBtnsInitStateObj,
} from './navbar.content';
import { Router } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public navbarButtonsArray: NavbarButtons[];
  public navBtnsStateObj: Record<NavbarButtons, boolean>;
  public selectedButton: NavbarButtons;

  public readonly FQAS = NavbarButtons.FQAS;

  constructor(private readonly router: Router) {
    this.navbarButtonsArray = [...NavbarButtonsArray];
    this.navBtnsStateObj = { ...NavBtnsInitStateObj };
  }

  ngOnInit(): void {}

  public onNavButtonClick(button: NavbarButtons): void {
    const isSelected = !this.navBtnsStateObj[button];
    this.navBtnsStateObj = { ...NavBtnsInitStateObj };
    this.navBtnsStateObj[button] = isSelected;
    this.selectedButton = isSelected ? button : null;

    if (button === NavbarButtons.BLOG) {
      this.router.navigateByUrl(`/${MainRouterPaths.BLOG}`);
    }
  }
}
