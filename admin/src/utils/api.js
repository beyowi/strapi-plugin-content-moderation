import { axiosInstance, handleAPIError } from './';
import pluginId from '../pluginId';

export const fetchModeratedContentTypes = async (toggleNotification) => {
  try {
    const { data } = await axiosInstance.get(`/${pluginId}/find-content-types`);
    return data;
  } catch (err) {
    handleAPIError(err, toggleNotification);
  }
};

export const fetchAllStatus = async (toggleNotification, slug, status) => {
  try {
    const { data } = await axiosInstance.get(
      `/${pluginId}/find-all-${status}/${slug}`
    );
    return data;
  } catch (err) {
    handleAPIError(err, toggleNotification);
  }
};

export const changeContentStatus = async (
  toggleNotification,
  slug,
  id,
  status
) => {
  try {
    const response = await axiosInstance.post(
      `/${pluginId}/${slug}/${id}/${status}`
    );
    toggleNotification({
      type: 'success',
      message: `${pluginId}.message.api.success.${status}`,
    });
    return response;
  } catch (err) {
    handleAPIError(err, toggleNotification);
  }
};
