import DragDropImageUploader from "../../components/DragDropImageUploader";
import FormUploader from "../../components/FormUploader";
import UploadHeader from "../../components/UploadHeader";

function Uploader() {
  return (
    <div className="mx-1">
      <UploadHeader/>
      <div className="flex px-20 py-5 gap-16 lg:gap-32 items-start">
        <DragDropImageUploader />
        <FormUploader />
      </div>
    </div>
  );
}

export default Uploader;
