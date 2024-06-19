import { useNavigate, useParams } from 'react-router-dom';
import { getSearchPins } from '../../services/pinService';
import ResponseMessage from '../../config/message';
import { useEffect, useState } from 'react';
import SkeletonTable from '../../components/PinTable/SkeletonTable';
import PinTable from '../../components/PinTable/PinTable';
function Search() {
    const navigate = useNavigate();
    const { keyword } = useParams();
    const [pinObject, setPinObject] = useState({ pins: [], total_pages: 0 });
    const [page, setPage] = useState(1);


    useEffect(() => {
        if(keyword === undefined || keyword === null || keyword === ''){
            navigate("/");
            return;
        }
        const waittingAPI = async () => {
            const result = await getSearchPins(keyword, { page: 1, limit: 16 });
            if (result.message === ResponseMessage.GET_SUCCESS) {
                setPinObject({
                    pins: result.pins,
                    total_pages: result.total_pages,
                });
            }
        };
        waittingAPI();
    }, [keyword]);

    useEffect(() => {
        const waittingAPI = async () => {
            const result = await getSearchPins(keyword, { page: page, limit: 16 });
            if (result.message === ResponseMessage.GET_SUCCESS) {
                setPinObject({
                    pins: [...pinObject.pins, ...result.pins],
                    total_pages: result.total_pages,
                });
            }
        };
        waittingAPI();
    }, [page]);

    

    return (
        <>
            {pinObject.pins.length === 0 ? (
                <SkeletonTable col={4} row={3} />
            ) : (
                <PinTable pinObject={pinObject} setPage={setPage} page={page} />
            )}
        </>
    )
}

export default Search;