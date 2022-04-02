/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  NotFound,
  LoadingIndicatorPage,
  useNotification,
} from '@strapi/helper-plugin';
import { fetchModeratedContentTypes } from '../../utils/api';
import { setContentTypes } from './reducer/actions';
import makeAppView from './reducer/selectors';
import HomePage from '../HomePage';
import getUrl from '../../utils/getUrl';
import { DEFAULT_ROUTE_FILTER_PENDING } from '../../utils/constants';

const App = ({ setContentTypes, contentTypes }) => {
  const contentTypeMatch = useRouteMatch(getUrl(`:uid`));

  const toggleNotification = useNotification();

  const { isLoading, isFetching } = useQuery(
    'get-content-types',
    () => fetchModeratedContentTypes(toggleNotification),
    {
      initialData: {},
      onSuccess: (response) => {
        setContentTypes(response);
      },
    }
  );

  if (isLoading || isFetching) {
    return <LoadingIndicatorPage />;
  }

  if (!contentTypeMatch && contentTypes.length > 0) {
    return (
      <Redirect
        to={getUrl(`${contentTypes[0].uid}${DEFAULT_ROUTE_FILTER_PENDING}`)}
      />
    );
  }

  return (
    <div>
      <Switch>
        <Route path={getUrl(`:contentType`)} component={HomePage} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

const mapStateToProps = makeAppView();

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setContentTypes }, dispatch);
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(App);
