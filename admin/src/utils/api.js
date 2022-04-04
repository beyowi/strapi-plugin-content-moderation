import { stringify } from 'qs';

import { axiosInstance, handleAPIError } from './';
import pluginId from '../pluginId';
import { MODERATION_STATUS } from './constants';

export const fetchModeratedContentTypes = async (toggleNotification) => {
  try {
    const { data } = await axiosInstance.get(`/${pluginId}/find-content-types`);
    return data;
  } catch (err) {
    handleAPIError(err, toggleNotification);
  }
};

export const fetchData = async (toggleNotification, slug, queryParams) => {
  try {
    const { data } = await axiosInstance.get(
      `/${pluginId}/${slug}/find-all${
        queryParams ? `?${stringify(queryParams, { encode: false })}` : ''
      }`
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
  status,
  publishedAt
) => {
  try {
    // Some content might not be publishable (like Users for example)
    if (publishedAt !== undefined) {
      if (status == MODERATION_STATUS.APPROVED && !publishedAt) {
        await axiosInstance.post(
          `/content-manager/collection-types/${slug}/${id}/actions/publish`
        );
      } else if (status != MODERATION_STATUS.APPROVED && publishedAt !== null) {
        await axiosInstance.post(
          `/content-manager/collection-types/${slug}/${id}/actions/unpublish`
        );
      }
    }

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
