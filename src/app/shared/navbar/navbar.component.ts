import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NavbarButtons,
  NavbarButtonsArray,
  NavBtnsInitStateObj,
} from './navbar.content';
import { Router } from '@angular/router';
import { MainRouterPaths } from 'src/models/MainRouterPaths.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable, Subscription } from 'rxjs';
import { NavbarState } from 'src/app/store/reducers/navbar.reducer';
import { navbarButtonClick } from 'src/app/store/actions/navbar.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  public navbarState$: Observable<NavbarState>;
  public subNavbarState: Subscription;

  public navbarButtonsArray: NavbarButtons[];
  public navBtnsStateObj: Record<NavbarButtons, boolean>;
  public selectedButton: NavbarButtons;

  
  public readonly PACKAGES = NavbarButtons.PACKAGES;
  public readonly FQAS = NavbarButtons.FQAS;
  public readonly BLOG = NavbarButtons.BLOG;
  public readonly ABOUT = NavbarButtons.ABOUT;
  public readonly CONTACT = NavbarButtons.CONTACT;


  constructor(
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) {
    this.navbarState$ = this.store.select((state) => state.navbar);

    this.navbarButtonsArray = [...NavbarButtonsArray];
    this.navBtnsStateObj = { ...NavBtnsInitStateObj };
  }

  ngOnInit(): void {
    this.subNavbarState = this.navbarState$.subscribe((navbarState) => {
      this.changeNavbarState(navbarState.selectedButton);
    });
  }

  ngOnDestroy(): void {
    this.subNavbarState.unsubscribe();
  }

  public onNavButtonClick(button: NavbarButtons): void {
    this.store.dispatch(navbarButtonClick({ button: button }));
  }

  private changeNavbarState(button: NavbarButtons): void {
    const isSelected = !this.navBtnsStateObj[button];
    this.navBtnsStateObj = { ...NavBtnsInitStateObj };
    this.navBtnsStateObj[button] = isSelected;
    this.selectedButton = isSelected ? button : null;

    if (button === NavbarButtons.BLOG) {
      this.router.navigateByUrl(`/${MainRouterPaths.BLOG}`);
    }
  }
}
