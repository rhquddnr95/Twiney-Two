import { axiosBase } from "./api";

/** 모든 주문정보 데이터 요청 */
export const getAllOrders = async () => {
  const data = await axiosBase.get("api/orders");
  return data.data;
};

/** 주문자의 Email에 해당하는 주문정보 데이터 요청 */
export const getOrdersByBuyerEmail = async (buyerEmail) => {
  const data = await axiosBase.get(`api/orders/${buyerEmail}`);
  return data.data;
};

/** 주문 번호에 해당하는 주문정보 데이터 요청 */
export const getOrderByOrderIndex = async (OrderIndex) => {
  const data = await axiosBase.get(`api/orders/order/${OrderIndex}`);
  return data.data;
};

/** 주문 번호에 해당하는 주문 데이터 삭제 요청 */
export const deleteOrderByOrderIndex = async (orderIndex) => {
  const result = await axiosBase.delete(`api/orders/admin/${orderIndex}`);
  return result;
};

/** 체크된 주문번호에 해당하는 주문 데이터 삭제 요청 */
export const deleteCheckedOrdersByOrderIndex = async (checkedOrderIndexes) => {
  const result = await checkedOrderIndexes.forEach((orderIndex) => {
    axiosBase.delete(`api/orders/admin/${orderIndex}`);
  });
  return result;
};

/** 주문번호에 해당하는 주문의 배송 상태 변경 요청 */
export const changeShippingStatusByOrderIndex = async (
  orderIndex,
  shippingStatus
) => {
  const result = await axiosBase.patch("api/orders/shippingstatus", {
    orderIndex,
    shippingStatus,
  });
  return result;
};
