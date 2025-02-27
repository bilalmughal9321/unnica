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

// ------------------------- Api ----------------------------

interface ApiState {
  type: string;
  loading: boolean;
  error: string | null;
  response: object;
}

const ApiInititalState: ApiState = {
  type: '',
  loading: false,
  error: null,
  response: {},
};

const NFC_TEST = 'NFC_TEST';
const NFC_RESPONSE = 'NFC_RESPONSE';
const NFC_ERROR = 'NFC_ERROR';

const apiReducer = (state = ApiInititalState, action: any) => {
  switch (action.type) {
    case NFC_TEST:
      return {
        ...state,
        loading: true,
      };

    case NFC_RESPONSE:
      return {
        ...state,
        loading: false,
        response: action.payload,
      };

    case NFC_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// ------------ X ------------ X ----------- X -----------------

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

//  New Work

import * as request from './actionTypes';

interface ApiState2 {
  load: boolean;
  err: {[key: string]: string | null};
  data: {[key: string]: any};
}

const startState: ApiState2 = {
  load: false,
  err: {},
  data: {},
};

const unnicaReducer = (state = startState, action: any) => {
  const {apiType, data, error} = action.payload || {};

  switch (action.type) {
    case 'API_REQUEST':
      const newState = {
        ...state,
        load: true,
        err: {...state.err, [apiType]: null},
      };

      console.log('🔵 After Update:', newState.load);
      return newState;

    case 'API_SUCCESS':
      return {
        ...state,
        load: false,
        data: {...state.data, [apiType]: data},
      };

    case 'API_FAILURE':
      console.log('🟡 Before Update:', state.err);
      console.log('🟢 Updating load state for:', apiType);

      const newState2 = {
        ...state,
        load: false,
        err: {...state.err, [apiType]: error},
      };

      console.log('🔵 After Update:', newState2.err);

      return newState2;

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  // counterReducer: exampleReducer,
  // cardReducer: CardReducer,
  // ApiReducer: apiReducer,
  Unnica: unnicaReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
