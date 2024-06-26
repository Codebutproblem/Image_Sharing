import { useRef, useState } from "react";
import hideHiddenBoxListener from "../../utils/hideHiddenBox";
import { FaPlus } from "react-icons/fa6";
import { createTable } from "../../services/tableService";
import ResponseMessage from "../../config/message";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/actions/other";
function TableCreateButton({ reload, setReload }) {
  const [showCreateTable, setShowCreateTable] = useState(false);
  const inputRef = useRef();
  const dispatch = useDispatch();
  hideHiddenBoxListener(
    showCreateTable,
    setShowCreateTable,
    "tableCreateButton",
    "tableCreateBox",
  );
  const handleClick = async () => {
    const tableName = inputRef.current.value;
    if (tableName === "") {
      inputRef.current.focus();
      return;
    }
    const result = await createTable(tableName);
    if (result.message === ResponseMessage.CREATE_SUCCESS) {
      dispatch(showAlert({ type: "success", message: "Tạo bảng thành công" }));
      setReload(reload + 1);
    } else if (result.message === ResponseMessage.TABLE_EXISTS) {
      dispatch(showAlert({ type: "error", message: "Tên bảng đã tồn tại" }));
    } else {
      dispatch(showAlert({ type: "error", message: "Tạo bảng thất bại" }));
    }
  };

  return (
    <div className="relative">
      <button
        id="tableCreateButton"
        onClick={() => setShowCreateTable(!showCreateTable)}
        className="p-3 whitespace-nowrap rounded-2xl bg-orange-400 hover:bg-orange-500 text-slate-50 flex items-center"
      >
        <span className=" text-base">Tạo bảng</span>
        <span className="ms-1">
          <FaPlus />
        </span>
      </button>

      {showCreateTable && (
        <div
          id="tableCreateBox"
          className="absolute bottom-[110%] left-1/2 -translate-x-1/2 w-80 shadow-md bg-slate-50 z-10 rounded-xl p-2"
        >
          <div className="mb-5 text-center text-gray-700 font-medium">
            Tạo bảng mới
          </div>
          <div className="mb-5">
            <input
              ref={inputRef}
              type="text"
              name="tableName"
              placeholder="Nhập tên bảng"
              className="block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-600 focus:border-sky-600 sm:text-sm"
              required
            />
          </div>
          <div className="text-right">
            <button
              onClick={handleClick}
              className="p-2 bg-sky-500 text-slate-50 rounded-md"
            >
              Lưu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TableCreateButton;
