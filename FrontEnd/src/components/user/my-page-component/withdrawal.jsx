import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery} from "react-query";
import { authCtx } from "../../store/auth-context";
import {
  deleteUserDataByToken,
  getUserDataByToken,
} from "../../../api/api-auth";

/** 회원 탈퇴 페이지 컴포넌트 */
const Withdrawl = () => {

  // api를 불러 유저 토큰으로 데이터를 받아오고 useQuery로 로딩, 데이터, 에러 관련 핸들링을함. 
  const { data, isLoading, isError, error } = useQuery(
    ["auth"],
    async () => await getUserDataByToken()
  );
  const [content, setContent] = useState(` 
      탈퇴 사유를 적어 주세요.! `);
  const { setIsLoggedIn, setIsAdmin } = useContext(authCtx);  
  const navigate = useNavigate();

  /** 탈퇴사유 내용수정 핸들러 (api를 를통해 database에 보내는 작업 추가사항)*/ 
  const contentChangeHandler = (e) => {
    const val = e.target.value;
    setContent(val);
  };
  
  /** 비밀번호 확인 핸들러 (추가기능/미구현) */ 
  // const pwdCheckHandler = (e) => {   
  //   let val = e.target.value;
  //   setpwd(val);
  // };

  /** 회원 탈퇴 버튼 핸들러  */ 
  const withdrawlButtonHandler = (e) => {

    //로컬스토리지에 해당 유저 데이터 삭제요청 api
    deleteUserDataByToken();
    e.preventDefault();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    alert(
      `
        탈퇴가 완료 되었습니다.
        지금까지 '와인게되네' 서비스를 이용해 주셔서 감사합니다. 
         `
    );
    // 마이페이지로 보내줌
    navigate("/"); 
  };

  /** 회원 탈퇴취소 버튼 핸들러  */ 
  const withdrawlCancelButtonHandler = () => {
    // 마이페이지로 보내줌
    navigate("/");
  };

  return (
    <>
    {/* 로딩중이면 로딩중 페이지 띄움 */}
      {isLoading ? (
        <div className="flex absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-2">
          Loading...
        </div>
      ) : !data ? (
        <div className="h-[800px] flex justify-center items-center ">
          <div className="w-[80%] flex justify-center items-center h-[80%] mb-[10%] rounded-xl border-2 border-c1">
            <div>
              <div className="text-3xl text-center">
                로그인 후 이용해주세요.
              </div>
            </div>
          </div>
        </div>
      ) : !isError ? (
        <div className="h-[800px] flex justify-center items-center ">
          <div className="w-[80%] h-[100%]  ">
            <div className="h-[15%]">
              <h1 className=" text-c3 text-3xl mb-[10%] ">회원 탈퇴</h1>
            </div>
            <div className=" h-[350px] ">
              <div className="h-[10%] ">
                <h1 className="text-xl">탈퇴사유</h1>
              </div>
              <div className=" h-[90%]">
                <textarea
                  // 탈퇴 사유 인풋
                  type="text"
                  value={content}
                  onChange={contentChangeHandler}
                  className=" w-[100%] h-[300px] border-[2px] border-c1 break-all"
                ></textarea>
              </div>
            </div>
            <div className="w-[100%] h-[20%] ">
              <div className="p-[10px] m-[10px]">
                {" "}
                <span className="mr-[10px] w-[30%]">회원 아이디</span>
                <span className="h-[25px] bg-[white] w-[30%] text-c1">
                  {data.email}
                </span>
              </div>
              {/* 추가기능 비번확인 */}
              {/* <div className="p-[10px] m-[10px]">
                {" "}
                <span className="mr-[10px] w-[30%]">비밀번호 확인</span>
                <input
                  type="password"
                  value={pwd}
                  onChange={pwdCheckHandler}
                  className="border-[1px] border-c1 h-[25px] w-[30%]"
                ></input>         
              </div> */}
            </div>
            <div className="flex justify-center items-center h-[10%]">
              <span className=" m-[10px] flex justify-center items-center ">
                <button
                  className="w-[150px] h-[50px] rounded-[10px] 
               bg-[#922F2F] text-[18px] text-[#FFFFFF] mb-[20px]"
                  onClick={withdrawlButtonHandler}
                >
                  탈퇴
                </button>
              </span>
              <span className=" m-[10px] flex justify-center items-center">
                <button
                  className="w-[150px] h-[50px] border-c3 border-2 rounded-[10px] 
                text-[18px] text-[#922F2F] mb-[20px] "
                  onClick={withdrawlCancelButtonHandler}
                >
                  취소
                </button>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-2">
          {error.message}
        </div>
      )}
    </>
  );
};

export default Withdrawl;
