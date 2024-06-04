import { useDispatch, useSelector } from "react-redux";
import { updateTitle } from "../../redux/actions/uploader";

function TitleInput() {
  const uploader = useSelector((state) => state.UploadReducer);
  const dispatch = useDispatch();

  return (
    <>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Tiêu đề
      </label>
      <input
        onChange={(e) => {
          dispatch(updateTitle(e.target.value));
        }}
        name="title"
        type="text"
        className="min-w-[300px] block w-full px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-600 focus:border-sky-600 sm:text-sm"
        placeholder="Nhập tiêu đề"
        required
        value={uploader.title}
      />
    </>
  );
}
export default TitleInput;
