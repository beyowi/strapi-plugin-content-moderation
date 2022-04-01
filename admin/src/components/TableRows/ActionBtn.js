import React, { memo } from 'react';
import { useTracking, useNotification } from '@strapi/helper-plugin';

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import isEqual from 'react-fast-compare';
import { useQuery } from 'react-query';
import makeAppView from '../../pages/App/reducer/selectors';

import { changeContentStatus } from '../../utils/api';
import { setContentStatus } from '../../pages/App/reducer/actions';
import { getMessage } from '../../utils';
import { IconButton } from '@strapi/design-system/IconButton';

const ActionBtn = ({
  contentType,
  id,
  actionStatus,
  icon,
  setContentStatus,
}) => {
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
        setContentStatus(id, actionStatus);
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

const mapStateToProps = makeAppView();

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setContentStatus }, dispatch);
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(memo(ActionBtn, isEqual));
