import { createReducer, Action, on } from '@ngrx/store';
import { NavbarButtons } from 'src/app/shared/navbar/navbar.content';
import { closeNavbarCard, navbarButtonClick } from '../actions/navbar.actions';

export interface NavbarState {
  selectedButton: NavbarButtons;
}

const initState: NavbarState = {
  selectedButton: NavbarButtons.ABOUT,
};

const reducer = createReducer(
  initState,
  on(navbarButtonClick, (state, { button }) => {
    return { ...state, selectedButton: button };
  }),
  on(closeNavbarCard, (state) => {
    return { ...state, selectedButton: null };
  })
);

export default function (state: NavbarState = initState, action: Action) {
  return reducer(state, action);
}
