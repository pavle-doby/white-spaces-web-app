import { TitleSize } from './TitleSize';

export class AppTitle {
  constructor(
    public text: string,
    public gradient: string = null,
    public size: TitleSize = TitleSize.NORMAL_BOLD
  ) {}
}
