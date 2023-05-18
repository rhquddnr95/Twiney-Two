import { useQuery } from "react-query";
import { getProductById } from "../../../../api/api-product";

/** 주문 아이템(최소 자식 단위)에 대한 컴포넌트 prop로 [상품id, 수량]을 받음*/
const OrderedItem = (props) => {
  
  /** 주문 아이템의 주문번호 */
  const productId = props.productId;
  /** 주문 아이템의 수량 */
  const amount = props.amount;

  // 유즈쿼리로 주문번호를 통해 데이터를 받아옴 data에는 상품 이미지, 상품 이름 받아옴
  const { data, isLoading, isError, error } = useQuery(
    ["product", productId],
    async () => await getProductById(productId)
  );

  return (
    <div className="h-[120px]   flex items-center">
      {/* div's orderedItemId: {orderedItemId} */}
      <div className="  justify-items-start  ">
        <div className=" h-[90%] m-[20px] ">
          <div className="flex justify-center items-center gap-5">
            <div className="w-[80px] h-[80px] bg-bgc1 flex justify-center items-center  ">
              <img
                src={data?.imgUrl}
                alt={"와인이미지"}
                className="h-[60px] "
              ></img>
            </div>
            <span className="w-[100%] text-2xl">
              {/* 상품명, 상품개수 */}
              {data?.name}, {amount}병
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderedItem;
