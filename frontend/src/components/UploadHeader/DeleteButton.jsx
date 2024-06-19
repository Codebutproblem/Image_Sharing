import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { showAlert, showLoading } from "../../redux/actions/other";
import { deletePin } from "../../services/pinService";
import ResponseMessage from "../../config/message";

function DeleteButton() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = async () => {
    const loadingApi = async () => {
      const result = await deletePin(slug);
      return result;
    };

    loadingApi()
      .then((result) => {
        dispatch(showLoading(false));
        switch (result.message) {
          case ResponseMessage.DELETE_SUCCESS:
            dispatch(showAlert({ type: "success", message: "Xóa thành công" }));
            navigate(-1);
            break;
          case ResponseMessage.DELETE_FAILED:
            dispatch(showAlert({ type: "error", message: "Xóa thất bại" }));
            break;
          default:
            break;
        }
      })
      .catch(() => {
        dispatch(showLoading(false));
        dispatch(showAlert({ type: "error", message: "Xóa thất bại" }));
      });
    dispatch(showLoading(true));
  };
  return (
    <button
      onClick={handleDelete}
      className="p-2 bg-red-500 hover:bg-red-600 text-slate-50 rounded-md"
    >
      Xóa ảnh
    </button>
  );
}

export default DeleteButton;
