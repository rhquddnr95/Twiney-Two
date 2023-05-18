import OrderedItem from "./ordered-item";
import { useNavigate } from "react-router-dom";x
import { deleteOrderByOrderIndex } from "../../../../api/api-order";
import { useQueryClient } from "react-query";

/** 주문내역 주문별 아이템들의 (첫자식) 컴포넌트  (주문일자, 배송상태, 주문리스트, 주문인덱스 props로 받음) */
const OrderedItems = (props) => {

  const orderDetailEnter = "주문상세보기>";
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 아이템들 정보 담긴 배열
  const orderList = props.orderList; 
  // 주문아이템들의 번호
  const orderIndex = props.orderIndex;
  // 주문 날짜 createAt 으로 받아와서 자르고 -는 .로 바꿈.
  const dateOfOrder = props.dateOfOrder.replaceAll("-", ".").slice(0, 10); 
  // 배송상태
  const shippingState = props.shippingState; 

  /** 주문취소함수 (db에 요청 + 캐시 무효화 + 새로운 데이터 요청 + 마이페이지로 이동 )  */
  const orederCancleRequest = async () => {
    try {
      // 각 주문의 orderIndex를 통해 DB에 api로 삭제 요청함
      const result = await deleteOrderByOrderIndex(orderIndex);
      console.log(result);
      // invalidateQueries로 캐시된 데이터를 무효화(invalidate)하고 새로운 데이터를 가져오도록 강제로 요청
      queryClient.invalidateQueries(["auth", { orderIndex }]);
      alert("주문이 취소되었습니다.");
      // 마이페이지로 이동
      navigate("/mypage");
      return;
    } catch (error) {
      console.log(error);
    }
  };
  
  /** 배송상태에 따른 옵션 선택 핸들러 */
  const shippingOptionHandler = (e) => {
    e.target.innerHTML === "주문취소"
      // 주문취소 버튼 클릭시 => db 요청 삭제.
      ? orederCancleRequest() 
      : e.target.innerHTML === "배송조회"
      // 배송조회 클릭시 배송조회 페이지로 이동
      ? navigate("/ordered-items-list/shipping-inquiry") 
      // 배송완료면 교환 및 환불 완료 페이지로 이동
      : navigate("/ordered-items-list/exchange"); 
  };
  
  return (
    <div className="w-[100%]  border-2 border-c3 rounded-xl mb-[20px]">
      <div className="flex justify-between">
        <div className="m-[20px] text-xl">{dateOfOrder} 주문</div>
        {/* 주문상세보기 버튼 () */}
         <Link
          to="/mypage/ordered-item-detail"
          className="m-[20px] text-c4 text-xl"
        >
          {orderDetailEnter}
        </Link> 
      </div>
      <div className="m-[20px] border-2 border-c1 rounded-xl mt-[0px]">
        <div className="flex justify-between">
          <div className="text-2xl m-[20px]">{shippingState}</div>
          {/* ([상품준비중, 배송중, 배송완료] 배송상태별로 => [주문취소, 배송조회, 교환 및 환불] 로 각각 대응하여 랜더링 되게 함) */}
          {shippingState === "상품준비중" ? (
            <button
              onClick={shippingOptionHandler}
              className="w-[150px] h-[50px] rounded-[10px] 
              bg-[#922F2F] text-[18px] text-[#FFFFFF] m-[20px]  "
            >
              주문취소
              {/* 배송준비중이면 주문취소 버튼생성*/}
            </button>
          ) : shippingState === "배송완료" ? (
            <div>
              <button
                onClick={shippingOptionHandler}
                className="text-xl border-[1px] border-c1 w-[100px] h-[40px] m-[20px] "
              >
                교환/환불
                {/* 배송완료면  교환환불, 리뷰작성 버튼생성*/}
              </button>
              <button
                onClick={shippingOptionHandler}
                className="text-xl border-[1px] border-c1 w-[100px] h-[40px] m-[20px] "
              >
                리뷰작성
              </button>
            </div>
          ) : (
            <button
              onClick={shippingOptionHandler}
              className="text-xl border-[1px] border-c1 w-[100px] h-[40px] m-[20px] "
            >
              {/* 배송중이면 배송조회 버튼생성*/}
              배송조회
            </button>
          )}
        </div>
        <div className="mb-[20px]">
          <div className=" flex justify-center items-center ">
            <div className="w-[90%] h-[90%] ">
              <div>
                {/* 주문 리스트의 아이템들을 map으로 뿌려주고 */}
                {orderList.map((index) => {
                  return (
                    // 주문 각 아이템들을 주문아이템 컴포넌트로 랜더링하며 상품id, 수량을 props로 넘겨줌 
                    <OrderedItem
                      productId={index.product}
                      amount={index.amount}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderedItems;
