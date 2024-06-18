import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { getUserPins } from "../../services/pinService";
import UserPinTable from "../PinTable/UserPinTable";
import SkeletonTable from "../PinTable/SkeletonTable";
import ResponseMessage from "../../config/message";
import { Pagination } from "@mui/material";

function ProfilePin({isMe}) {
    const { slug } = useParams();
    const [pinObject, setPinObject] = useState({ pins: [], total_pages: 0 });
    const [page, setPage] = useState(1);
    useEffect(() => {
        const waittingAPI = async () => {
            const result = await getUserPins(slug, { page: page, limit: 9 });
            if (result.message === ResponseMessage.GET_SUCCESS) {
                setPinObject({
                    pins: result.pins,
                    total_pages: result.total_pages,
                });
            }
        };
        waittingAPI();
    }, [page]);
    return (
        <>
            {pinObject.pins.length === 0 ? (
                <SkeletonTable col={3} row={3} />
            ) : (
                <div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-semibold">Đã tạo</h1>
                        {pinObject.total_pages > 1 && (<Pagination color="primary" size="large" variant="outlined" shape="rounded" count={pinObject.total_pages} page={page} onChange={(e, value) => setPage(value)} />)}
                    </div>
                    <div className="mt-3">
                        <UserPinTable isMe={isMe} pinObject={pinObject}/>
                    </div>
                    
                </div>
            )}
        </>
    )
}

export default ProfilePin;