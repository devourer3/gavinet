import {ActionType, createAction, createReducer} from "typesafe-actions";

export interface SearchItem {
  title: string;
  desc: string;
}

const initialState: SearchItem = {
  title: "",
  desc: "",
};

const INCREASE = 'restaurant/INCREASE';
const DECREASE = 'restaurant/DECREASE';
const INCREASE_BY = 'restaurant/INCREASE_BY';

export const increase = createAction(INCREASE)();
export const decrease = createAction(DECREASE)();
export const increaseBy = createAction(INCREASE_BY)<number>();
// (payload: number) => ({ type: INCREASE_BY, payload })
// 액션의 페이로드로 들어가는 값은 Generic을 사용하여 정해줄 수 있으며,
// 만약 액션의 페이로드에 아무것도 필요 없다면 Generic을 생략하시면 됩니다.

const actions = { increase, decrease, increaseBy };

type CounterAction = ActionType<typeof actions>;

// const restaurant = createReducer<RestaurantInterface, CounterAction>(initialState)
//   .handleAction(increase, state => ({ count: state.count + 1 }))
//   .handleAction(decrease, state => ({ count: state.count - 1 }))
//   .handleAction(increaseBy, (state, action) => ({
//     count: state.count + action.payload
//   }));

// export default restaurant;
