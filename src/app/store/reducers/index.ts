import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  Action,
} from '@ngrx/store';
import { environment } from 'src/environments/environment';

export interface AppState {

}

export const reducers: ActionReducerMap<any> = {

};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
