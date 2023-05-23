import DaumPostcode from "react-daum-postcode";

/** 우편번호 컴포넌트 */
const PopupPostCode = (props) => {

  /** 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용 */
  const handlePostCode = (data) => {

    // 전체 주소
    let fullAddress = data.address;
    // 추가 주소
    let extraAddress = "";
    // 도로명 주소인 경우 추가 주소 처리
    if (data.addressType === "R") {

  // 법정동 이름이 존재하는 경우 추가 주소에 포함
  if (data.bname !== "") {
    extraAddress += data.bname;
  }
  
  // 건물명이 존재하는 경우 추가 주소에 포함
  if (data.buildingName !== "") {
    extraAddress +=
      extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
  }

  // 완전한 주소 생성
  fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
}

// 완전한 주소와 관련된 props 업데이트
props.setFullAddress(fullAddress);

// 팝업 닫기
props.onClose();
  };

  // ostCodeStyle 객체는 우편번호 검색 창의 스타일을 정의합니다. 
  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "10%",
    width: "600px",
    height: "700px",
    padding: "7px",
  };

  return (
    <div>
      {/* 다음 우편번호 검색 컴포넌트 */}
      <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
      {/* 닫기 버튼 생성 */}
      <button
        type="button"
        className="text-[white] border-2 border-c2 w-[30px] bg-c3"
        onClick={() => {
          props.onClose();
        }}
      >
        X
      </button>
    </div>
  );
};

export default PopupPostCode;