import axios from 'axios';
import {Dispatch} from 'redux';
import {NFC_ERROR, NFC_RESPONSE, NFC_TEST} from '../redux/actions';

export const fetchNFCSec = () => {
  return async (dispatch: Dispatch) => {
    dispatch({type: NFC_TEST});
    try {
      const response = await axios.get(
        'http://api.ci.unnica-dev.co/user/nfc-sec-test',
      );
      console.log('imple response: ', response.data);
      dispatch({
        type: NFC_RESPONSE,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching card details:', error);
      dispatch({
        type: NFC_ERROR,
      });
    }
  };
};
