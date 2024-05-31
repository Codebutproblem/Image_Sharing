import { useSelector } from "react-redux";
import UploadButton from "./UploadButton";

function UploadHeader() {
  const uploader = useSelector((state) => state.UploadReducer);
  return (
    <div className="flex justify-between py-3 border-b-2">
      <h2 className="text-3xl font-medium border-slate-300 pt-2">Tạo mới</h2>
      {uploader.allowUpload && <UploadButton />}
    </div>
  );
}

export default UploadHeader;
