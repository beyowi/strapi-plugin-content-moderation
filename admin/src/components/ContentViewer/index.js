import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import isEqual from 'react-fast-compare';
import isEmpty from 'lodash/isEmpty';
import { useQuery } from 'react-query';
import { LoadingIndicatorPage, useNotification } from '@strapi/helper-plugin';
import { useRouteMatch } from 'react-router-dom';
import getUrl from '../../utils/getUrl';

import { Box } from '@strapi/design-system/Box';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';
import {
  ActionLayout,
  Layout,
  HeaderLayout,
  ContentLayout,
} from '@strapi/design-system/Layout';
import EmptyDocuments from '@strapi/icons/EmptyDocuments';
import { Table, Thead, Tr, Th, Td } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { VisuallyHidden } from '@strapi/design-system/VisuallyHidden';

import TableRows from '../TableRows';
import TableFilters from '../TableFilters';
import makeAppView from '../../pages/App/reducer/selectors';
import { fetchAllPending } from '../../utils/api';
import { getMessage } from '../../utils';

const ContentViewer = ({ contentTypes }) => {
  const {
    params: { contentType },
  } = useRouteMatch(getUrl(`:contentType`));

  const filtersSchema = [];

  const toggleNotification = useNotification();

  const { isLoading, data, isFetching, refetch } = useQuery(
    'get-content-data',
    () => fetchAllPending(toggleNotification, contentType),
    {
      initialData: {},
    }
  );

  useEffect(() => {
    refetch();
  }, [contentType]);

  const activeContentType = contentTypes.filter(
    (type) => type.uid === contentType
  )[0];
  const attributes = activeContentType.attributes;

  const total = data?.length;

  let tableHeaders = [];
  Object.keys(attributes).forEach((key) => {
    if (attributes[key].visible === undefined)
      tableHeaders.push({ name: key, ...attributes[key] });
  });

  return (
    <Box background='neutral100'>
      <Layout>
        {isLoading || isFetching ? (
          <LoadingIndicatorPage />
        ) : (
          <>
            <HeaderLayout
              title={getMessage({
                id: 'page.viewer.header',
                props: { contentType: activeContentType.displayName },
              })}
              subtitle={`${total} ${getMessage('page.viewer.header.count')}`}
              as='h2'
            />
            <ActionLayout
              startActions={
                <>
                  <TableFilters displayedFilters={filtersSchema} />
                </>
              }
            />
            <ContentLayout>
              {!isEmpty(data) ? (
                <Table
                  colCount={tableHeaders.length + 1}
                  rowCount={data.length}
                >
                  <Thead>
                    <Tr>
                      {tableHeaders.map((header, index) => {
                        return (
                          <Th key={`${header.name}Header`}>
                            <Typography variant='sigma'>
                              {header.name}
                            </Typography>
                          </Th>
                        );
                      })}
                      <Th key='actionsHeader'>
                        <VisuallyHidden>
                          {getMessage('page.viewer.table.header.actions')}
                        </VisuallyHidden>
                      </Th>
                    </Tr>
                  </Thead>
                  <TableRows
                    contentType={contentType}
                    headers={tableHeaders}
                    rows={data}
                    withBulkActions
                  />
                </Table>
              ) : (
                <EmptyStateLayout
                  icon={<EmptyDocuments width='10rem' />}
                  content={getMessage('page.viewer.table.empty')}
                />
              )}
            </ContentLayout>
          </>
        )}
      </Layout>
    </Box>
  );
};

const mapStateToProps = makeAppView();

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(memo(ContentViewer, isEqual));
