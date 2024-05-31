function SelectSection() {
  return (
    <select
      className="min-w-[300px] block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-600 focus:border-sky-600 sm:text-sm flex-grow"
    >
      <option value="" aria-readonly>
        --- Chọn bảng ---
      </option>
    </select>
  );
}

export default SelectSection;
