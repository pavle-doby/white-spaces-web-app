import { createAction, props } from '@ngrx/store';
import { PackagesBox } from 'src/app/shared/side-card-packages/side-card-packages-box/side-card-packages-box.component';

export const selectPackage = createAction(
  '[CHECKOUT] SELECT_PACKAGE',
  props<{ packageBox: PackagesBox }>()
);
