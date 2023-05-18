import { axiosBaseWithToken } from "./api";

/** 로컬스토리지에 저장된 토큰에 해당하는 유저데이터 요청*/
export const getUserDataByToken = async () => {
  if (JSON.parse(localStorage.getItem("token"))) {
    const data = await axiosBaseWithToken.get(`api/users/auth/verifyToken`);
    return data.data;
  } else {
    return;
  }
};

/** 로컬스토리지에 저장된 토큰에 해당하는 유저데이터 삭제 요청*/
export const deleteUserDataByToken = async () => {
  if (JSON.parse(localStorage.getItem("token"))) {
    const data = await axiosBaseWithToken.delete("api/users/");
    return data.data;
  } else {
    return;
  }
};
