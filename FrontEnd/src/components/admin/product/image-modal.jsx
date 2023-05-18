import Button from "../../UI/button";

const ImageModal = (props) => {
  return (
    <div className="fixed border border-color2 w-[430px] h-[600px] bg-[#ffffff] top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-50 p-10 rounded-xl flex flex-col items-center gap-5">
      <div className="flex w-full flex-col items-center border border-color2 p-5">
        <div className="h-96">
          <img
            className="h-[300px]"
            src={props.imgFile ? props.imgFile : ``}
            alt="프로필 이미지"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          ref={props.imgRef}
          onChange={props.uploadImgFile}
        />
      </div>
      <div className="flex gap-3">
        <div onClick={props.toggleImageModalHandler}>
          <Button isConfirm={false}>취소</Button>
        </div>
        <div onClick={props.addImageHandler}>
          <Button isConfirm={true}>이미지 추가</Button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
