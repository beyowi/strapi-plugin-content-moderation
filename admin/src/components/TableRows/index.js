import React, { memo } from 'react';

import PropTypes from 'prop-types';

import {
  stopPropagation,
  onRowClick,
  useTracking,
} from '@strapi/helper-plugin';
import { useHistory } from 'react-router-dom';

import { Box } from '@strapi/design-system/Box';
import { Tbody, Td, Tr } from '@strapi/design-system/Table';
import { Flex } from '@strapi/design-system/Flex';
import Check from '@strapi/icons/Check';
import Cross from '@strapi/icons/Cross';
import Clock from '@strapi/icons/Clock';
import CellContent from '../CellContent';
import { MODERATION_STATUS } from '../../utils/constants';
import ActionBtn from './ActionBtn';
import { getMessage } from '../../utils';

const TableRows = ({
  contentType,
  headers,
  withBulkActions,
  refetchData,
  rows,
}) => {
  const {
    push,
    location: { pathname },
  } = useHistory();

  const { trackUsage } = useTracking();

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
              const displayData =
                name === 'moderationStatus' && data[name] != null
                  ? getMessage(`page.viewer.table.item.${data[name]}`)
                  : data[name];
              return (
                <Td key={`${name}Value`}>
                  <CellContent content={displayData} type={type} />
                </Td>
              );
            })}

            {withBulkActions && (
              <Td>
                <Flex justifyContent='end' {...stopPropagation}>
                  {data.moderationStatus !== MODERATION_STATUS.APPROVED ? (
                    <ActionBtn
                      contentType={contentType}
                      id={data.id}
                      actionStatus={MODERATION_STATUS.APPROVED}
                      refetchData={refetchData}
                      icon={<Check />}
                    />
                  ) : null}
                  {data.moderationStatus !== MODERATION_STATUS.PENDING ? (
                    <Box paddingLeft={1}>
                      <ActionBtn
                        contentType={contentType}
                        id={data.id}
                        actionStatus={MODERATION_STATUS.PENDING}
                        refetchData={refetchData}
                        icon={<Clock />}
                      />
                    </Box>
                  ) : null}
                  {data.moderationStatus !== MODERATION_STATUS.REJECTED ? (
                    <Box paddingLeft={1}>
                      <ActionBtn
                        contentType={contentType}
                        id={data.id}
                        actionStatus={MODERATION_STATUS.REJECTED}
                        refetchData={refetchData}
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
  refetch: () => {},
};

TableRows.propTypes = {
  headers: PropTypes.array.isRequired,
  rows: PropTypes.array,
  withBulkActions: PropTypes.bool,
  refetch: PropTypes.func,
};

export default memo(TableRows);
