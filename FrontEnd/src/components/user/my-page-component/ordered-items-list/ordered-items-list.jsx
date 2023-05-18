import { useState } from "react";
import OrderedItems from "./ordered-items";
import Pagination from "../../product/pagination";
import { useQuery } from "react-query";
import { getOrdersByBuyerEmail } from "../../../../api/api-order";
import { useContext } from "react";
import { authCtx } from "../../../store/auth-context";

/** 주문내역 아이템들의 리스트를 보여주는 최상위 컴포넌트 */
const OrderedItemsList = () => {

  // items의 페이지네이션 보여주는 items의 단위
  const limit = 5; 
  // 페이지 state 상태관리
  const [page, setPage] = useState(1); 
  // 페이지 단위로 끊어서 indexing하기위한 변수
  const offset = (page - 1) * limit;
  // useContext로 auth-context.js 의 auth데이터를 가져옴
  const { auth } = useContext(authCtx);

  // getOrdersByBuyerEmail로 주문내역 데이터를 가져옴
  const { data: orderList, isLoading } = useQuery(["orders", auth.email], () =>
    // 로그인 auth데이터가 있으면 email을 getOrdersByBuyerEmail api로 주문내역을 가져옴
    getOrdersByBuyerEmail(auth?.email)
  );

  return (
    <>
      <div>
        {isLoading ? (
          <div className="flex absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-2x">
            Loading...
          </div>
        ) : orderList.length === 0 ? (
          <div className="flex absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-2x">
            주문내역이 없습니다.
          </div>
        ) : (
          <>
            <div class=" flex justify-center items-center ">
              <div class="w-[80%] h-[80%] ">
                <div class="h-[15%]">
                  <h1 class="text-3xl mb-[10%]">주문 내역</h1>
                </div>
                <div>
                  {/* 데이터를 slice로 인덱싱만큼 끊어서 맵으로 뿌려줌 */}
                  {orderList.slice(offset, offset + limit).map((index) => (
                    // OrderedItems컴포넌트에 주문일자, 배송상태, 주문리스트, 주문인덱스 props로 전달
                    <OrderedItems
                      dateOfOrder={index.createdAt}
                      shippingState={index.shippingStatus}
                      orderList={index.orderList}
                      orderIndex={index.orderIndex}
                    />
                  ))}
                </div>
                <div>
                  <Pagination
                    // 필터된 데이터 개수에 따라 창 개수로 설정
                    total={orderList?.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderedItemsList;
