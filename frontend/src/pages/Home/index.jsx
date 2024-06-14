import { useEffect, useState } from "react";
import PinTable from "../../components/PinTable";
import { getPins } from "../../services/pinService";
import SkeletonTable from "../../components/PinTable/SkeletonTable";
import ResponseMessage from "../../config/message";

function Home() {
  const [pinObject, setPinObject] = useState({ pins: [], total_pages: 0 });
  const [page, setPage] = useState(1);
  useEffect(() => {
    const waittingAPI = async () => {
      const result = await getPins({ page: page, limit: 15 });
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
        <SkeletonTable />
      ) : (
        <PinTable pinObject={pinObject} setPage={setPage} page={page} />
      )}
    </>
  );
}
export default Home;
