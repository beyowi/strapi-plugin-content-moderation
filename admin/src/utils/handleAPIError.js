import pluginId from '../pluginId';

const handleAPIError = (err = null, toggleNotification = null) => {
  toggleNotification({
    type: 'warning',
    message: `${pluginId}.api.notification.error`,
  });

  if (err) {
    throw err;
  } else {
    throw new Error('error');
  }
};

export default handleAPIError;
