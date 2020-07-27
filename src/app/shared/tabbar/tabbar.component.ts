import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { TabbarButton } from './tabbar.content';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-tabbar',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.scss'],
})
export class TabbarComponent implements OnInit, OnDestroy {
  public tabbarButtons: TabbarButton[];
  public $tabbarButtons: Observable<TabbarButton[]>;
  public $subTabbarButtons: Subscription;

  constructor(private readonly $store: Store<AppState>) {
    this.$tabbarButtons = this.$store.select(
      (state) => state.checkout.tabbarButtons
    );
  }

  ngOnInit(): void {
    this.$subTabbarButtons = this.$tabbarButtons.subscribe((newTabbarState) => {
      if (!newTabbarState) {
        return;
      }
      this.tabbarButtons = newTabbarState;
    });
  }

  ngOnDestroy(): void {
    if (this.$subTabbarButtons) this.$subTabbarButtons.unsubscribe();
  }
}
