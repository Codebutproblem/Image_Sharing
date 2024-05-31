import { useSelector } from "react-redux";
import Checkbox from "./CheckBox";

function OtherOption() {
  const uploader = useSelector((state) => state.UploadReducer);
  return (
    <>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Lựa chọn khác:
      </label>
      <div className="mb-5">
        <Checkbox
          name={"allowComment"}
          desc={"Cho phép nhận xét"}
          checked={uploader.allowComment}
        />
      </div>
      <div className="mb-5">
        <Checkbox
          name={"allowRecommend"}
          desc={"Cho phép hiển thị nội dun tương tự"}
          checked={uploader.allowRecommend}
        />
      </div>
    </>
  );
}

export default OtherOption;
