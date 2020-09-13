import {
  createAction,
  ActionType,
  createReducer
} from 'typesafe-actions';

interface GlobalState {
  isShowDialog: boolean,
  deleteId: string,
}

const initialState: GlobalState = {
  isShowDialog: false,
  deleteId: "",
};

const SHOW_DIALOG = 'global/SHOW_DIALOG';
const DISMISS_DIALOG = 'global/DISMISS_DIALOG';

export const showDialog = createAction(SHOW_DIALOG, args => {
  return args
})();
export const dismissDialog = createAction(DISMISS_DIALOG, args => {
  return args
})();
const globalAction = {showDialog, dismissDialog};

type GlobalAction = ActionType<typeof globalAction>;

const globalModules = createReducer<GlobalState, GlobalAction>(initialState)
  .handleAction(showDialog, (state, action) => (
    {
      isShowDialog: true,
      deleteId: action.payload
    }
  ))
  .handleAction(dismissDialog,  (state, action) => (
    {
      isShowDialog: false,
      deleteId: action.payload
    }
  ));

export default globalModules;
