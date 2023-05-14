import { axiosBaseWithToken } from "./api";

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
