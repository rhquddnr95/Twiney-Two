import { useEffect, useState } from "react";
import CategoryModalList from "./category-modal-list";

/** 카테고리에 마우스 오버하면 뜨는 모달 컴포넌트 */
const CategoryModal = (props) => {
  const { title, categories, _id } = props.categoryBundle;
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const categoryIndex = props.categoryIndex;

  // 마우스 오버한 카테고리만 띄움
  useEffect(() => {
    if (_id === categoryIndex) {
      setIsCategoryModal(true);
    } else {
      setIsCategoryModal(false);
    }
  }, [categoryIndex, _id]);

  return (
    <>
      {isCategoryModal ? (
        <div
          key={categories._id}
          className="w-full absolute top-[56px] bg-white z-50 text-[16px]"
        >
          <ul className="flex flex-col mb-[15px]">
            {categories.map((category) => {
              return (
                <CategoryModalList
                  key={categories._id}
                  title={title}
                  category={category}
                />
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CategoryModal;
