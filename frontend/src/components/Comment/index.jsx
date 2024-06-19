import { useState } from "react";
import CommentBox from "./CommentBox";
import SubmitForm from "./SubmitForm";

function Comment() {
  const [reload, setReload] = useState(0);
  return (
    <div>
      <h1 className="text-4xl font-semibold mb-3">Bình luận</h1>
      <CommentBox setReload={setReload} reload={reload} />
      <SubmitForm setReload={setReload} reload={reload} />
    </div>
  );
}

export default Comment;
