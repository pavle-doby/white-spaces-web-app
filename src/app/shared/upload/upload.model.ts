export class UploadData {
  public message?: string;
  public info?: string;
  public limit: number;
  public file?: File;
  public isMultiple?: boolean;

  constructor(obj: UploadData) {
    this.message = obj.message;
    this.info = obj.info;
    this.file = obj.file;
    this.limit = obj.limit;
    this.isMultiple = this.limit > 1;
  }
}
