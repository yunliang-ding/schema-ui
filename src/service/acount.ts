/**
 * Account
 */
import request from "@/axios";
const getList = async (params: any) => {
  return request(`/api/account/list`, { params });
};
const saveOrUpdate = async (data: any) => {
  let url = data.id ? `/api/account/update/${data.id}` : "/api/account/add";
  return request(url, {
    data,
    method: "post",
    notification: true,
  });
};
const deleteById = async (data: any) => {
  return request(`/api/account/delete`, {
    data,
    method: "post",
    notification: true,
  });
};
export { getList, saveOrUpdate, deleteById };
