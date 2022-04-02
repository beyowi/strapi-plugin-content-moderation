import { SET_CONTENT_DATA, SET_CONTENT_TYPES } from './constants';

export const setContentTypes = (data) => ({
  data,
  type: SET_CONTENT_TYPES,
});

export const setContentData = (data) => ({
  data,
  type: SET_CONTENT_DATA,
});
