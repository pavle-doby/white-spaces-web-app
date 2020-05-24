import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-opening-label',
  templateUrl: './opening-label.component.html',
  styleUrls: ['./opening-label.component.scss'],
})
export class OpeningLabelComponent implements OnInit {
  @Input()
  public label: string;
  @Input()
  public description: string;

  public toShowDescription: boolean;

  constructor() {
    this.toShowDescription = false;
  }

  ngOnInit(): void {}

  public showDescription(): void {
    this.toShowDescription = true;
  }

  public hideDescription(): void {
    this.toShowDescription = false;
  }
}
