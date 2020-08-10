export class UploadData {
  public message?: string;
  public info?: string;
  public limit: number;
  public file?: File;
  public isMultiple?: boolean;
  public supportedFileTypes?: string;

  constructor(obj: UploadData) {
    this.message = obj.message;
    this.info = obj.info;
    this.file = obj.file;
    this.limit = obj.limit;
    this.isMultiple = this.limit > 1;
    this.supportedFileTypes = obj.supportedFileTypes;
  }
}
