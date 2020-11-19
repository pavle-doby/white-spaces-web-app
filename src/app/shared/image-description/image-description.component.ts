import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-description',
  templateUrl: './image-description.component.html',
  styleUrls: ['./image-description.component.scss'],
})
export class ImageDescriptionComponent implements OnInit {
  @Input() image: string = '';
  @Input() number: number = 0;
  @Input() description: string = '';

  constructor() {}

  ngOnInit(): void {
    this.description = this.description.toLocaleUpperCase();
  }
}
