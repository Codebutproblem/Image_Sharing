import PinDetailPart from "../../components/PinDetailPart";
import RecommendPart from "../../components/RecommendPart";

function PinDetail() {
  return (
    <div className="flex justify-between py-5">
      <div className="w-[60%] min-w-[460px]">
        <PinDetailPart />
      </div>
      <div className="w-[30%]">
        <RecommendPart limit={7} />
      </div>
    </div>
  );
}

export default PinDetail;
