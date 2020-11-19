import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import checkoutReducer, { CheckoutState } from './reducers/checkout.reducer';
import navbarReducer, { NavbarState } from './reducers/navbar.reducer';
import userReducer, { UserState } from './reducers/user.reducer';

export interface AppState {
  checkout: CheckoutState;
  user: UserState;
  navbar: NavbarState;
}

export const reducers: ActionReducerMap<any> = {
  checkout: checkoutReducer,
  user: userReducer,
  navbar: navbarReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
