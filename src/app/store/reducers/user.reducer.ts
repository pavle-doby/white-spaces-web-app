import { AppUser } from '../../../models/User.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { createReducer, Action, on } from '@ngrx/store';
import { setUser, clearUser } from '../actions/user.actions';

export interface UserState {
  user: AppUser;
}

const initState: UserState = {
  user: LocalStorageService.Instance.User ?? null,
};

const reducer = createReducer(
  initState,
  on(setUser, (state, { user }) => {
    LocalStorageService.Instance.User = user;
    return { ...state, user: { ...user } };
  }),
  on(clearUser, (state) => {
    LocalStorageService.Instance.User = null;
    return { ...state, user: null };
  })
);

export default function (state: UserState = initState, action: Action) {
  return reducer(state, action);
}
