import {combineReducers} from "redux";
import counter from "../modules/counter";

const rootReducer = combineReducers({
  counter,
  // articles
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
