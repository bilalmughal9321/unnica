// redux/reducers/index.ts
import {combineReducers} from 'redux';

interface ExampleState {
  count: number;
}

const initialState: ExampleState = {
  count: 0,
};

const exampleReducer = (state = initialState, action: {type: string}) => {
  switch (action.type) {
    case 'INCREMENT':
      return {...state, count: state.count + 1};
    case 'DECREMENT':
      return {...state, count: state.count - 1};
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  example: exampleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
