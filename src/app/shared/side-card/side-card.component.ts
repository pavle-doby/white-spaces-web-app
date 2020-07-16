import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-side-card',
  templateUrl: './side-card.component.html',
  styleUrls: ['./side-card.component.scss'],
  animations: [
    trigger('sideCardTrigger', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('850ms', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('850ms', style({ transform: 'translateX(100%)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class SideCardComponent implements OnInit {
  @Input()
  public toShow: boolean;

  constructor() {}

  ngOnInit(): void {}
}
