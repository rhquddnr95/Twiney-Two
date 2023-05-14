import { Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getUserDataByToken } from "../../../api/api-auth";
import MyPageNav from "../../../components/user/my-page-component/my-page-nav";

/** 마이페이지 컴포넌트*/
const MyPage = () => { 
  //토큰으로 받은 유저 데이터를 authData 에 가져옴
  const { data: authData } = useQuery(["auth"], () => getUserDataByToken());

  return (
    <>
    {/* 받아온 데이터가 없으면 랜더링 안하고 있으면 마이페이지를 랜더링 해줌 */}
      {authData ? (
        <>
          <div className="flex m-[10px] h-[60px] justify-between">
            <div>
              <Link to="/mypage" className="text-3xl flex">
                마이페이지
              </Link>
            </div>
          </div>
          <div className="flex ">
            <MyPageNav />
            <div className="m-[10px] w-[85vw]">
              {/* 중첩라우터 Outlet 컴포넌트 */}
              <Outlet context={{ authData }} />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default MyPage;
