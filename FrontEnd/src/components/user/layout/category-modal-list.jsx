import { Link } from "react-router-dom";

const CategoryModalList = (props) => {
  const { _id, name } = props.category;
  const title = props.title;

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
