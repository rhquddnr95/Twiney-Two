import { Link } from "react-router-dom";

/** 카테고리 모달내 카테고리 리스트 컴포넌트 */
const CategoryModalList = (props) => {
  const { _id, name } = props.category;
  const title = props.title;

  // 카테고리 번들 타이틀에따라 URL을 세분화해서 할당
  let linkTag = "";
  if (title === "WINE") {
    linkTag = `/category/types/${name}`;
  }
  if (title === "COUNTRY") {
    linkTag = `/category/countries/${name}`;
  }
  if (title === "PRICE") {
    linkTag = `/category/prices/${+name.split("~")[0].slice(0, -2) * 10000}/${
      +name.split("~")[1].slice(0, -2) * 10000
    }`;
  }
  return (
    <>
      <li key={_id} className="flex items-center justify-center h-[50px]">
        <Link
          to={linkTag}
          className="flex items-center justify-center w-full h-full hover:text-[rgb(222, 147, 147)"
        >
          {name}
        </Link>
      </li>
    </>
  );
};

export default CategoryModalList;
