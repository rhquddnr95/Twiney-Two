import { axiosBase } from "./api";

/** 모든 카테고리 데이터 요청 */
export const getAllCategories = async () => {
  const data = await axiosBase.get(`api/categories`);
  return data.data;
};
