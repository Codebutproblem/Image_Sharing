import { useEffect, useState } from "react";
import ResponseMessage from "../../config/message";
import { getAllUserTables } from "../../services/tableService";
import { useDispatch } from "react-redux";
import {updateTable} from "../../redux/actions/uploader";

function SelectSection({ reload}) {
  const [tables, setTables] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const waittingAPI = async () => {
      const result = await getAllUserTables();
      if(result.message === ResponseMessage.GET_SUCCESS) {
        setTables(result.tables);
      }
    };
    waittingAPI();
  }, [reload]);
  const handleSelect = (e) => {
    dispatch(updateTable(parseInt(e.target.value)));
  };
  return (
    <select onChange={handleSelect} className="min-w-[180px] block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-600 focus:border-sky-600 sm:text-sm flex-grow">
      <option value="" aria-readonly>
        --- Chọn bảng ---
      </option>
      {tables.map((table) => (
        <option key={table.id} value={table.id}>
          {table.name}
        </option>
      ))}
    </select>
  );
}

export default SelectSection;
