import { useRef, useState } from "react";
import { Link } from "react-router-dom";

/** 마이페이지 네비게이션 컴포넌트*/
const MyPageNav = () => {

  const orderedItemsListRef = useRef();
  const personalInfoRef = useRef();
  const personalInfoModifyRef = useRef();
  const cusServiceCenterRef = useRef();
  const withdrawlRef = useRef();
  const [color] = useState("text-c1");

  /** 네비게이션 핸들러 onClick시 색상변경*/
  const navBarHandler = (e) => {
    orderedItemsListRef.current.style.color = "#c9c9c9";
    personalInfoRef.current.style.color = "#c9c9c9";
    personalInfoModifyRef.current.style.color = "#c9c9c9";
    cusServiceCenterRef.current.style.color = "#c9c9c9";
    if (e.target != withdrawlRef.current) {
      //회원탈퇴 요소가 아니면 검은색으로
      e.target.style.color = "#060606";
    }
  };

    // url에 따른 네비 색상 변경 (아직 미구현)
    // const current = window.location.href;

  return (
    <>
      <div className="w-[180px] flex flex-col m-[10px] mb-[30px]  border-r-[1px] border-barColor justify-between">
        <ul className="relative left-0 flex flex-col ">
          <li className=" mb-[20px]">
            {/* 장바구니 네비 링크 */}
            <Link to="/cart" className={color}>
              장바구니
            </Link>
          </li>
          {/* 주문내역 네비 링크 */}
          <li className=" mb-[20px]">
            <Link
              to="/mypage/ordered-items-list"
              ref={orderedItemsListRef}
              onClick={navBarHandler}
              className="text-c2"
            >
              주문내역
            </Link>
          </li>
          {/* 내 정보 네비 링크*/}
          <li className=" mb-[20px]">
            <Link
              to="/mypage/personal-info"
              ref={personalInfoRef}
              onClick={navBarHandler}
              className={color}
            >
              내 정보
            </Link>
          </li>
          {/* 개인정보 수정 네비 링크*/}
          <li className=" mb-[20px]">
            <Link
              to="/mypage/personal-info-modify"
              ref={personalInfoModifyRef}
              onClick={navBarHandler}
              className={color}
            >
              개인정보 수정
            </Link>
          </li>
          {/* 고객센터 네비 링크*/}
          <li className=" mb-[20px] ">
            <Link
              to="/mypage/cus-service-center"
              ref={cusServiceCenterRef}
              onClick={navBarHandler}
              className={color}
            >
              고객센터
            </Link>
          </li>
        </ul>
        {/* 회원탈퇴 네비 링크*/}
        <div>
          <Link
            to="/mypage/withdrawl"
            ref={withdrawlRef}
            onClick={navBarHandler}
            className="text-c3"
          >
            회원탈퇴
          </Link>
        </div>
      </div>
    </>
  );
};

export default MyPageNav;
