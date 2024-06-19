import { useState } from "react";
import SelectSection from "./SelectSection";
import TableCreateButton from "./TableCreateButton";
function TableSelect() {
  const [reload, setReload] = useState(0);
  return (
    <>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Bảng
      </label>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <SelectSection reload={reload} />
        <TableCreateButton reload={reload} setReload={setReload} />
      </div>
    </>
  );
}

export default TableSelect;
