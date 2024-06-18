import { useEffect, useState } from "react";
import { getUserTables } from "../../services/tableService";
import { useParams } from "react-router-dom";
import ResponseMessage from "../../config/message";
import { Pagination } from "@mui/material";
import TableList from "../PinTable/TableList";

function SaveTable({isMe}) {
    const [tableObject, setTableObject] = useState({ tables: [], total_pages: 0 });
    const [page, setPage] = useState(1);
    const { slug } = useParams();
    useEffect(() => {
        const waittingAPI = async () => {
            const result = await getUserTables(slug, { page: page, limit: 4 });
            if (result.message === ResponseMessage.GET_SUCCESS) {
                setTableObject({
                    tables: result.tables,
                    total_pages: result.total_pages,
                });
            }
        };
        waittingAPI();
    }, [page]);
    return (
        <>
            {tableObject.tables.length !== 0 &&
                <div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-semibold">Bảng</h1>
                        {tableObject.total_pages > 1 && (<Pagination color="primary" size="large" variant="outlined" shape="rounded" count={tableObject.total_pages} page={page} onChange={(e, value) => setPage(value)} />)}
                    </div>
                    <div className="mt-3">
                        <TableList isMe={isMe} tableObject={tableObject}/>
                    </div>

                </div>
            }
        </>
    )
}

export default SaveTable;