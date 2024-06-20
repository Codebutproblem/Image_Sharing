import { useEffect, useRef } from "react";
import { updateInfoUser } from "../../services/userAccountService";
import { uploadImageFirebase } from "../../utils/UploadFirebase";
import { useDispatch } from "react-redux";
import { showAlert, showLoading } from "../../redux/actions/other";
import ResponseMessage from "../../config/message";

const UserProfileCard = ({ userObject, setUserObject }) => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const moveUserCard = () => {
      if (window.innerWidth >= 768) {
        const margin = document.documentElement.scrollTop;
        const userCard = document.getElementById("user-card");
        userCard.style.marginTop = `${margin}px`;
      }
    };
    const handleResize = () => {
      if (window.innerWidth < 768) {
        const userCard = document.getElementById("user-card");
        userCard.style.marginTop = "0px";
      }
    };
    window.addEventListener("scroll", moveUserCard);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", moveUserCard);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const waitting = async () => {
      const url = await uploadImageFirebase(file);
      const result = await updateInfoUser({ avatar: url });
      if (result.message === ResponseMessage.UPDATE_SUCCESS) {
        dispatch(showLoading(false));
        dispatch(
          showAlert({ type: "success", message: "Cập nhật thành công" }),
        );
        setUserObject({
          ...userObject,
          user: {
            ...userObject.user,
            avatar: url,
          },
        });
      }
    };
    waitting();
    dispatch(showLoading(true));
  };
  return (
    <div
      id="user-card"
      className="w-full bg-white rounded-xl shadow-lg overflow-hidden duration-500 ease-in-out"
    >
      <div className="relative group">
        <img
          className="w-full h-48 object-cover"
          src={userObject.user.avatar || "https://www.gravatar.com/avatar/"}
          alt="User Avatar"
        />
        {userObject.isMe && (
          <>
            <div
              onClick={() => fileInputRef.current.click()}
              className="absolute top-0 right-0 left-0 bottom-0 bg-[#00000030] hidden group-hover:block cursor-pointer"
            ></div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png, image/jpeg, image/gif"
              className="hidden"
              onChange={handleFileChange}
            />
          </>
        )}
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">User Profile</h2>
        <div className="mb-4">
          <span className="block text-gray-700 font-bold">Username:</span>
          <span className="block text-gray-900">
            {userObject.user.username}
          </span>
        </div>
        <div className="mb-4">
          <span className="block text-gray-700 font-bold">Email:</span>
          <span className="block text-gray-900">{userObject.user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
