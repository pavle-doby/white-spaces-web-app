export class ImageManagerConfig {
  public title?: string;
  public showDragNDrop?: boolean;
  public showGrid?: boolean;

  constructor(obj: ImageManagerConfig) {
    this.title = obj.title ?? 'Image Manager';
    this.showDragNDrop = obj.showDragNDrop ?? true;
    this.showGrid = obj.showGrid ?? true;
  }
}
