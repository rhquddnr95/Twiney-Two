import { createContext, useState } from "react";
import { getUserDataByToken } from "../../api/api-auth";

/** 로컬스토리지에서 특정 데이터를 가져오는 함수 */
/** ex. 유저 데이터, 토큰 등 */
export const storage = (props) => {
  if (typeof window !== "undefined") {
    const data = window.localStorage.getItem(props);
    if (data === null) {
      return null;
    } else {
      return JSON.parse(data);
    }
  }
};

export const authCtx = createContext();

const AuthContext = (props) => {
  // 유저 데이터
  const [auth, setAuth] = useState(async () => await getUserDataByToken());
  // 로컬스토리지에서 가져온 토큰값을 token 값으로 설정
  const [token, setToken] = useState(storage("token"));
  // 로컬스토리지에 auth 데이터가 있으면 로그인 여부 true로 설정
  const [isLoggedIn, setIsLoggedIn] = useState(storage("auth") ? true : false);
  // 로컬스토리지에 auth 데이터가 있고 'admin'이면 true로 설정
  const [isAdmin, setIsAdmin] = useState(
    storage("auth") && storage("auth").role === "admin" ? true : false
  );

  return (
    <authCtx.Provider
      value={{
        auth,
        setAuth,
        isLoggedIn,
        setIsLoggedIn,
        isAdmin,
        setIsAdmin,
        token,
        setToken,
      }}
    >
      {props.children}
    </authCtx.Provider>
  );
};

export default AuthContext;
