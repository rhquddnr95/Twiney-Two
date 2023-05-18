import Product from "../../../components/user/product/product";
import Pagination from "../../../components/user/product/pagination";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import {
  getProductsByCategory,
  getProductsByCategoryPrice,
  getProductsByIsBest,
} from "../../../api/api-product";

const ProductListPage = () => {
  // App.jsx에 정의한 라우터를 통해 받아온 url의 category 정보를 받음
  // best
  const categoryBest = useParams().category_best;
  // type, country
  const categoryBundleTitle = useParams().category_bundle_title;
  // red, white, rose, ...
  const categoryName = useParams().category_name;
  // 최저 가격
  const categoryPrice1 = useParams().price_1;
  // 최고 가격
  const categoryPrice2 = useParams().price_2;

  // useQuery를 사용하여 데이터를 가져옴
  // 첫 번째 인자 : 쿼리의 식별자로 사용되는 배열
  // 두 번째 인자 : 실제 데이터 조회 로직을 담고 있는 콜백 함수
  const { data, isLoading, error } = useQuery(
    ["products", categoryName, categoryPrice1, categoryPrice2],
    () => {
      if (categoryPrice2) {
        return getProductsByCategoryPrice(categoryPrice1, categoryPrice2);
      } else if (categoryName) {
        return getProductsByCategory(categoryBundleTitle, categoryName);
      } else if (categoryBest === "best") {
        return getProductsByIsBest();
      } else {
        return [];
      }
    }
  );

  // 숨김 상태가 아닌 상품 데이터 배열
  const filteredByIsLarvate = data?.filter((item) => item.saleState !== "숨김");

  // 한 페이지에 최대 보여줄 상품 개수
  const limit = 12;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    setPage(1);
  }, [data]);

  // grid에 rows를 동적으로 줘서 아이템 개수에 따라
  // pagination 위치가 마지막 아이템 줄 밑에 바로 붙도록 설정
  return (
    <>
      <div className="inline-block relative py-16 min-h-screen w-full">
        <div>
          {/* 특정 카테고리 선택시 제목 및 개수 표시 */}
          <h1 className="ml-[30px] mb-[50px] text-2xl">
            {categoryName && categoryName}
            {categoryPrice2 && `${categoryPrice1} ~ ${categoryPrice2}`}
            {categoryBest && categoryBest}(
            {filteredByIsLarvate ? filteredByIsLarvate?.length : 0})
          </h1>
        </div>

        {/* 로딩 중인 경우 화면에 안내 표시 */}
        {isLoading ? (
          <div
            className="flex absolute top-[50%] left-[50%] 
          translate-y-[-50%] translate-x-[-50%] z-2"
          >
            Loading...
          </div>
        ) : filteredByIsLarvate ? (
          <>
            {/* 상품이 없는 경우 안내 표시 */}
            {filteredByIsLarvate.length === 0 ? (
              <div
                className="flex absolute top-[50%] left-[50%] 
              translate-y-[-50%] translate-x-[-50%] z-2x"
              >
                상품이 없습니다.
              </div>
            ) : (
              <>
                {/* 데이터가 있는 경우 지정된 개수에 맞춰서 보여줌 */}
                <ul
                  className="grid grid-rows-fr xl:grid-cols-4 lg:grid-cols-3 
                  md:grid-cols-2 sm:grid-cols-1 gap-[60px] gap-y-[90px]
                  mb-[90px] place-items-center mx-auto"
                >
                  {filteredByIsLarvate
                    ?.slice(offset, offset + limit)
                    .map((product) => {
                      return <Product key={product._id} product={product} />;
                    })}
                </ul>
                <div>
                  {/* 페이지 넘기는 버튼 */}
                  <Pagination
                    total={data?.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-2">
            {error.message}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductListPage;
