import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { showAlert } from "../../redux/actions/other";
import ResponseMessage from "../../config/message";
import { createComment } from "../../services/commentService";
import EmojiPicker from 'emoji-picker-react';
function SubmitForm({reload, setReload}) {
    const infoUser = useSelector((state) => state.UserReducer);
    const dispatch = useDispatch();
    const {slug} = useParams();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const content = e.target.content.value;
        const result = await createComment({ slug , content });
        if(result.message === ResponseMessage.CREATE_SUCCESS) {
            dispatch(showAlert({type: "success", message: "Bình luận thành công"}));
            e.target.content.value = "";
            setReload(reload + 1);
        }
        else{
            dispatch(showAlert({type: "error", message: "Bình luận của bạn bị lỗi"}));
        }
    };
    const handleEmojiClick = (event) => {
        const content = document.getElementById("content");
        content.value += event.emoji;
        console.log(event);
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 p-3">
                <img
                    src={infoUser.avatar || "https://www.gravatar.com/avatar/"}
                    alt="avatar"
                    className="w-14 h-14 rounded-full object-cover"
                />
                <textarea
                    id="content"
                    className="w-full p-3 text-lg bg-gray-100 rounded-2xl focus:outline-sky-600"
                    placeholder="Viết bình luận..."
                ></textarea>
            </div>
            <div className="flex gap-2 justify-end items-end pr-3">
                <div className="hidden sm:block">
                <EmojiPicker onEmojiClick={handleEmojiClick} reactionsDefaultOpen={true} />
                </div>
                <button className="p-3 text-white duration-300 bg-blue-500 hover:bg-blue-600 rounded-2xl">
                    Submit
                </button>
            </div>
        </form>
    );
}
export default SubmitForm;