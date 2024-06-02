import { useEffect, useState } from "react";
import PinTable from "../../components/PinTable";
import { getPins } from "../../services/pinService";

function Home() {
  const [pinObject, setPinObject] = useState({pins: [], total_pages: 0});
  const [page, setPage] = useState(1);
  useEffect(() => {
    const waittingAPI = async () => {
      const result = await getPins({page: page, limit: 15});
      if (result.message === "get-pins-success") {
        setPinObject({pins: [...pinObject.pins , ...result.pins], total_pages: result.total_pages});
      }
    };
    waittingAPI();
  }, [page]);

  return (
    <PinTable pinObject={pinObject} setPage={setPage} page={page} />
  );
}
export default Home;
