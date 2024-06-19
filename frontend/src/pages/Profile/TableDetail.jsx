import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { getPinsByTable } from "../../services/pinService";
import ResponseMessage from "../../config/message";
import UserPinTable from "../../components/PinTable/UserPinTable";
import { Pagination } from "@mui/material";
import SkeletonTable from "../../components/PinTable/SkeletonTable";
import PinTable from "../../components/PinTable/PinTable";
import SavedPin from "../../components/PinTable/SavedPin";
import { FaArrowLeft } from "react-icons/fa";

function TableDetail() {
    const { userObject } = useOutletContext();
    const { table_slug } = useParams();
    const [page, setPage] = useState(1);
    const [pinObject, setPinObject] = useState({ pins: [], tableName: "", total_pages: 0 });
    const navigate = useNavigate();
    useEffect(() => {
        const waittingAPI = async () => {
            const result = await getPinsByTable(table_slug, { page: page, limit: 8 });
            if (result.message === ResponseMessage.GET_SUCCESS) {
                setPinObject({
                    pins: result.pins,
                    tableName: result.tableName,
                    total_pages: result.total_pages
                });
            }
        };
        waittingAPI();
    }, [page])
    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-4">
                    <span className=" text-slate-50 text-2xl cursor-pointer p-3 rounded-full duration-300 bg-sky-500 hover:bg-sky-600" onClick={() => navigate(-1)}>
                        <FaArrowLeft />
                    </span>
                    <h1 className="text-4xl font-semibold">{pinObject.tableName || "Đang tải..."}</h1>
                </div>
                {pinObject.total_pages > 1 && (<Pagination color="primary" size="large" variant="outlined" shape="rounded" count={pinObject?.total_pages} page={page} onChange={(e, value) => setPage(value)} />)}
            </div>
            <div className="mt-3">
                {(pinObject.pins.length === 0) ? (
                    <SkeletonTable col={2} row={3} />
                ) :
                    <SavedPin pinObject={pinObject} />
                }
            </div>

        </div>
    );
}

export default TableDetail;