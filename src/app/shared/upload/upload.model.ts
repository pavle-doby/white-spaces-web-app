import { TooltipPosition } from '@angular/material/tooltip';
import { TooltipPosition as TooltipPositionEnum } from 'src/models/TooltipPosition.model';

export class UploadConfig {
  public limit: number;
  public message?: string;
  public info?: string;
  public bottomInfo?: string;
  public file?: File;
  public isMultiple?: boolean;
  public supportedFileTypes?: string;
  public uppercaseButtonText?: boolean;
  public tooltipContent?: string;
  public tooltipPosition?: TooltipPosition;

  constructor(obj: UploadConfig) {
    this.message = obj.message;
    this.info = obj.info;
    this.bottomInfo = obj.bottomInfo;
    this.file = obj.file;
    this.limit = obj.limit;
    this.isMultiple = this.limit > 1;
    this.supportedFileTypes = obj.supportedFileTypes;
    this.uppercaseButtonText = obj.uppercaseButtonText ?? false;
    this.tooltipContent =
      obj.tooltipContent ??
      'Drag and drop space is marked with a dashed border.';
    // 'You can drag and drop your files in a place that has a dashed border.';
    this.tooltipPosition = obj.tooltipPosition ?? TooltipPositionEnum.RIGHT;
  }
}
