import { useRef, useState } from "react";
import { GrUploadOption } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { allowUpload, updateImage } from "../../redux/actions/uploader";
function DragDropImageUploader() {
  const [imagePath, setImagePath] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const uploader = useSelector((state) => state.UploadReducer);
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    dispatch(updateImage(file));
    setImagePath(URL.createObjectURL(file));
    e.target.classList.remove("bg-slate-300");
    dispatch(allowUpload(true));
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDragEnter = (e) => {
    e.target.classList.add("bg-slate-300");
    e.target.classList.add("opacity-50");
  };
  const handleDragRemove = (e) => {
    e.target.classList.remove("bg-slate-300");
    e.target.classList.remove("opacity-50");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    dispatch(updateImage(file));
    setImagePath(URL.createObjectURL(file));
    dispatch(allowUpload(true));
  };

  const handleRemoveImage = () => {
    setImagePath(null);
    dispatch(updateImage(null));
    dispatch(allowUpload(false));
  };

  if (uploader.file) {
    return (
      <div className="relative z-10 min-w-[280px] w-[85%] sm:w-[430px] max-w-[430px] rounded-2xl overflow-hidden box-border p-2">
        <img
          src={imagePath}
          alt="preview"
          className="relative w-full object-cover rounded-2xl"
        />
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragRemove}
          onClick={() => fileInputRef.current.click()}
          className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-slate-400 hover:opacity-50 transition ease-in duration-75"
        ></div>
        <div
          onClick={handleRemoveImage}
          className="absolute top-2 right-2 text-sm cursor-pointer bg-red-500 hover:bg-red-600 text-slate-50 p-1 rounded-lg"
        >
          Remove
        </div>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/png, image/jpeg, image/gif"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    );
  }

  return (
    <div className="relative min-w-[280px] w-[85%] sm:w-[430px] max-w-[430px] h-[500px] border-2 border-slate-400 rounded-2xl overflow-hidden box-border p-2 bg-slate-200">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center max-w-48">
        <GrUploadOption className="mx-auto text-3xl text-slate-600 mb-3" />
        <p className="text-slate-600 text-base">
          Kéo và thả tệp hoặc tải tệp lên ở đây
        </p>
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragRemove}
        onClick={() => fileInputRef.current.click()}
        className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-slate-400 hover:opacity-50 transition ease-in duration-75"
      ></div>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/png, image/jpeg, image/gif"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default DragDropImageUploader;
