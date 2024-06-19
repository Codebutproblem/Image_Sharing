import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSearchUsers } from "../../services/userAccountService";
import ResponseMessage from "../../config/message";

function SearchUser() {
    const {keyword} = useParams();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const waittingAPI = async () => {
            const result = await getSearchUsers(keyword);
            if (result.message === ResponseMessage.GET_SUCCESS) {
                setUsers(result.users);
            }
        };
        waittingAPI();
    },[keyword]);
    return (
        <div className="flex gap-2 overflow-x-auto">
            {users.map((user) => (
                <div key={user.id} className="flex flex-col items-center gap-2 w-24">
                    <Link to={`/profile/${user?.slug}`}>
                        <img src={user.avatar || "https://www.gravatar.com/avatar/"} alt="avatar" className="w-16 h-16 rounded-full object-cover" />
                    </Link>
                    <Link to={`/profile/${user?.slug}`} className=" font-medium hover:font-semibold text-lg">{user.username}</Link>
                </div>
            
            ))}
        </div>
    )
}

export default SearchUser;