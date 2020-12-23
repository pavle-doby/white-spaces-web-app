import { IMG_LOADING, IMG_PLACHOLDER } from 'src/app/app.config';

export class ImageGridConfig {
  public limit?: number = 16;
  public imgPlacholder?: string;
  public imgLoading?: string;

  constructor(obj: ImageGridConfig) {
    this.limit = obj.limit ?? 16;
    this.imgPlacholder = obj.imgPlacholder ?? IMG_PLACHOLDER;
    this.imgLoading = obj.imgLoading ?? IMG_LOADING;
  }
}
