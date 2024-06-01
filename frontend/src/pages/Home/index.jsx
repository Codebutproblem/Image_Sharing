import { useEffect, useState } from "react";
import PinTable from "../../components/PinTable";
import { getPins } from "../../services/pinService";

function Home() {
  const [pins, setPins] = useState([]);
  useEffect(() => {
    const waittingAPI = async () => {
      const result = await getPins();
      if (result.message === "get-pins-success") {
        setPins(result.pins);
      }
    };
    waittingAPI();
  }, []);
  return (
    <PinTable pins={pins} />
  );
}
export default Home;
