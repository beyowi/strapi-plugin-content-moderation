import {
  SET_CONTENT_DATA,
  SET_CONTENT_TYPES,
  SET_CONTENT_STATUS,
} from './constants';

export const setContentTypes = (data) => ({
  data,
  type: SET_CONTENT_TYPES,
});

export const setContentData = (data) => ({
  data,
  type: SET_CONTENT_DATA,
});

export const setContentStatus = (id, moderationStatus) => ({
  id,
  moderationStatus,
  type: SET_CONTENT_STATUS,
});
