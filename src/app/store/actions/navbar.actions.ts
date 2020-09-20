import { createAction, props } from '@ngrx/store';
import { NavbarButtons } from 'src/app/shared/navbar/navbar.content';

export const navbarButtonClick = createAction(
  '[NAVBAR] navbarButtonClick',
  props<{ button: NavbarButtons }>()
);

export const closeNavbarCard = createAction('[NAVBAR] closeNavbarCard');
