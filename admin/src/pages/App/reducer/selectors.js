import { createSelector } from 'reselect';
import { initialState } from './';
import { REDUCER_NAME } from './constants';

/**
 * Direct selector to the listView state domain
 */
const appView = () => (state) => state[REDUCER_NAME] || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by listView
 */

const makeAppView = () =>
  createSelector(appView(), (substate) => {
    return substate;
  });

const selectContentTypes = (state) => {
  const { contentTypes } = state;

  return contentTypes;
};

export default makeAppView;
export { appView, selectContentTypes };
