import { axiosBase } from "./api";

/** 모든 상품 데이터 요청 */
export const getAllProducts = async () => {
  const data = await axiosBase.get("api/products");
  return data.data.reverse();
};

/** 상품 ID에 해당하는 상품 데이터 요청 */
export const getProductById = async (productId) => {
  const data = await axiosBase.get(`api/products/${productId}`);
  return data.data;
};

/** 선택한 카테고리에 해당하는 상품 데이터 요청 */
export const getProductsByCategory = async (
  categoryBundleTitle,
  categoryName
) => {
  const data = await axiosBase.get(
    `api/products/${categoryBundleTitle}/${categoryName}`
  );
  return data.data;
};

/** 지정한 가격 카테고리에 해당하는 상품 데이터 요청 */
export const getProductsByCategoryPrice = async (price1, price2) => {
  const data = await axiosBase.get(`api/products/prices/${price1}/${price2}`);
  return data.data;
};

/** Best 상품 데이터 요청 */
export const getProductsByIsBest = async () => {
  const data = await axiosBase.get("api/products/lists/best");
  return data.data;
};

/** Pick된 상품 데이터 요청 */
export const getProductsByIsPicked = async () => {
  const data = await axiosBase.get("api/products/lists/picked");
  return data.data;
};

/** 선택한 상품 ID의 정보 수정 요청 */
export const editProductById = async (productId, data) => {
  const result = await axiosBase.put(`api/products/${productId}`, {
    _id: data.productId,
    name: data.name,
    brand: data.brand,
    type: data.type,
    country: data.country,
    region: data.region,
    imgUrl: data.imgUrl,
    info: data.info,
    price: data.price,
    discountPrice: data.discountPrice,
    saleCount: 0,
    saleState: "판매중",
    isPicked: data.isPicked,
    isBest: data.isBest,
    inventory: data.inventory,
    tags: data.tags,
    features: data.features,
  });
  return result;
};

/** 선택한 상품 ID의 판매상태 변경 요청 */
export const changeSaleStateById = async (productId, saleState) => {
  const result = await axiosBase.patch(
    `api/products/${productId}/${saleState}`,
    {
      saleState: saleState, // 체크된 상품들의 id 배열을 엑시오스로 넘겨줌
    }
  );
  return result;
};

/** 선택한 상품 ID의 삭제 요청 */
export const deleteCheckedProductsById = async (checkedProductIds) => {
  const result = await checkedProductIds.forEach((id) => {
    axiosBase.delete(`api/products/${id}`);
  });
  return result;
};

/** 상품 등록 요청 */
export const saveNewProduct = async (data) => {
  const {
    name,
    brand,
    type,
    country,
    region,
    imgUrl,
    info,
    price,
    discountPrice,
    saleCount,
    saleState,
    isPicked,
    isBest,
    inventory,
    tags,
    features,
  } = data;
  const result = await axiosBase.post("api/products", {
    name,
    brand,
    type,
    country,
    region,
    imgUrl,
    info,
    price,
    discountPrice,
    saleCount,
    saleState,
    isPicked,
    isBest,
    inventory,
    tags,
    features,
  });
  return result;
};
