import apiClient from '.';

export const getOrganizationUrlById = (id) => {
  return apiClient.get(`/api/org/id/${id}/`);
};

export const getOrganizationInfoById = (id) => {
  return apiClient.get(`/api/org/skeleton/${id}/`);
};

export const getTableDataById = async (tableID) => {
  return await apiClient.get(`/api/org/table/${tableID}/`);
};
