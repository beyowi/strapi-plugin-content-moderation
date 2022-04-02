import produce from 'immer'; // current
import { set } from 'lodash';
import {
  SET_CONTENT_DATA,
  GET_CONTENT_TYPES,
  SET_CONTENT_TYPES,
} from './constants';

const initialState = {
  config: {},
};

const reducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, (draftState) => {
    switch (action.type) {
      case SET_CONTENT_DATA: {
        set(draftState, 'contentData', action.data);
        break;
      }
      case SET_CONTENT_TYPES: {
        set(draftState, 'contentTypes', action.data);
        break;
      }
      case GET_CONTENT_TYPES: {
        return draftState?.contentTypes;
      }
      default:
        return draftState;
    }
  });

export default reducer;
export { initialState };
