import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import {
  useCMEditViewDataManager,
  useNotification,
} from '@strapi/helper-plugin';
import { Button } from '@strapi/design-system/Button';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { Divider } from '@strapi/design-system/Divider';
import { Typography } from '@strapi/design-system/Typography';
import Check from '@strapi/icons/Check';
import Cross from '@strapi/icons/Cross';
import Clock from '@strapi/icons/Clock';

import { getMessage } from '../../utils';
import { MODERATION_STATUS } from '../../utils/constants';
import { changeContentStatus } from '../../utils/api';

const ContentViewInfos = () => {
  const { initialData, modifiedData, isCreatingEntry, slug, layout } =
    useCMEditViewDataManager();
  const toggleNotification = useNotification();

  if (
    !_.get(layout, 'pluginOptions.moderation.moderated', false) ||
    isCreatingEntry
  ) {
    return null;
  }

  const history = useHistory();

  const onApproveClick = useCallback(async () => {
    const { publishedAt, id } = modifiedData;

    await changeContentStatus(
      toggleNotification,
      slug,
      id,
      MODERATION_STATUS.APPROVED,
      publishedAt
    );
    history.go(0);
  }, [modifiedData, slug]);

  const onPendingClick = useCallback(async () => {
    const { publishedAt, id } = modifiedData;

    await changeContentStatus(
      toggleNotification,
      slug,
      id,
      MODERATION_STATUS.PENDING,
      publishedAt
    );
    history.go(0);
  }, [modifiedData, slug]);

  const onRejectClick = useCallback(async () => {
    const { publishedAt, id } = modifiedData;

    await changeContentStatus(
      toggleNotification,
      slug,
      id,
      MODERATION_STATUS.REJECTED,
      publishedAt
    );
    history.go(0);
  }, [modifiedData, slug]);

  return (
    <Box
      as='aside'
      aria-labelledby='moderation-informations'
      background='neutral0'
      borderColor='neutral150'
      hasRadius
      paddingBottom={4}
      paddingLeft={4}
      paddingRight={4}
      paddingTop={6}
      shadow='tableShadow'
    >
      <Typography
        variant='sigma'
        textColor='neutral600'
        id='moderation-informations'
      >
        {getMessage('component.editview.informations.title')}
      </Typography>
      <Box paddingTop={2} paddingBottom={6}>
        <Divider />
      </Box>

      <Stack size={4}>
        {initialData.moderationStatus && (
          <div>
            <Typography fontWeight='bold'>
              {getMessage('component.editview.informations.status')}
            </Typography>
            <div>
              <Typography variant='pi'>
                {getMessage(
                  `page.viewer.table.item.${initialData.moderationStatus}`
                )}
              </Typography>
            </div>
          </div>
        )}
        {initialData.moderationStatus !== MODERATION_STATUS.APPROVED ? (
          <Button
            startIcon={<Check />}
            variant='success'
            fullWidth
            onClick={onApproveClick}
          >
            {getMessage('page.viewer.table.action.approved')}
          </Button>
        ) : null}
        {initialData.moderationStatus !== MODERATION_STATUS.PENDING ? (
          <Button
            startIcon={<Clock />}
            variant='secondary'
            fullWidth
            onClick={onPendingClick}
          >
            {getMessage('page.viewer.table.action.pending')}
          </Button>
        ) : null}
        {initialData.moderationStatus !== MODERATION_STATUS.REJECTED ? (
          <Button
            startIcon={<Cross />}
            variant='danger'
            fullWidth
            onClick={onRejectClick}
          >
            {getMessage('page.viewer.table.action.rejected')}
          </Button>
        ) : null}
      </Stack>
    </Box>
  );
};

export default ContentViewInfos;
