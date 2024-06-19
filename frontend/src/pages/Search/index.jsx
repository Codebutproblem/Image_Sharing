import SearchPin from "../../components/Search/SearchPin";
import SearchUser from "../../components/Search/SearchUser";

function Search() {
    return (
        <>
            <div className="py-3">
                <SearchUser />
            </div>
            <SearchPin />
        </>
    )
}

export default Search;