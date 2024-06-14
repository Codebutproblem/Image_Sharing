import Pagination from '@mui/material/Pagination';
function CmPag ({totalPage, setPage}){
    const handleChange = (event, value) => {
        setPage(value);
    };
    return (
        <Pagination count={totalPage} onChange={handleChange} />
    )
}

export default CmPag;