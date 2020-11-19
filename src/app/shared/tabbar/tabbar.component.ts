import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { TabbarButton } from './tabbar.content';
import { Observable, Subscription } from 'rxjs';
import { clone, isHandset } from '../Utilities';
import { TabbarText } from 'src/models/TabbarText.model';

@Component({
  selector: 'app-tabbar',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.scss'],
})
export class TabbarComponent implements OnInit, OnDestroy {
  public tabbarButtons: TabbarButton[];

  public $tabbarButtons: Observable<TabbarButton[]>;
  public $subTabbarButtons: Subscription;

  public isHandset: boolean = isHandset();

  public selectedButton: TabbarButton;
  public prevButton: TabbarButton;
  public nextButton: TabbarButton;

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

      const selectedIndex = newTabbarState.findIndex((btn) => btn.isSelected);

      const isSelectedFirst = selectedIndex === 0;
      const isSelectedLast = selectedIndex === newTabbarState.length - 1;

      const prevIndex = isSelectedFirst ? null : selectedIndex - 1;
      const nextIndex = isSelectedLast ? null : selectedIndex + 1;

      this.selectedButton = { ...newTabbarState[selectedIndex] };
      this.prevButton = prevIndex !== null ? newTabbarState[prevIndex] : null;
      this.nextButton = nextIndex ? newTabbarState[nextIndex] : null;

      // if (this.selectedButton.text === TabbarText.QUESTIONNARIE) {
      //   this.selectedButton.text = 'Questionnaire';
      // }

       
    });
  }

  ngOnDestroy(): void {
    if (this.$subTabbarButtons) this.$subTabbarButtons.unsubscribe();
  }
}
