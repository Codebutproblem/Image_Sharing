import { useDispatch, useSelector } from "react-redux";
import UploadFirebase from "../../utils/UploadFirebase";
import { createPin } from "../../services/pinService";
import { resetUploader } from "../../actions/uploader";
import { showAlert } from "../../actions/alert";
import { showLoading } from "../../actions/loading";
function UploadButton() {
  const dispatch = useDispatch();
  const uploader = useSelector((state) => state.UploadReducer);
  const handleUpload = (e) => {
    if (!uploader.file) {
      return;
    }
    const loadingApi = async () => {
      if (!uploader.title) {
        return { message: "title-required" };
      }
      if (!uploader.file) {
        return { message: "url-required" };
      }
      const url = await UploadFirebase(uploader.file);
      const pin = {
        title: uploader.title,
        description: uploader.description,
        allow_comment: uploader.allowComment,
        allow_recommend: uploader.allowRecommend,
        url: url,
        topics: uploader.topics.map((topic) => topic.id),
        table_id: uploader.tableId,
      };
      const result = await createPin(pin);
      return result;
    };
    loadingApi()
      .then((result) => {
        dispatch(showLoading(false));
        switch (result.message) {
          case "create-pin-success":
            dispatch(resetUploader());
            dispatch(showAlert({ type: "success", message: "Tải lên thành công" }));
            break;
          case "url-required":
            dispatch(showAlert({ type: "error", message: "Vui lòng chọn tệp" }));
            break;
          case "title-required":
            dispatch(showAlert({ type: "error", message: "Vui lòng nhập tiêu đề" }));
            break;
          case "create-pin-failed":
            dispatch(showAlert({ type: "error", message: "Tải lên thất bại" }));
            break;
          default:
            break;
        }
      })
      .catch(() => {
        dispatch(showLoading(false));
        setAlert({ type: "error", message: "Tải lên thất bại" });
      });
      dispatch(showLoading(true));
  };
  return (
    <button
      onClick={handleUpload}
      className="p-2 bg-red-500 hover:bg-red-600 text-slate-50 rounded-md"
    >
      Lưu tệp
    </button>
  );
}

export default UploadButton;
