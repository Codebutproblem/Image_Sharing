import SelectSection from "./SelectSection";
import TableCreateButton from "./TableCreateButton";
function TableSelect() {
  return (
    <>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Bảng
      </label>
      <div className="flex items-center gap-2">
        <SelectSection />
        <TableCreateButton />
      </div>
    </>
  );
}

export default TableSelect;
