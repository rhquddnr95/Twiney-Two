import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { editProductById } from "../../../api/api-product";
import { getAllCategories } from "../../../api/api-category";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ImageModal from "./image-modal";
import Button from "../../UI/button";

/** 상품 등록,수정시 입력하는 폼 컴포넌트 */
const ProductForm = (props) => {
  // 상품 등록시 필요한 카테고리 데이터 받아옴
  const { data: categoryBundle } = useQuery("categories", () =>
    getAllCategories()
  );

  const data = props?.product;

  //각 폼데이터들 상태관리
  const [brand, setBrand] = useState(data ? data.brand : "");
  const [name, setName] = useState(data ? data.name : "");
  const [price, setPrice] = useState(data ? data.price : "");
  const [imgUrl, setImgUrl] = useState(data ? data.imgUrl : "");
  const [discountPrice, setDiscountPrice] = useState(
    data ? data.discountPrice : ""
  );
  const [inventory, setInventory] = useState(data ? data.inventory : "");
  const [country, setCountry] = useState(data ? data.country : "카테고리 선택");
  const [region, setRegion] = useState(data ? data.region : "");
  const [type, setType] = useState(data ? data.type : "카테고리 선택");
  const [sugar, setSugar] = useState(data ? data.features.sugar : "선택");
  const [acidity, setAcidity] = useState(data ? data.features.acidity : "선택");
  const [tannic, setTannic] = useState(data ? data.features.tannic : "선택");
  const [body, setBody] = useState(data ? data.features.body : "선택");
  const [alcoholDegree, setAlcoholDegree] = useState(
    data ? data.features.alcoholDegree : ""
  );
  const [isPicked, setIsPicked] = useState(data ? data.isPicked : false);
  const [isBest, setIsBest] = useState(data ? data.isBest : false);
  const [info, setInfo] = useState(data ? data.info : "");
  const [tags, setTags] = useState(data ? data.tags.join(",") : "");
  const [imgFile, setImgFile] = useState(
    data ? data.imgUrl : "/defaultImage.jpg"
  );
  const [isImageModal, setIsImageModal] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const imgRef = useRef();
  const productId = useParams().product_id;

  // 카테고리 번들에서 와인 타입에 해당하는 카테고리들 변수에 담음
  const categoriesByType = categoryBundle?.find(
    (bundle) => bundle.title === "WINE"
  ).categories;

  // 카테고리 번들에서 와인 생산국에 해당하는 카테고리들 변수에 담음
  const categoriesByCountry = categoryBundle?.find(
    (bundle) => bundle.title === "COUNTRY"
  ).categories;

  /** CK에디터 인풋 온채인지 핸들러 */
  const editorChangeHandler = (e, editor) => {
    const info = editor.getData();
    setInfo(info);
  };

  /** 폼 취소 핸들러 */
  const formCancleHandler = (e) => {
    e.preventDefault();
    if (window.confirm("정말로 취소하시겠습니까? 수정한 내용은 없어집니다.")) {
      return navigate("/manage/product_list");
    } else {
    }
  };

  /** 폼 제출 핸들러 */
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    let arr = [];
    const data = {
      name,
      brand,
      type,
      country,
      region,
      imgUrl,
      info,
      price,
      discountPrice,
      saleCount: 0,
      saleState: "판매중",
      isPicked,
      isBest,
      inventory,
      tags: arr.concat(tags),
      features: {
        sugar,
        acidity,
        tannic,
        body,
        alcoholDegree,
      },
    };

    // validation 부분 시간이 남으면 리팩토링이 필요함
    if (Object.values(data).filter((data) => data === null).length > 0) {
      alert("상품 정보를 빠짐없이 입력해주세요.");
      return;
    }
    if (country === "카테고리 선택") {
      alert("나라 카테고리를 선택해주세요.");
      return;
    }
    if (type === "카테고리 선택") {
      alert("와인종류 카테고리를 선택해주세요.");
      return;
    }
    if (
      sugar === "선택" ||
      acidity === "선택" ||
      tannic === "선택" ||
      body === "선택"
    ) {
      alert("와인 특성들을 선택해주세요.");
      return;
    }

    try {
      await editProductById(productId, data);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      alert("상품이 성공적으로 수정되었습니다.");
      navigate("/manage/product_list");
    } catch (error) {
      console.log(error);
    }
  };

  /** 이미지 추가 모달 핸들러 */
  const toggleImageModalHandler = (e) => {
    e.preventDefault();
    if (isImageModal) {
      setIsImageModal(false);
    } else {
      setIsImageModal(true);
    }
  };

  /** 이미지 파일 업로드 함수 */
  const uploadImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  /** 이미지 추가 모달에서 이미지 칸으로 추가하는 핸들러 */
  const addImageHandler = (e) => {
    e.preventDefault();
    setImgUrl(imgFile);
    setIsImageModal(false);
  };

  return (
    <div className="flex flex-col p-6 bg-color3 ">
      <span className="text-xl mb-3 font-bold px-5">상품 수정</span>
      <div className="mx-5 border-b"></div>
      {isImageModal && (
        <ImageModal
          imgFile={imgFile}
          imgRef={imgRef}
          uploadImgFile={uploadImgFile}
          addImageHandler={addImageHandler}
          toggleImageModalHandler={toggleImageModalHandler}
        />
      )}
      <Form>
        <div className="flex gap-24 pb-10 border-b border-color2 justify-between relative">
          <div className="flex flex-col justify-center gap-4">
            <div className="flex justify-center items-center h-[400px] w-[400px] border border-color2 rounded p-10">
              <img className="h-[300px]" src={imgUrl} alt="wine" />
            </div>
            <button
              className="border h-12 rounded border-color2 border-2 text-color1 font-bold"
              onClick={toggleImageModalHandler}
            >
              이미지 추가
            </button>
          </div>
          <div className="flex flex-grow flex-col gap-3 justify-center text-sm">
            <InputDiv label="브랜드">
              <input
                value={brand}
                id="brand"
                className="border border-color2 rounded flex-grow h-7 px-2"
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
                type="text"
              />
            </InputDiv>
            <InputDiv label="상품명">
              <input
                value={name}
                className="border border-color2 rounded flex-grow h-7 px-2"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
              />
            </InputDiv>
            <InputDiv label="판매가격">
              <input
                value={price}
                className="border border-color2 rounded flex-grow h-7 px-2"
                onChange={(e) => {
                  setPrice(+e.target.value);
                }}
                type="number"
              />
            </InputDiv>
            <InputDiv label="할인가격">
              <input
                value={discountPrice}
                className="border border-color2 rounded flex-grow h-7 px-2"
                onChange={(e) => {
                  setDiscountPrice(+e.target.value);
                }}
                type="number"
              />
            </InputDiv>
            <InputDiv label="재고수량">
              <input
                value={inventory}
                className="border border-color2 rounded h-7 px-2 flex-grow"
                onChange={(e) => {
                  setInventory(+e.target.value);
                }}
                type="number"
              />
            </InputDiv>
            <InputDiv label="생산국가">
              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                className="border border-color2 rounded flex-grow h-7 px-1 "
              >
                <option value="카테고리 선택">카테고리 선택</option>
                {categoriesByCountry?.map((category) => (
                  <option value={category.name}>{category.name}</option>
                ))}
              </select>
            </InputDiv>
            <InputDiv label="생산지역">
              <input
                value={region}
                className="border border-color2 rounded flex-grow h-7 px-2"
                onChange={(e) => {
                  setRegion(e.target.value);
                }}
                type="text"
              />
            </InputDiv>
            <InputDiv label="와인종류">
              <select
                value={type}
                name=""
                className="border border-color2 rounded flex-grow h-7 px-1"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="카테고리 선택">카테고리 선택</option>
                {categoriesByType?.map((category) => (
                  <option value={category.name}>{category.name}</option>
                ))}
              </select>
            </InputDiv>
            <div className="flex justify-between">
              <InputDiv label="당도">
                <select
                  value={sugar}
                  className="border border-color2 rounded w-16 h-7 px-1"
                  onChange={(e) => {
                    setSugar(e.target.value);
                  }}
                  name=""
                >
                  <option value="선택">선택</option>
                  <option value="s1">1</option>
                  <option value="s2">2</option>
                  <option value="s3">3</option>
                  <option value="s4">4</option>
                  <option value="s5">5</option>
                </select>
              </InputDiv>
              <InputDiv label="산도">
                <select
                  value={acidity}
                  className="border border-color2 rounded w-16 h-7 px-1"
                  onChange={(e) => {
                    setAcidity(e.target.value);
                  }}
                  name=""
                >
                  <option value="선택">선택</option>
                  <option value="a1">1</option>
                  <option value="a2">2</option>
                  <option value="a3">3</option>
                  <option value="a4">4</option>
                  <option value="a5">5</option>
                </select>
              </InputDiv>
            </div>
            <div className="flex justify-between">
              <InputDiv label="탄닌">
                <select
                  value={tannic}
                  className="border border-color2 rounded w-16 h-7 px-1"
                  onChange={(e) => {
                    setTannic(e.target.value);
                  }}
                  name=""
                >
                  <option value="선택">선택</option>
                  <option value="t1">1</option>
                  <option value="t2">2</option>
                  <option value="t3">3</option>
                  <option value="t4">4</option>
                  <option value="t5">5</option>
                </select>
              </InputDiv>
              <InputDiv label="바디">
                <select
                  value={body}
                  className="border border-color2 rounded w-16 h-7 px-1"
                  onChange={(e) => {
                    setBody(e.target.value);
                  }}
                  name=""
                >
                  <option value="선택">선택</option>
                  <option value="b1">1</option>
                  <option value="b2">2</option>
                  <option value="b3">3</option>
                  <option value="b4">4</option>
                  <option value="b5">5</option>
                </select>
              </InputDiv>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <InputDiv label="도수">
                  <input
                    value={alcoholDegree}
                    className="border border-color2 rounded flex-grow h-7 w-16 px-2"
                    onChange={(e) => {
                      setAlcoholDegree(+e.target.value);
                    }}
                    min="0"
                    max="100"
                    type="number"
                  />
                </InputDiv>
              </div>
              <div className="flex flex-col gap-3 items-center">
                <CheckBoxDiv label="추천상품">
                  <input
                    type="checkbox"
                    className="border border-color2 rounded h-5 w-5 float-right"
                    onChange={() => {
                      setIsPicked(!isPicked);
                    }}
                    defaultChecked={isPicked}
                  />
                </CheckBoxDiv>
                <CheckBoxDiv label="베스트상품">
                  <input
                    type="checkbox"
                    className="border border-color2 rounded h-5 w-5 px-2"
                    onChange={() => {
                      setIsBest(!isBest);
                    }}
                    defaultChecked={isBest}
                  />
                </CheckBoxDiv>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="w-full">
            <CKEditor
              data={info}
              onChange={editorChangeHandler}
              config={{
                placeholder: "내용을 입력하세요.",
              }}
              editor={ClassicEditor}
            />
          </div>
          <div className="flex border px-2 py-1 mb-5 rounded border-color2">
            <input
              value={tags}
              className="w-full"
              placeholder="태그들을 입력하세요. ex) 스페인, 레드, 달달함"
              onChange={(e) => {
                setTags(e.target.value);
              }}
              type="text"
            />
          </div>

          <div className="flex justify-between">
            <div onClick={formCancleHandler}>
              <Button isConfirm={false}>취소하기</Button>
            </div>
            <div onClick={formSubmitHandler}>
              <Button isConfirm={true}>등록하기</Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export const Form = (props) => {
  return (
    <form>
      <div className="flex px-10">
        <div className="flex flex-col gap-10 w-full p-10 bg-[#ffffff]">
          {props.children}
        </div>
      </div>
    </form>
  );
};

export const InputDiv = (props) => {
  return (
    <div className="flex gap-3 items-center">
      <span className="w-20 font-bold">{props.label}</span>
      {props.children}
    </div>
  );
};

export const CheckBoxDiv = (props) => {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex gap-3 items-center justify-between w-[156px]">
        <span className="w-20 font-bold">{props.label}</span>
        {props.children}
      </div>
    </div>
  );
};

export default ProductForm;
