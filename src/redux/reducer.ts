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
  // data: {[key: string]: any | string};
  data: {
    VERIFY_OTP: {data: string} | null;
    SIGNUP: {data: string} | null;
    SEND_OTP: {data: string} | null;
  };
}

const startState: ApiState2 = {
  load: false,
  err: {},
  data: {VERIFY_OTP: null, SIGNUP: null, SEND_OTP: null},
};

const unnicaReducer = (state = startState, action: any) => {
  const {apiType, data, error} = action.payload || {};

  switch (action.type) {
    case 'API_REQUEST':
      console.log('');
      console.log('🟡🟡🟡🟡🟡🟡🟡🟡');
      console.log('State:', apiType);
      const newState = {
        ...state,
        load: true,
        err: {...state.err, [apiType]: null},
      };
      return newState;

    case 'API_SUCCESS':
      console.log('');
      console.log('🟢🟢🟢🟢🟢🟢🟢🟢');
      console.log('State:', apiType);
      console.log('Before Update:', state.data);

      const newState3 = {
        ...state,
        load: false,
        data: {...state.data, [apiType]: data},
      };

      console.log('After:', newState3.data);
      console.log('');

      return newState3;

    case 'API_FAILURE':
      console.log('');
      console.log('🔴🔴🔴🔴🔴🔴🔴🔴');
      console.log('State:', apiType);
      console.log('Before Update:', state.data);

      const newState2 = {
        ...state,
        load: false,
        err: {...state.err, [apiType]: error},
      };

      console.log('After:', newState2.err);
      console.log('');

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
