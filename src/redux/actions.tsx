export const NFC_TEST = 'NFC_TEST';
export const NFC_RESPONSE = 'NFC_RESPONSE';
export const NFC_ERROR = 'NFC_ERROR';

export const actions = {
  NFC_TEST: 'NFC_TEST',
  NFC_RESPONSE: 'NFC_RESPONSE',
  NFC_ERROR: 'NFC_ERROR',

  SEND_OTP: 'SEND_OTP',
  SEND_OTP_RESP: 'SEND_OTP_RESP',
  SEND_OTP_ERR: 'SEND_OTP_ERR',

  GET_OTP: 'GET_OTP',
  GET_OTP_RESP: 'GET_OTP_RESP',
  GET_OTP_ERR: 'GET_OTP_ERR',

  SIGN_UP: 'SIGN_UP',
  SIGN_UP_RESP: 'SIGN_UP_RESP',
  SIGN_UP_ERR: 'SIGN_UP_ERR',
};

//  NEW WORK

import {API_REQUEST, API_SUCCESS, API_FAILURE, API_RESET} from './actionTypes';

export const apiRequest = (apiType: string) => ({
  type: API_REQUEST,
  payload: {apiType},
});

export const apiSuccess = (apiType: string, data: any) => ({
  type: API_SUCCESS,
  payload: {apiType, data},
});

export const apiFailure = (apiType: string, error: string) => ({
  type: API_FAILURE,
  payload: {apiType, error},
});

export const apiReset = (apiType: string) => ({
  type: API_RESET,
  payload: {apiType},
});

// ✅ Asynchronous API Call (No Change Required)
export const fetchApiData = (
  apiType: string,
  url: string,
  method = 'GET',
  body?: any,
) => {
  return async (dispatch: any) => {
    dispatch(apiRequest(apiType));

    var requestBody = {
      url: url,
      method: method,
      body: body,
    };

    console.log('request body: ', requestBody);

    try {
      const response = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: {'Content-Type': 'application/json'},
      });

      const data = await response.json();

      if (data.code != undefined && data.code == 200) {
        dispatch(apiSuccess(apiType, data));
      } else {
        dispatch(apiFailure(apiType, data));
      }

      // if (data.code == undefined) {
      //   dispatch(apiFailure(apiType, data.error));
      // } else {
      // if (apiType == 'GET_OTP' && data.code == 409) {
      //   dispatch(apiFailure(apiType, 'There is not otp for this number'));
      // } else if (apiType == 'SEND_OTP' && data.code != 200) {
      //   dispatch(apiFailure(apiType, 'Error in sending otp'));
      // }
      // else {
      //   dispatch(apiSuccess(apiType, data));
      // }
      // }
    } catch (error) {
      dispatch(apiFailure(apiType, 'error message'));
    }
  };
};

// import {createAsyncThunk} from '@reduxjs/toolkit';

// export const fetchApiData2 = createAsyncThunk(
//   'api/fetchData',
//   async ({apiType, url}: {apiType: string; url: string}, {rejectWithValue}) => {
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       return {apiType, data};
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   },
// );

// import {AppDispatch} from '../redux/store';

// export const fetchApiData3 = (apiType: string, url: string) => {
//   return async (dispatch: AppDispatch) => {
//     dispatch({type: 'API_REQUEST', payload: {apiType}});

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       dispatch({type: 'API_SUCCESS', payload: {apiType, data}});
//     } catch (error: any) {
//       dispatch({type: 'API_FAILURE', payload: {apiType, error: error.message}});
//     }
//   };
// };
