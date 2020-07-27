import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  Action,
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import checkoutReducer, { CheckoutState } from './reducers/checkout.reducer';

export interface AppState {
  checkout: CheckoutState;
}

export const reducers: ActionReducerMap<any> = {
  checkout: checkoutReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
