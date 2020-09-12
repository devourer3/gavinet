import {
  createAction,
  ActionType,
  createReducer
} from 'typesafe-actions';

interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0
};

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_BY = 'counter/INCREASE_BY';

export const increase = createAction(INCREASE)();
// () => ({ type: INCREASE })
export const decrease = createAction(DECREASE)();
// () => ({ type: DECREASE })
export const increaseBy = createAction(INCREASE_BY)<number>();
// (payload: number) => ({ type: INCREASE_BY, payload })
// 액션의 페이로드로 들어가는 값은 Generic을 사용하여 정해줄 수 있으며,
// 만약 액션의 페이로드에 아무것도 필요 없다면 Generic을 생략하시면 됩니다.

const actions = { increase, decrease, increaseBy };

type CounterAction = ActionType<typeof actions>;

const counter = createReducer<CounterState, CounterAction>(initialState)
  .handleAction(increase, state => ({ count: state.count + 1 }))
  .handleAction(decrease, state => ({ count: state.count - 1 }))
  .handleAction(increaseBy, (state, action) => ({
    count: state.count + action.payload
  }));

export default counter;
