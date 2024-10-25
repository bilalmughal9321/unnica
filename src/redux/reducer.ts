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

// # ========================================================================================== #

interface CardState {
  type: string;
  cardDetails: {
    background: string;
    number: string;
    name: string;
    expiry: string;
    cvc: string;
  };
}

const cardInitialState: CardState = {
  cardDetails: {
    background: '',
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  },
  type: '',
};

type CardAction = CardState;

const CardReducer = (state = cardInitialState, action: CardAction) => {
  switch (action.type) {
    case 'SELECTED_CARD':
      console.log('Card Reducer selected');
      return {
        ...state,
        cardDetails: {
          ...state.cardDetails,
          ...action.cardDetails,
        },
      };

    default:
      return state;
  }
};

// # ========================================================================================== #

const rootReducer = combineReducers({
  counterReducer: exampleReducer,
  cardReducer: CardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
