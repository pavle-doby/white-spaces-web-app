import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import checkoutReducer, { CheckoutState } from './reducers/checkout.reducer';
import userReducer, { UserState } from './reducers/user.reducer';

export interface AppState {
  checkout: CheckoutState;
  user: UserState;
}

export const reducers: ActionReducerMap<any> = {
  checkout: checkoutReducer,
  user: userReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
