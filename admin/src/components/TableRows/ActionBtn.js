import React, { memo } from 'react';
import { useTracking, useNotification } from '@strapi/helper-plugin';
import { useQuery } from 'react-query';

import { changeContentStatus } from '../../utils/api';
import { getMessage } from '../../utils';
import { IconButton } from '@strapi/design-system/IconButton';

const ActionBtn = ({ contentType, id, actionStatus, icon, refetchData }) => {
  const { trackUsage } = useTracking();

  const toggleNotification = useNotification();

  const { refetch } = useQuery(
    `set-content-${id}-status-${actionStatus}`,
    () =>
      changeContentStatus(toggleNotification, contentType, id, actionStatus),
    {
      enabled: false,
      retry: false,
      initialData: {},
      onSuccess: () => {
        refetchData();
      },
    }
  );

  return (
    <IconButton
      onClick={() => {
        trackUsage(`moderationContent${actionStatus}`);
        refetch();
      }}
      label={getMessage(`page.viewer.table.item.${actionStatus}`)}
      noBorder
      icon={icon}
    />
  );
};
export default memo(ActionBtn);
