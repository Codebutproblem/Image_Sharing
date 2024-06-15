import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../redux/actions/other";
import TableSelect from "../TableSelect";
import { useEffect } from "react";
import { resetUploader } from "../../redux/actions/uploader";
import { savePin } from "../../services/pinService";
import ResponseMessage from "../../config/message";

function SavePinBox({setShowSaveBox, setSaved, pinId}) {
    const dispatch = useDispatch();
    const uploader = useSelector((state) => state.UploadReducer);
    useEffect(() => {
        return () => {
            dispatch(resetUploader());
        };
    },[]);
    const hideSaveBox = (e) => {
        e.stopPropagation();
        setShowSaveBox(false);
    };
    const saveBoxClick = (e) => {
        e.stopPropagation();
    };

    const handleSavePin = async (e) => {
        e.preventDefault();
        if(!uploader.tableId) {
            dispatch(showAlert({type: 'error', message: 'Chưa chọn bảng'}));
            return;
        };
        const result = await savePin(pinId, uploader.tableId);
        if(result.message === ResponseMessage.UPDATE_SUCCESS) {
            dispatch(showAlert({type: 'success', message: 'Lưu thành công'}));
            setSaved(true);
            setShowSaveBox(false);
        }
        else{
            dispatch(showAlert({type: 'error', message: 'Lưu thất bại'}));
        }
    };
    return (
        <div onClick={hideSaveBox} className="fixed z-[150] top-0 left-0 right-0 bottom-0 bg-[#00000040]">
            <div onClick={saveBoxClick} className="flex flex-col absolute bg-slate-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] min-w-[280px] sm:w-[460px]  rounded-xl my-3">
                <div className="flex justify-between p-3 items-center">
                    <div className=" text-2xl font-semibold">Chọn Bảng</div>
                    <FaTimes onClick={hideSaveBox} className="text-3xl cursor-pointer" />
                </div>
                <div className="p-3">
                    <TableSelect />
                </div>
                <div className="p-3">
                    <button onClick={handleSavePin} className="w-full p-2 bg-orange-500 hover:bg-orange-600 rounded-xl text-slate-50 text-xl">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SavePinBox;