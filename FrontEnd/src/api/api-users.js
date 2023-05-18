import { axiosBaseWithToken } from "./api";

/** 유저 ID에 해당하는 정보 수정 요청 */
export const patchUserId = async (
  password,
  address1,
  address2,
  postalCode,
  phoneNumber
) => {
  if (JSON.parse(localStorage.getItem("token"))) {
    const result = await axiosBaseWithToken.patch(`api/users`, {
      password,
      address1,
      address2,
      postalCode,
      phoneNumber,
    });
    return result;
  }
  return;
};
