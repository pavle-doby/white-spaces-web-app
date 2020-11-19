import { PackagesBox } from './side-card-packages-box/side-card-packages-box.component';

export class SideCadrPackage {
  constructor(
    public box: PackagesBox,
    public descriptions: string[],
    public isSelected: boolean = false
  ) {}
}
