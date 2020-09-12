import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { UploadData } from './upload.model';
import { Subscription, fromEvent, Observable } from 'rxjs';

export const SUPPERTED_FILES = '.dwg, .pdf, .jpg, .jpeg, .png ';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit, OnDestroy {
  @Input()
  public data?: UploadData;
  @Input()
  public supportedFileTypes: string = SUPPERTED_FILES;

  @Output()
  public uploadEvent: EventEmitter<FileList>;

  @ViewChild('fileUpload23')
  public uploadElement: ElementRef;

  public $upload: Observable<any>;
  private $subUpload: Subscription;

  constructor() {
    this.uploadEvent = new EventEmitter();
  }

  ngOnInit(): void {
    this.data.supportedFileTypes =
      this.data.supportedFileTypes ?? SUPPERTED_FILES;

    this.data.info =
      this.data.info ??
      `Make sure that file is in any of the following formats\n ${this.data.supportedFileTypes}`;

    this.data.bottomInfo =
      this.data.bottomInfo ?? `You can upload: ${this.data.limit}`;
  }

  ngAfterViewInit(): void {
    this.$upload = fromEvent(this.uploadElement.nativeElement, 'change');
    this.$subUpload = this.$upload.subscribe((event) => {
      const files = (event.target as any).files;
      this.uploadEvent.emit(files);
    });
  }

  ngOnDestroy(): void {
    if (this.$subUpload) this.$subUpload.unsubscribe();
  }

  public onUpload(): void {
    this.uploadElement.nativeElement.click();
  }
}
