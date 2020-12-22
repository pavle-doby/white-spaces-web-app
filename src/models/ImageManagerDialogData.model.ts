import { Image } from 'src/models/Image.model';
import { ImageGridConfig } from '../app/shared/image-grid/models/ImageGridConfig.model';
import { ImageManagerConfig } from '../app/shared/image-manager/models/ImageManagerConfig.model';
import { UploadConfig } from '../app/shared/upload/upload.model';

export class ImageManagerDialogData {
  public uploadConfig: UploadConfig;
  public gridConfig?: ImageGridConfig;
  public managerConfig?: ImageManagerConfig;
  public images?: Image[];
  public title?: string;

  constructor(obj: ImageManagerDialogData) {
    this.uploadConfig = obj.uploadConfig;
    this.gridConfig = obj.gridConfig;
    this.managerConfig = obj.managerConfig;
    this.images = obj.images ?? [];
    this.title = obj.title;
  }
}
