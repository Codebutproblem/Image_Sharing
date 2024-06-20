import { useEffect, useState } from "react";
import UserProfileCard from "../../components/UserProfileCard";
import { getInfoUser } from "../../services/userAccountService";
import ResponseMessage from "../../config/message";
import { Outlet, useParams } from "react-router-dom";

function Profile() {
  const [userObject, setUserObject] = useState(null);
  const { slug } = useParams();
  useEffect(() => {
    const waittingAPI = async () => {
      const result = await getInfoUser(slug);
      if (result.message === ResponseMessage.GET_SUCCESS) {
        setUserObject({
          user: result.user,
          isMe: result.isMe,
        });
      }
    };
    waittingAPI();
  }, [slug]);
  return (
    <div className="pt-3 pb-10 flex gap-10 flex-col md:flex-row justify-between">
      <div className="w-[30%] min-w-[350px] md:min-w-[300px] mx-auto md:mx-0">
        {userObject && (
          <UserProfileCard
            userObject={userObject}
            setUserObject={setUserObject}
          />
        )}
      </div>
      <div className="w-full md:w-[55%] lg:w-[65%] flex flex-col gap-10">
        <Outlet context={{ userObject }} />
      </div>
    </div>
  );
}

export default Profile;
