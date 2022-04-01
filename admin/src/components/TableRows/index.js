import React, { memo } from 'react';

import PropTypes from 'prop-types';
import { Box } from '@strapi/design-system/Box';
import { Tbody, Td, Tr } from '@strapi/design-system/Table';
import { Flex } from '@strapi/design-system/Flex';
import Check from '@strapi/icons/Check';
import Cross from '@strapi/icons/Cross';
import Clock from '@strapi/icons/Clock';

import { stopPropagation, onRowClick } from '@strapi/helper-plugin';
import { useHistory } from 'react-router-dom';
import CellContent from '../CellContent';
import {
  APPROVED_STATUS,
  PENDING_STATUS,
  REJECTED_STATUS,
} from '../../utils/constants';
import ActionBtn from './ActionBtn';

const TableRows = ({ contentType, headers, withBulkActions, rows }) => {
  const {
    push,
    location: { pathname },
  } = useHistory();

  return (
    <Tbody>
      {rows.map((data) => {
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
                  {data.moderation_status !== APPROVED_STATUS ? (
                    <ActionBtn
                      contentType={contentType}
                      id={data.id}
                      actionStatus={APPROVED_STATUS}
                      icon={<Check />}
                    />
                  ) : null}
                  {data.moderation_status !== PENDING_STATUS ? (
                    <Box paddingLeft={1}>
                      <ActionBtn
                        contentType={contentType}
                        id={data.id}
                        actionStatus={PENDING_STATUS}
                        icon={<Clock />}
                      />
                    </Box>
                  ) : null}
                  {data.moderation_status !== REJECTED_STATUS ? (
                    <Box paddingLeft={1}>
                      <ActionBtn
                        contentType={contentType}
                        id={data.id}
                        actionStatus={REJECTED_STATUS}
                        icon={<Cross />}
                      />
                    </Box>
                  ) : null}
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

export default memo(TableRows);
