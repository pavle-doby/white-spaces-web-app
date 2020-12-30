import { getExtension } from 'src/app/shared/Utilities';

const UUID_LENGTH = 36;

export class Image {
  public src: string;
  public srcToShow?: string;
  public alt?: string;
  public id?: string;
  public name?: string;

  constructor(obj: Image) {
    this.src = obj.src;
    this.srcToShow = obj.srcToShow ?? obj.src;
    this.alt = obj.alt;
    this.id = obj.id;
    this.name = obj.name ?? Image.getNameFromS3Src(obj.src);
  }

  public static getNameFromS3Src(
    src: string,
    withExtension: boolean = true
  ): string {
    if (!src) {
      return '';
    }
    const ext = getExtension(src);
    const srcWithoutExt = src.replace(ext, '');
    const uuid = srcWithoutExt.slice(
      srcWithoutExt.length - UUID_LENGTH,
      srcWithoutExt.length
    );
    const srcWithoutUUID = withExtension
      ? src.replace(uuid, '')
      : srcWithoutExt.replace(uuid, '');
    const srcArr = srcWithoutUUID.split('/');
    return srcArr[srcArr.length - 1];
  }
}
