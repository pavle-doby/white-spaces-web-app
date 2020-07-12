import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss'],
})
export class AttachmentComponent implements OnInit {
  @Input() photo: string = '213';
  @Input() video: string = '123';
  @Input() pdf: string = '123';
  constructor() {}

  ngOnInit(): void {}

  public get hasNoInputs() {
    return this.photo || this.video || this.pdf;
  }
}
