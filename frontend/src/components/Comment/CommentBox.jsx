import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteComment, getComments } from "../../services/commentService";
import ResponseMessage from "../../config/message";
import { timeAgo } from "../../utils/Time";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../redux/actions/other";
import { Pagination } from "@mui/material";
function CommentBox({ setReload, reload }) {
    const { slug } = useParams();
    const [commentObject, setCommentObject] = useState({comments: [], totalPage: 0});
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.UserReducer).id;
    useEffect(() => {
        const waittingAPI = async () => {
            const result = await getComments(slug, { page: page, limit: 5 });
            if (result.message === ResponseMessage.GET_SUCCESS) {
                setCommentObject({
                    comments: result.comments,
                    totalPage: result.totalPage
                })
            }
        };
        waittingAPI();
    }, [slug, reload, page]);

    const handleDelete = async (e) => {
        const commentId = parseInt(e.target.getAttribute("comment_id"));
        const result = await deleteComment(commentId);
        if (result.message === ResponseMessage.DELETE_SUCCESS) {
            dispatch(showAlert({ type: "success", message: "Xóa bình luận thành công" }));
            setReload(reload + 1);
        }
    };

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <>
            <div className="w-ful mb-8">
                {commentObject.comments.map((comment) =>
                    <div key={comment.id} className="flex items-center gap-3 p-3 pb-0 mb-4">
                        <img
                            src={comment.Author.avatar || "https://www.gravatar.com/avatar/"}
                            alt={comment.Author.username}
                            className="w-14 h-14 rounded-full object-cover"
                        />
                        <div className="relative">
                            <div className="flex gap-3 items-end">
                                <span className="text-xl font-semibold">{comment.Author.username}</span>
                                <span className="text-base font-medium">{timeAgo(comment.createdAt)}</span>
                                {userId === comment.Author.id && (<button comment_id={comment.id} onClick={handleDelete} className="text-sm font-medium bg-gray-400 duration-200 hover:bg-gray-500 text-slate-50 px-1 py-0.5 rounded-md">Xóa</button>)}
                            </div>
                            <p className="text-lg font-medium">{comment.content}</p>
                        </div>
                    </div>
                )}

            </div>
            {(commentObject.totalPage > 1) && <Pagination count={totalPage} onChange={handleChange} />}
            
        </>
    );
}
export default CommentBox;