import { useEffect, useState } from "react";
import ProfilePin from "../../components/ProfilePin";
import UserProfileCard from "../../components/UserProfileCard";
import { getInfoUser } from "../../services/userAccountService";
import ResponseMessage from "../../config/message";
import { useParams } from "react-router-dom";

function Profile() {

    const [userObject, setUserObject] = useState(null);
    const { slug } = useParams();
    useEffect(() => {
        const waittingAPI = async () => {
            const result = await getInfoUser(slug);
            if (result.message === ResponseMessage.GET_SUCCESS) {
                setUserObject({
                    user: result.user,
                    isMe: result.isMe
                });
            }
        };
        waittingAPI();
    }, [slug]);
    return (
        <div className="pt-3 pb-10 flex justify-between">
            <div className="w-[30%]">
                {userObject && <UserProfileCard userObject={userObject} setUserObject={setUserObject} />}
            </div>
            <div className="w-[65%]">
                {userObject && <ProfilePin isMe={userObject.isMe} />}
            </div>
        </div>
    );
}

export default Profile;