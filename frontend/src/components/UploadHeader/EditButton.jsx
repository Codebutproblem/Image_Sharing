import { useDispatch, useSelector } from "react-redux";
import { createPin } from "../../services/pinService";
import { resetUploader } from "../../redux/actions/uploader";
import { showAlert } from "../../redux/actions/other";
import { showLoading } from "../../redux/actions/other";
import ResponseMessage from "../../config/message";
function EditButton() {
  const dispatch = useDispatch();
  const uploader = useSelector((state) => state.UploadReducer);
  const handleUpload = (e) => {
    const loadingApi = async () => {
      if (!uploader.title) {
        return { message: ResponseMessage.TITLE_REQUIRED };
      }
      const pin = {
        title: uploader.title,
        description: uploader.description,
        allow_comment: uploader.allowComment,
        allow_recommend: uploader.allowRecommend,
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
          case ResponseMessage.UPDATE_SUCCESS:
            dispatch(resetUploader());
            dispatch(
              showAlert({ type: "success", message: "Cập nhật thành công" }),
            );
            break;
          case ResponseMessage.TITLE_REQUIRED:
            dispatch(
              showAlert({ type: "error", message: "Vui lòng nhập tiêu đề" }),
            );
            break;
          case ResponseMessage.UPDATE_FAILED:
            dispatch(showAlert({ type: "error", message: "Cập nhật thất bại" }));
            break;
          default:
            break;
        }
      })
      .catch(() => {
        dispatch(showLoading(false));
        setAlert({ type: "error", message: "Cập nhật thất bại" });
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

export default EditButton;
