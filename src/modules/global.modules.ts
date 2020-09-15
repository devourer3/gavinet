import {
  createAction,
  ActionType,
  createReducer
} from 'typesafe-actions';

interface GlobalState {
  isShowDialog: boolean,
  isModifyDialog: boolean,
  deleteId: string,
  modifyId: string,
  titleModified: string,
  contentModified: string
}

const initialState: GlobalState = {
  isShowDialog: false,
  isModifyDialog: false,
  deleteId: "",
  modifyId: "",
  titleModified: "",
  contentModified: ""
};

const SHOW_DIALOG = 'global/SHOW_DIALOG';
const DISMISS_DIALOG = 'global/DISMISS_DIALOG';
const MODIFY_QUESTION = 'global/MODIFY_QUESTION';
const MODIFY_TITLE = 'global/MODIFY_TITLE';
const MODIFY_CONTENT = 'global/MODIFY_CONTENT';


export const actionShowDialog = createAction(SHOW_DIALOG, args => args)();
export const actionDismissDialog = createAction(DISMISS_DIALOG)();
export const actionModifyQuestion = createAction(MODIFY_QUESTION, args => args)();
export const actionModifyTitle = createAction(MODIFY_TITLE, args => args)();
export const actionModifyContent = createAction(MODIFY_CONTENT, args => args)();

const globalAction = {
  actionShowDialog,
  actionDismissDialog,
  actionModifyQuestion,
  actionModifyTitle,
  actionModifyContent
};

type GlobalAction = ActionType<typeof globalAction>;

const globalModules = createReducer<GlobalState, GlobalAction>(initialState)
  .handleAction(actionShowDialog, (state, action) => (
    {
      ...state,
      isShowDialog: true,
      deleteId: action.payload.id
    }
  ))
  .handleAction(actionDismissDialog, (state, action) => (
    {
      ...state,
      isShowDialog: false,
      deleteId: ""
    }
  ))
  .handleAction(actionModifyQuestion, (state, action) => (
    {
      ...state,
      modifyId: action.payload.id,
      titleModified: action.payload.title,
      contentModified: action.payload.content,
      isModifyDialog: action.payload.dialog
    }
  ))
  .handleAction(actionModifyTitle, (state, action) => (
    {
      ...state,
      titleModified: action.payload.title,
    }
  ))
  .handleAction(actionModifyContent, (state, action) => (
    {
      ...state,
      contentModified: action.payload.content,
    }
  ))

;

export default globalModules;
