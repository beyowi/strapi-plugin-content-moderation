import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@strapi/design-system/Box';
import { IconButton } from '@strapi/design-system/IconButton';
import { Tbody, Td, Tr } from '@strapi/design-system/Table';
import { Flex } from '@strapi/design-system/Flex';
import Duplicate from '@strapi/icons/Duplicate';
import Pencil from '@strapi/icons/Pencil';
import {
  useTracking,
  stopPropagation,
  onRowClick,
} from '@strapi/helper-plugin';
import { useHistory } from 'react-router-dom';
import CellContent from '../CellContent';
import { getMessage } from '../../utils';

const TableRows = ({ contentType, headers, withBulkActions, rows }) => {
  const {
    push,
    location: { pathname },
  } = useHistory();

  const { trackUsage } = useTracking();

  return (
    <Tbody>
      {rows.map((data, index) => {
        return (
          <Tr
            key={data.id}
            {...onRowClick({
              fn: () => {
                trackUsage('willEditEntryFromList');
                push({
                  pathname: `/content-manager/collectionType/${contentType}/${data.id}`,
                  state: { from: pathname },
                });
              },
              condition: withBulkActions,
            })}
          >
            {headers.map(({ name, type }) => {
              return (
                <Td key={`${name}Value`}>
                  <CellContent content={data[name]} type={type} />
                </Td>
              );
            })}

            {withBulkActions && (
              <Td>
                <Flex justifyContent='end' {...stopPropagation}>
                  <IconButton
                    onClick={() => {
                      trackUsage('willEditEntryFromButton');
                      push({
                        pathname: `${pathname}/${data.id}`,
                        state: { from: pathname },
                      });
                    }}
                    label={getMessage('page.viewer.table.item.approve')}
                    noBorder
                    icon={<Pencil />}
                  />

                  <Box paddingLeft={1}>
                    <IconButton
                      onClick={() => {
                        push({
                          pathname: `${pathname}/create/clone/${data.id}`,
                          state: { from: pathname },
                        });
                      }}
                      label={getMessage('page.viewer.table.item.pending')}
                      noBorder
                      icon={<Duplicate />}
                    />
                  </Box>
                  <Box paddingLeft={1}>
                    <IconButton
                      onClick={() => {
                        push({
                          pathname: `${pathname}/create/clone/${data.id}`,
                          state: { from: pathname },
                        });
                      }}
                      label={getMessage('page.viewer.table.item.reject')}
                      noBorder
                      icon={<Duplicate />}
                    />
                  </Box>
                </Flex>
              </Td>
            )}
          </Tr>
        );
      })}
    </Tbody>
  );
};

TableRows.defaultProps = {
  rows: [],
  headers: [],
  withBulkActions: false,
};

TableRows.propTypes = {
  headers: PropTypes.array.isRequired,
  rows: PropTypes.array,
  withBulkActions: PropTypes.bool,
};

export default TableRows;
