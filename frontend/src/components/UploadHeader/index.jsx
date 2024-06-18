import { useSelector } from "react-redux";
import UploadButton from "./UploadButton";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

function UploadHeader({ type }) {
  const uploader = useSelector((state) => state.UploadReducer);
  return (
    <div className="flex justify-between py-3 border-b-2">
      <h2 className="text-3xl font-medium border-slate-300 pt-2">{type === "create" ? "Tạo mới" : "Chỉnh sửa"}</h2>
      {type === "create" ?
        <>
          {uploader.allowUpload && <UploadButton />}
        </>
        :
        <div className="flex gap-3">
          <EditButton />
          <DeleteButton />
        </div>
        }
    </div>
  );
}

export default UploadHeader;
