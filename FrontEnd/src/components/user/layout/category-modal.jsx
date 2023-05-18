import { useEffect, useState } from "react";
import CategoryModalList from "./category-modal-list";

import classes from "./category-modal.module.css";

const CategoryModal = (props) => {
  const { title, categories, _id } = props.categoryBundle;
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const categoryIndex = props.categoryIndex;

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
