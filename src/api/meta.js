import apiClient from '.';

export const getPageMeta = (url) => {
  const path = url.substring(1);
  return apiClient.get(`/api/meta/${path && `${path}/`}`);
}