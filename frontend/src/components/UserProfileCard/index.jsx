import { useRef } from 'react';
import { updateInfoUser } from '../../services/userAccountService';
import { uploadImageFirebase } from '../../utils/UploadFirebase';
import { useDispatch } from 'react-redux';
import { showAlert, showLoading } from '../../redux/actions/other';
import ResponseMessage from '../../config/message';

const UserProfileCard = ({userObject, setUserObject}) => {
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const waitting = async () => {
            const url = await uploadImageFirebase(file);
            const result = await updateInfoUser({ avatar: url });
            if (result.message === ResponseMessage.UPDATE_SUCCESS) {
                dispatch(showLoading(false));
                dispatch(showAlert({ type: 'success', message: 'Cập nhật thành công' }));
                setUserObject({
                    ...userObject,
                    user: {
                        ...userObject.user,
                        avatar: url
                    }
                });
            };
        }
        waitting();
        dispatch(showLoading(true));
    };
    return (
        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <div className='relative group'>
                <img
                    className="w-full h-48 object-cover"
                    src={userObject.user.avatar || "https://www.gravatar.com/avatar/"}
                    alt="User Avatar"
                />
                {userObject.isMe && (
                    <>
                        <div onClick={() => fileInputRef.current.click()} className="absolute top-0 right-0 left-0 bottom-0 bg-[#00000030] hidden group-hover:block cursor-pointer"></div>
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
                    <span className="block text-gray-900">{userObject.user.username}</span>
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
