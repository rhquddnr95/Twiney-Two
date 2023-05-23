import ReactDom from "react-dom";

/** 우편번호 팝업 돔 컴포넌트 */
const PopupDom = ({ children }) => {

  // 우편번호 팝업을 렌더링할 DOM 요소를 가져옵니다.
  const el = document.getElementById("popupDom");

  // React Portal을 사용하여 우편번호 팝업을 생성합니다.
  // 팝업 내용은 children으로 전달받습니다.
  return ReactDom.createPortal(children, el);
};

export default PopupDom;