export class ImageManagerConfig {
  public title?: string;
  public showDragNDrop?: boolean;
  public showGrid?: boolean;

  constructor(obj: ImageManagerConfig) {
    this.title = obj.title;
    this.showDragNDrop = !!obj.showDragNDrop;
    this.showGrid = obj.showGrid ?? true;
  }
}
