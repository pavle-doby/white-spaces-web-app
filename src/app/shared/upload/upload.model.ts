export class UploadData {
  public limit: number;
  public message?: string;
  public info?: string;
  public bottomInfo?: string;
  public file?: File;
  public isMultiple?: boolean;
  public supportedFileTypes?: string;
  public uppercaseButtonText?: boolean;

  constructor(obj: UploadData) {
    this.message = obj.message;
    this.info = obj.info;
    this.bottomInfo = obj.bottomInfo;
    this.file = obj.file;
    this.limit = obj.limit;
    this.isMultiple = this.limit > 1;
    this.supportedFileTypes = obj.supportedFileTypes;
    this.uppercaseButtonText = obj.uppercaseButtonText ?? false;
  }
}
