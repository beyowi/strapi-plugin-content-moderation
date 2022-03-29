// ./admin/src/utils/api.js
import { axiosInstance, handleAPIError } from './';
import pluginId from '../pluginId';

export const fetchAllPending = async (toggleNotification, slug) => {
  try {
    const { data } = await axiosInstance.get(
      `/${pluginId}/find-all-pending/${slug}`
    );
    return data;
  } catch (err) {
    handleAPIError(err, toggleNotification);
  }
};

export const fetchModeratedContentTypes = async (toggleNotification) => {
  try {
    const { data } = await axiosInstance.get(`/${pluginId}/find-content-types`);
    return data;
  } catch (err) {
    handleAPIError(err, toggleNotification);
  }
};
