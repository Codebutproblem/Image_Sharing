import { useEffect } from "react";
import DragDropImageUploader from "../../components/DragDropImageUploader";
import FormUploader from "../../components/FormUploader";
import UploadHeader from "../../components/UploadHeader";
import { useDispatch } from "react-redux";
import { resetUploader } from "../../redux/actions/uploader";

function Uploader() {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetUploader())
    };
  },[]);
  return (
    <div className="mx-4 sm:mx-1">
      <UploadHeader type="create" />
      <div className="flex flex-col md:flex-row px-3 sm:px-8 lg:px-16 xl:px-20 py-5 gap-12 gl:gap-16 xl:gap-32 items-center md:items-start">
        <DragDropImageUploader />
        <FormUploader />
      </div>
    </div>
  );
}

export default Uploader;
