import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetUploader, setUploader } from "../../redux/actions/uploader";
import { getDetailUserPin } from "../../services/pinService";
import { useNavigate, useParams } from "react-router-dom";
import ResponseMessage from "../../config/message";
import UploadHeader from "../../components/UploadHeader";
import FormUploader from "../../components/FormUploader";

function PinEdit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {slug} = useParams();
    const [pin, setPin] = useState({});
    useEffect(() => {
        const waittingAPI = async () => {
            const result = await getDetailUserPin(slug);
            if(result.message === ResponseMessage.GET_SUCCESS && result.pin){
                dispatch(setUploader({
                    title: result.pin.title,
                    description: result.pin.description,
                    tableId: result.pin.Tables[0].id,
                    topics: result.pin.topics,
                    allowComment: result.pin.allow_comment,
                    allowRecommend: result.pin.allow_recommend,
                }))
                setPin(result.pin);
            }
            else{
                navigate(-1);
            }
        };
        waittingAPI();
        return () => {
            dispatch(resetUploader())
        };
    }, []);
    return (
        <div className="mx-4 sm:mx-1">
            <UploadHeader type="edit" />
            <div className="flex flex-col md:flex-row px-3 sm:px-8 lg:px-16 xl:px-20 py-5 gap-12 gl:gap-16 xl:gap-32 items-center md:items-start">
                <div className="min-w-[160px] md:min-w-[350px] lg:min-w-[430px] w-[85%] sm:w-[430px] max-w-[430px]">
                    <img
                        src={pin.url}
                        alt="preview"
                        className="relative w-full object-cover rounded-2xl"
                    />
                </div>
                <FormUploader />
            </div>
        </div>
    );
}

export default PinEdit;
