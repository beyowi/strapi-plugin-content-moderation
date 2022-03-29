import { GET_CONTENT_TYPES, SET_CONTENT_TYPES } from './constants';

export const setContentTypes = (data) => ({
  data,
  type: SET_CONTENT_TYPES,
});

export const getContentTypes = () => ({ type: GET_CONTENT_TYPES });
