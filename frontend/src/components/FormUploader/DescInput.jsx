import { useDispatch, useSelector } from "react-redux";
import { updateDesc } from "../../actions/uploader";

function DescInput() {
  const dispatch = useDispatch();
  const uploader = useSelector((state) => state.UploadReducer);
  return (
    <>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Mô tả
      </label>
      <textarea
        onChange={(e) => {
          dispatch(updateDesc(e.target.value));
        }}
        name="description"
        className="min-w-[300px] block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-600 focus:border-sky-600 sm:text-sm resize-none h-24"
        placeholder="Nhập mô tả"
        value={uploader.description}
      ></textarea>
    </>
  );
}

export default DescInput;
