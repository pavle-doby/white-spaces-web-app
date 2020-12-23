export class ImageManagerConfig {
  public title?: string;
  public showDragNDrop?: boolean;
  public showGrid?: boolean;
  public dialogOneColMode?: boolean;

  constructor(obj: ImageManagerConfig) {
    this.title = obj.title;
    this.showDragNDrop = !!obj.showDragNDrop;
    this.showGrid = obj.showGrid ?? true;
    this.dialogOneColMode = !!obj.dialogOneColMode;
  }
}
