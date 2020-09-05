import { createAction, props } from '@ngrx/store';
import { AppUser } from '../../../models/User.model';

export const setUser = createAction(
  '[USER] setUser',
  props<{ user: AppUser }>()
);

export const clearUser = createAction('[USER] clearUser');
