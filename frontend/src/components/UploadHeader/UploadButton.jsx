import { useDispatch, useSelector } from "react-redux";
import { createPin } from "../../services/pinService";
import { resetUploader } from "../../redux/actions/uploader";
import { showAlert } from "../../redux/actions/other";
import { showLoading } from "../../redux/actions/other";
import { ResponseMessage } from "../../config/system";
import { uploadImageFirebase } from "../../utils/UploadFirebase";
function UploadButton() {
  const dispatch = useDispatch();
  const uploader = useSelector((state) => state.UploadReducer);
  const handleUpload = (e) => {
    if (!uploader.file) {
      return;
    }
    const loadingApi = async () => {
      if (!uploader.title) {
        return { message: ResponseMessage.TITLE_REQUIRED };
      }
      if (!uploader.file) {
        return { message: ResponseMessage.FILE_REQUIRED };
      }
      const url = await uploadImageFirebase(uploader.file);
      const pin = {
        title: uploader.title,
        description: uploader.description,
        allow_comment: uploader.allowComment,
        allow_recommend: uploader.allowRecommend,
        url: url,
        topic_ids: uploader.topics.map((topic) => topic.id),
        table_id: uploader.tableId,
      };
      const result = await createPin(pin);
      return result;
    };
    loadingApi()
      .then((result) => {
        dispatch(showLoading(false));
        switch (result.message) {
          case ResponseMessage.CREATE_SUCCESS:
            dispatch(resetUploader());
            dispatch(
              showAlert({ type: "success", message: "Tải lên thành công" }),
            );
            break;
          case ResponseMessage.FILE_REQUIRED:
            dispatch(
              showAlert({ type: "error", message: "Vui lòng chọn tệp" }),
            );
            break;
          case ResponseMessage.TITLE_REQUIRED:
            dispatch(
              showAlert({ type: "error", message: "Vui lòng nhập tiêu đề" }),
            );
            break;
          case ResponseMessage.CREATE_FAILED:
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
