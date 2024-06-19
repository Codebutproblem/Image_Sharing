import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { getPinsByTable } from "../../services/pinService";
import ResponseMessage from "../../config/message";
import { Pagination } from "@mui/material";
import SkeletonTable from "../../components/PinTable/SkeletonTable";
import SavedPin from "../../components/PinTable/SavedPin";
import { FaArrowLeft } from "react-icons/fa";
import { deleteTable, updateTableName } from "../../services/tableService";
import { useDispatch } from "react-redux";
import { showAlert, showLoading } from "../../redux/actions/other";

function TableDetail() {
  const {userObject} = useOutletContext();
  const { table_slug } = useParams();
  const [page, setPage] = useState(1);
  const [pinObject, setPinObject] = useState({
    pins: [],
    tableName: "",
    total_pages: 0,
  });
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const waittingAPI = async () => {
      const result = await getPinsByTable(table_slug, { page: page, limit: 8 });
      if (result.message === ResponseMessage.GET_SUCCESS) {
        setPinObject({
          pins: result.pins,
          tableName: result.tableName,
          total_pages: result.total_pages,
        });
      }
    };
    waittingAPI();
  }, [page]);

  const handleChange = () => {
    if (inputRef.current.value === pinObject.tableName) {
      setShowUpdateButton(false);
      return;
    }
    setShowUpdateButton(true);
  };

  const handleUpdateName = () => {
    const waittingAPI = async () => {
      if (inputRef.current.value === "") {
        return { message: ResponseMessage.FIELD_REQUIRED };
      }
      const result = await updateTableName(table_slug, inputRef.current.value);
      return result;
    };
    waittingAPI()
      .then((result) => {
        dispatch(showLoading(false));
        if (result.message === ResponseMessage.UPDATE_SUCCESS) {
          dispatch(
            showAlert({ type: "success", message: "Cập nhật thành công" }),
          );
          setShowUpdateButton(false);
        } else if (result.message === ResponseMessage.FIELD_REQUIRED) {
          dispatch(
            showAlert({ type: "error", message: "Vui lòng nhập tên bảng" }),
          );
          inputRef.current.focus();
        } else {
          dispatch(showAlert({ type: "error", message: "Cập nhật thất bại" }));
          inputRef.current.value = pinObject.tableName;
        }
      })
      .catch((e) => {
        dispatch(showLoading(false));
        dispatch(showAlert({ type: "error", message: "Cập nhật thất bại" }));
        inputRef.current.value = pinObject.tableName;
      });
    dispatch(showLoading(true));
  };

  const handleDeleteTable = () => {
    const waittingAPI = async () => {
      const result = await deleteTable(table_slug);
      return result;
    };
    waittingAPI().then((result) => {
      dispatch(showLoading(false));
      if (result.message === ResponseMessage.DELETE_SUCCESS) {
        dispatch(
          showAlert({ type: "success", message: "Xóa bảng thành công" }),
        );
        navigate(-1);
      } else {
        dispatch(showAlert({ type: "error", message: "Xóa bảng thất bại" }));
      }
    });
    dispatch(showLoading(true));
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-4">
          <span
            className=" text-slate-50 text-xl cursor-pointer p-3 rounded-full duration-300 bg-sky-500 hover:bg-sky-600"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </span>
          <input
            onChange={handleChange}
            ref={inputRef}
            type="text"
            className="text-3xl font-semibold outline-none bg-transparent min-w-[150px] px-3 py-2"
            defaultValue={pinObject?.tableName}
            readOnly={userObject?.isMe ? false : true}
          />
        </div>
        <div className="flex items-center gap-3">
          {showUpdateButton && (
            <button
              onClick={handleUpdateName}
              className="p-2 bg-orange-500 hover:bg-orange-600 text-slate-50 rounded-md"
            >
              Cập nhật
            </button>
          )}
          {userObject?.isMe && (
            <button
              onClick={handleDeleteTable}
              className="p-2 bg-red-500 hover:bg-red-600 text-slate-50 rounded-md"
            >
              Xóa bảng
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        {pinObject.total_pages > 1 && (
          <Pagination
            color="primary"
            size="large"
            variant="outlined"
            shape="rounded"
            count={pinObject?.total_pages}
            page={page}
            onChange={(e, value) => setPage(value)}
          />
        )}
      </div>
      <div className="mt-3">
        {pinObject.pins.length === 0 ? (
          <SkeletonTable col={2} row={3} />
        ) : (
          <SavedPin pinObject={pinObject} />
        )}
      </div>
    </div>
  );
}

export default TableDetail;
