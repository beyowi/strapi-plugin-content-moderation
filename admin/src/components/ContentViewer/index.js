import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import isEqual from 'react-fast-compare';
import isEmpty from 'lodash/isEmpty';
import { useQuery } from 'react-query';
import {
  LoadingIndicatorPage,
  useNotification,
  useQueryParams,
} from '@strapi/helper-plugin';
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
import { fetchData } from '../../utils/api';
import { getMessage } from '../../utils';
import TablePagination from '../../components/TablePagination';
import filtersSchema from './filtersSchema';

const ContentViewer = ({ contentTypes }) => {
  const {
    params: { contentType },
  } = useRouteMatch(getUrl(`:contentType`));
  const [{ query: queryParams }] = useQueryParams();

  const toggleNotification = useNotification();

  const {
    isLoading,
    data: { result, pagination = {} },
    refetch,
  } = useQuery(
    ['get-content-data', queryParams],
    () => fetchData(toggleNotification, contentType, queryParams),
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

  const total = result?.length;

  const hideColumnsType = ['media', 'relation', 'component'];

  let tableHeaders = [];
  Object.keys(attributes).forEach((key) => {
    if (
      attributes[key].visible === undefined &&
      !attributes[key].private &&
      !hideColumnsType.includes(attributes[key].type)
    )
      tableHeaders.push({ name: key, ...attributes[key] });
  });
  tableHeaders.push({ name: 'moderationStatus', type: 'string' });

  return (
    <Box background='neutral100'>
      <Layout>
        {isLoading ? (
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
              {!isEmpty(result) ? (
                <>
                  <Table colCount={tableHeaders.length + 1} rowCount={total}>
                    <Thead>
                      <Tr>
                        {tableHeaders.map((header) => {
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
                      rows={result}
                      refetchData={refetch}
                      withBulkActions
                    />
                  </Table>
                  <TablePagination
                    pagination={{ pageCount: pagination?.pageCount || 1 }}
                  />
                </>
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
