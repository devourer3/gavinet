import {combineReducers} from "redux";
import counterModules from "./counter.modules";
import globalModules from "./global.modules"

const rootReducer = combineReducers({
  // counter: counterModules,
  globals: globalModules
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
