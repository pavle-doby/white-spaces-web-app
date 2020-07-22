import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { TabbarButton } from './tabbar.content';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tabbar',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.scss'],
})
export class TabbarComponent implements OnInit {
  public tabbarButtons: TabbarButton[];
  public $tabbarButtons: Observable<TabbarButton[]>;

  constructor(private readonly $store: Store<AppState>) {
    this.$tabbarButtons = this.$store.select(
      (state) => state.checkout.tabbarButtons
    );
  }

  ngOnInit(): void {
    this.$tabbarButtons.subscribe((newTabbarState) => {
      if (!newTabbarState) {
        return;
      }
      this.tabbarButtons = newTabbarState;
    });
  }
}
